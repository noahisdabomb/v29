'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useScrollStore } from '@/stores/scrollStore';
import { drawPhoneScreen } from '@/lib/drawPhoneScreen';
import { LOG_ENTRIES } from '@/lib/content';
import { getPhoneSequenceState } from '@/lib/cycleScreenState';
import { getPhoneMotionTransform } from '@/lib/phoneMotion';
import { MODEL_ASSETS, PHONE_CANVAS, PHONE_MODEL_LAYOUT } from '@/lib/constants';

const ENV_MAP_INTENSITY = 1.35;

function createScreenGeometry(width: number, height: number) {
  return new THREE.PlaneGeometry(width, height, 1, 1);
}

function createRoundedMaskTexture(cornerRadiusRatio: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const width = canvas.width;
  const height = canvas.height;
  const radius = Math.min(width, height) * cornerRadiusRatio;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(width - radius, 0);
  ctx.quadraticCurveTo(width, 0, width, radius);
  ctx.lineTo(width, height - radius);
  ctx.quadraticCurveTo(width, height, width - radius, height);
  ctx.lineTo(radius, height);
  ctx.quadraticCurveTo(0, height, 0, height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

interface PhoneModelProps {
  reducedMotion?: boolean;
  progressOverride?: number;
  screenProgressOverride?: number;
  disableInternalMotion?: boolean;
}

function getBoundsInLocalSpace(
  object: THREE.Object3D,
  relativeTo: THREE.Object3D,
) {
  const bounds = new THREE.Box3().makeEmpty();
  const inverse = new THREE.Matrix4().copy(relativeTo.matrixWorld).invert();

  object.updateWorldMatrix(true, true);

  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const geometry = child.geometry;
    if (!geometry.boundingBox) {
      geometry.computeBoundingBox();
    }
    if (!geometry.boundingBox) return;

    const localBox = geometry.boundingBox.clone();
    const relativeMatrix = new THREE.Matrix4().multiplyMatrices(
      inverse,
      child.matrixWorld,
    );
    localBox.applyMatrix4(relativeMatrix);
    bounds.union(localBox);
  });

  return bounds;
}

function selectPrimaryPhoneBody(scene: THREE.Group) {
  const phone = scene.getObjectByName('iphone17promax');
  if (phone) return phone.clone(true);

  const rootChildren = scene.children.filter((child) => child.type !== 'AmbientLight');
  if (rootChildren.length > 0) {
    return rootChildren[0].clone(true);
  }

  return scene.clone(true);
}

type Axis = 'x' | 'y' | 'z';

/**
 * Auto-detect phone axes from bounding box dimensions.
 * A phone's thinnest dimension is always depth, tallest is height.
 */
function detectPhoneAxes(size: THREE.Vector3): {
  depthAxis: Axis;
  widthAxis: Axis;
  heightAxis: Axis;
} {
  const axes: { axis: Axis; size: number }[] = [
    { axis: 'x', size: size.x },
    { axis: 'y', size: size.y },
    { axis: 'z', size: size.z },
  ];
  axes.sort((a, b) => a.size - b.size);
  return {
    depthAxis: axes[0].axis,   // thinnest = depth
    widthAxis: axes[1].axis,   // middle = width
    heightAxis: axes[2].axis,  // tallest = height
  };
}

