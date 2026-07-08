import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Download } from 'lucide-react';
import { ScreenshotGallery, ScreenshotItem } from '../components/ScreenshotGallery';

const APP_STORE_URL = 'https://apps.apple.com/us/app/triplook-travel-outfits/id6784750326';

// Triplook Black & Tan editorial — the case study adopts the app's own design system.
const INK = '#141210';
const MUTED = '#7A736A';
const TAN = '#C19C6E';

const SCREENSHOTS: ScreenshotItem[] = [
  { src: '/triplook-tripDetail.webp', alt: 'Trip itinerary with weather and planned outfits per day', label: 'Trip' },
  { src: '/triplook-closet.webp', alt: 'Digital closet with AI background-removed garments', label: 'Closet' },
  { src: '/triplook-lookbuilder.webp', alt: 'Look studio composing an outfit by category', label: 'Look studio' },
  { src: '/triplook-looks.webp', alt: 'Saved looks with garment thumbnails in the lookbook', label: 'Looks' },
  { src: '/triplook-calendar.webp', alt: 'Month calendar with a trip band and outfit plans', label: 'Calendar' },
  { src: '/triplook-packing.webp', alt: 'Packing list that builds itself from planned outfits', label: 'Packing' },
];

const KEY_FEATURES = [
  'AI garment scan: cloud background removal, automatic tagging (category, colors, warmth, formality) and hanger removal in a single step.',
  'Weather-smart outfit generation: one look per trip day, matched to the forecast via WeatherKit with a climatology fallback for far-out dates.',
  'Look studio: a carousel per category stacked like a mannequin. Tap to pick, shuffle for inspiration, save the look.',
  'A real month calendar: trips render as continuous bands across their dates, occasion plans as dots, each day with its own agenda.',
  'Auto packing list derived from the planned outfits, with garment photos and check-off state.',
  'Private lookbook: worn-outfit photos stay on-device in private iCloud; selfies never touch a server.',
];

const ARCHITECTURE = [
  'SwiftUI + SwiftData with CloudKit sync: the entire backend is the user’s private iCloud database: zero server cost, and data follows the Apple ID.',
  'A Cloudflare Worker proxies every AI call (Anthropic Claude for tagging and outfit generation; fal.ai BiRefNet and FLUX Kontext for image cleanup), guarded by a shared app token and per-IP rate limiting.',
  'Image pipeline: off-main-thread CGImageSource downsampling with an NSCache layer and surgical invalidation, so large closets scroll at full frame rate.',
  'Credit ledger stored in CloudKit with idempotent transaction keys, so balances survive reinstalls and sync across devices without a server of record.',
  'DEBUG-only demo seeding and launch-route system that powers App Store screenshots and promo video capture straight from the simulator.',
];

const MONETIZATION = [
  {
    title: 'Premium subscription',
    detail:
      'Monthly and annual tiers gate the expensive surface: AI outfit generation, the outfit calendar, smart packing and capsule planning. Free users keep the full manual closet.',
  },
  {
    title: 'Credit economy for AI scans',
    detail:
      'One credit = one AI garment scan. Ten free credits per account (CloudKit-enforced, reinstall-proof), subscription allotments sized against real per-scan cost, and consumable top-up packs.',
  },
  {
    title: 'Margin-aware by design',
    detail:
      'Every AI feature was priced from measured API cost per call, including a rejected rewarded-ads path and a trial policy that grants features, not costly scans.',
  },
];

const TECH_STACK = [
  'SwiftUI · SwiftData',
  'CloudKit',
  'WeatherKit',
  'Cloudflare Workers',
  'Claude API',
  'fal.ai (BiRefNet · Kontext)',
  'RevenueCat',
];

const FACTS: [string, string][] = [
  ['Category', 'Travel · Lifestyle'],
  ['Price', 'Free + subscription & credit packs'],
  ['Platforms', 'iPhone · iPad'],
  ['Languages', 'English · Spanish'],
  ['Backend cost', '$0 fixed (CloudKit + Workers free tier)'],
  ['Released', 'July 2026'],
];

const RELEASE_11 = [
  'Full Spanish localization: every screen, the onboarding, and a dedicated es-MX App Store listing with its own screenshot set.',
  'Kinetic onboarding tour: real app screens cycle inside a 3D phone mockup, with animated demos of rapid capture, the look studio, the calendar and packing.',
  'In-context rating prompts at genuine delight moments (finished packing, saved look), capped at once per version, plus a direct write-a-review path in Settings.',
  'A refreshed App Store asset set: 6.9-inch iPhone and 13-inch iPad screenshots with 3D garment pop-outs, in both languages.',
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: TAN }}>
    {children}
  </p>
);

const CreamCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-black/[0.07] bg-white/70 p-5 ${className}`}>{children}</div>
);

/** Signature strip: a week of day cells with a continuous tan trip band, echoing the calendar. */
const TripBandStrip: React.FC = () => {
  const days = [
    { d: 'M', n: 6 }, { d: 'T', n: 7 }, { d: 'W', n: 8 },
    { d: 'T', n: 9, trip: 'start' }, { d: 'F', n: 10, trip: 'mid' },
    { d: 'S', n: 11, trip: 'mid' }, { d: 'S', n: 12, trip: 'end' },
  ] as const;
  return (
    <div className="grid grid-cols-7 gap-0 max-w-md">
      {days.map((day) => (
        <div key={day.n} className="text-center">
          <p className="font-mono text-[9px] mb-1" style={{ color: MUTED }}>{day.d}</p>
          <p className="text-sm mb-1.5" style={{ color: INK }}>{day.n}</p>
          {'trip' in day && day.trip ? (
            <div
              className="h-[5px]"
              style={{
                backgroundColor: 'rgba(193, 156, 110, 0.5)',
                borderRadius:
                  day.trip === 'start' ? '3px 0 0 3px' : day.trip === 'end' ? '0 3px 3px 0' : '0',
              }}
            />
          ) : (
            <div className="h-[5px]" />
          )}
        </div>
      ))}
    </div>
  );
};

interface TriplookDetailViewProps {
  onBack: () => void;
}

export const TriplookDetailView: React.FC<TriplookDetailViewProps> = ({ onBack }) => {
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

      {/* Cream canvas — the page adopts Triplook's Black & Tan editorial system */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="rounded-[2rem] px-5 py-8 sm:px-8 md:px-12 md:py-12 shadow-2xl shadow-black/40"
        style={{ backgroundColor: '#F7F4EF', color: INK }}
      >
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-center mb-10 md:mb-12">
          <img
            src="/triplook-icon.webp"
            alt="Triplook app icon"
            className="w-24 h-24 md:w-28 md:h-28 rounded-[1.6rem] border border-black/[0.08] shadow-lg shadow-black/10"
          />
          <div>
            <Kicker>Published app · Live on the App Store</Kicker>
            <h1 className="triplook-serif text-3xl md:text-4xl" style={{ color: INK }}>
              Triplook: Travel Outfits
            </h1>
            <p className="mt-3 max-w-[56ch] leading-relaxed text-sm md:text-base" style={{ color: MUTED }}>
              Photograph your clothes once and Triplook does the rest: an AI-tagged digital closet,
              weather-smart outfits for every trip day, a real outfit calendar, packing lists that build
              themselves, and a private lookbook of what you actually wore.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {['Travel', 'Freemium + credits', 'AI-powered', 'iPhone + iPad'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full border text-[11px] font-medium"
                  style={{ borderColor: 'rgba(193, 156, 110, 0.4)', color: '#8A6D45', backgroundColor: 'rgba(193, 156, 110, 0.1)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Signature trip band */}
        <div className="mb-10 md:mb-12">
          <TripBandStrip />
          <p className="font-mono text-[10px] mt-2 tracking-wide" style={{ color: MUTED }}>
            a trip on the calendar · <span style={{ color: TAN }}>Lisbon, Jul 9 to 12</span>
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
              <CreamCard>
                <p className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>
                  Triplook starts where every trip starts: what do I wear? You photograph your garments once;
                  each one is cut out, tagged and organized into a digital closet. From there the app plans
                  outfits around the forecast for each day of a trip, lets you compose looks by hand in a
                  carousel studio, and schedules everything on a month calendar where trips appear as bands,
                  the way they do in a real calendar.
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>
                  The quiet differentiator is the backend: there isn't one. Everything lives in the user's
                  private iCloud, and the only server is a Cloudflare Worker that proxies AI calls without
                  storing anything. Privacy as architecture, not as a settings toggle.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  Built solo, end to end: product, design system, AI pipeline, monetization, App Store assets
                  and the review process itself.
                </p>
              </CreamCard>
            </section>

            <section>
              <Kicker>Engineering</Kicker>
              <h2 className="text-xl font-semibold mb-4">Architecture</h2>
              <ul className="space-y-2">
                {ARCHITECTURE.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                    <span className="w-1.5 h-1.5 rounded-[2px] mt-2 shrink-0" style={{ backgroundColor: TAN }} />
                    {line}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <Kicker>Business</Kicker>
              <h2 className="text-xl font-semibold mb-4">Monetization</h2>
              <div className="space-y-3">
                {MONETIZATION.map((item) => (
                  <CreamCard key={item.title}>
                    <h3 className="text-sm font-semibold mb-1.5" style={{ color: INK }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                      {item.detail}
                    </p>
                  </CreamCard>
                ))}
              </div>
            </section>

            <section>
              <Kicker>Product</Kicker>
              <h2 className="text-xl font-semibold mb-4">Key features</h2>
              <ul className="grid grid-cols-1 gap-2.5">
                {KEY_FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-2xl border border-black/[0.07] bg-white/60 px-4 py-3.5 text-sm leading-snug"
                    style={{ color: MUTED }}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <Kicker>Latest release · Live</Kicker>
              <h2 className="text-xl font-semibold mb-4">Version 1.1 — the bilingual update</h2>
              <CreamCard>
                <ul className="space-y-2.5">
                  {RELEASE_11.map((line) => (
                    <li key={line} className="flex gap-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                      <span className="w-1.5 h-1.5 rounded-[2px] mt-2 shrink-0" style={{ backgroundColor: TAN }} />
                      {line}
                    </li>
                  ))}
                </ul>
              </CreamCard>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-8 space-y-6">
              <CreamCard>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-6" style={{ color: TAN }}>
                  App Store
                </p>
                <dl className="space-y-5 text-sm">
                  {FACTS.map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: MUTED }}>
                        {label}
                      </dt>
                      <dd className="font-medium break-words" style={{ color: INK }}>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <button
                  type="button"
                  onClick={() => window.open(APP_STORE_URL, '_blank')}
                  className="w-full mt-8 inline-flex items-center justify-center gap-2 rounded-full py-3 px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#8A6D45' }}
                >
                  <Download className="w-4 h-4" strokeWidth={1.5} />
                  Download on the App Store
                </button>
              </CreamCard>

              <CreamCard>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: TAN }}>
                  Stack
                </p>
                <ul className="space-y-2">
                  {TECH_STACK.map((item) => (
                    <li
                      key={item}
                      className="w-full text-center rounded-full border border-black/[0.08] bg-white/70 px-3 py-1.5 text-xs font-medium"
                      style={{ color: INK }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CreamCard>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
