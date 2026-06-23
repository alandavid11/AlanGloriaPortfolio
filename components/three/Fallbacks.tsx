import React from 'react';

export const HeroPhoneFallback: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <img
      src="/word-01-home.webp"
      alt="WoRD app preview"
      className="w-[140px] rounded-[1.25rem] border border-white/10 shadow-xl shadow-sky-950/30"
    />
  </div>
);

