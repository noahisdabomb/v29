'use client';

import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import SceneContainer from './SceneContainer';
import PhoneModel from './PhoneModel';
import { StudioEnvironment } from '@/lib/createEnvMap';
import { MODEL_ASSETS } from '@/lib/constants';

// Start downloading the GLB model early (before component mounts)
useGLTF.preload(MODEL_ASSETS.phone.glb);

// ---------------------------------------------------------------------------
// PhoneScene — composes the 3D iPhone scene with lighting + environment
// ---------------------------------------------------------------------------

interface PhoneSceneProps {
  reducedMotion?: boolean;
}

export default function PhoneScene({ reducedMotion = false }: PhoneSceneProps) {
  return (
    <SceneContainer
      camera={{ fov: 35, near: 0.01, far: 100, position: [0, 0, 0.8] }}
      toneMappingExposure={1.02}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 4]} intensity={1.5} color="#f3f1e7" />
      <directionalLight position={[-3, 1, 2]} intensity={0.4} color="#d7cfb1" />
      <directionalLight position={[0, 0, -3]} intensity={0.3} color="#ffffff" />
      <StudioEnvironment />
      <Suspense fallback={null}>
        <PhoneModel reducedMotion={reducedMotion} />
      </Suspense>
    </SceneContainer>
  );
}
