'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CLOCK_CANVAS } from '@/lib/constants';
import { getClockSequenceState } from '@/lib/cycleScreenState';
import { drawClockFace, drawClockFaceFromState } from '@/lib/drawClockFace';
import type { ClockSequenceState } from '@/lib/cycleScreenState';
import type { ClockFaceRenderState } from '@/lib/clockFaceState';
import { useScrollStore } from '@/stores/scrollStore';

export interface ClockModelProps {
  reducedMotion?: boolean;
  sequenceOverride?: ClockSequenceState;
  renderStateOverride?: ClockFaceRenderState;
}

const CLOCK_MODEL_URL =
  '/models/flip-clock/retro-flip-clock-refined.glb?v=polish-8';
const CLOCK_TEXTURE_ROOT = '/models/flip-clock/textures';
const FACE_MASK = {
  width: 0.96,
  height: 0.92,
  radius: 0.10,
} as const;
const RENDER_ORDERS: Record<string, number> = {
  ClockBody: 1,
  ClockFrontBlack: 2,
  ClockCavityFill: 3,
};

interface PreparedClockModel {
  object: THREE.Group;
  box: THREE.Box3;
  size: THREE.Vector3;
}

interface ClockTextureSet {
  diffuse: THREE.Texture;
  normal: THREE.Texture;
  roughness: THREE.Texture;
  metalness: THREE.Texture;
  transmission: THREE.Texture;
}

function createRoundedRectShape(width: number, height: number, radius: number) {
  const halfWidth = width * 0.5;
  const halfHeight = height * 0.5;
  const r = Math.min(radius, halfWidth, halfHeight);
  const shape = new THREE.Shape();

  shape.moveTo(-halfWidth + r, -halfHeight);
  shape.lineTo(halfWidth - r, -halfHeight);
  shape.absarc(halfWidth - r, -halfHeight + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(halfWidth, halfHeight - r);
  shape.absarc(halfWidth - r, halfHeight - r, r, 0, Math.PI / 2, false);
  shape.lineTo(-halfWidth + r, halfHeight);
  shape.absarc(-halfWidth + r, halfHeight - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-halfWidth, -halfHeight + r);
  shape.absarc(-halfWidth + r, -halfHeight + r, r, Math.PI, Math.PI * 1.5, false);

  return shape;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width * 0.5, height * 0.5);

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function configureTexture(
  texture: THREE.Texture,
  {
    colorSpace = THREE.NoColorSpace,
  }: {
    colorSpace?: THREE.ColorSpace;
  } = {},
) {
  texture.flipY = false;
  texture.colorSpace = colorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
}

function prepareMaterial(material: THREE.Material, textures: ClockTextureSet) {
  const base = material.clone();
  const materialName = base.name.toLowerCase();

  if (
    base instanceof THREE.MeshStandardMaterial ||
    base instanceof THREE.MeshPhysicalMaterial
  ) {
    if (base.map) {
      base.map.colorSpace = THREE.SRGBColorSpace;
      base.map.needsUpdate = true;
    }

    if (materialName === 'clockplastic') {
      base.map = null;
      base.normalMap = textures.normal;
      base.roughnessMap = textures.roughness;
      base.metalnessMap = null;
      base.color = new THREE.Color('#c83a50');
      base.roughness = 0.74;
      base.metalness = 0.02;
      base.envMapIntensity = 0.3;
      base.normalScale.set(0.09, 0.09);
      if (base instanceof THREE.MeshPhysicalMaterial) {
        base.clearcoat = 0.22;
        base.clearcoatRoughness = 0.38;
      }
    }

    if (materialName === 'clockblack') {
      base.map = null;
      base.normalMap = null;
      base.roughnessMap = null;
      base.metalnessMap = null;
      base.color = new THREE.Color('#3d1225');
      base.roughness = 0.84;
      base.metalness = 0;
      base.envMapIntensity = 0.09;
      if (base instanceof THREE.MeshPhysicalMaterial) {
        base.clearcoat = 0.1;
        base.clearcoatRoughness = 0.44;
      }
    }

    if (materialName === 'clockbackpanelmat') {
      const unlit = new THREE.MeshBasicMaterial({
        color: '#1a0a10',
        toneMapped: false,
      });
      unlit.name = base.name;
      unlit.needsUpdate = true;
      return unlit;
    }
  }

  base.needsUpdate = true;
  return base;
}

function prepareClockModel(
  scene: THREE.Group,
  textures: ClockTextureSet,
): PreparedClockModel {
  const clone = scene.clone(true);

  clone.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    child.castShadow = true;
    child.receiveShadow = true;
    child.frustumCulled = false;
    child.renderOrder = RENDER_ORDERS[child.name] ?? child.renderOrder;

    if (Array.isArray(child.material)) {
      child.material = child.material.map((material) =>
        prepareMaterial(material, textures),
      );
    } else {
      child.material = prepareMaterial(child.material, textures);
    }
  });

  clone.rotation.y = -Math.PI / 2;

  let box = new THREE.Box3().setFromObject(clone);
  const rawSize = box.getSize(new THREE.Vector3());
  const maxDimension = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
  const scale = 2.58 / maxDimension;
  clone.scale.setScalar(scale);

  box = new THREE.Box3().setFromObject(clone);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  clone.position.x -= center.x;
  clone.position.y -= center.y - size.y * 0.02;
  clone.position.z -= center.z;

  box = new THREE.Box3().setFromObject(clone);

  return {
    object: clone,
    box,
    size: box.getSize(new THREE.Vector3()),
  };
}

