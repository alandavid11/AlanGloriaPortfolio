import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Section';
import { RouteLink } from '../RouteLink';
import { APPS, AppProduct, CaseStudyView } from '../../data/apps';

export type { CaseStudyView };

const AppCard: React.FC<{ app: AppProduct; onOpen: () => void }> = ({ app, onOpen }) => (
  <article
    id={app.anchorId}
    className="app-card scroll-mt-24 flex flex-col"
    style={{ '--app-rgb': app.rgb } as React.CSSProperties}
  >
    <RouteLink view={app.caseStudy} onNavigate={onOpen} className="app-stage" aria-label={`Open the ${app.name} case study`}>
      <img src={app.shots[0]} alt="" className="app-shot app-shot-left" loading="lazy" decoding="async" />
      <img src={app.shots[2]} alt="" className="app-shot app-shot-right" loading="lazy" decoding="async" />
      <img src={app.shots[1]} alt={`${app.name} screenshot`} className="app-shot app-shot-center" loading="lazy" decoding="async" />
    </RouteLink>
    <div className="p-5 md:p-6 flex flex-col flex-1">
      <div className="flex items-center gap-3">
        <img src={app.icon} alt="" className="w-10 h-10 rounded-[0.7rem] ring-1 ring-white/10" />
        <div className="min-w-0">
          <h3 className={`text-lg font-semibold text-zinc-50 leading-tight ${app.nameClass ?? ''}`}>{app.name}</h3>
          <p className="text-xs text-zinc-500">{app.status}</p>
        </div>
      </div>
      <p className="mt-4 text-[1.05rem] text-zinc-100 leading-snug">{app.tagline}</p>
      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{app.hook}</p>
      <p className="mt-3 font-mono text-[11px] text-zinc-500">{app.stack.join(' · ')}</p>
      <div className="mt-auto pt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <RouteLink view={app.caseStudy} onNavigate={onOpen} className="app-link-primary">
          Case study <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </RouteLink>
        <a className="app-link" href={app.appStoreUrl} target="_blank" rel="noreferrer">
          App Store <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <a className="app-link" href={app.website}>
          Website <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </article>
);

export const AppShowcase: React.FC<{ onOpen: (view: CaseStudyView) => void }> = ({ onOpen }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {APPS.map((app, i) => (
      <Reveal key={app.anchorId} delay={(i % 2) * 0.06} className="flex">
        <AppCard app={app} onOpen={() => onOpen(app.caseStudy)} />
      </Reveal>
    ))}
  </div>
);
