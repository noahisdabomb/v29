'use client';

import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import SceneContainer from './SceneContainer';
import PhoneModel from './PhoneModel';
import LaptopModel from './LaptopModel';
import ClockModelPolish from './ClockModelPolish';
import { StudioEnvironment } from '@/lib/createEnvMap';
import { getClockSequenceState } from '@/lib/cycleScreenState';
import { createClockFaceRenderStateFromTime } from '@/lib/clockFaceState';
import type { CycleStoryState } from '@/lib/getCycleStoryState';
import type { EmailEntry } from '@/types';

function CameraRig({ storyState }: { storyState: CycleStoryState }) {
  const lookAtRef = useRef(new THREE.Vector3());
  const targetPosRef = useRef(new THREE.Vector3());
  const targetLookRef = useRef(new THREE.Vector3());

  useFrame(({ camera }) => {
    const targetPosition = storyState.cameraPosition;
    const targetLookAt = storyState.cameraTarget;
    const dampingByShot: Record<CycleStoryState['cameraShot'], number> = {
      overview: 0.11,
      phoneApproach: 0.072,
      phoneHold: 0.072,
      phoneToClock: 0.08,
      clockHold: 0.142,
      clockToLaptop: 0.118,
      laptopHold: 0.14,
      screenPush: 0.14,
      redFinish: 0.18,
      work: 0.12,
    };
    const damping = dampingByShot[storyState.cameraShot];

    targetPosRef.current.set(targetPosition.x, targetPosition.y, targetPosition.z);
    camera.position.lerp(targetPosRef.current, damping);
    targetLookRef.current.set(targetLookAt.x, targetLookAt.y, targetLookAt.z);
    lookAtRef.current.lerp(targetLookRef.current, damping);
    camera.lookAt(lookAtRef.current);
  });

  return null;
}

