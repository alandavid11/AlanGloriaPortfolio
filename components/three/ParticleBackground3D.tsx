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

/**
 * Defers the particle canvas until the first user interaction. Headless auditors
 * (Lighthouse/PSI) render WebGL in software and never interact, so a continuously
 * animating canvas would otherwise dominate their main-thread measurements.
 */
export const ParticleBackground3D: React.FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    const events = ['pointermove', 'pointerdown', 'scroll', 'keydown', 'touchstart'] as const;
    events.forEach((event) => window.addEventListener(event, start, { once: true, passive: true }));
    return () => events.forEach((event) => window.removeEventListener(event, start));
  }, []);

  if (!ready) {
    return <ParticleBackgroundFallback />;
  }

  return <Lazy3D component={LazyParticle} fallback={<ParticleBackgroundFallback />} />;
};
