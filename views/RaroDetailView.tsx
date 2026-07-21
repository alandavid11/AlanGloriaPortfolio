import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowUpRight } from 'lucide-react';
import { ScreenshotGallery, ScreenshotItem } from '../components/ScreenshotGallery';

// Raro champagne-over-black — the case study adopts the app's own design system.
const CHAMPAGNE = '#DCC08A';
const MUTED = 'rgba(255,255,255,0.55)';
const CARD_BG = 'rgba(255,255,255,0.04)';
const CARD_BORDER = 'rgba(255,255,255,0.08)';

const SCREENSHOTS: ScreenshotItem[] = [
  { src: '/raro-01-camara.webp', alt: 'Raro camera turning a real place into a collectible card', label: 'Capture' },
  { src: '/raro-02-rarezas.webp', alt: 'Raro rarity tiers with foil inserts and graded cards', label: 'Rarities' },
  { src: '/raro-03-primero.webp', alt: 'World-first Card #1 reveal with score and badges', label: 'Card #1' },
  { src: '/raro-04-coleccion.webp', alt: 'Raro collection grid with badges and rankings', label: 'Collection' },
  { src: '/raro-05-compartir.webp', alt: 'Sharing a Raro card to Instagram Stories with moving foil', label: 'Share' },
];

const KEY_FEATURES = [
  'Camera-only capture: no photo picker, no gallery. You have to physically be at the place — location freezes at the exact shutter instant.',
  'Real scarcity: rarity is rolled server-side with odds driven by how rarely that H3 geo-cell has been scanned worldwide. Seven tiers, from common to mythic.',
  'Card #1: the first person ever to scan a place mints a unique world-first card with a champagne treatment — one per place, on the whole planet.',
  'TCG texture: foil inserts (~5%), procedural frames (~1/12) with a per-tier minimal design ladder, factory condition, and a photo-quality grade 1–10 scored on-device by Vision.',
  'Social layer: public profiles with a showcase, follows, a global feed of notable pulls, rankings, streaks and 23 hand-crafted badges.',
  'Stories sharing as growth: every shared card renders a branded template — including a 5-second video where the foil light moves continuously.',
];

const ARCHITECTURE = [
  'Every mutation goes client → Edge Function → Postgres RPC. The client never writes tables directly; RLS everywhere, service role only inside functions.',
  'Five verification layers, starting with App Attest: each mint is signed by the Secure Enclave and the attestation chain is validated against Apple’s root CA in a Deno Edge Function (x5c chain, nonce, rpId, counter).',
  'Place identity is an H3 res-10 cell; the public UI only ever shows the cell centroid, never the shutter coordinates. POI naming runs on-device via MapKit with a real distance gate.',
  'The validity gate (Vision scene classification + aesthetics) filters screens, documents and re-shots before any luck is rolled — quality lives in the grade, never in the tier.',
  'Foils are Metal layer effects driven by CoreMotion; the share pipeline re-creates them procedurally because ImageRenderer cannot rasterize shaders, and exports a dithered, Rec.709-tagged video tuned for Instagram’s re-encode.',
  'Push runs on raw APNs from pg_cron: a queue table drained every minute by an Edge Function signing ES256 JWTs, with localized loc-keys so each device renders its own language.',
];

const TECH_STACK = [
  'SwiftUI · Swift 6',
  'Metal · CoreMotion',
  'Vision · AVFoundation',
  'H3 geo-indexing',
  'Supabase (Postgres · RLS)',
  'Edge Functions (Deno)',
  'App Attest · DeviceCheck',
  'APNs · pg_cron',
];

const FACTS: [string, string][] = [
  ['Category', 'Entertainment · Social'],
  ['Price', 'Free · no ads, no IAP at launch'],
  ['Platforms', 'iPhone (iOS 18+)'],
  ['Languages', 'ES · EN · PT · FR · DE'],
  ['Backend', 'Supabase — RPCs + 13 Edge Functions'],
  ['Status', 'TestFlight → App Store review'],
];

const TIER_LADDER = [
  { name: 'COMMON', color: 'rgba(255,255,255,0.35)' },
  { name: 'RARE', color: 'rgba(140, 190, 255, 0.75)' },
  { name: 'EPIC', color: 'rgba(200, 170, 255, 0.8)' },
  { name: 'LEGENDARY', color: 'rgba(240, 200, 120, 0.9)' },
  { name: 'MYTHIC', color: 'rgba(255, 160, 200, 0.85)' },
  { name: 'CARD #1', color: CHAMPAGNE },
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: CHAMPAGNE }}>
    {children}
  </p>
);

const DarkCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl p-5 ${className}`}
    style={{ backgroundColor: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
  >
    {children}
  </div>
);

/** Signature strip: the rarity ladder, common to Card #1. */
const RarityLadder: React.FC = () => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
    {TIER_LADDER.map((tier, index) => (
      <React.Fragment key={tier.name}>
        {index > 0 && <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>}
        <span className="font-mono text-[10px] tracking-[0.18em]" style={{ color: tier.color }}>
          {tier.name}
        </span>
      </React.Fragment>
    ))}
  </div>
);

interface RaroDetailViewProps {
  onBack: () => void;
}

export const RaroDetailView: React.FC<RaroDetailViewProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-36 pt-8 md:pt-12">
      <motion.button
        type="button"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={spring}
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-200 transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
        Back to portfolio
      </motion.button>

      {/* Pure-black canvas — the page adopts Raro's champagne-over-black system */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="rounded-[2rem] px-5 py-8 sm:px-8 md:px-12 md:py-12 shadow-2xl shadow-black/60"
        style={{ backgroundColor: '#0A0A0C', color: '#fff', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-center mb-10 md:mb-12">
          <img
            src="/raro-icon.webp"
            alt="Raro app icon"
            className="w-24 h-24 md:w-28 md:h-28 rounded-[1.6rem] border border-white/10 shadow-lg shadow-black/40"
          />
          <div>
            <Kicker>New app · TestFlight → App Store</Kicker>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-[0.22em]">RARO</h1>
            <p className="mt-3 max-w-[56ch] leading-relaxed text-sm md:text-base" style={{ color: MUTED }}>
              Photograph a real place with the in-app camera and open it like a trading-card pack: the card
              can come out common… or mythic. Rarity is real — it depends on how rarely that place has been
              scanned anywhere in the world. Be the first and you mint the unique Card #1.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {['Collectible cards', 'Location-based', 'Camera-only', 'Free · no ads'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full border text-[11px] font-medium"
                  style={{ borderColor: 'rgba(220,192,138,0.35)', color: '#EBD9B4', backgroundColor: 'rgba(220,192,138,0.08)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Signature rarity ladder */}
        <div className="mb-10 md:mb-12">
          <RarityLadder />
          <p className="font-mono text-[10px] mt-2 tracking-wide" style={{ color: MUTED }}>
            the rarity ladder · <span style={{ color: CHAMPAGNE }}>scarcity of the place, rolled server-side</span>
          </p>
        </div>

        {/* Screenshots */}
        <section className="mb-12 rw-gallery">
          <ScreenshotGallery items={SCREENSHOTS} variant="phone" />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <Kicker>Overview</Kicker>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <DarkCard>
                <p className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>
                  Raro asks a simple question: what if the world were a booster box? Every real place is a
                  card waiting to be pulled — the corner café, the stadium, the mural nobody photographs.
                  The only way in is the in-app camera, so every card is proof that someone actually stood
                  there. The reveal plays like opening a pack, because it is one: tier, foil insert, frame,
                  condition and photo grade are all rolled the moment you shoot.
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>
                  Scarcity is the product. A place that has been scanned three times in the world is rarer
                  than one scanned three thousand — the odds bend accordingly, and being the first ever
                  mints Card&nbsp;#1, unique on the planet. That single mechanic turns walking your own city
                  into hunting.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  Built solo, end to end: product and rarity economy, design system, camera pipeline,
                  backend, anti-cheat, localization in five languages, and the App Store release.
                </p>
              </DarkCard>
            </section>

            <section>
              <Kicker>Engineering</Kicker>
              <h2 className="text-xl font-semibold mb-4">Architecture &amp; trust</h2>
              <ul className="space-y-2">
                {ARCHITECTURE.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                    <span className="w-1.5 h-1.5 rounded-[2px] mt-2 shrink-0" style={{ backgroundColor: CHAMPAGNE }} />
                    {line}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <Kicker>Product</Kicker>
              <h2 className="text-xl font-semibold mb-4">Key features</h2>
              <ul className="grid grid-cols-1 gap-2.5">
                {KEY_FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-2xl px-4 py-3.5 text-sm leading-snug"
                    style={{ color: MUTED, backgroundColor: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-8 space-y-6">
              <DarkCard>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-6" style={{ color: CHAMPAGNE }}>
                  App Store
                </p>
                <dl className="space-y-5 text-sm">
                  {FACTS.map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: MUTED }}>
                        {label}
                      </dt>
                      <dd className="font-medium break-words text-zinc-50">{value}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href="/raro/"
                  className="w-full mt-8 inline-flex items-center justify-center gap-2 rounded-full py-3 px-4 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                  style={{ backgroundColor: CHAMPAGNE }}
                >
                  Visit the product website
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <div className="flex gap-2 mt-3">
                  <a
                    href="/raro/privacy/"
                    className="flex-1 inline-flex items-center justify-center rounded-full py-2.5 px-3 text-xs font-medium transition-opacity hover:opacity-80"
                    style={{ color: CHAMPAGNE, border: '1px solid rgba(220,192,138,0.3)' }}
                  >
                    Privacy
                  </a>
                  <a
                    href="/raro/terms/"
                    className="flex-1 inline-flex items-center justify-center rounded-full py-2.5 px-3 text-xs font-medium transition-opacity hover:opacity-80"
                    style={{ color: CHAMPAGNE, border: '1px solid rgba(220,192,138,0.3)' }}
                  >
                    Terms
                  </a>
                </div>
              </DarkCard>

              <DarkCard>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: CHAMPAGNE }}>
                  Stack
                </p>
                <ul className="space-y-2">
                  {TECH_STACK.map((item) => (
                    <li
                      key={item}
                      className="w-full text-center rounded-full px-3 py-1.5 text-xs font-medium text-zinc-100"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid ${CARD_BORDER}` }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </DarkCard>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
