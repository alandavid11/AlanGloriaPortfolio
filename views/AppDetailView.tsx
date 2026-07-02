import React, { useEffect, useState } from 'react';
import { ScreenshotGallery, ScreenshotItem } from '../components/ScreenshotGallery';
import { ChevronLeft, Download, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const APP_STORE_URL = 'https://apps.apple.com/us/app/word-speed-reading-trainer/id6757875956';

// The app's own palette: near-black reader canvas, one red accent, gold for Pro.
const ACCENT = '#E63935';        // AppTheme.accent
const FOCAL = '#FF453A';         // focal letter red (iOS systemRed dark)
const GOLD = '#FFDB6B';          // Pro gradient top
const GOLD2 = '#FAB838';         // Pro gradient bottom
const PAPER = '#F5F5F7';         // reader white
const DIM = '#98989F';

const WORD_SCREENSHOTS: ScreenshotItem[] = [
  { src: '/word-01.webp', alt: 'WoRD hero — read faster, think sharper', label: 'Hero' },
  { src: '/word-02.webp', alt: 'WoRD home dashboard with streaks and best WPM', label: 'Home' },
  { src: '/word-03.webp', alt: 'WoRD RSVP reader with focal-point word', label: 'Reader' },
  { src: '/word-04.webp', alt: 'WoRD reading analytics, records and consistency heatmap', label: 'Stats' },
  { src: '/word-05.webp', alt: 'WoRD personalized reading plan with schedule', label: 'Reading Plan' },
  { src: '/word-06.webp', alt: 'WoRD achievements and badges', label: 'Achievements' },
  { src: '/word-07.webp', alt: 'WoRD home and lock screen widgets', label: 'Widgets' },
  { src: '/word-08.webp', alt: 'WoRD shareable reading stats card', label: 'Share cards' },
  { src: '/word-09.webp', alt: 'WoRD find your limit speed test', label: 'Speed test' },
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

interface AppDetailViewProps {
  onBack: () => void;
}

const KEY_FEATURES = [
  'Practice Mode — CADisplayLink RSVP engine with focal-point & bionic rendering up to 900 WPM',
  'Reading Plans — personalized schedule that ramps your target WPM toward a goal, never repeating a reading',
  'Challenge Mode — read + quiz scoring (accuracy × WPM), daily challenge & 60s Focus Sprint',
  '"Find Your Limit" speed test that measures real reading speed and assigns a level',
  '720 stories + 160 quick-practice readings across EN / ES / FR / PT — shuffled-bag rotation so sessions never repeat',
  'Training Hub — XP, levels 1–25, achievements, streaks with automatic Streak Freeze',
  'WidgetKit home + lock-screen widgets synced via App Group',
  'Shareable result cards sized for Instagram & Facebook Stories',
];

const MONETIZATION = [
  {
    title: 'RevenueCat — WoRD Pro',
    pro: true,
    detail:
      'Weekly, monthly, and yearly subscriptions behind the "WoRD Pro" entitlement. Conversion-focused custom paywall: personalized WPM hook, Free-vs-Pro comparison table, Blinkist-style trial timeline backed by a real reminder notification, and a 7-day free trial anchored on the annual plan.',
  },
  {
    title: 'Google AdMob',
    pro: false,
    detail:
      'Centralized AdService with a single shared banner claimed by the visible screen (one ad WebView alive at a time — a large energy win), never on the RSVP reader. Interstitials every 4 completed challenges; rewarded ads unlock one premium story per day. Full SKAdNetwork attribution (53 network IDs).',
  },
  {
    title: 'Pro gating',
    pro: false,
    detail:
      'SubscriptionService.isPro is the single flag: suppresses all ads, unlocks ~100 premium stories, speed test, advanced Swift Charts stats, premium challenge categories, and Pro training drills.',
  },
];

const ARCHITECTURE = [
  'MVVM + singleton Services — Views → ViewModels → Services → bundled JSON / UserDefaults',
  'TimingEngine (CADisplayLink) drives word-by-word RSVP with punctuation pause multipliers',
  'ContentCatalogService aggregates 180 stories × 4 languages from bundled JSON',
  'ScoreService persists sessions to UserDefaults and writes shared stats for the widget extension',
  'CAEmitterLayer ember particle system renders the brand atmosphere on the GPU render server — near-zero main-thread cost, honors Reduce Motion',
];

const TECH_STACK = [
  'SwiftUI + @Observable ViewModels',
  'RevenueCat 5.73 + RevenueCatUI',
  'Google Mobile Ads 13.3 + UMP consent',
  'WidgetKit extension with App Group sync',
  'Custom LocalizedStrings (4 languages, no .strings files)',
];

const FACTS: [string, string][] = [
  ['Rating', '4.4 / 5'],
  ['Version', '1.6'],
  ['Bundle', 'com.Producciones4D.WoRD'],
  ['Category', 'Education'],
  ['Monetization', 'RevenueCat + AdMob'],
  ['Languages', 'EN · ES · FR · PT'],
  ['Copyright', '© 2026 Producciones 4D'],
];

/** The app's wordmark: serif "WoRD" with the red focal "o". */
const WordMark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`font-serif font-bold tracking-tight ${className}`} style={{ color: PAPER }}>
    W<span style={{ color: FOCAL }}>o</span>RD
  </span>
);

