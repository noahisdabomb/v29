'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import * as THREE from 'three';

const CLIPPY_MODEL_URL = '/models/clippy-user-zip/source/Clippy.glb';

// Module-level cache: one PMREM envMap per WebGL renderer
const envMapCache = new WeakMap<THREE.WebGLRenderer, THREE.Texture>();

type MaterialTuning = {
  color?: string;
  metalness?: number;
  roughness?: number;
  envMapIntensity?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
};

function getMaterialTuning(materialName: string): MaterialTuning | null {
  if (materialName.includes('clippy')) {
    return {
      color: '#88727c',
      metalness: 0.9,
      roughness: 0.24,
      envMapIntensity: 1.24,
      clearcoat: 0.52,
      clearcoatRoughness: 0.18,
    };
  }

  if (materialName.includes('eyes')) {
    return {
      color: '#d7b8ad',
      metalness: 0.1,
      roughness: 0.3,
      envMapIntensity: 0.84,
      clearcoat: 0.22,
      clearcoatRoughness: 0.2,
    };
  }

  if (materialName.includes('iris')) {
    return {
      color: '#504743',
      metalness: 0.12,
      roughness: 0.46,
      envMapIntensity: 0.46,
      clearcoat: 0.06,
      clearcoatRoughness: 0.3,
    };
  }

  if (materialName.includes('brows')) {
    return {
      color: '#373130',
      metalness: 0.28,
      roughness: 0.32,
      envMapIntensity: 0.78,
      clearcoat: 0.14,
      clearcoatRoughness: 0.22,
    };
  }

  return null;
}

function isPaperPart(child: THREE.Mesh) {
  const name = child.name.toLowerCase();
  const materials = Array.isArray(child.material) ? child.material : [child.material];

  return (
    name.includes('paper') ||
    materials.some((material) => material.name.toLowerCase().includes('paper'))
  );
}

function prepareMaterial(material: THREE.Material, envMap: THREE.Texture) {
  const base = material.clone();

  if (base instanceof THREE.MeshStandardMaterial || base instanceof THREE.MeshPhysicalMaterial) {
    const tuning = getMaterialTuning(base.name.toLowerCase());

    base.envMap = envMap;
    base.envMapIntensity = tuning?.envMapIntensity ?? Math.max(base.envMapIntensity ?? 0, 1.65);
    base.needsUpdate = true;

    if (tuning) {
      if (tuning.color) {
        base.color = new THREE.Color(tuning.color);
      }

      if (typeof tuning.metalness === 'number') {
        base.metalness = tuning.metalness;
      }

      if (typeof tuning.roughness === 'number') {
        base.roughness = tuning.roughness;
      }

      if (base instanceof THREE.MeshPhysicalMaterial) {
        if (typeof tuning.clearcoat === 'number') {
          base.clearcoat = tuning.clearcoat;
        }

        if (typeof tuning.clearcoatRoughness === 'number') {
          base.clearcoatRoughness = tuning.clearcoatRoughness;
        }
      }
    } else if (!base.map) {
      base.color = new THREE.Color('#d5dbe2');
      base.metalness = Math.max(base.metalness ?? 0, 0.8);
      base.roughness = Math.min(base.roughness ?? 1, 0.3);
    }

    return base;
  }

  const fallback = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#d5dbe2'),
    metalness: 0.88,
    roughness: 0.24,
    clearcoat: 0.85,
    clearcoatRoughness: 0.14,
    envMap,
    envMapIntensity: 1.8,
  });

  return fallback;
}

function normalizeObject(object: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 1.26 / maxDim;

  object.scale.setScalar(scale);

  const scaledBox = new THREE.Box3().setFromObject(object);
  const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
  const scaledSize = scaledBox.getSize(new THREE.Vector3());

  object.position.x -= scaledCenter.x;
  object.position.y -= scaledCenter.y;
  object.position.z -= scaledCenter.z;
  object.position.y -= scaledSize.y * 0.04;
  object.position.x += scaledSize.x * 0.12;

  return scaledSize;
}

