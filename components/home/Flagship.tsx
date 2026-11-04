import React from 'react';
import { ArrowRight, ArrowUpRight, Smartphone, Tablet } from 'lucide-react';
import { Reveal } from './Section';
import { ClientLogos } from './ClientLogos';
import {
  ECOSYSTEM_TILES,
  ENGINEERING_PILLARS,
  EcosystemTile,
  LIVE_STATS,
  POSME_APP_STORE_URL,
  POSME_CAJA_APP_STORE_URL,
  WALLETME_URL,
} from '../../data/walletme';

const LAYOUT: Record<EcosystemTile['layout'], string> = {
  hero: 'md:col-span-2 md:row-span-2 h-72 md:h-auto',
  tall: 'md:row-span-2 h-96 md:h-auto',
  square: 'h-56 md:h-auto',
  wide: 'md:col-span-2 h-56 md:h-auto',
};

const TileVisual: React.FC<{ tile: EcosystemTile }> = ({ tile }) => {
  if (tile.kind === 'passes') {
    return (
      <div className="absolute inset-0 flex items-start justify-center pt-5">
        <img src="/walletme-pass-oro.webp" alt="" className="eco-pass -rotate-6 translate-x-6" loading="lazy" />
        <img
          src="/walletme-pass-mopa.webp"
          alt="Loyalty pass with coffee-cup stamps in Apple Wallet"
          className="eco-pass rotate-3 -translate-x-6"
          loading="lazy"
        />
      </div>
    );
  }
  if (tile.fit === 'phone') {
    return (
      <div className="absolute inset-0 flex justify-center pt-6">
        <img src={tile.src} alt={tile.alt} className="eco-phone" loading="lazy" />
      </div>
    );
  }
  return <img src={tile.src} alt={tile.alt} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />;
};

export const Flagship: React.FC<{ onOpenCaseStudy: () => void }> = ({ onOpenCaseStudy }) => (
  <article id="project-walletme" className="flagship scroll-mt-24 p-5 sm:p-8 md:p-12">
    <Reveal>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex -space-x-2.5 shrink-0">
          <img src="/posme-icon.webp" alt="POSMe" className="w-11 h-11 rounded-[0.8rem] ring-1 ring-white/10" />
          <img src="/walletme-icon.webp" alt="WalletMe" className="w-11 h-11 rounded-[0.8rem] ring-1 ring-white/10 bg-[#0B0B0F]" />
        </div>
        <p className="eyebrow text-violet-300/90">Flagship · Solo founder · Live in production</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-8 lg:gap-14 items-end">
        <div>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.045em] leading-[0.95] text-zinc-50">
            WalletMe <span className="text-violet-300">+</span> POSMe
          </h3>
          <p className="mt-5 text-lg md:text-xl text-zinc-300 leading-relaxed max-w-[42ch]">
            A point of sale and a Wallet loyalty network for Mexican businesses. I designed, built and run all of
            it, and it is live in real stores in Saltillo.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <button type="button" className="btn-flagship" onClick={onOpenCaseStudy}>
            Read the case study <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </button>
          <div className="flex flex-wrap gap-2">
            <a className="btn-ghost text-sm py-2 px-4" href={POSME_APP_STORE_URL} target="_blank" rel="noreferrer">
              <Smartphone className="w-3.5 h-3.5" /> POSMe for iPhone
            </a>
            <a className="btn-ghost text-sm py-2 px-4" href={POSME_CAJA_APP_STORE_URL} target="_blank" rel="noreferrer">
              <Tablet className="w-3.5 h-3.5" /> POSMe Caja
            </a>
            <a className="btn-ghost text-sm py-2 px-4" href={WALLETME_URL} target="_blank" rel="noreferrer">
              walletme.mx <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {LIVE_STATS.length > 0 && (
        <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8">
          {LIVE_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="order-2 metric-label">{stat.label}</dt>
              <dd className="metric-value">{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Reveal>

    <Reveal delay={0.05} className="mt-10 grid grid-cols-1 md:grid-cols-4 md:auto-rows-[220px] gap-3">
      {ECOSYSTEM_TILES.map((tile) => (
        <figure key={tile.title} className={`eco-tile ${LAYOUT[tile.layout]}`}>
          <TileVisual tile={tile} />
          <figcaption className="eco-caption">
            <p className="text-sm font-semibold text-zinc-50">{tile.title}</p>
            <p className="text-xs text-zinc-300/85 mt-0.5 leading-snug">{tile.detail}</p>
          </figcaption>
        </figure>
      ))}
    </Reveal>

    <Reveal delay={0.05} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
      {ENGINEERING_PILLARS.map((pillar, i) => (
        <div key={pillar.title} className="border-t border-white/10 pt-4">
          <p className="font-mono text-[11px] text-violet-300/80 mb-2">0{i + 1}</p>
          <h4 className="text-base font-semibold text-zinc-50">{pillar.title}</h4>
          <p className="text-sm text-zinc-400 leading-relaxed mt-1.5">{pillar.body}</p>
        </div>
      ))}
    </Reveal>

    <Reveal delay={0.05} className="mt-12 pt-8 border-t border-white/10">
      <ClientLogos />
    </Reveal>
  </article>
);
