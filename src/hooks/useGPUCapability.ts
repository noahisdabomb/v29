'use client';

import { useState, useEffect } from 'react';

interface GPUCapability {
  /** True when the device can render 3D scenes (WebGL2, motion OK, wide viewport). */
  canRender3D: boolean;
  /** Human-readable reason when canRender3D is false. */
  reason?: string;
}

/** SSR-safe default — always assume 3D is unavailable on the server. */
const SSR_DEFAULT: GPUCapability = { canRender3D: false, reason: 'ssr' };

/**
 * Detects whether the current device can render 3D (WebGL2) scenes.
 *
 * Returns `canRender3D: false` when:
 * - Running during SSR / before hydration
 * - No WebGL2 support
 * - User prefers reduced motion
 * - Viewport width <= 768px
 */
export function useGPUCapability(): GPUCapability {
  const [capability, setCapability] = useState<GPUCapability>(SSR_DEFAULT);

  useEffect(() => {
    function probe(): GPUCapability {
      const params = new URLSearchParams(window.location.search);
      if (params.get('force3d') === '1') {
        return { canRender3D: true, reason: 'forced-3d' };
      }

      // Check viewport width
      if (window.innerWidth <= 768) {
        return { canRender3D: false, reason: 'narrow-viewport' };
      }

      // Check prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return { canRender3D: false, reason: 'prefers-reduced-motion' };
      }

      // Check WebGL2 support via offscreen canvas
      let gl: WebGL2RenderingContext | null = null;
      try {
        const canvas = document.createElement('canvas');
        gl = canvas.getContext('webgl2');
        if (!gl) {
          return { canRender3D: false, reason: 'no-webgl2' };
        }
        // Clean up the context
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
      } catch {
        return { canRender3D: false, reason: 'webgl2-probe-error' };
      }

      return { canRender3D: true };
    }

    setCapability(probe());

    // Re-evaluate on resize (viewport may cross 768px boundary)
    const handleResize = () => {
      setCapability(probe());
    };

    // Also listen for reduced-motion preference changes
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      setCapability(probe());
    };

    window.addEventListener('resize', handleResize);
    motionMql.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionMql.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return capability;
}
