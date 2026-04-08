'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { useScrollStore } from '@/stores/scrollStore';
import { drawLaptopScreen } from '@/lib/drawLaptopScreen';
import { getLaptopSequenceState } from '@/lib/cycleScreenState';
import {
  CYCLE_MOTION,
  LAPTOP_CLOSED_LID_ANGLE,
  LAPTOP_CANVAS,
  LAPTOP_MATERIAL_DEFAULT,
  LAPTOP_MATERIALS,
  MODEL_ASSETS,
  PHASES,
} from '@/lib/constants';
import { clamp, ease, lerp } from '@/lib/easing';
import type { EmailEntry } from '@/types';

const MODEL_SCALE = 6.5;

function buildLaptopMaterial(
  mat: THREE.Material | null,
): THREE.MeshStandardMaterial {
  const name = (mat?.name ?? '').toLowerCase();
  const preset =
    LAPTOP_MATERIALS[name] ??
    (LAPTOP_MATERIAL_DEFAULT as {
      color: number;
      metalness: number;
      roughness: number;
      transparent?: boolean;
      opacity?: number;
      emissive?: number;
      emissiveIntensity?: number;
    });

  const src = mat as THREE.MeshPhongMaterial | null;

  const next = new THREE.MeshStandardMaterial({
    color: preset.color,
    metalness: preset.metalness,
    roughness: preset.roughness,
    envMapIntensity: name === 'glass' ? 0.02 : 1.28,
    map: src?.map ?? null,
    normalMap: src?.normalMap ?? null,
    transparent: !!preset.transparent,
    opacity: name === 'glass' ? 0.035 : (preset.opacity ?? 1),
  });

  if (name === 'glass') {
    next.color = new THREE.Color(0x09090c);
    next.roughness = 0.22;
    next.metalness = 0;
  }

  if (preset.emissive !== undefined) {
    next.emissive = new THREE.Color(preset.emissive);
  }
  if (preset.emissiveIntensity !== undefined) {
    next.emissiveIntensity = preset.emissiveIntensity;
  }

  return next;
}

function getLaptopSequenceProgress(cycleProgress: number) {
  return clamp(
    (cycleProgress - PHASES.laptop.in) /
      (PHASES.laptop.out - PHASES.laptop.in),
    0,
    1,
  );
}

interface LaptopModelProps {
  emails: EmailEntry[];
  reducedMotion?: boolean;
  sequenceProgressOverride?: number;
  controlCamera?: boolean;
}