/** Deterministic ember field — the app's CAEmitterLayer atmosphere, in CSS. */
const EMBERS = Array.from({ length: 16 }, (_, i) => {
  // tiny hash so the field is identical every render
  const r = (n: number) => {
    let s = (i + 1) * 2654435761 + n * 40503;
    s = (s ^ (s >> 13)) * 1274126177;
    return ((s ^ (s >> 16)) >>> 0) / 4294967295;
  };
  return {
    left: 4 + r(1) * 92,
    size: 3 + r(2) * 7,
    dur: 12 + r(3) * 14,
    delay: -r(4) * 26,
    alpha: 0.25 + r(5) * 0.35,
    warm: r(6) > 0.5,
  };
});

const EmberField: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
    {EMBERS.map((e, i) => (
      <span
        key={i}
        className="word-ember"
        style={
          {
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            backgroundColor: e.warm ? '#FF7634' : '#F33E2E',
            boxShadow: `0 0 ${e.size * 2.5}px ${e.size * 0.9}px ${e.warm ? 'rgba(255,118,52,0.45)' : 'rgba(243,62,46,0.4)'}`,
            '--ember-t': `${e.dur}s`,
            '--ember-d': `${e.delay}s`,
            '--ember-a': e.alpha,
          } as React.CSSProperties
        }
      />
    ))}
  </div>
);

/** Mini RSVP reader — the app's signature interaction, live on the page. */
const RSVP_WORDS = 'You are reading one word at a time exactly like inside the app.'.split(' ');

const focalIndex = (word: string) => {
  const n = word.length;
  if (n <= 1) return 0;
  if (n <= 5) return 1;
  if (n <= 9) return 2;
  if (n <= 13) return 3;
  return 4;
};

const MiniReader: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || paused) return;
    const word = RSVP_WORDS[idx];
    const base = 260;
    const dur = /[.,!?]$/.test(word) ? base * 2.1 : base;
    const t = setTimeout(() => setIdx((i) => (i + 1) % RSVP_WORDS.length), dur);
    return () => clearTimeout(t);
  }, [idx, paused]);

  const word = RSVP_WORDS[idx];
  const fi = focalIndex(word);

  return (
    <button
      type="button"
      onClick={() => setPaused((p) => !p)}
      aria-label={paused ? 'Resume the reading demo' : 'Pause the reading demo'}
      className="relative w-full max-w-[300px] rounded-xl border border-white/[0.07] px-4 pt-2.5 pb-3 cursor-pointer text-left"
      style={{ background: 'linear-gradient(160deg, #0D0D0E 0%, #040405 100%)' }}
      title={paused ? 'Tap to resume' : 'Tap to pause'}
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-center" style={{ color: ACCENT }}>
        230 WPM · {paused ? 'paused' : 'live demo'}
      </p>
      {/* ReaderView anchor: the focal letter stays pinned between the guides;
          prefix grows left, suffix grows right (Courier is monospace → ch units). */}
      <div
        className="relative h-[72px] whitespace-nowrap"
        style={{ fontFamily: '"Courier New", monospace', fontSize: '1.35rem' }}
      >
        <span
          className="absolute left-1/2 -translate-x-1/2 w-px h-3 top-[5px]"
          style={{ backgroundColor: 'rgba(120,120,120,0.55)', animation: 'word-guide-pulse 2.4s ease-in-out infinite' }}
        />
        <span
          className="absolute left-1/2 -translate-x-1/2 w-px h-3 bottom-[5px]"
          style={{ backgroundColor: 'rgba(120,120,120,0.55)', animation: 'word-guide-pulse 2.4s ease-in-out infinite' }}
        />
        <span
          className="absolute top-1/2 -translate-y-1/2"
          style={{ right: 'calc(50% + 0.5ch)', color: PAPER }}
        >
          {word.slice(0, fi)}
        </span>
        <span
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          style={{ color: FOCAL }}
        >
          {word[fi]}
        </span>
        <span
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: 'calc(50% + 0.5ch)', color: PAPER }}
        >
          {word.slice(fi + 1)}
        </span>
      </div>
    </button>
  );
};

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: ACCENT }}>
    {children}
  </p>
);

const DarkCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 ${className}`}>{children}</div>
);

export const AppDetailView: React.FC<AppDetailViewProps> = ({ onBack }) => {
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

      {/* App-branded shell: the reader's near-black canvas + ember atmosphere */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] px-5 py-8 sm:px-8 md:px-12 md:py-12 shadow-2xl shadow-black/60"
        style={{
          background:
            'radial-gradient(560px 340px at 50% -80px, rgba(230,57,53,0.16), transparent 70%), ' +
            'radial-gradient(640px 420px at 88% 104%, rgba(216,44,32,0.14), transparent 70%), ' +
            'linear-gradient(170deg, #0B0B0C 0%, #050506 100%)',
          color: PAPER,
        }}
      >
        <EmberField />

        <div className="relative">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-center mb-10 md:mb-12">
            <img
              src="/word-icon.webp"
              alt="WoRD app icon"
              className="w-24 h-24 md:w-28 md:h-28 rounded-[1.6rem] border border-white/10"
              style={{ boxShadow: '0 18px 50px rgba(230,57,53,0.22)' }}
            />
            <div>
              <Kicker>Published app · v1.6 · App Store</Kicker>
              <h1 className="text-3xl md:text-4xl tracking-tight">
                <WordMark className="text-4xl md:text-5xl" />
                <span className="font-semibold text-zinc-300"> — Speed Reading Trainer</span>
              </h1>
              <p className="mt-3 max-w-[56ch] leading-relaxed text-sm md:text-base" style={{ color: DIM }}>
                Native SwiftUI speed-reading trainer built solo — RSVP practice, personalized Reading Plans,
                comprehension challenges, gamification, widgets, and a full freemium stack with RevenueCat
                subscriptions and Google AdMob.
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium"
                  style={{ borderColor: 'rgba(255,219,107,0.3)', color: GOLD, backgroundColor: 'rgba(255,219,107,0.08)' }}
                >
                  <Star className="w-3.5 h-3.5" style={{ fill: GOLD, color: GOLD }} strokeWidth={1.5} />
                  4.4 rating
                </span>
                {['Education', 'Freemium', '4 languages'].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full border text-[11px] font-medium"
                    style={{ borderColor: 'rgba(230,57,53,0.3)', color: '#F2827B', backgroundColor: 'rgba(230,57,53,0.08)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <MiniReader />
              </div>
            </div>
          </div>

          {/* Screenshots */}
          <section className="mb-12">
            <ScreenshotGallery items={WORD_SCREENSHOTS} variant="phone" />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <Kicker>Overview</Kicker>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <DarkCard>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: DIM }}>
                    WoRD uses Rapid Serial Visual Presentation (RSVP) — words appear one at a time via a CADisplayLink
                    timing engine with focal-point highlighting and optional bionic mode — to train reading speed while
                    keeping comprehension in check with post-story quizzes.
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: DIM }}>
                    The app ships 720 stories (180 per language × 4 locales), personalized Reading Plans that schedule
                    sessions and ramp the target speed toward a goal, a Challenge Arena with daily challenges and Focus
                    Sprint mode, XP/level progression, and WidgetKit extensions that read live stats from an App Group.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: DIM }}>
                    I owned architecture, UI/UX, content pipeline, App Store submission, ASO, compliance (ATT +
                    app-ads.txt), ongoing social media marketing, and the complete monetization layer end to end.
                  </p>
                </DarkCard>
              </section>

              <section>
                <Kicker>Engineering</Kicker>
                <h2 className="text-xl font-semibold mb-4">Architecture</h2>
                <ul className="space-y-2.5">
                  {ARCHITECTURE.map((line) => (
                    <li key={line} className="flex gap-3 text-sm leading-relaxed" style={{ color: DIM }}>
                      <span className="w-1 h-1 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: ACCENT }} />
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
                    <DarkCard key={item.title}>
                      <h3 className="text-sm font-semibold mb-1.5 flex items-center gap-2" style={{ color: PAPER }}>
                        {item.title}
                        {item.pro && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide"
                            style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, color: '#111' }}
                          >
                            PRO
                          </span>
                        )}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: DIM }}>
                        {item.detail}
                      </p>
                    </DarkCard>
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
                      className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 text-sm leading-snug"
                      style={{ color: DIM }}
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
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-6" style={{ color: ACCENT }}>
                    App Store
                  </p>
                  <dl className="space-y-5 text-sm">
                    {FACTS.map(([label, value]) => (
                      <div key={label}>
                        <dt
                          className="font-mono text-[10px] uppercase tracking-wider mb-1"
                          style={{ color: 'rgba(152,152,159,0.55)' }}
                        >
                          {label}
                        </dt>
                        <dd className="font-medium" style={{ color: PAPER }}>
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <button
                    type="button"
                    onClick={() => window.open(APP_STORE_URL, '_blank')}
                    className="w-full mt-8 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-transform active:scale-[0.98]"
                    style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, color: '#111' }}
                  >
                    <Download className="w-4 h-4" strokeWidth={2} />
                    Download on the App Store
                  </button>

                  <button
                    type="button"
                    onClick={() => window.open(APP_STORE_URL, '_blank')}
                    className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.1] px-4 py-2.5 text-sm font-medium text-zinc-300 hover:border-white/25 transition-colors"
                  >
                    View listing <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </DarkCard>

                <DarkCard>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-4" style={{ color: ACCENT }}>
                    Stack
                  </p>
                  <ul className="space-y-2">
                    {TECH_STACK.map((item) => (
                      <li
                        key={item}
                        className="w-full text-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs"
                        style={{ color: DIM }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </DarkCard>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
