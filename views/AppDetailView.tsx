import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { SectionHeading } from '../components/SectionHeading';
import { ScreenshotGallery, ScreenshotItem } from '../components/ScreenshotGallery';
import { ChevronLeft, Download, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const APP_STORE_URL = 'https://apps.apple.com/us/app/word-speed-reading-trainer/id6757875956';

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
    detail:
      'Weekly, monthly, and yearly subscriptions behind the "WoRD Pro" entitlement. Conversion-focused custom paywall: personalized WPM hook, Free-vs-Pro comparison table, Blinkist-style trial timeline backed by a real reminder notification, and a 7-day free trial anchored on the annual plan.',
  },
  {
    title: 'Google AdMob',
    detail:
      'Centralized AdService with a single shared banner claimed by the visible screen (one ad WebView alive at a time — a large energy win), never on the RSVP reader. Interstitials every 4 completed challenges; rewarded ads unlock one premium story per day. Full SKAdNetwork attribution (53 network IDs).',
  },
  {
    title: 'Pro gating',
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

export const AppDetailView: React.FC<AppDetailViewProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-36 pt-8 md:pt-12">
      <motion.button
        type="button"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={spring}
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-200 transition-colors mb-10"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
        Back to portfolio
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 items-center mb-16 md:mb-20"
      >
        <div className="flex items-center gap-6">
          <img
            src="/word-icon.webp"
            alt="WoRD app icon"
            className="w-28 h-28 md:w-32 md:h-32 rounded-[1.75rem] border border-white/10 shadow-xl shadow-rose-950/30"
          />
          <div className="lg:hidden">
            <p className="section-kicker text-rose-400 mb-1">App Store</p>
            <h1 className="text-2xl font-semibold tracking-tight">WoRD</h1>
          </div>
        </div>
        <div>
          <p className="section-kicker text-rose-400 mb-2 hidden lg:block">Published app · v1.6</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-50 hidden lg:block">
            WoRD — Speed Reading Trainer
          </h1>
          <p className="text-zinc-400 mt-3 max-w-[52ch] leading-relaxed">
            Native SwiftUI speed-reading trainer built solo — RSVP practice, comprehension challenges, gamification,
            widgets, and a full freemium stack with RevenueCat subscriptions and Google AdMob.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <span className="inline-flex items-center gap-1.5 tag-pill text-amber-300/90">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" strokeWidth={1.5} />
              4.4 rating
            </span>
            <span className="tag-pill">Education</span>
            <span className="tag-pill">Freemium</span>
            <span className="tag-pill">4 languages</span>
          </div>
        </div>
      </motion.div>

      <section className="mb-16">
        <ScreenshotGallery items={WORD_SCREENSHOTS} variant="phone" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <SectionHeading kicker="Overview" title="Description" className="mb-6" />
            <GlassCard>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                WoRD uses Rapid Serial Visual Presentation (RSVP) — words appear one at a time via a CADisplayLink timing
                engine with focal-point highlighting and optional bionic mode — to train reading speed while keeping
                comprehension in check with post-story quizzes.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                The app ships 720 stories (180 per language × 4 locales), personalized Reading Plans that schedule
                sessions and ramp the target speed toward a goal, a Challenge Arena with daily challenges and Focus
                Sprint mode, XP/level progression, and WidgetKit extensions that read live stats from an App Group.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I owned architecture, UI/UX, content pipeline, App Store submission, ASO, compliance (ATT + app-ads.txt),
                ongoing social media marketing, and the complete monetization layer end to end.
              </p>
            </GlassCard>
          </section>

          <section>
            <SectionHeading kicker="Engineering" title="Architecture" className="mb-6" />
            <ul className="space-y-2">
              {ARCHITECTURE.map((line) => (
                <li key={line} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-sky-400 mt-2.5 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading kicker="Business" title="Monetization" className="mb-6" />
            <div className="space-y-3">
              {MONETIZATION.map((item) => (
                <GlassCard key={item.title} hoverEffect={false} className="!p-5">
                  <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading kicker="Product" title="Key features" className="mb-6" />
            <ul className="grid grid-cols-1 gap-3">
              {KEY_FEATURES.map((feature) => (
                <li key={feature} className="liquid-glass rounded-2xl px-4 py-3.5 text-sm text-zinc-400 leading-snug">
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-8 space-y-6">
            <GlassCard>
              <p className="section-kicker mb-6">App Store</p>
              <dl className="space-y-5 text-sm">
                {[
                  ['Rating', '4.4 / 5'],
                  ['Version', '1.6'],
                  ['Bundle', 'com.Producciones4D.WoRD'],
                  ['Category', 'Education'],
                  ['Monetization', 'RevenueCat + AdMob'],
                  ['Languages', 'EN · ES · FR · PT'],
                  ['Copyright', '© 2026 Producciones 4D'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 mb-1">{label}</dt>
                    <dd className="text-zinc-200 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={() => window.open(APP_STORE_URL, '_blank')}
                className="btn-primary w-full mt-8"
              >
                <Download className="w-4 h-4" strokeWidth={1.5} />
                Download on the App Store
              </button>

              <button
                type="button"
                onClick={() => window.open(APP_STORE_URL, '_blank')}
                className="btn-ghost w-full mt-3 text-sm"
              >
                View listing <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </GlassCard>

            <GlassCard hoverEffect={false}>
              <p className="section-kicker mb-4">Stack</p>
              <ul className="space-y-2">
                {TECH_STACK.map((item) => (
                  <li key={item} className="tag-pill text-xs w-full justify-center">
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};
