import React from 'react';
import { ExperienceItem } from '../types';
import { Reveal } from './home/Section';

const LOGO_SURFACE: Record<string, string> = {
  ITJuana: 'bg-teal-500/10 ring-teal-400/25',
  BorgWarner: 'bg-white ring-white/30 p-2',
};

export const ExperienceCard: React.FC<{ item: ExperienceItem; index?: number }> = ({ item, index = 0 }) => (
  <Reveal delay={index * 0.04}>
    <article className="grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] gap-x-10 gap-y-4 py-9 border-t border-white/[0.08]">
      <div className="flex md:flex-col items-center md:items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl ring-1 flex items-center justify-center overflow-hidden p-1.5 ${
            LOGO_SURFACE[item.company] ?? 'bg-zinc-900 ring-white/10'
          }`}
        >
          <img
            src={item.logo}
            alt=""
            className={`w-full h-full object-contain ${item.company === 'BorgWarner' ? 'mix-blend-multiply' : ''}`}
            loading="lazy"
            decoding="async"
          />
        </div>
        <p className="font-mono text-xs text-zinc-500">{item.period.replace(' — ', ' to ')}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-zinc-50 tracking-tight">
          {item.role} <span className="text-zinc-500 font-normal">at</span> {item.company}
        </h3>
        <p className="text-sm text-zinc-500 mt-1">{item.context}</p>
        <p className="text-base text-zinc-300 leading-relaxed mt-3 max-w-[70ch]">{item.summary}</p>

        {item.metrics && item.metrics.length > 0 && (
          <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
            {item.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <dt className="order-2 text-xs text-zinc-500 mt-0.5">{m.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-zinc-50 tabular-nums">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-5 space-y-2 max-w-[78ch]">
          {item.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
              <span className="mt-[0.6em] h-px w-3 shrink-0 bg-zinc-600" aria-hidden />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  </Reveal>
);