export default function LaptopModel({
  emails,
  reducedMotion = false,
  sequenceProgressOverride,
  controlCamera = true,
}: LaptopModelProps) {
  const macbookGroupRef = useRef<THREE.Group>(null);
  const laptopModelRef = useRef<THREE.Group | null>(null);
  const baseGroupRef = useRef<THREE.Group | null>(null);
  const lidGroupRef = useRef<THREE.Group | null>(null);
  const lidPivotGroupRef = useRef<THREE.Group | null>(null);
  const greenGlowRef = useRef<THREE.PointLight | null>(null);
  const hingeGlowRef = useRef<THREE.PointLight | null>(null);
  const screenGlowRef = useRef<THREE.PointLight | null>(null);
  const screenOverlayRef = useRef<THREE.Mesh | null>(null);
  const boundsRef = useRef<THREE.Box3>(new THREE.Box3());
  const sizeRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const screenMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const lastStateKeyRef = useRef('');
  const processedRef = useRef(false);

  const fbx = useLoader(FBXLoader, MODEL_ASSETS.laptop.fbx);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = LAPTOP_CANVAS.width;
    canvas.height = LAPTOP_CANVAS.height;
    canvasRef.current = canvas;

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    textureRef.current = texture;

    return () => {
      texture.dispose();
      textureRef.current = null;
      canvasRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (processedRef.current || !fbx || !macbookGroupRef.current) return;
    processedRef.current = true;

    const group = macbookGroupRef.current;
    const baseGroup = new THREE.Group();
    const lidGroup = new THREE.Group();
    const lidPivotGroup = new THREE.Group();
    lidPivotGroupRef.current = lidPivotGroup;

    let screenMesh:
      | THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
      | null = null;
    const lidMeshes: THREE.Mesh[] = [];
    const baseMeshes: THREE.Mesh[] = [];

    fbx.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const nodeName = child.name.toLowerCase();
      if (nodeName.startsWith('lid_low')) {
        lidMeshes.push(child);
      } else {
        baseMeshes.push(child);
      }

      const matName =
        (Array.isArray(child.material)
          ? child.material[0]?.name
          : child.material?.name) ?? '';
      if (nodeName === 'lid_low010' || matName.toLowerCase().includes('disp')) {
        screenMesh = child;
      }
    });

    const convertMeshMaterial = (mesh: THREE.Mesh) => {
      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((material) => {
          const next = buildLaptopMaterial(material);
          material.dispose();
          return next;
        });
      } else {
        const oldMaterial = mesh.material;
        mesh.material = buildLaptopMaterial(oldMaterial);
        oldMaterial.dispose();
      }
    };

    baseMeshes.forEach(convertMeshMaterial);
    lidMeshes.forEach(convertMeshMaterial);

    const laptopModel = new THREE.Group();
    laptopModelRef.current = laptopModel;
    baseGroupRef.current = baseGroup;
    lidGroupRef.current = lidGroup;
    for (const mesh of baseMeshes) {
      mesh.removeFromParent();
      baseGroup.add(mesh);
    }
    for (const mesh of lidMeshes) {
      mesh.removeFromParent();
      lidGroup.add(mesh);
    }

    laptopModel.add(baseGroup);

    baseGroup.updateMatrixWorld(true);
    lidGroup.updateMatrixWorld(true);

    const baseBox = new THREE.Box3().setFromObject(baseGroup);
    const lidBox = new THREE.Box3().setFromObject(lidGroup);
    const lidPivot = new THREE.Vector3(0, baseBox.max.y, lidBox.min.z);

    lidPivotGroup.position.copy(lidPivot);
    lidGroup.position.copy(lidPivot).multiplyScalar(-1);
    lidPivotGroup.add(lidGroup);
    laptopModel.add(lidPivotGroup);

    laptopModel.rotation.x = -Math.PI / 2;
    laptopModel.scale.setScalar(MODEL_SCALE);
    laptopModel.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(laptopModel);
    const center = new THREE.Vector3();
    box.getCenter(center);
    laptopModel.position.sub(center);

    laptopModel.updateMatrixWorld(true);
    const settled = new THREE.Box3().setFromObject(laptopModel);
    laptopModel.position.y -= settled.min.y;

    laptopModel.updateMatrixWorld(true);
    const finalBounds = new THREE.Box3().setFromObject(laptopModel);
    boundsRef.current.copy(finalBounds);
    const finalSize = new THREE.Vector3();
    finalBounds.getSize(finalSize);
    sizeRef.current.copy(finalSize);

    if (screenMesh && textureRef.current) {
      const displayMesh =
        screenMesh as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.Material | THREE.Material[]
        >;
      displayMesh.visible = false;
      const screenMaterial = new THREE.MeshBasicMaterial({
        map: textureRef.current,
        toneMapped: false,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -4,
      });
      screenMaterialRef.current = screenMaterial;

      const screenOverlay = new THREE.Mesh(displayMesh.geometry.clone(), screenMaterial);
      screenOverlay.position.copy(displayMesh.position);
      screenOverlay.quaternion.copy(displayMesh.quaternion);
      screenOverlay.scale.copy(displayMesh.scale);
      screenOverlay.renderOrder = 20;
      screenOverlay.frustumCulled = false;
      screenOverlayRef.current = screenOverlay;
      lidGroup.add(screenOverlay);

    }

    group.add(laptopModel);

    const minY = finalBounds.min.y;
    const minZ = finalBounds.min.z;
    const sizeY = finalSize.y;
    const sizeZ = finalSize.z;

    const greenGlow = new THREE.PointLight(0xe04458, 0, 7.6, 2);
    greenGlow.position.set(0, minY + sizeY * 0.08, minZ + sizeZ * 0.015);
    greenGlowRef.current = greenGlow;
    group.add(greenGlow);

    const hingeGlow = new THREE.PointLight(0xf07080, 0, 5.6, 2.2);
    hingeGlow.position.set(0, minY + sizeY * 0.08, minZ + sizeZ * 0.02);
    hingeGlowRef.current = hingeGlow;
    group.add(hingeGlow);

    const screenGlow = new THREE.PointLight(0xffb8c0, 0, 9.6, 1.85);
    screenGlow.position.set(0, minY + sizeY * 0.16, minZ + sizeZ * 0.05);
    screenGlowRef.current = screenGlow;
    group.add(screenGlow);

    lidPivotGroup.rotation.set(LAPTOP_CLOSED_LID_ANGLE, 0, 0);
  }, [fbx]);

  useFrame(({ camera }) => {
    const cycleProgress = useScrollStore.getState().cycleProgress;
    const sequenceProgress = reducedMotion
      ? 1
      : sequenceProgressOverride ?? getLaptopSequenceProgress(cycleProgress);

    const lidPivot = lidPivotGroupRef.current;
    const groupNode = macbookGroupRef.current;
    const baseGroup = baseGroupRef.current;
    const lidGroup = lidGroupRef.current;
    const greenGlow = greenGlowRef.current;
    const hingeGlow = hingeGlowRef.current;
    const screenGlow = screenGlowRef.current;
    const screenOverlay = screenOverlayRef.current;
    if (!lidPivot || !groupNode || !baseGroup || !lidGroup) return;

    const laptopState = getLaptopSequenceState(
      sequenceProgress,
      emails.length,
      reducedMotion,
    );

    const openStart = 0.0;
    const openEnd = CYCLE_MOTION.laptop.openEnd;
    const headlineHoldEnd = CYCLE_MOTION.laptop.headlineHoldEnd;
    const screenPushStart = CYCLE_MOTION.laptop.screenPushStart;
    const screenPushEnd = CYCLE_MOTION.laptop.screenPushEnd;
    const openT = reducedMotion
      ? 1
      : clamp((sequenceProgress - openStart) / (openEnd - openStart), 0, 1);
    const lidSettleAngle = reducedMotion
      ? -0.02
      : sequenceProgress < openEnd
        ? -0.05
        : sequenceProgress < headlineHoldEnd
          ? lerp(
              -0.05,
              -0.022,
              ease(
                (sequenceProgress - openEnd) /
                  Math.max(headlineHoldEnd - openEnd, 0.001),
              ),
            )
          : -0.018;
    const lidAngle = lerp(
      LAPTOP_CLOSED_LID_ANGLE,
      lidSettleAngle,
      ease(openT),
    );
    lidPivot.rotation.set(lidAngle, 0, 0);

    if (greenGlow && hingeGlow && screenGlow) {
      const glow = laptopState.glowAmount;
      const green = laptopState.greenScreenAmount;
      const inbox = laptopState.inboxOpacity;
      greenGlow.intensity = 0.01 + glow * 0.09 + green * 0.04;
      hingeGlow.intensity = 0.008 + glow * 0.05 + green * 0.02;
      screenGlow.intensity =
        0.16 +
        glow * 1.28 +
        green * 0.48 +
        laptopState.campaignReadyOpacity * 0.24 +
        inbox * 0.32;

      const bounds = boundsRef.current;
      const size = sizeRef.current;
      const minY = bounds.min.y;
      const minZ = bounds.min.z;
      const sizeY = size.y;
      const sizeZ = size.z;
      const openRatio = clamp(1 - lidAngle / LAPTOP_CLOSED_LID_ANGLE, 0, 1);

      greenGlow.position.set(
        0,
        lerp(minY + sizeY * 0.07, minY + sizeY * 0.17, openRatio),
        lerp(minZ + sizeZ * 0.025, minZ + sizeZ * 0.05, openRatio),
      );
      hingeGlow.position.set(0, minY + sizeY * 0.08, minZ + sizeZ * 0.02);
      screenGlow.position.set(
        0,
        lerp(minY + sizeY * 0.12, minY + sizeY * 0.46, openRatio),
        lerp(minZ + sizeZ * 0.035, minZ + sizeZ * 0.11, openRatio),
      );
    }

    baseGroup.visible = true;
    lidGroup.visible = true;
    lidGroup.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || child === screenOverlay) return;
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      materials.forEach((material) => {
        const meshMaterial = material as THREE.MeshStandardMaterial;
        if (meshMaterial.transparent || meshMaterial.opacity !== 1) {
          meshMaterial.transparent = false;
          meshMaterial.opacity = 1;
          meshMaterial.needsUpdate = true;
        }
      });
    });

    if (screenOverlay && screenMaterialRef.current) {
      const showScreen = sequenceProgress > 0.02;
      screenOverlay.visible = showScreen;
      if (showScreen) {
        const screenMaterial = screenMaterialRef.current;
        if (screenMaterial.transparent || screenMaterial.opacity !== 1) {
          screenMaterial.opacity = 1;
          screenMaterial.transparent = false;
          screenMaterial.needsUpdate = true;
        }
      }
    }

    let rotX: number;
    let rotY: number;
    let groupX: number;
    let groupY: number;
    let groupZ: number;
    const holdSettle = clamp((sequenceProgress - openEnd) / 0.12, 0, 1);
    if (reducedMotion) {
      rotX = 0;
      rotY = 0.02;
      groupX = -0.012;
      groupY = 0.014;
      groupZ = 0.026;
    } else if (sequenceProgress < openEnd) {
      rotX = -0.062;
      rotY = 0.18;
      groupX = -0.06;
      groupY = -0.01;
      groupZ = 0.012;
    } else if (sequenceProgress < headlineHoldEnd) {
      const t = ease(holdSettle);
      rotX = lerp(-0.062, -0.034, t);
      rotY = lerp(0.18, 0.044, t);
      groupX = lerp(-0.06, -0.014, t);
      groupY = lerp(-0.01, 0.012, t);
      groupZ = lerp(0.012, 0.028, t);
    } else if (sequenceProgress < screenPushEnd) {
      const t = ease(
        (sequenceProgress - headlineHoldEnd) /
          Math.max(screenPushEnd - headlineHoldEnd, 0.001),
      );
      rotX = lerp(-0.034, -0.018, t);
      rotY = lerp(0.044, 0.01, t);
      groupX = lerp(-0.014, 0, t);
      groupY = lerp(0.012, 0.016, t);
      groupZ = lerp(0.028, 0.016, t);
    } else {
      const t = ease(
        clamp(
          (sequenceProgress - screenPushEnd) / Math.max(1 - screenPushEnd, 0.001),
          0,
          1,
        ),
      );
      rotX = lerp(-0.018, -0.024, t);
      rotY = lerp(0.01, 0.026, t);
      groupX = lerp(0, -0.014, t);
      groupY = lerp(0.016, 0.012, t);
      groupZ = lerp(0.016, 0.026, t);
    }

    groupNode.rotation.set(rotX, rotY, 0);
    groupNode.position.x = groupX;
    groupNode.position.y = groupY;
    groupNode.position.z = groupZ;

    let cx: number;
    let cy: number;
    let cz: number;
    let lx: number;
    let ly: number;
    let lz: number;
    if (reducedMotion) {
      cx = 0.14;
      cy = 0.98;
      cz = 5.28;
      lx = -0.03;
      ly = 0.93;
      lz = 0.04;
    } else if (sequenceProgress < openEnd) {
      const t = ease(sequenceProgress / openEnd);
      cx = lerp(0.82, 0.4, t);
      cy = lerp(2.34, 1.14, t);
      cz = lerp(9.1, 5.92, t);
      lx = lerp(-0.34, -0.11, t);
      ly = lerp(0.02, 0.88, t);
      lz = lerp(0.36, 0.08, t);
    } else if (sequenceProgress < headlineHoldEnd) {
      const t = ease(holdSettle);
      cx = lerp(0.4, 0.18, t);
      cy = lerp(1.14, 0.99, t);
      cz = lerp(5.92, 5.4, t);
      lx = lerp(-0.11, -0.04, t);
      ly = lerp(0.88, 0.93, t);
      lz = lerp(0.08, 0.05, t);
    } else if (sequenceProgress < screenPushStart) {
      const t = ease(
        (sequenceProgress - headlineHoldEnd) /
          Math.max(screenPushStart - headlineHoldEnd, 0.001),
      );
      cx = lerp(0.18, 0.08, t);
      cy = lerp(0.99, 0.98, t);
      cz = lerp(5.4, 4.88, t);
      lx = lerp(-0.04, 0, t);
      ly = lerp(0.93, 0.95, t);
      lz = lerp(0.05, 0.03, t);
    } else if (sequenceProgress < screenPushEnd) {
      const t = ease(
        (sequenceProgress - screenPushStart) /
          Math.max(screenPushEnd - screenPushStart, 0.001),
      );
      cx = lerp(0.08, 0.02, t);
      cy = lerp(0.98, 0.4, t);
      cz = lerp(4.88, 1.2, t);
      lx = lerp(0, 0, t);
      ly = lerp(0.95, 0.9, t);
      lz = lerp(0.03, -0.08, t);
    } else {
      const t = ease(
        clamp(
          (sequenceProgress - screenPushEnd) / Math.max(1 - screenPushEnd, 0.001),
          0,
          1,
        ),
      );
      cx = lerp(0.02, 0.14, t);
      cy = lerp(0.4, 0.94, t);
      cz = lerp(1.2, 4.6, t);
      lx = lerp(0, -0.02, t);
      ly = lerp(0.9, 0.95, t);
      lz = lerp(-0.08, 0.03, t);
    }

    if (controlCamera) {
      camera.position.set(cx, cy, cz);
      camera.lookAt(lx, ly, lz);
    }

    const ctx = canvasRef.current?.getContext('2d');
    const texture = textureRef.current;
    const screenMaterial = screenMaterialRef.current;
    if (screenMaterial && screenMaterial.map !== texture && texture) {
      screenMaterial.map = texture;
      screenMaterial.needsUpdate = true;
    }

    if (!ctx || !texture) return;

    const stateKey = [
      laptopState.screenReveal.toFixed(2),
      laptopState.glowAmount.toFixed(2),
      laptopState.greenScreenAmount.toFixed(2),
      laptopState.campaignReadyOpacity.toFixed(2),
      laptopState.pushIntoProgress.toFixed(2),
      laptopState.greenOverlayOpacity.toFixed(2),
      laptopState.inboxOpacity.toFixed(2),
      laptopState.redFlood.toFixed(2),
      laptopState.emailOpacities.map((value) => value.toFixed(2)).join(','),
      emails.map((entry) => entry.time).join(','),
    ].join('|');

    if (stateKey !== lastStateKeyRef.current) {
      lastStateKeyRef.current = stateKey;
      drawLaptopScreen(ctx, laptopState, emails);
      texture.needsUpdate = true;
    }
  });

  return (
    <group ref={macbookGroupRef} />
  );
}
