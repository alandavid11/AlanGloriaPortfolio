import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

interface SceneCanvasProps {
  children: React.ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov?: number };
  fallback?: React.ReactNode;
}

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  children,
  className = '',
  camera = { position: [0, 0, 5], fov: 45 },
  fallback,
}) => (
  <div className={`pointer-events-none ${className}`} aria-hidden>
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: camera.position, fov: camera.fov ?? 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  </div>
);
