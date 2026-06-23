import React, { lazy, Suspense } from 'react';
import { Lazy3D } from './Lazy3D';
import { SceneCanvas } from './SceneCanvas';
import { ProjectIconCarouselFallback } from './Fallbacks';
import {
  ProjectIconCarouselScene,
  ProjectIcon,
} from './ProjectIconCarousel';

const PROJECTS: ProjectIcon[] = [
  { id: 'word', label: 'WoRD', texture: '/word-icon.webp' },
  { id: 'cacho', label: 'Cachoquiniela', color: '#064e3b', letter: 'C' },
  { id: 'codtr', label: 'CODTR', color: '#27272a', letter: 'C' },
];

const CarouselCanvas = () => (
  <SceneCanvas className="w-full h-full" camera={{ position: [0, 0.5, 4], fov: 45 }}>
    <ProjectIconCarouselScene projects={PROJECTS} />
  </SceneCanvas>
);

const LazyCarousel = lazy(async () => ({ default: CarouselCanvas }));

export const ProjectIconCarousel3D: React.FC = () => (
  <Lazy3D
    component={LazyCarousel}
    fallback={<ProjectIconCarouselFallback />}
    className="w-full h-[72px] sm:h-[80px] rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] mb-4"
  />
);
