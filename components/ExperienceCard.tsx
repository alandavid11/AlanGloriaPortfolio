import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExperienceItem } from '../types';

interface ExperienceCardProps {
  item: ExperienceItem;
  index?: number;
}

const LOGO_CONTAINER: Record<string, string> = {
  ITJuana:
    'bg-teal-500/12 border-teal-400/25 shadow-[inset_0_1px_0_rgba(45,212,191,0.15),0_0_24px_-6px_rgba(45,212,191,0.35)] p-1',
  BorgWarner: 'bg-white/95 border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] px-2.5',
  IBM: 'bg-zinc-900/80 border-white/[0.06]',
  Freelance: 'bg-zinc-900/80 border-white/[0.06]',
};

const LOGO_SIZE: Record<string, string> = {
  ITJuana: 'w-14 h-14',
};

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ item, index = 0 }) => {
  const reduceMotion = useReducedMotion();
  const logoClass = LOGO_CONTAINER[item.company] ?? LOGO_CONTAINER.IBM;
  const logoSize = LOGO_SIZE[item.company] ?? 'w-11 h-11';

  return (
    <motion.article
      custom={index}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-40px' }}
      variants={reveal}
      className="card-interactive liquid-glass rounded-2xl p-4 md:p-5 group"
    >
      <div className="flex gap-3 md:gap-4">
        <div
          className={`${logoSize} shrink-0 rounded-xl p-2 border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${logoClass}`}
        >
          <img
            src={item.logo}
            alt=""
            className={`w-full h-full object-contain ${item.company === 'ITJuana' ? 'scale-110' : ''} ${item.company === 'BorgWarner' ? 'mix-blend-multiply' : ''}`}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <div>
              <h3 className="text-base font-semibold text-zinc-50">{item.company}</h3>
              <p className="text-sm text-sky-400/90 font-medium">{item.role}</p>
            </div>
            <span className="tag-pill shrink-0">{item.period}</span>
          </div>
          <p className="text-[11px] font-mono text-zinc-600 mt-1">{item.context}</p>
          <p className="text-sm text-zinc-400 leading-snug mt-2">{item.summary}</p>
        </div>
      </div>

      <ul className="mt-3 space-y-1.5 pl-1">
        {item.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-xs text-zinc-400 leading-relaxed">
            <span className="text-sky-500/80 shrink-0 mt-0.5">▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {item.metrics?.map((m) => (
          <span
            key={m.label}
            className="inline-flex items-baseline gap-1.5 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs transition-colors duration-200 group-hover:border-white/10"
          >
            <span className="font-mono font-semibold text-zinc-200">{m.value}</span>
            <span className="text-zinc-600">{m.label}</span>
          </span>
        ))}
        {item.tags.map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
};