function WorldRig({
  storyState,
  emails,
  reducedMotion,
}: {
  storyState: CycleStoryState;
  emails: EmailEntry[];
  reducedMotion: boolean;
}) {
  const phoneGroupRef = useRef<THREE.Group>(null);
  const clockGroupRef = useRef<THREE.Group>(null);
  const laptopGroupRef = useRef<THREE.Group>(null);
  const alarmLightRef = useRef<THREE.PointLight>(null);
  const deliverableLightRef = useRef<THREE.PointLight>(null);
  const dawnLightRef = useRef<THREE.DirectionalLight>(null);
  const floorMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const backdropMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  // Pre-allocated color objects to avoid per-frame GC pressure
  const alarmColorA = useRef(new THREE.Color('#E04458')).current;
  const alarmColorB = useRef(new THREE.Color('#c83a50')).current;
  const dawnColorA = useRef(new THREE.Color('#f7d0b0')).current;
  const dawnColorB = useRef(new THREE.Color('#fff6e3')).current;
  const floorColorA = useRef(new THREE.Color('#16100e')).current;
  const floorColorB = useRef(new THREE.Color('#8f705e')).current;
  const floorEmissiveA = useRef(new THREE.Color('#0c0605')).current;
  const floorEmissiveB = useRef(new THREE.Color('#381717')).current;
  const backdropColorA = useRef(new THREE.Color('#0a080a')).current;
  const backdropColorB = useRef(new THREE.Color('#6d5647')).current;
  const clockSequence = useMemo(
    () => {
      const base = getClockSequenceState(storyState.clockProgress, reducedMotion);
      if (storyState.clockFlipProgress <= 0) {
        return {
          ...base,
          displayProgress: 1,
          faceIn: 1,
          hold0659: 1,
          flipHourTens: 0,
          flipMinuteOnes: 0,
          flipMinuteTens: 0,
          flipHourOnes: 0,
          settle0700: 0,
          ringAmount: 0,
          flashAmount: storyState.alarmPulse * 0.28,
        };
      }

      const flip = storyState.clockFlipProgress;
      return {
        ...base,
        displayProgress: 1,
        faceIn: 1,
        hold0659: 1,
        flipHourTens: flip <= 0.05 ? 0 : Math.min((flip - 0.05) / 0.35, 1),
        flipMinuteOnes: Math.min(flip / 0.45, 1),
        flipMinuteTens: flip <= 0.15 ? 0 : Math.min((flip - 0.15) / 0.35, 1),
        flipHourOnes: flip <= 0.35 ? 0 : Math.min((flip - 0.35) / 0.45, 1),
        settle0700: flip <= 0.82 ? 0 : Math.min((flip - 0.82) / 0.18, 1),
        ringAmount: 0.06 + storyState.alarmPulse * 0.42,
        flashAmount: 0.04 + storyState.alarmPulse * 0.72,
      };
    },
    [storyState.clockProgress, storyState.clockFlipProgress, storyState.clockFocus, storyState.alarmPulse, reducedMotion],
  );
  const clockRenderState = useMemo(
    () =>
      storyState.clockFlipProgress > 0
        ? undefined
        : createClockFaceRenderStateFromTime(storyState.clockDisplayTimeLabel),
    [storyState.clockDisplayTimeLabel, storyState.clockFlipProgress],
  );

  useFrame(() => {
    if (phoneGroupRef.current) {
      const settle = storyState.phoneSettleProgress;
      const focus = storyState.phoneFocus;
      const hold = storyState.phoneHoldProgress;
      const yieldOut = storyState.phoneYieldProgress;
      const clockBridge = storyState.phoneToClockProgress;
      const laptopBridge = storyState.clockToLaptopProgress;

      // Monotonic settle → resting position. No bell-curve repositioning.
      const posX = THREE.MathUtils.lerp(-0.83, -0.755, settle)
        - clockBridge * 0.03
        - laptopBridge * 0.04;
      const posY = THREE.MathUtils.lerp(-0.36, -0.26, settle)
        - clockBridge * 0.008
        - laptopBridge * 0.012;
      const posZ = THREE.MathUtils.lerp(0.334, 0.355, settle)
        - clockBridge * 0.03
        - laptopBridge * 0.05;

      const rotX = THREE.MathUtils.lerp(-1.556, -1.565, settle) + clockBridge * 0.002;
      const rotY = THREE.MathUtils.lerp(0.05, 0.062, settle) - laptopBridge * 0.008;
      const rotZ = THREE.MathUtils.lerp(0.104, 0.126, settle) - laptopBridge * 0.009;

      // Settle → full size, hold → subtle emphasis bump, yield → slight shrink
      const scale = THREE.MathUtils.lerp(3.74, 3.88, settle)
        - yieldOut * 0.014
        - laptopBridge * 0.012;

      phoneGroupRef.current.position.set(posX, posY, posZ);
      phoneGroupRef.current.rotation.set(rotX, rotY, rotZ);
      phoneGroupRef.current.scale.setScalar(scale);
      phoneGroupRef.current.visible =
        storyState.phoneFocus > 0.01 ||
        storyState.phoneToClockProgress < 0.99 ||
        storyState.cameraShot === 'overview' ||
        storyState.cameraShot === 'phoneApproach' ||
        storyState.cameraShot === 'phoneHold' ||
        storyState.cameraShot === 'phoneToClock' ||
        storyState.cameraShot === 'clockHold' ||
        storyState.cameraShot === 'clockToLaptop';
    }

    if (clockGroupRef.current) {
      const focus = storyState.clockFocus;
      const phoneHold = storyState.phoneHoldProgress;
      const clockRetreat = storyState.clockToLaptopProgress;
      clockGroupRef.current.position.set(
        0.05 + phoneHold * 0.05 - clockRetreat * 0.24,
        -0.02 + focus * 0.048 + phoneHold * 0.002 - clockRetreat * 0.06,
        -0.3 - phoneHold * 0.08 - clockRetreat * 0.30,
      );
      clockGroupRef.current.rotation.set(
        -0.03 + focus * 0.016,
        0.02 + phoneHold * 0.02,
        0,
      );
      const clockScale = (0.49 + focus * 0.018 - phoneHold * 0.006) * (1 - clockRetreat * 0.15);
      clockGroupRef.current.scale.setScalar(clockScale);
      clockGroupRef.current.visible = true;
    }

    if (laptopGroupRef.current) {
      const focus = storyState.laptopFocus;
      const approach = storyState.laptopApproachProgress;
      const screenPush = storyState.screenPushProgress;
      const emailReveal = storyState.redTakeoverProgress;
      const restBias = 1 - focus;
      laptopGroupRef.current.position.set(
        2.1 - focus * 0.34 - restBias * 0.24 - screenPush * 0.02 + emailReveal * 0.02,
        -0.62 + focus * 0.006 + restBias * 0.006 + approach * 0.002 + emailReveal * 0.001,
        -1.6 + focus * 0.22 + restBias * 0.22 + screenPush * 0.008 + emailReveal * 0.04,
      );
      laptopGroupRef.current.rotation.set(
        0.012 - focus * 0.0008 - screenPush * 0.0006 + emailReveal * 0.0004,
        0.136 - focus * 0.018 - screenPush * 0.0015 + emailReveal * 0.004,
        0,
      );
      laptopGroupRef.current.scale.setScalar(
        1.01 + focus * 0.004 + screenPush * 0.0005 - emailReveal * 0.003,
      );
      laptopGroupRef.current.visible = true;
    }

    if (alarmLightRef.current) {
      alarmLightRef.current.intensity =
        0.06 + storyState.alarmPulse * 1.5 + storyState.clockFocus * 0.36 - storyState.phoneFocus * 0.02;
      alarmLightRef.current.color.lerpColors(alarmColorA, alarmColorB, storyState.dawnAmount);
    }

    if (deliverableLightRef.current) {
      deliverableLightRef.current.intensity =
        0.08 +
        storyState.deliverablePulse * 1.2 +
        storyState.laptopFocus * 0.16 +
        storyState.redTakeoverProgress * 0.1 -
        storyState.phoneFocus * 0.01;
    }

    if (dawnLightRef.current) {
      dawnLightRef.current.intensity = 0.38 + storyState.dawnAmount * 0.72;
      dawnLightRef.current.color.lerpColors(dawnColorA, dawnColorB, storyState.dawnAmount);
      dawnLightRef.current.position.set(
        1.8 - storyState.dawnAmount * 0.5,
        3.6 + storyState.dawnAmount * 1.6,
        4.8,
      );
    }

    if (floorMaterialRef.current) {
      floorMaterialRef.current.color.lerpColors(
        floorColorA, floorColorB,
        Math.max(storyState.dawnAmount - storyState.phoneFocus * 0.22, 0) * 0.62,
      );
      floorMaterialRef.current.emissive.lerpColors(
        floorEmissiveA, floorEmissiveB,
        storyState.deliverablePulse * 0.4,
      );
    }

    if (backdropMaterialRef.current) {
      backdropMaterialRef.current.color.lerpColors(
        backdropColorA, backdropColorB,
        Math.max(storyState.dawnAmount - storyState.phoneFocus * 0.24, 0) * 0.58,
      );
      backdropMaterialRef.current.opacity = 0.34 + storyState.sceneReveal * 0.18;
    }
  });

  return (
    <>
      <ambientLight
        intensity={0.08 + storyState.dawnAmount * 0.08 + storyState.clockFocus * 0.06 - storyState.phoneFocus * 0.02}
        color="#efe4d7"
      />
      <directionalLight position={[-3.4, 2.2, -1.2]} intensity={0.08} color="#b78568" />
      <directionalLight
        ref={dawnLightRef}
        position={[1.8, 3.6, 4.8]}
        intensity={0.28}
        color="#ffe9c7"
      />
      <pointLight
        ref={alarmLightRef}
        position={[0.06, 0.52, 0.8]}
        color="#E04458"
        intensity={0.08}
        distance={6.4}
      />
      <pointLight
        position={[0.12, 0.32, 0.6]}
        color="#E04458"
        intensity={storyState.clockFocus * 0.12 + storyState.alarmPulse * 0.08}
        distance={4.2}
      />
      <pointLight
        ref={deliverableLightRef}
        position={[1.8, 0.68, 0.8]}
        color="#ff8ea0"
        intensity={0.08}
        distance={6.4}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.96, -0.3]}>
        <planeGeometry args={[18, 13]} />
        <meshStandardMaterial
          ref={floorMaterialRef}
          color="#16100e"
          roughness={0.92}
          metalness={0.02}
          emissive="#0c0605"
          emissiveIntensity={0.16}
        />
      </mesh>

      <mesh position={[0, 2.05, -7.8]}>
        <planeGeometry args={[22, 12]} />
        <meshBasicMaterial
          ref={backdropMaterialRef}
          color="#0a080a"
          transparent
          opacity={0.42}
        />
      </mesh>

      <mesh position={[0, 1.2, -5.4]}>
        <circleGeometry args={[4.8, 64]} />
        <meshBasicMaterial
          color="#d89c71"
          transparent
          opacity={0.03 + storyState.dawnAmount * 0.08}
        />
      </mesh>

      <mesh position={[0, 1.3, -5.8]}>
        <planeGeometry args={[18, 9]} />
        <meshBasicMaterial
          color="#09080a"
          transparent
          opacity={0.26 - storyState.dawnAmount * 0.08}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, -0.2]}>
        <ringGeometry args={[2.9, 5.2, 64]} />
        <meshBasicMaterial
          color="#e04458"
          transparent
          opacity={0.035 + storyState.deliverablePulse * 0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      <group ref={phoneGroupRef}>
        <PhoneModel
          reducedMotion={reducedMotion}
          progressOverride={storyState.phoneProgress}
          screenProgressOverride={storyState.phoneScreenProgress}
          disableInternalMotion
        />
      </group>

      <group ref={clockGroupRef}>
        <ClockModelPolish
          reducedMotion={reducedMotion}
          sequenceOverride={clockSequence}
          renderStateOverride={clockRenderState}
        />
      </group>

      <group ref={laptopGroupRef}>
        <LaptopModel
          emails={emails}
          reducedMotion={reducedMotion}
          controlCamera={false}
          sequenceProgressOverride={storyState.laptopProgress}
        />
      </group>
    </>
  );
}

export default function OvernightScene({
  storyState,
  emails,
  reducedMotion = false,
}: {
  storyState: CycleStoryState;
  emails: EmailEntry[];
  reducedMotion?: boolean;
}) {
  return (
    <SceneContainer
      camera={{ fov: 30, near: 0.1, far: 60, position: [0, 1.48, 8.6] }}
      toneMappingExposure={0.9}
    >
      <StudioEnvironment />
      <CameraRig storyState={storyState} />
      <Suspense fallback={null}>
        <WorldRig
          storyState={storyState}
          emails={emails}
          reducedMotion={reducedMotion}
        />
      </Suspense>
    </SceneContainer>
  );
}
