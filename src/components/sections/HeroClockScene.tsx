'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { drawClockFaceFromState } from '@/lib/drawClockFace';
import { resolveCardState, type ClockFaceRenderState } from '@/lib/clockFaceState';
import { CLOCK_CANVAS } from '@/lib/constants';
import type { FlipClockDigit } from '@/lib/flipClockGlyphs';

const CLOCK_MODEL_URL = '/models/flip-clock/retro-flip-clock-shell.glb';

// Flip animation timing
const FLIP_DURATION_MS = 340;
const FLIP_STAGGER_MS = 260;

// ---------------------------------------------------------------------------
// Live clock face state builder
// ---------------------------------------------------------------------------
interface HeroTimeDigits {
  hourTens: FlipClockDigit;
  hour: FlipClockDigit;
  minuteTens: FlipClockDigit;
  minuteOnes: FlipClockDigit;
}

function timeToDigits(hour24: number, minute: number): HeroTimeDigits {
  let h12 = hour24 % 12;
  if (h12 === 0) h12 = 12;
  return {
    hourTens: String(Math.floor(h12 / 10)) as FlipClockDigit,
    hour: String(h12 % 10) as FlipClockDigit,
    minuteTens: String(Math.floor(minute / 10)) as FlipClockDigit,
    minuteOnes: String(minute % 10) as FlipClockDigit,
  };
}

interface FlipAnimState {
  startTime: number;
  fromDigits: HeroTimeDigits;
  toDigits: HeroTimeDigits;
}

function buildHeroRenderState(
  digits: HeroTimeDigits,
  flip: FlipAnimState | null,
  now: number,
): ClockFaceRenderState {
  if (!flip) {
    // Settled — all cards show current digit
    return {
      faceOpacity: 1,
      periodLabel: 'AM',
      cards: [
        resolveCardState(1, 'hourTens', digits.hourTens, digits.hourTens),
        resolveCardState(1, 'hour', digits.hour, digits.hour),
        resolveCardState(1, 'minuteTens', digits.minuteTens, digits.minuteTens),
        resolveCardState(1, 'minuteOnes', digits.minuteOnes, digits.minuteOnes),
      ],
    };
  }

  const elapsed = now - flip.startTime;
  const { fromDigits, toDigits } = flip;

  // Cards flip in order: minuteOnes (0ms), minuteTens (1×), hourOnes (2×), hourTens (3×)
  const cardDefs = [
    { key: 'hourTens' as const, from: fromDigits.hourTens, to: toDigits.hourTens, delay: FLIP_STAGGER_MS * 3 },
    { key: 'hour' as const, from: fromDigits.hour, to: toDigits.hour, delay: FLIP_STAGGER_MS * 2 },
    { key: 'minuteTens' as const, from: fromDigits.minuteTens, to: toDigits.minuteTens, delay: FLIP_STAGGER_MS },
    { key: 'minuteOnes' as const, from: fromDigits.minuteOnes, to: toDigits.minuteOnes, delay: 0 },
  ];

  return {
    faceOpacity: 1,
    periodLabel: 'AM',
    cards: cardDefs.map(({ key, from, to, delay }) => {
      if (from === to) {
        // This card didn't change — show settled
        return resolveCardState(1, key, to, to);
      }
      const cardElapsed = elapsed - delay;
      if (cardElapsed <= 0) {
        // Not started yet — show old digit
        return resolveCardState(0, key, from, to);
      }
      const progress = Math.min(cardElapsed / FLIP_DURATION_MS, 1);
      return resolveCardState(progress, key, from, to);
    }),
  };
}

// ---------------------------------------------------------------------------
// HeroEnvironment — warm PMREM with magenta rim, cream key, plum backdrop
// ---------------------------------------------------------------------------
function HeroEnvironment(): null {
  const { gl, scene, invalidate } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();

    const envScene = new THREE.Scene();

    // Warm black backdrop (Analog Vivid #0E0C0A)
    const backdropGeo = new THREE.SphereGeometry(50, 32, 32);
    const backdropMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.055, 0.047, 0.039),
      side: THREE.BackSide,
    });
    envScene.add(new THREE.Mesh(backdropGeo, backdropMat));

    // Warm key light (dimmed to avoid hot reflections on plastic)
    const keyGeo = new THREE.PlaneGeometry(20, 20);
    const keyMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.35, 0.33, 0.30),
    });
    const key = new THREE.Mesh(keyGeo, keyMat);
    key.position.set(0, 15, 10);
    key.lookAt(0, 0, 0);
    envScene.add(key);

    // Magenta rim highlight
    const rimGeo = new THREE.PlaneGeometry(8, 8);
    const rimMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.88, 0.27, 0.35),
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.position.set(12, 3, -8);
    rim.lookAt(0, 0, 0);
    envScene.add(rim);

    // Cool fill
    const fillGeo = new THREE.PlaneGeometry(10, 10);
    const fillMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.4, 0.42, 0.48),
    });
    const fill = new THREE.Mesh(fillGeo, fillMat);
    fill.position.set(-15, 5, -5);
    fill.lookAt(0, 0, 0);
    envScene.add(fill);

    // Floor bounce (warm)
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.15, 0.1, 0.08),
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, -15, 0);
    floor.rotation.x = -Math.PI / 2;
    envScene.add(floor);

    const envTexture = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envTexture;
    invalidate();

    // Cleanup intermediate resources
    pmrem.dispose();
    [backdropGeo, keyGeo, rimGeo, fillGeo, floorGeo].forEach((g) =>
      g.dispose(),
    );
    [backdropMat, keyMat, rimMat, fillMat, floorMat].forEach((m) =>
      m.dispose(),
    );

    return () => {
      scene.environment = null;
      envTexture.dispose();
    };
  }, [gl, invalidate, scene]);

  return null;
}

