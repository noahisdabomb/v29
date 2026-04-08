'use client';

import { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

// ---------------------------------------------------------------------------
// createEnvMap — builds a studio HDRI-like environment texture
// Ported from the codex HTML createEnvMap(renderer) function.
// ---------------------------------------------------------------------------

/**
 * Build a PMREM environment texture that mimics a soft studio setup.
 *
 * The scene contains:
 *  - A large BackSide sphere as neutral backdrop
 *  - Two bright plane "lights" for key and fill reflections
 *
 * @returns The generated PMREM texture (caller must dispose when done)
 */
export function createEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();

  // Backdrop sphere (BackSide)
  const backdropGeometry = new THREE.SphereGeometry(50, 32, 32);
  const backdropMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0.35, 0.35, 0.38),
    side: THREE.BackSide,
  });
  envScene.add(new THREE.Mesh(backdropGeometry, backdropMaterial));

  // Key light — bright white plane
  const light1Geometry = new THREE.PlaneGeometry(20, 20);
  const light1Material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(1, 1, 1),
  });
  const light1 = new THREE.Mesh(light1Geometry, light1Material);
  light1.position.set(0, 15, 10);
  light1.lookAt(0, 0, 0);
  envScene.add(light1);

  // Fill light — softer gray plane
  const light2Geometry = new THREE.PlaneGeometry(10, 10);
  const light2Material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0.6, 0.6, 0.65),
  });
  const light2 = new THREE.Mesh(light2Geometry, light2Material);
  light2.position.set(-15, 5, -5);
  light2.lookAt(0, 0, 0);
  envScene.add(light2);

  const envTexture = pmremGenerator.fromScene(envScene, 0.04).texture;

  // Cleanup intermediate resources
  pmremGenerator.dispose();
  backdropGeometry.dispose();
  backdropMaterial.dispose();
  light1Geometry.dispose();
  light1Material.dispose();
  light2Geometry.dispose();
  light2Material.dispose();

  return envTexture;
}

// ---------------------------------------------------------------------------
// StudioEnvironment — R3F component that generates and sets scene.environment
// ---------------------------------------------------------------------------

/**
 * Drop this component inside an R3F Canvas to apply the studio environment
 * map to the scene. It generates the PMREM texture on mount and cleans up
 * on unmount. Shared between phone and laptop scenes.
 */
export function StudioEnvironment(): null {
  const { gl, scene } = useThree();

  useEffect(() => {
    const envTexture = createEnvMap(gl);
    scene.environment = envTexture;

    return () => {
      scene.environment = null;
      envTexture.dispose();
    };
  }, [gl, scene]);

  return null;
}
