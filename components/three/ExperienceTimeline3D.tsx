import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ExperienceTimeline3DScene } from './ExperienceTimelineScene';
import { ExperienceItem } from '../../types';
import { use3DCapability } from '../../utils/use3DCapability';

interface ExperienceTimeline3DProps {
  items: ExperienceItem[];
  sectionRef: React.RefObject<HTMLElement | null>;
}

function TimelineCanvas({ items, progress }: { items: ExperienceItem[]; progress: number }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.5, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <ExperienceTimeline3DScene items={items} progress={progress} />
      </Suspense>
    </Canvas>
  );
}

function useScrollProgress(ref: React.RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = -rect.height + vh * 0.3;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);

  return progress;
}

export const ExperienceTimeline3D: React.FC<ExperienceTimeline3DProps> = ({ items, sectionRef }) => {
  const progress = useScrollProgress(sectionRef);
  const enabled = use3DCapability();

  if (!enabled) return null;

  return (
    <div className="h-[140px] w-full mb-4 rounded-2xl overflow-hidden border border-white/[0.06]">
      <TimelineCanvas items={items} progress={progress} />
    </div>
  );
};