export default function ClockModelPolish({
  reducedMotion = false,
  sequenceOverride,
  renderStateOverride,
}: ClockModelProps) {
  const gltf = useGLTF(CLOCK_MODEL_URL);
  const [
    diffuseMap,
    normalMap,
    roughnessMap,
    metalnessMap,
    transmissionMap,
  ] = useTexture([
    `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Diffuse.webp`,
    `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Normal.webp`,
    `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Roughness.webp`,
    `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Metalness.webp`,
    `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Transmission.webp`,
  ]);
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.PointLight>(null);
  const faceMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const lastStateKeyRef = useRef('');
  const shellTextures = useMemo(() => {
    configureTexture(diffuseMap, { colorSpace: THREE.SRGBColorSpace });
    configureTexture(normalMap);
    configureTexture(roughnessMap);
    configureTexture(metalnessMap);
    configureTexture(transmissionMap);

    return {
      diffuse: diffuseMap,
      normal: normalMap,
      roughness: roughnessMap,
      metalness: metalnessMap,
      transmission: transmissionMap,
    };
  }, [diffuseMap, metalnessMap, normalMap, roughnessMap, transmissionMap]);
  const preparedModel = useMemo(
    () => prepareClockModel(gltf.scene, shellTextures),
    [gltf.scene, shellTextures],
  );
  const clockProgress = useScrollStore((state) => state.clockProgress);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = CLOCK_CANVAS.width;
    canvas.height = CLOCK_CANVAS.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;

    ctxRef.current = ctx;
    textureRef.current = texture;
    lastStateKeyRef.current = '';

    if (faceMaterialRef.current) {
      faceMaterialRef.current.map = texture;
      faceMaterialRef.current.needsUpdate = true;
    }

    return () => {
      texture.dispose();
      ctxRef.current = null;
      textureRef.current = null;
      lastStateKeyRef.current = '';
    };
  }, []);

  useFrame((state) => {
    const node = groupRef.current;
    if (!node) return;

    const liveClockState =
      sequenceOverride ?? getClockSequenceState(clockProgress, reducedMotion);
    const ctx = ctxRef.current;
    const texture = textureRef.current;
    const elapsed = state.clock.elapsedTime;
    const ring = liveClockState.ringAmount;
    const appear = 0.92 + liveClockState.displayProgress * 0.08;
    const faceKey = renderStateOverride
      ? JSON.stringify(renderStateOverride)
      : [
          liveClockState.displayProgress.toFixed(3),
          liveClockState.faceIn.toFixed(3),
          liveClockState.hold0659.toFixed(3),
          liveClockState.flipMinuteOnes.toFixed(3),
          liveClockState.flipMinuteTens.toFixed(3),
          liveClockState.flipHourOnes.toFixed(3),
          liveClockState.settle0700.toFixed(3),
          liveClockState.flashAmount.toFixed(3),
        ].join('|');

    if (ctx && texture && faceKey !== lastStateKeyRef.current) {
      if (renderStateOverride) {
        drawClockFaceFromState(ctx, renderStateOverride);
      } else {
        drawClockFace(ctx, liveClockState);
      }
      texture.needsUpdate = true;
      lastStateKeyRef.current = faceKey;
    }

    node.scale.setScalar(appear);
    node.rotation.y = reducedMotion
      ? 0.04
      : 0.06 + Math.sin(elapsed * 0.45) * 0.008;
    node.rotation.x = reducedMotion
      ? -0.03
      : -0.04 + Math.sin(elapsed * 0.22) * 0.004;
    node.rotation.z =
      ring * Math.sin(elapsed * 18) * (reducedMotion ? 0.003 : 0.009);
    node.position.y =
      -0.14 +
      (1 - liveClockState.displayProgress) * 0.08 +
      ring * Math.sin(elapsed * 14) * (reducedMotion ? 0.003 : 0.012);
    node.position.x =
      ring * Math.sin(elapsed * 16) * (reducedMotion ? 0.002 : 0.008);

    if (pulseRef.current) {
      pulseRef.current.intensity =
        0.07 + liveClockState.flashAmount * 0.26 + liveClockState.settle0700 * 0.05;
    }
  });

  const faceWidth = preparedModel.size.x * 0.805;
  const faceHeight = preparedModel.size.y * 0.432;
  const faceY = preparedModel.box.min.y + preparedModel.size.y * 0.56;
  const faceZ = preparedModel.box.max.z - preparedModel.size.z * 0.056;
  const maskWidth = faceWidth * FACE_MASK.width;
  const maskHeight = faceHeight * FACE_MASK.height;
  const maskRadius = maskHeight * FACE_MASK.radius;
  const maskShape = useMemo(
    () => createRoundedRectShape(maskWidth, maskHeight, maskRadius),
    [maskHeight, maskRadius, maskWidth],
  );
  const maskZ = faceZ + preparedModel.size.z * 0.0016;
  const faceGlassZ = faceZ + preparedModel.size.z * 0.0046;
  const lightY = preparedModel.box.min.y + preparedModel.size.y * 0.56;
  const lightZ = preparedModel.box.max.z + 0.72;

  return (
    <group ref={groupRef} position={[0, -0.14, 0]}>
      <primitive object={preparedModel.object} />

      <mesh position={[0, faceY, maskZ]} renderOrder={3.5}>
        <shapeGeometry args={[maskShape]} />
        <meshBasicMaterial
          colorWrite={false}
          depthWrite={false}
          depthTest={false}
          transparent
          opacity={0}
          stencilWrite
          stencilRef={1}
          stencilFunc={THREE.AlwaysStencilFunc}
          stencilFail={THREE.ReplaceStencilOp}
          stencilZFail={THREE.ReplaceStencilOp}
          stencilZPass={THREE.ReplaceStencilOp}
        />
      </mesh>

      <mesh position={[0, faceY, faceZ]} renderOrder={4}>
        <planeGeometry args={[faceWidth, faceHeight]} />
        <meshBasicMaterial
          ref={faceMaterialRef}
          toneMapped={false}
          side={THREE.DoubleSide}
          transparent
          depthWrite={false}
          depthTest={false}
          polygonOffset
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
          stencilWrite
          stencilRef={1}
          stencilFunc={THREE.EqualStencilFunc}
          stencilFail={THREE.KeepStencilOp}
          stencilZFail={THREE.KeepStencilOp}
          stencilZPass={THREE.KeepStencilOp}
        />
      </mesh>

      <mesh position={[0, faceY, faceGlassZ]} renderOrder={4.5}>
        <shapeGeometry args={[maskShape]} />
        <meshPhysicalMaterial
          color="#10110f"
          transparent
          opacity={0.042}
          roughness={0.08}
          metalness={0}
          transmission={0.16}
          ior={1.22}
          thickness={0.016}
          envMapIntensity={0.24}
          clearcoat={0.58}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
          depthTest={false}
          stencilWrite
          stencilRef={1}
          stencilFunc={THREE.EqualStencilFunc}
          stencilFail={THREE.KeepStencilOp}
          stencilZFail={THREE.KeepStencilOp}
          stencilZPass={THREE.KeepStencilOp}
        />
      </mesh>

      <pointLight
        ref={pulseRef}
        position={[0, lightY, lightZ]}
        color="#E04458"
        intensity={0.068}
        distance={3}
      />

      <spotLight
        position={[1.56, 1.42, 2.24]}
        angle={0.34}
        penumbra={0.88}
        intensity={0.18}
        distance={6.8}
        color="#c83a50"
      />

      <spotLight
        position={[-0.48, 1.88, 2.02]}
        angle={0.26}
        penumbra={0.9}
        intensity={0.09}
        distance={6.2}
        color="#d44a5e"
      />
    </group>
  );
}

useGLTF.preload(CLOCK_MODEL_URL);