// ---------------------------------------------------------------------------
// Material preparation
// ---------------------------------------------------------------------------
function prepareMaterial(material: THREE.Material) {
  const base = material.clone();
  if (
    base instanceof THREE.MeshStandardMaterial ||
    base instanceof THREE.MeshPhysicalMaterial
  ) {
    if (base.map) {
      base.map.colorSpace = THREE.SRGBColorSpace;
      base.map.needsUpdate = true;
    }
    if (base.emissiveMap) {
      base.emissiveMap.colorSpace = THREE.SRGBColorSpace;
      base.emissiveMap.needsUpdate = true;
    }
  }
  base.needsUpdate = true;
  return base;
}

// ---------------------------------------------------------------------------
// Model preparation
// ---------------------------------------------------------------------------
interface PreparedModel {
  object: THREE.Group;
  box: THREE.Box3;
  size: THREE.Vector3;
}

function prepareHeroClockModel(scene: THREE.Group): PreparedModel {
  const clone = scene.clone(true);

  // Comp-matched material overrides by name
  const matOverrides: Record<string, THREE.Material> = {
    ClockPlastic: new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xc83a50),
      roughness: 0.55,
      metalness: 0.05,
      envMapIntensity: 0.25,
    }),
    ClockBlack: new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x3d1225),
      roughness: 0.5,
      metalness: 0.05,
      envMapIntensity: 0.3,
    }),
    Gold: new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xdeb42e),
      roughness: 0.3,
      metalness: 0.7,
      envMapIntensity: 0.8,
    }),
    DeskClockGlass: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#060704'),
      transparent: true,
      opacity: 0.1,
      roughness: 0.05,
      metalness: 0,
      envMapIntensity: 0.25,
      clearcoat: 0.15,
      clearcoatRoughness: 0.12,
      depthWrite: false,
    }),
    ClockInnerShadowMat: new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x1a0a10),
      roughness: 0.8,
      metalness: 0.0,
      envMapIntensity: 0.1,
    }),
  };

  clone.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.castShadow = true;
    child.receiveShadow = true;
    child.frustumCulled = false;

    // Hide back panel box — we use a separate face plane instead
    if (child.name === 'ClockBackPanel') {
      child.visible = false;
      return;
    }

    // Replace materials — handle multi-material meshes (e.g. FlipClockShell has 4 primitives)
    if (Array.isArray(child.material)) {
      child.material = child.material.map((mat: THREE.Material) => {
        return matOverrides[mat.name] ?? prepareMaterial(mat);
      });
    } else {
      const name = child.material?.name ?? '';
      child.material = matOverrides[name] ?? prepareMaterial(child.material);
    }
  });

  clone.rotation.y = -Math.PI / 2;

  const box = new THREE.Box3().setFromObject(clone);
  const rawSize = box.getSize(new THREE.Vector3());
  const maxDimension = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
  const scale = 2.58 / maxDimension;
  clone.scale.setScalar(scale);

  const box2 = new THREE.Box3().setFromObject(clone);
  const center = box2.getCenter(new THREE.Vector3());
  const size = box2.getSize(new THREE.Vector3());
  clone.position.x -= center.x;
  clone.position.y -= center.y - size.y * 0.02;
  clone.position.z -= center.z;

  // Recompute box after centering
  const finalBox = new THREE.Box3().setFromObject(clone);
  const finalSize = finalBox.getSize(new THREE.Vector3());

  return { object: clone, box: finalBox, size: finalSize };
}

// ---------------------------------------------------------------------------
// HeroClockModel — live time display with flip animation
// ---------------------------------------------------------------------------
interface HeroClockModelProps {
  bkkHour: number;
  bkkMinute: number;
}

