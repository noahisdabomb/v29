'use client';

import { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import SceneContainer from './SceneContainer';
import LaptopModel from './LaptopModel';
import { StudioEnvironment } from '@/lib/createEnvMap';
import type { EmailEntry } from '@/types';

// Start downloading the FBX model early (before component mounts)
useLoader.preload(FBXLoader, '/models/macbook_m3_14/source/Lowpoly.fbx');

// ---------------------------------------------------------------------------
// LaptopScene -- R3F Canvas wrapper for the 4-beat MacBook scroll animation
// Camera starts at beat1 bird's-eye; LaptopModel drives all scroll animation.
// ---------------------------------------------------------------------------

interface LaptopSceneProps {
  emails: EmailEntry[];
  reducedMotion?: boolean;
}

export default function LaptopScene({
  emails,
  reducedMotion = false,
}: LaptopSceneProps) {
  return (
    <SceneContainer
      camera={{ fov: 24.5, near: 0.01, far: 50, position: [0.18, 1.06, 5.2] }}
      toneMappingExposure={1.04}
    >
      <ambientLight color={0xf7f4ec} intensity={0.12} />
      <directionalLight position={[2.6, 5.8, 4.6]} intensity={1.02} color={0xfdf8ef} />
      <directionalLight position={[-4.2, 1.7, -3.1]} intensity={0.08} color={0xd7ddea} />
      <directionalLight position={[-1.4, 3.4, -4.6]} intensity={0.16} color={0xf4f7ff} />
      <directionalLight position={[0.7, 6.2, 0.5]} intensity={0.26} color={0xfffcf4} />
      <pointLight position={[2.24, 0.48, 1.86]} intensity={0.038} color={0xffd9c8} distance={5.3} />

      <StudioEnvironment />
      <Suspense fallback={null}>
        <LaptopModel emails={emails} reducedMotion={reducedMotion} />
      </Suspense>
    </SceneContainer>
  );
}
