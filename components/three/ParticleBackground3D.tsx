import React, { useEffect, useState } from 'react';
import { Lazy3D } from './Lazy3D';
import { SceneCanvas } from './SceneCanvas';
import { ParticleBackgroundFallback, ParticleBackgroundScene } from './ParticleBackground';

const ParticleCanvas = () => (
  <SceneCanvas className="fixed inset-0 -z-[2]" camera={{ position: [0, 0, 5], fov: 60 }}>
    <ParticleBackgroundScene />
  </SceneCanvas>
);

const LazyParticle = React.lazy(async () => ({ default: ParticleCanvas }));

/** Defers particle canvas until after first paint to keep initial bundle light. */
export const ParticleBackground3D: React.FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 800);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) {
    return <ParticleBackgroundFallback />;
  }

  return <Lazy3D component={LazyParticle} fallback={<ParticleBackgroundFallback />} />;
};