export default function PhoneModel({
  reducedMotion = false,
  progressOverride,
  screenProgressOverride,
  disableInternalMotion = false,
}: PhoneModelProps) {
  const motionGroupRef = useRef<THREE.Group>(null);
  const anchorGroupRef = useRef<THREE.Group>(null);
  const normalizedGroupRef = useRef<THREE.Group>(null);
  const screenMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const glassMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const lastStateKeyRef = useRef('');

  const { scene: sourceScene } = useGLTF(MODEL_ASSETS.phone.glb);
  const model = useMemo(() => selectPrimaryPhoneBody(sourceScene), [sourceScene]);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = PHONE_CANVAS.width;
    canvas.height = PHONE_CANVAS.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);
    texture.center.set(0.5, 0.5);
    texture.rotation = Math.PI;
    texture.needsUpdate = true;

    ctxRef.current = ctx;
    textureRef.current = texture;

    if (screenMatRef.current) {
      screenMatRef.current.map = texture;
      screenMatRef.current.needsUpdate = true;
    }

    return () => {
      texture.dispose();
      ctxRef.current = null;
      textureRef.current = null;
      lastStateKeyRef.current = '';
    };
  }, []);

  useEffect(() => {
    const anchorGroup = anchorGroupRef.current;
    const normalizedGroup = normalizedGroupRef.current;
    const motionGroup = motionGroupRef.current;
    if (!anchorGroup || !normalizedGroup || !motionGroup) return;

    const { normalization, bodyFrame, screenFrame, targetHeight } =
      PHONE_MODEL_LAYOUT;

    anchorGroup.position.set(0, 0, 0);
    anchorGroup.rotation.set(0, 0, 0);
    anchorGroup.scale.set(1, 1, 1);

    normalizedGroup.position.set(
      normalization.position.x,
      normalization.position.y,
      normalization.position.z,
    );
    normalizedGroup.rotation.set(
      normalization.rotation.x,
      normalization.rotation.y,
      normalization.rotation.z,
    );
    normalizedGroup.scale.set(1, 1, 1);

    const clonedMaterials: THREE.Material[] = [];

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => {
          const cloned = material.clone();
          clonedMaterials.push(cloned);
          return cloned;
        });
      } else {
        const cloned = child.material.clone();
        clonedMaterials.push(cloned);
        child.material = cloned;
      }

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshPhysicalMaterial
        ) {
          if (material.name === 'iphone17pro-textures') {
            material.map = null;
            material.emissiveMap = null;
            material.color = new THREE.Color('#05060a');
            material.emissive = new THREE.Color('#000000');
            material.metalness = 0.02;
            material.roughness = 0.96;
            material.transparent = false;
            material.opacity = 1;
            material.alphaTest = 0;
            material.depthWrite = true;
          }

          if (material.map) {
            material.map.colorSpace = THREE.SRGBColorSpace;
            material.map.needsUpdate = true;
          }

          if (material.emissiveMap) {
            material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
            material.emissiveMap.needsUpdate = true;
          }

          material.envMapIntensity = ENV_MAP_INTENSITY;
          if (material.transparent) {
            material.transparent = true;
            material.depthWrite = false;
          }

          material.needsUpdate = true;
        }
      });
    });

    // --- Auto-detect phone orientation ---
    anchorGroup.updateWorldMatrix(true, true);
    let bodyBox = getBoundsInLocalSpace(model, normalizedGroup);
    const initialSize = new THREE.Vector3();
    bodyBox.getSize(initialSize);


    const { depthAxis, widthAxis, heightAxis } = detectPhoneAxes(initialSize);

    // Scale so the tallest dimension (height) matches targetHeight
    const scaleFactor = targetHeight / Math.max(initialSize[heightAxis], 0.0001);
    normalizedGroup.scale.setScalar(scaleFactor);

    anchorGroup.updateWorldMatrix(true, true);
    bodyBox = getBoundsInLocalSpace(model, normalizedGroup);
    const bodySize = new THREE.Vector3();
    const bodyCenter = new THREE.Vector3();
    bodyBox.getSize(bodySize);
    bodyBox.getCenter(bodyCenter);

    const centeredBodyPoint = bodyCenter.clone().applyMatrix4(normalizedGroup.matrix);
    anchorGroup.position.set(
      bodyFrame.centerOffset.x - centeredBodyPoint.x,
      bodyFrame.centerOffset.y - centeredBodyPoint.y,
      bodyFrame.centerOffset.z - centeredBodyPoint.z,
    );
    anchorGroup.updateWorldMatrix(true, true);

    // Screen dimensions along detected width/height axes
    const screenWidth = bodySize[widthAxis] * screenFrame.widthRatio;
    const screenHeight = bodySize[heightAxis] * screenFrame.heightRatio;

    // Screen center in model space
    const screenCenter = new THREE.Vector3(
      bodyCenter.x,
      bodyCenter.y,
      bodyCenter.z,
    );
    screenCenter[widthAxis] += bodySize[widthAxis] * screenFrame.centerOffsetRatio.x;
    screenCenter[heightAxis] += bodySize[heightAxis] * screenFrame.centerOffsetRatio.y;

    // Place screen on the detected depth axis face
    const screenFace = screenFrame.face as 'min' | 'max';
    const faceDepth = screenFace === 'min' ? bodyBox.min[depthAxis] : bodyBox.max[depthAxis];
    const depthDirection = screenFace === 'min' ? -1 : 1;
    const insetDirection = -depthDirection;

    // Build rotation: PlaneGeometry normal (+Z) must face outward along depth axis
    // PlaneGeometry local X = width, local Y = height
    const xBasis = new THREE.Vector3();
    const yBasis = new THREE.Vector3();
    xBasis[widthAxis] = 1;
    yBasis[heightAxis] = 1;
    const zBasis = new THREE.Vector3().crossVectors(xBasis, yBasis);
    // Ensure normal points outward on the correct face
    const wantPositive = screenFace === 'max';
    if ((zBasis[depthAxis] > 0) !== wantPositive) {
      xBasis.negate();
      zBasis.crossVectors(xBasis, yBasis);
    }
    const basisMatrix = new THREE.Matrix4().makeBasis(xBasis, yBasis, zBasis);
    const screenRotation = new THREE.Euler().setFromRotationMatrix(basisMatrix);

    const screenInset = screenFrame.depthOffset * 0.3;
    const glassInset = screenFrame.depthOffset * 0.08;
    const maskTexture = createRoundedMaskTexture(screenFrame.cornerRadiusRatio);
    const screenGeometry = createScreenGeometry(screenWidth, screenHeight);
    const screenMaterial = new THREE.MeshBasicMaterial({
      color: '#ffffff',
      toneMapped: false,
      transparent: true,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
      depthWrite: false,
      depthTest: true,
      alphaMap: maskTexture,
      alphaTest: 0.42,
      map: textureRef.current,
    });
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    const screenPos = new THREE.Vector3();
    screenPos[widthAxis] = screenCenter[widthAxis];
    screenPos[heightAxis] = screenCenter[heightAxis];
    screenPos[depthAxis] = faceDepth + insetDirection * screenInset;
    screenMesh.position.copy(screenPos);
    screenMesh.rotation.copy(screenRotation);
    screenMesh.frustumCulled = false;
    screenMesh.renderOrder = 10;

    const glassGeometry = createScreenGeometry(screenWidth, screenHeight);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: '#f0e6d7',
      transparent: true,
      opacity: 0.08,
      alphaMap: maskTexture,
      alphaTest: 0.42,
      transmission: 0.02,
      ior: 1.42,
      roughness: 0.1,
      metalness: 0.02,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      thickness: 0.01,
      depthWrite: false,
      depthTest: true,
      side: THREE.DoubleSide,
    });
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    const glassPos = new THREE.Vector3();
    glassPos[widthAxis] = screenCenter[widthAxis];
    glassPos[heightAxis] = screenCenter[heightAxis];
    glassPos[depthAxis] = faceDepth + insetDirection * glassInset;
    glassMesh.position.copy(glassPos);
    glassMesh.rotation.copy(screenRotation);
    glassMesh.frustumCulled = false;
    glassMesh.renderOrder = 11;

    normalizedGroup.add(screenMesh);
    normalizedGroup.add(glassMesh);
    screenMatRef.current = screenMaterial;
    glassMatRef.current = glassMaterial;

    return () => {
      normalizedGroup.remove(screenMesh);
      normalizedGroup.remove(glassMesh);
      screenGeometry.dispose();
      glassGeometry.dispose();
      maskTexture?.dispose();
      screenMaterial.dispose();
      glassMaterial.dispose();
      for (const mat of clonedMaterials) {
        mat.dispose();
      }
      // Dispose cloned model geometries to prevent memory leaks
      normalizedGroup.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).geometry?.dispose();
        }
      });
      screenMatRef.current = null;
      glassMatRef.current = null;
    };
  }, [model]);

  useFrame((state) => {
    const group = motionGroupRef.current;
    if (!group) return;
    const elapsed = state.clock.elapsedTime;

    const progress =
      progressOverride ?? useScrollStore.getState().phoneProgress;
    const motion = disableInternalMotion
      ? {
          rotX: 0,
          rotY: 0,
          scale: 1,
          posX: 0,
          posY: 0,
          posZ: 0,
        }
      : getPhoneMotionTransform(progress, reducedMotion);

    group.rotation.set(motion.rotX, motion.rotY, 0);
    group.scale.setScalar(motion.scale);
    group.position.set(motion.posX, motion.posY, motion.posZ);

    const screenMat = screenMatRef.current;
    const glassMat = glassMatRef.current;
    if (screenMat && !screenMat.map && textureRef.current) {
      screenMat.map = textureRef.current;
      screenMat.needsUpdate = true;
    }

    const screenProgress = screenProgressOverride ?? progress;
    const phoneState = getPhoneSequenceState(
      screenProgress,
      LOG_ENTRIES.length,
      reducedMotion,
    );
    const hasScreenMotion =
      !reducedMotion &&
      (phoneState.standbyOpacity > 0.02 ||
        phoneState.standbyGlow > 0.01 ||
        phoneState.statusOpacity > 0.02 ||
        phoneState.headerGlow > 0.01 ||
        phoneState.lineGlow > 0.01 ||
        phoneState.activeIndex >= 0);
    const ambientMotion = hasScreenMotion ? (elapsed * 0.18) % 1 : 0;
    const pulseMotion = hasScreenMotion ? (Math.sin(elapsed * 2.1) + 1) * 0.5 : 0;

    const ctx = ctxRef.current;
    const texture = textureRef.current;
    if (!ctx || !texture) return;

    const stateKey = [
      phoneState.statusOpacity.toFixed(2),
      phoneState.standbyOpacity.toFixed(2),
      phoneState.standbyGlow.toFixed(2),
      phoneState.headerOpacity.toFixed(2),
      phoneState.headerOffset.toFixed(1),
      phoneState.headerRuleProgress.toFixed(2),
      phoneState.headerGlow.toFixed(2),
      phoneState.lineGlow.toFixed(2),
      phoneState.entryOpacities.map((value) => value.toFixed(2)).join(','),
      phoneState.entryOffsets.map((value) => value.toFixed(1)).join(','),
      phoneState.entryXOffsets.map((value) => value.toFixed(1)).join(','),
      phoneState.rowScales.map((value) => value.toFixed(3)).join(','),
      phoneState.iconScales.map((value) => value.toFixed(3)).join(','),
      phoneState.entryStates.join(','),
      phoneState.activeIndex,
      phoneState.activePulse.toFixed(3),
      phoneState.lineProgress.toFixed(3),
      ambientMotion.toFixed(2),
      pulseMotion.toFixed(2),
    ].join('|');

    if (stateKey !== lastStateKeyRef.current) {
      lastStateKeyRef.current = stateKey;
      drawPhoneScreen(ctx, phoneState, LOG_ENTRIES, ambientMotion);
      texture.needsUpdate = true;
    }

    if (glassMat) {
      const activeBoost = phoneState.activeIndex >= 0 ? 0.016 : 0;
      glassMat.opacity =
        0.045 +
        phoneState.standbyGlow * 0.01 +
        phoneState.headerOpacity * 0.008 +
        activeBoost * 0.45 +
        (phoneState.lineGlow * 0.008 + phoneState.activePulse * 0.012) * pulseMotion;
      glassMat.transmission =
        0.015 + phoneState.headerRuleProgress * 0.01 + phoneState.activePulse * 0.004;
      glassMat.roughness = 0.1 - phoneState.headerRuleProgress * 0.015;
      glassMat.clearcoatRoughness = 0.12 - phoneState.headerRuleProgress * 0.015;
    }
  });

  return (
    <group ref={motionGroupRef}>
      <group ref={anchorGroupRef}>
        <group ref={normalizedGroupRef}>
          <primitive object={model} />
        </group>
      </group>
    </group>
  );
}
