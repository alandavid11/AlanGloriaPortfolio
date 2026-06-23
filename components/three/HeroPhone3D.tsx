import React, { lazy } from 'react';
import { Lazy3D } from './Lazy3D';
import { SceneCanvas } from './SceneCanvas';
import { HeroPhoneFallback } from './Fallbacks';
import { HeroPhoneScene } from './HeroPhone';

const HeroPhoneCanvas = () => (
  <SceneCanvas className="w-full h-full" camera={{ position: [0, 0, 3.2], fov: 42 }}>
    <HeroPhoneScene />
  </SceneCanvas>
);

const LazyHeroPhone = lazy(async () => ({ default: HeroPhoneCanvas }));

export const HeroPhone3D: React.FC = () => (
  <Lazy3D
    component={LazyHeroPhone}
    fallback={<HeroPhoneFallback />}
    className="w-full h-[260px] md:h-[280px]"
  />
);
