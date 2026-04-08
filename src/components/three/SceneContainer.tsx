'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface SceneContainerProps {
  /** Camera config passed to the R3F Canvas */
  camera: {
    fov: number;
    near: number;
    far: number;
    position: [number, number, number];
  };
  children: ReactNode;
  /** Override tone mapping exposure (default: 1.4) */
  toneMappingExposure?: number;
}

// ---------------------------------------------------------------------------
// SceneContainer — reusable R3F Canvas wrapper
// Uses a ResizeObserver to measure the parent and pass explicit pixel
// dimensions to the Canvas, avoiding R3F v9 auto-sizing issues.
// ---------------------------------------------------------------------------

export default function SceneContainer({
  camera,
  children,
  toneMappingExposure = 1.4,
}: SceneContainerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setSize((prev) => {
          if (prev && Math.abs(prev.width - width) < 1 && Math.abs(prev.height - height) < 1) return prev;
          return { width, height };
        });
      }
    };

    // Measure immediately
    measure();

    // Watch for resizes
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'absolute', inset: 0 }}
    >
      {size && (
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure,
          }}
          dpr={[1, 2]}
          camera={camera}
          style={{ width: size.width, height: size.height }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