function ClippyInner({
  talking,
  waving,
  variant,
}: {
  talking: boolean;
  waving: boolean;
  variant: 'launcher' | 'panel';
}) {
  const { scene } = useGLTF(CLIPPY_MODEL_URL);
  const rootRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { camera, gl } = useThree();

  const envMap = useMemo(() => {
    const cached = envMapCache.get(gl);
    if (cached) return cached;
    const pmrem = new THREE.PMREMGenerator(gl);
    const environment = new RoomEnvironment();
    const texture = pmrem.fromScene(environment, 0.04).texture;
    pmrem.dispose();
    envMapCache.set(gl, texture);
    return texture;
  }, [gl]);

  const model = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      if (isPaperPart(child)) {
        child.visible = false;
        return;
      }

      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => prepareMaterial(material, envMap));
      } else {
        child.material = prepareMaterial(child.material, envMap);
      }
    });

    return clone;
  }, [envMap, scene]);

  useEffect(() => {
    const size = normalizeObject(model);

    if (variant === 'panel') {
      // The expanded assistant should feel more like a portrait than a launcher icon.
      model.rotation.set(0.016, 0.18, 0.012);
      camera.position.set(0.28, 0.78, 4.32);
      camera.lookAt(0.04, size.y * 0.23, 0.04);
    } else {
      // Hold Clippy in a clearer three-quarter pose so he reads at concierge size.
      model.rotation.set(0.08, 0.24, 0.02);
      camera.position.set(0.42, 0.38, 4.36);
      camera.lookAt(0.14, size.y * 0.24, 0.06);
    }

    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();

  }, [camera, envMap, model, variant]);

  useFrame((state) => {
    if (!rootRef.current) return;

    const t = state.clock.elapsedTime;
    const root = rootRef.current;
    const baseY = variant === 'panel' ? 0.31 : 0.5;
    const baseX = variant === 'panel' ? 0.05 : 0.16;
    const hoverAmount = hovered ? 0.025 : 0;

    root.position.y = baseY + Math.sin(t * 1.05) * (variant === 'panel' ? 0.009 : 0.02);
    root.position.x = baseX + Math.sin(t * 0.45) * (variant === 'panel' ? 0.005 : 0.01);

    const targetRotY =
      (variant === 'panel' ? 0.045 : 0.06) +
      Math.sin(t * (variant === 'panel' ? 0.52 : 0.8)) * (variant === 'panel' ? 0.008 : 0.025) +
      hoverAmount;
    const targetRotX = (variant === 'panel' ? 0.016 : 0.04) + (talking ? (variant === 'panel' ? 0.026 : 0.06) : 0);
    const targetRotZ =
      (variant === 'panel' ? 0.002 : 0.01) +
      (waving ? Math.sin(t * 5.2) * (variant === 'panel' ? 0.032 : 0.08) : Math.sin(t * 0.9) * 0.006);

    root.rotation.y += (targetRotY - root.rotation.y) * 0.08;
    root.rotation.x += (targetRotX - root.rotation.x) * 0.08;
    root.rotation.z += (targetRotZ - root.rotation.z) * 0.08;

    const baseScale = variant === 'panel' ? 0.76 : 0.92;
    const targetScale = hovered ? baseScale * 1.04 : baseScale;
    const currentScale = root.scale.x;
    root.scale.setScalar(currentScale + (targetScale - currentScale) * 0.08);
  });

  return (
    <group
      ref={rootRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(CLIPPY_MODEL_URL);

export default function ClippyScene({
  talking = false,
  waving = false,
  className,
  variant = 'launcher',
}: {
  talking?: boolean;
  waving?: boolean;
  className?: string;
  variant?: 'launcher' | 'panel';
}) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1.25, 2]}
        shadows="percentage"
        camera={{
          position: variant === 'panel' ? [0.26, 0.68, 4.02] : [0.5, 0.18, 4.1],
          fov: variant === 'panel' ? 24 : 24,
          near: 0.1,
          far: 100,
        }}
        gl={{
          alpha: true,
          antialias: true,
          premultipliedAlpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMappingExposure = 1.02;
        }}
      >
        <ambientLight intensity={variant === 'panel' ? 0.22 : 0.22} />
        <hemisphereLight
          intensity={variant === 'panel' ? 0.82 : 0.8}
          color="#fff4eb"
          groundColor="#1a1d24"
        />
        <directionalLight
          position={variant === 'panel' ? [2.1, 4.4, 3.8] : [2.6, 4.1, 3.4]}
          intensity={variant === 'panel' ? 1.55 : 1.7}
          color="#fff1e5"
          castShadow
        />
        <directionalLight
          position={variant === 'panel' ? [-2.4, 2.4, 3.1] : [-2.4, 2.2, 2.6]}
          intensity={variant === 'panel' ? 0.48 : 0.58}
          color="#d9e2ff"
        />
        <pointLight
          position={variant === 'panel' ? [0.85, 1.4, 2.1] : [0.8, 1.3, 1.4]}
          intensity={variant === 'panel' ? 0.38 : 0.45}
          color="#fff0da"
        />
        <pointLight
          position={variant === 'panel' ? [-1.1, 0.5, 2.2] : [-1.1, 0.3, 1.8]}
          intensity={variant === 'panel' ? 0.16 : 0.2}
          color="#c1d2ff"
        />
        <ClippyInner talking={talking} waving={waving} variant={variant} />
      </Canvas>
    </div>
  );
}