function HeroClockModel({ bkkHour, bkkMinute }: HeroClockModelProps) {
  const gltf = useGLTF(CLOCK_MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastKeyRef = useRef('');
  const flipRef = useRef<FlipAnimState | null>(null);
  const prevTimeRef = useRef({ hour: bkkHour, minute: bkkMinute });

  const prepared = useMemo(
    () => prepareHeroClockModel(gltf.scene),
    [gltf.scene],
  );

  // Face plane dimensions (mirroring production ClockModel)
  const faceWidth = prepared.size.x * 0.82;
  const faceHeight = prepared.size.y * 0.44;
  const faceY = prepared.box.min.y + prepared.size.y * 0.56;
  const faceZ = prepared.box.max.z - prepared.size.z * 0.038;
  const sizeZ = prepared.size.z;
  const bezelWidth = faceWidth * 1.04;
  const bezelHeight = faceHeight * 1.08;

  // Create canvas + texture once (stable across renders)
  const { ctx, tex } = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = CLOCK_CANVAS.width;
    canvas.height = CLOCK_CANVAS.height;
    const _ctx = canvas.getContext('2d')!;
    const _tex = new THREE.CanvasTexture(canvas);
    _tex.colorSpace = THREE.SRGBColorSpace;
    _tex.anisotropy = 4;

    // Draw initial face
    const digits = timeToDigits(bkkHour, bkkMinute);
    const renderState = buildHeroRenderState(digits, null, 0);
    drawClockFaceFromState(_ctx, renderState);
    _tex.needsUpdate = true;

    return { ctx: _ctx, tex: _tex };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Store ctx ref for useFrame access
  ctxRef.current = ctx;

  // Detect minute change → start flip animation
  useEffect(() => {
    const prev = prevTimeRef.current;
    if (prev.hour === bkkHour && prev.minute === bkkMinute) return;

    const fromDigits = timeToDigits(prev.hour, prev.minute);
    const toDigits = timeToDigits(bkkHour, bkkMinute);

    flipRef.current = {
      startTime: performance.now(),
      fromDigits,
      toDigits,
    };

    prevTimeRef.current = { hour: bkkHour, minute: bkkMinute };
  }, [bkkHour, bkkMinute]);

  // Animation loop: breathing + live face redraw
  useFrame((state) => {
    const node = groupRef.current;
    if (!node) return;

    const t = state.clock.elapsedTime;

    // Keep the hero scene repainting so post-mount env/material updates
    // and the subtle breathing motion don't get stuck on the first frame.
    state.invalidate();

    // Breathing rotation + gentle idle rock
    const breathe = Math.sin(t * 0.35);
    const drift = Math.sin(t * 0.18);
    const bob = Math.sin(t * 0.25);
    node.rotation.y = -0.18 + breathe * 0.035 + drift * 0.012;
    node.rotation.x = -0.03 + bob * 0.018;
    node.position.y = -0.14 + bob * 0.014;

    // Update clock face texture
    const fCtx = ctxRef.current;
    if (!fCtx) return;

    const now = performance.now();
    const digits = timeToDigits(bkkHour, bkkMinute);
    const flip = flipRef.current;

    // Check if flip animation is complete
    if (flip) {
      const totalDuration = FLIP_STAGGER_MS * 3 + FLIP_DURATION_MS;
      if (now - flip.startTime > totalDuration) {
        flipRef.current = null;
      }
    }

    const renderState = buildHeroRenderState(digits, flipRef.current, now);

    // Build dedup key from card states
    const faceKey = renderState.cards
      .map((c) => `${c.fromDigit}${c.toDigit}${c.rawProgress.toFixed(3)}`)
      .join('|');

    if (faceKey !== lastKeyRef.current) {
      drawClockFaceFromState(fCtx, renderState);
      tex.needsUpdate = true;
      lastKeyRef.current = faceKey;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.14, 0]}>
      <primitive object={prepared.object} />

      {/* Warm liner behind the display helps the face read as inset, not pasted on */}
      <mesh position={[0, faceY, faceZ - sizeZ * 0.013]} renderOrder={1.5}>
        <planeGeometry args={[bezelWidth, bezelHeight]} />
        <meshStandardMaterial
          color="#2a0812"
          roughness={0.9}
          metalness={0.02}
          envMapIntensity={0.08}
          toneMapped={false}
        />
      </mesh>

      {/* Dark cavity backing behind face — creates depth/recess */}
      <mesh position={[0, faceY, faceZ - sizeZ * 0.025]} renderOrder={2}>
        <planeGeometry args={[faceWidth, faceHeight]} />
        <meshBasicMaterial
          color="#13060a"
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      {/* Clock face texture — positioned at the glass opening */}
      <mesh position={[0, faceY, faceZ]} renderOrder={5}>
        <planeGeometry args={[faceWidth, faceHeight]} />
        <meshBasicMaterial map={tex} toneMapped={false} transparent />
      </mesh>

      <spotLight
        position={[1.8, 1.3, 2.4]}
        angle={0.46}
        penumbra={0.8}
        intensity={0.56}
        distance={7}
        color="#fff8e6"
      />
    </group>
  );
}

// ---------------------------------------------------------------------------
// AmbientParticles — lightweight instanced dust motes
// Single draw call via InstancedMesh.
// ---------------------------------------------------------------------------
const PARTICLE_COUNT = 20;

function AmbientParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dataRef = useRef<Float32Array | null>(null);
  const dummy = useRef(new THREE.Object3D());

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Initialize random positions, speeds, and phases
    // Per particle: [x, y, z, speedX, speedY, speedZ, phaseX, phaseY, phaseZ, scale]
    const data = new Float32Array(PARTICLE_COUNT * 10);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 10;
      data[idx + 0] = (Math.random() - 0.5) * 4;     // x spread
      data[idx + 1] = (Math.random() - 0.5) * 3;     // y spread
      data[idx + 2] = (Math.random() - 0.5) * 3;     // z spread
      data[idx + 3] = 0.1 + Math.random() * 0.2;     // speedX
      data[idx + 4] = 0.08 + Math.random() * 0.15;   // speedY
      data[idx + 5] = 0.06 + Math.random() * 0.12;   // speedZ
      data[idx + 6] = Math.random() * Math.PI * 2;   // phaseX
      data[idx + 7] = Math.random() * Math.PI * 2;   // phaseY
      data[idx + 8] = Math.random() * Math.PI * 2;   // phaseZ
      data[idx + 9] = 0.003 + Math.random() * 0.005; // scale
    }
    dataRef.current = data;

    // Set initial transforms
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 10;
      dummy.current.position.set(data[idx], data[idx + 1], data[idx + 2]);
      dummy.current.scale.setScalar(data[idx + 9]);
      dummy.current.updateMatrix();
      mesh.setMatrixAt(i, dummy.current.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    const mesh = meshRef.current;
    const data = dataRef.current;
    if (!mesh || !data) return;

    const t = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 10;
      const baseX = data[idx + 0];
      const baseY = data[idx + 1];
      const baseZ = data[idx + 2];
      const sx = data[idx + 3];
      const sy = data[idx + 4];
      const sz = data[idx + 5];
      const px = data[idx + 6];
      const py = data[idx + 7];
      const pz = data[idx + 8];
      const sc = data[idx + 9];

      dummy.current.position.set(
        baseX + Math.sin(t * sx + px) * 0.3,
        baseY + Math.sin(t * sy + py) * 0.25,
        baseZ + Math.sin(t * sz + pz) * 0.2,
      );
      dummy.current.scale.setScalar(sc);
      dummy.current.updateMatrix();
      mesh.setMatrixAt(i, dummy.current.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color="#f5f0e6"
        transparent
        opacity={0.2}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// ---------------------------------------------------------------------------
// HeroClockScene — self-contained R3F Canvas for the hero section
// ---------------------------------------------------------------------------
export interface HeroClockSceneProps {
  bkkHour: number;
  bkkMinute: number;
}

export default function HeroClockScene({ bkkHour, bkkMinute }: HeroClockSceneProps) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          powerPreference: 'low-power',
        }}
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ fov: 28, near: 0.01, far: 40, position: [1.15, 0.28, 5.0] }}
        onCreated={({ camera }) => camera.lookAt(0, -0.04, 0)}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Hero warm lighting — comp-matched */}
        <ambientLight intensity={0.5} color="#f4efe2" />
        <directionalLight position={[2.4, 3.1, 5.6]} intensity={1.2} color="#fff5f0" />
        <directionalLight position={[-2.8, 1.1, 2.8]} intensity={0.28} color="#d6c58f" />
        <directionalLight position={[0.4, 2.2, -3.8]} intensity={0.1} color="#ffffff" />
        <pointLight color={0xf0c0b0} intensity={0.22} distance={8} position={[1.5, 1.2, 3.5]} />
        <pointLight color={0xe04458} intensity={0.12} distance={6} position={[-2, 0.3, 2]} />

        <HeroEnvironment />

        <Suspense fallback={null}>
          <HeroClockModel bkkHour={bkkHour} bkkMinute={bkkMinute} />
        </Suspense>

        <AmbientParticles />
      </Canvas>
    </div>
  );
}

useGLTF.preload(CLOCK_MODEL_URL);
