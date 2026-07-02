import React, { useEffect } from 'react';
import { ScreenshotGallery, ScreenshotItem } from '../components/ScreenshotGallery';
import { ChevronLeft, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const APP_STORE_URL = 'https://apps.apple.com/us/app/remainingweeks-time-left/id6785275888';

// The app's own palette: warm canvas, ink, one clay accent.
const INK = '#1C1B1A';
const MUTED = '#75706B';
const CLAY = '#C76147';

const SCREENSHOTS: ScreenshotItem[] = [
  { src: '/remainingweeks-01-devices.webp', alt: 'RemainingWeeks on iPhone and Apple Watch', label: 'iPhone + Watch' },
  { src: '/remainingweeks-02-dashboard.webp', alt: 'RemainingWeeks dashboard with weeks remaining', label: 'Dashboard' },
  { src: '/remainingweeks-03-grid.webp', alt: 'RemainingWeeks full life-in-weeks grid', label: 'Life grid' },
  { src: '/remainingweeks-04-countdowns.webp', alt: 'RemainingWeeks custom countdowns', label: 'Countdowns' },
  { src: '/remainingweeks-05-widgets.webp', alt: 'RemainingWeeks Home Screen widgets', label: 'Widgets' },
  { src: '/remainingweeks-06-reflection.webp', alt: 'RemainingWeeks weekly reflection journal', label: 'Reflections' },
  { src: '/remainingweeks-07-lockscreen.webp', alt: 'RemainingWeeks Lock Screen widgets', label: 'Lock Screen' },
  { src: '/remainingweeks-08-watch.webp', alt: 'RemainingWeeks Apple Watch complications', label: 'Apple Watch' },
];

const KEY_FEATURES = [
  'Life in weeks — your whole life as a grid, built from your country’s average life expectancy (210 countries, bundled offline)',
  'Scopes × units — Life / This year / This month, in weeks, months, years or days',
  'Custom countdowns — a trip, a goal, retirement; each with its own grid, widget and wallpaper',
  'Home & Lock Screen widgets — configurable scope, unit or countdown, refreshed daily',
  'Apple Watch app + complications — grid and count styles across every accessory family',
  'Wallpaper via Shortcuts — a daily automation renders your grid as a fresh lock-screen wallpaper',
  'Weekly reflections — one short note per life-week, plus milestone alerts and daily inspiration (Pro)',
  '10 accent themes, English & Spanish, iCloud sync across devices',
];

const ARCHITECTURE = [
  'One shared SharedKit source (design system + scope×unit metrics model) compiled into four targets: app, widgets, watch app, watch complications',
  'ProfileSnapshot mirrored into an App Group so widgets render without touching SwiftData',
  'SwiftData + CloudKit keep profile, countdowns and weekly notes in sync across devices',
  'Canvas-drawn LifeGridView paints thousands of week cells in a single pass',
  'WatchConnectivity pipeline: iPhone → watch app → watch App Group → complications',
  'ImageRenderer + App Intents expose wallpaper generation to Shortcuts automations',
];

const MONETIZATION = [
  {
    title: 'RevenueCat subscriptions',
    detail:
      'Pro Monthly and Pro Yearly behind a single entitlement, with a 7-day free trial. The entitlement is mirrored to the App Group so widgets and the watch know the Pro state without asking StoreKit.',
  },
  {
    title: 'Native paywall + Customer Center',
    detail:
      'Paywall designed in RevenueCat’s editor and rendered with RevenueCatUI — plans, trial, Terms and Privacy links. Customer Center handles manage / restore from Settings.',
  },
  {
    title: 'Calm free tier',
    detail:
      'Free: the full life view, one countdown, and every widget. Pro unlocks unlimited countdowns, the reflection journal, themes, wallpaper export, and milestone alerts.',
  },
];

const TECH_STACK = [
  'SwiftUI + @Observable',
  'SwiftData + CloudKit sync',
  'WidgetKit — home, lock screen & watch',
  'watchOS app + complications',
  'RevenueCat 5.80 + RevenueCatUI',
  'App Intents + ImageRenderer (Shortcuts)',
];

const FACTS: [string, string][] = [
  ['Version', '1.0'],
  ['Bundle', 'Producciones4D.RemainingWeeks'],
  ['Category', 'Lifestyle'],
  ['Monetization', 'RevenueCat subscriptions'],
  ['Languages', 'EN · ES'],
  ['Platforms', 'iPhone · iPad · Apple Watch'],
  ['Copyright', '© 2026 Producciones 4D'],
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

/** The app's signature visual: a strip of lived / now / ahead week cells. */
const WeeksStrip: React.FC<{ total?: number; lived?: number }> = ({ total = 156, lived = 64 }) => (
  <div className="flex flex-wrap gap-[3px]" aria-hidden>
    {Array.from({ length: total }, (_, i) => (
      <span
        key={i}
        className="w-[9px] h-[9px] rounded-[2.5px]"
        style={{
          backgroundColor: i < lived ? INK : i === lived ? CLAY : 'rgba(28, 27, 26, 0.1)',
        }}
      />
    ))}
  </div>
);

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: CLAY }}>
    {children}
  </p>
);

const LightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-black/[0.07] bg-white/70 p-5 ${className}`}>{children}</div>
);

interface RemainingWeeksDetailViewProps {
  onBack: () => void;
}

export const RemainingWeeksDetailView: React.FC<RemainingWeeksDetailViewProps> = ({ onBack }) => {
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

      {/* Cream canvas — the page adopts the app's own light, warm design system */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="rounded-[2rem] px-5 py-8 sm:px-8 md:px-12 md:py-12 shadow-2xl shadow-black/40"
        style={{ backgroundColor: '#FAF7F2', color: INK }}
      >
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-center mb-10 md:mb-12">
          <img
            src="/remainingweeks-icon.webp"
            alt="RemainingWeeks app icon"
            className="w-24 h-24 md:w-28 md:h-28 rounded-[1.6rem] border border-black/[0.08] shadow-lg shadow-black/10"
          />
          <div>
            <Kicker>Published app · v1.0 · App Store</Kicker>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: INK }}>
              RemainingWeeks — Time Left
            </h1>
            <p className="mt-3 max-w-[56ch] leading-relaxed text-sm md:text-base" style={{ color: MUTED }}>
              A quiet memento mori calendar. It turns your life expectancy into a grid of weeks — on iPhone, iPad,
              your Home and Lock Screen, and your watch face — so the time you have left stops being abstract.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {['Lifestyle', 'Freemium · 7-day trial', 'EN · ES', 'iPhone + iPad + Watch'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full border text-[11px] font-medium"
                  style={{ borderColor: 'rgba(199, 97, 71, 0.35)', color: CLAY, backgroundColor: 'rgba(199, 97, 71, 0.08)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Signature weeks grid */}
        <div className="mb-10 md:mb-12">
          <WeeksStrip />
          <p className="font-mono text-[10px] mt-2 tracking-wide" style={{ color: MUTED }}>
            lived · <span style={{ color: CLAY }}>now</span> · ahead
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
              <LightCard>
                <p className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>
                  RemainingWeeks visualizes a life as a grid: one cell per week, filled for the weeks already lived,
                  a single clay cell for the current one. Scope filters (Life / This year / This month) and unit
                  chips (weeks, months, years, days) reframe the same idea at every scale.
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>
                  Beyond the life view: custom countdowns with their own grids, a one-line weekly reflection journal,
                  daily inspiration and milestone notifications, and a Shortcuts automation that regenerates a
                  lock-screen wallpaper of your grid every morning.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  Built solo, end to end: design system, four build targets, App Store assets, localization,
                  RevenueCat monetization, and the review process itself.
                </p>
              </LightCard>
            </section>

            <section>
              <Kicker>Engineering</Kicker>
              <h2 className="text-xl font-semibold mb-4">Architecture</h2>
              <ul className="space-y-2">
                {ARCHITECTURE.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                    <span className="w-1.5 h-1.5 rounded-[2px] mt-2 shrink-0" style={{ backgroundColor: CLAY }} />
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
                  <LightCard key={item.title}>
                    <h3 className="text-sm font-semibold mb-1.5" style={{ color: INK }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                      {item.detail}
                    </p>
                  </LightCard>
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
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-8 space-y-6">
              <LightCard>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-6" style={{ color: CLAY }}>
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
                  style={{ backgroundColor: CLAY }}
                >
                  <Download className="w-4 h-4" strokeWidth={1.5} />
                  Download on the App Store
                </button>

                <button
                  type="button"
                  onClick={() => window.open('/remainingweeks', '_blank')}
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-full py-2.5 px-4 text-sm font-medium border border-black/10 transition-colors hover:bg-black/[0.04]"
                  style={{ color: INK }}
                >
                  Product page <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </LightCard>

              <LightCard>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: CLAY }}>
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
              </LightCard>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
