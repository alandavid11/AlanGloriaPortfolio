import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export interface ScreenshotItem {
  src: string;
  alt: string;
  label: string;
}

interface ScreenshotGalleryProps {
  items: ScreenshotItem[];
  variant?: 'phone' | 'web' | 'desktop';
  className?: string;
}

const VARIANT_CONFIG = {
  phone: {
    frame: 'w-[148px] sm:w-[160px] shrink-0',
    image: 'w-full aspect-[9/19.5] object-cover object-top',
    scroll: 180,
    radius: 'rounded-[1rem]',
  },
  web: {
    frame: 'w-[260px] sm:w-[300px] shrink-0',
    image: 'w-full aspect-[16/10] object-cover object-top',
    scroll: 300,
    radius: 'rounded-xl',
  },
  desktop: {
    frame: 'w-[min(92vw,720px)] shrink-0',
    image: 'w-full aspect-[16/9] object-cover object-top',
    scroll: 560,
    radius: 'rounded-lg',
  },
} as const;

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({
  items,
  variant = 'phone',
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const cfg = VARIANT_CONFIG[variant];

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -cfg.scroll : cfg.scroll,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`screenshot-gallery relative group/gallery ${className}`} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-2">
        <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">Screenshots</p>
        {items.length > 1 && (
          <div className="flex gap-1 opacity-60 group-hover/gallery:opacity-100 transition-opacity">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scroll('left')}
              className="p-1 rounded-md bg-white/5 border border-white/10 text-zinc-400 hover:text-zinc-100"
            >
              <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scroll('right')}
              className="p-1 rounded-md bg-white/5 border border-white/10 text-zinc-400 hover:text-zinc-100"
            >
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        className="screenshot-track flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => (
          <motion.figure
            key={item.src}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.04 }}
            className={`snap-start ${cfg.frame}`}
          >
            <div
              className={`screenshot-frame overflow-hidden border border-white/10 bg-zinc-900 shadow-lg shadow-black/30 ${cfg.radius}`}
            >
              <img src={item.src} alt={item.alt} className={cfg.image} loading="lazy" />
            </div>
            <figcaption className="mt-1.5 text-[10px] font-mono text-zinc-600 tracking-wide">
              {item.label}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
};
