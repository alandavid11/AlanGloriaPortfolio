import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { SectionHeading } from '../components/SectionHeading';
import { ExperienceCard } from '../components/ExperienceCard';
import { ScreenshotGallery, ScreenshotItem } from '../components/ScreenshotGallery';
import { ProductDeck } from '../components/ProductDeck';
import { experienceData } from '../data/experience';
import {
  ArrowUpRight,
  Command,
  Terminal,
  Bot,
  Mail,
  Linkedin,
  Cpu,
  MapPin,
  Sparkles,
  Smartphone,
  Trophy,
  Globe,
} from 'lucide-react';
import { SkillItem, ToolItem, EducationItem } from '../types';
import { motion, useReducedMotion } from 'framer-motion';

const WORD_APP_STORE_URL =
  'https://apps.apple.com/us/app/word-speed-reading-trainer/id6757875956';
const RWEEKS_APP_STORE_URL =
  'https://apps.apple.com/us/app/remainingweeks-time-left/id6785275888';

const RWEEKS_SCREENSHOTS: ScreenshotItem[] = [
  { src: '/remainingweeks-01-devices.webp', alt: 'RemainingWeeks on iPhone and Apple Watch', label: 'iPhone + Watch' },
  { src: '/remainingweeks-02-dashboard.webp', alt: 'RemainingWeeks dashboard with weeks remaining', label: 'Dashboard' },
  { src: '/remainingweeks-03-grid.webp', alt: 'RemainingWeeks full life-in-weeks grid', label: 'Life grid' },
  { src: '/remainingweeks-04-countdowns.webp', alt: 'RemainingWeeks custom countdowns', label: 'Countdowns' },
  { src: '/remainingweeks-05-widgets.webp', alt: 'RemainingWeeks Home Screen widgets', label: 'Widgets' },
  { src: '/remainingweeks-06-reflection.webp', alt: 'RemainingWeeks weekly reflection journal', label: 'Reflections' },
  { src: '/remainingweeks-07-lockscreen.webp', alt: 'RemainingWeeks Lock Screen widgets', label: 'Lock Screen' },
  { src: '/remainingweeks-08-watch.webp', alt: 'RemainingWeeks Apple Watch complications', label: 'Apple Watch' },
];

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

const CACHO_SCREENSHOTS: ScreenshotItem[] = [
  { src: '/cacho-posiciones.webp', alt: 'Cachoquiniela World Cup prediction pool leaderboard', label: 'Leaderboard' },
  { src: '/cacho-partidos.webp', alt: 'Cachoquiniela World Cup matches tab', label: 'Matches' },
  { src: '/cacho-stats-overview.webp', alt: 'Cachoquiniela stats and analytics overview', label: 'Stats / Analytics' },
  { src: '/cacho-stats-players.webp', alt: 'Cachoquiniela player breakdown by round', label: 'Player breakdown' },
  { src: '/cacho-stats-unique-hits.webp', alt: 'Cachoquiniela unique hits only one player got right', label: 'Unique hits' },
  { src: '/cacho-stats-missed.webp', alt: 'Cachoquiniela matches nobody predicted correctly', label: 'Missed picks' },
  { src: '/cacho-stats-profiles.webp', alt: 'Cachoquiniela player profiles and group tendencies', label: 'Profiles' },
  { src: '/cacho-stats-tournament.webp', alt: 'Cachoquiniela tournament progress stats', label: 'Tournament' },
  { src: '/cacho-stats-round1.webp', alt: 'Cachoquiniela round 1 analytics filter', label: 'Round 1' },
  { src: '/cacho-stats-round2.webp', alt: 'Cachoquiniela round 2 analytics filter', label: 'Round 2' },
];

const CODTR_SCREENSHOTS: ScreenshotItem[] = [
  { src: '/codtr-01-home.webp', alt: 'CODTR home dashboard', label: 'Home' },
  { src: '/codtr-02-profile.webp', alt: 'CODTR player profile', label: 'Profile' },
  { src: '/codtr-03-leaderboard.webp', alt: 'CODTR global leaderboard', label: 'Leaderboard' },
  { src: '/codtr-04-teams.webp', alt: 'CODTR team management', label: 'Teams' },
  { src: '/codtr-05-tournament-results.webp', alt: 'CODTR tournament results', label: 'Tournament results' },
  { src: '/codtr-06-tournament-stats.webp', alt: 'CODTR tournament statistics', label: 'Tournament stats' },
  { src: '/codtr-07-performance.webp', alt: 'CODTR performance analysis', label: 'Performance' },
  { src: '/codtr-08-notifications.webp', alt: 'CODTR notifications', label: 'Notifications' },
];

const TEAM_SIGNALS = [
  {
    eyebrow: 'Ship',
    title: 'Ships real products',
    body: 'Published WoRD and RemainingWeeks on the App Store and owns the full path from product idea to release.',
  },
  {
    eyebrow: 'Scale',
    title: 'Handles scale',
    body: 'Built for clinical SDKs and multi-million-user retail iOS apps without losing quality.',
  },
  {
    eyebrow: 'Quality',
    title: 'Raises quality bars',
    body: 'Owns XCTest/Appium coverage, CI/CD, release discipline, and measurable regression control.',
  },
  {
    eyebrow: 'AI',
    title: 'Leads AI adoption',
    body: 'Turns Copilot, Cursor, Claude, and Gemini into team workflows, not solo experiments.',
  },
  {
    eyebrow: 'Product',
    title: 'Connects with Product',
    body: 'Communicates tradeoffs clearly with product, design, QA, and stakeholders.',
  },
  {
    eyebrow: 'Outcomes',
    title: 'Focuses on outcomes',
    body: 'Optimizes analytics, crash stability, monetization, and user-facing delivery metrics.',
  },
];

const SECTION = 'mb-10 md:mb-12 scroll-mt-20';

const PORTFOLIO_TOOLING = ['Cursor', 'React 19', 'TypeScript', 'Vite', 'Framer Motion', 'Tailwind', 'Vercel'];

const toolReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

interface PortfolioViewProps {
  onNavigateToApp: () => void;
  onNavigateToRemainingWeeks: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigateToApp, onNavigateToRemainingWeeks }) => {
  const reduceMotion = useReducedMotion();
  const educationData: EducationItem[] = [
    {
      school: 'Monterrey Institute of Technology (ITESM)',
      degree: 'B.S. Industrial & Systems Engineering',
      period: '2016 — 2021',
      location: 'Saltillo, Mexico',
    },
    {
      school: 'Platzi',
      degree: 'Software Development Program',
      period: '2021 — 2023',
      location: 'Online',
    },
  ];

  const skillGroups: { label: string; skills: SkillItem[] }[] = [
    {
      label: 'iOS & Mobile',
      skills: [
        { name: 'Swift 6', color: '', textColor: 'text-orange-300' },
        { name: 'SwiftUI', color: '', textColor: 'text-sky-300' },
        { name: 'UIKit', color: '', textColor: 'text-sky-300' },
        { name: 'Combine', color: '', textColor: 'text-violet-300' },
        { name: 'WidgetKit', color: '', textColor: 'text-zinc-300' },
        { name: 'Objective-C', color: '', textColor: 'text-zinc-400' },
      ],
    },
    {
      label: 'Quality & DevOps',
      skills: [
        { name: 'XCTest', color: '', textColor: 'text-rose-300' },
        { name: 'Appium', color: '', textColor: 'text-emerald-300' },
        { name: 'Fastlane', color: '', textColor: 'text-sky-300' },
        { name: 'GitHub Actions', color: '', textColor: 'text-zinc-300' },
        { name: 'TestRail', color: '', textColor: 'text-zinc-400' },
      ],
    },
    {
      label: 'Web & Data',
      skills: [
        { name: 'React 19', color: '', textColor: 'text-sky-300' },
        { name: 'Next.js', color: '', textColor: 'text-zinc-300' },
        { name: 'TypeScript', color: '', textColor: 'text-sky-300' },
        { name: 'Supabase', color: '', textColor: 'text-emerald-300' },
        { name: 'PostgreSQL', color: '', textColor: 'text-emerald-300' },
        { name: 'WebSockets', color: '', textColor: 'text-teal-300' },
      ],
    },
  ];

  const tools: ToolItem[] = [
    {
      name: 'GitHub Copilot',
      description: 'Introduced at IBM & ITJuana — prompt libraries, guides, team standards.',
      type: 'Team lead',
      icon: <Command className="w-5 h-5 text-violet-400" strokeWidth={1.5} />,
      gradient: 'from-violet-500/10 to-transparent',
    },
    {
      name: 'Gemini CLI',
      description: 'Production workflows for parallel SDK releases without extra headcount.',
      type: 'Production',
      icon: <Bot className="w-5 h-5 text-sky-400" strokeWidth={1.5} />,
      gradient: 'from-sky-500/10 to-transparent',
    },
    {
      name: 'Cursor IDE',
      description: 'Daily driver for SwiftUI, refactors, and shipping WoRD to the App Store.',
      type: 'Daily',
      icon: <Terminal className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />,
      gradient: 'from-zinc-500/10 to-transparent',
    },
    {
      name: 'Claude Code',
      description: 'Architecture, test strategy, and complex iOS debugging.',
      type: 'Deep work',
      icon: <Cpu className="w-5 h-5 text-amber-300" strokeWidth={1.5} />,
      gradient: 'from-amber-500/10 to-transparent',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 pb-28 pt-5 md:pt-8">
      {/* Hero — product deck + organic proof */}
      <section id="top" className={`${SECTION} pt-2`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-shell grid grid-cols-1 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] gap-8 lg:gap-10 items-center"
        >
          <div className="hero-copy">
            <div className="hero-accent-line" />
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-4">
              <span className="status-dot" aria-hidden />
              <span className="font-mono text-[10px] tracking-wide text-zinc-500 uppercase">
                Open to opportunities
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-[3.35rem] font-semibold tracking-tight leading-[1.02]">
              <span className="text-gradient">Alan Gloria</span>
              <span className="block text-zinc-500 font-normal text-2xl sm:text-3xl mt-2">
                iOS Engineer building <span className="text-gradient-accent">product systems</span>
              </span>
            </h1>

            <p className="mt-4 text-base text-zinc-400 leading-relaxed max-w-[62ch]">
              I ship native Apple products at scale — clinical SDKs, 3M-user retail apps, and my own App Store
              releases. I own architecture, automated testing, CI/CD, and the AI tooling standards teams actually
              adopt.
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                Saltillo, MX · Remote
              </span>
              <span className="text-zinc-700">·</span>
              <span className="inline-flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
                Spanish native · English B2
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <button type="button" className="btn-primary text-sm py-2 px-4" onClick={() => window.open('mailto:alangloriasilva@hotmail.com')}>
                <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                Contact
              </button>
              <button type="button" className="btn-ghost text-sm py-2 px-4" onClick={() => window.open('https://github.com/alandavid11', '_blank')}>
                GitHub <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <button type="button" className="btn-ghost text-sm py-2 px-4" onClick={() => window.open('https://www.linkedin.com/in/alan-gloria/', '_blank')}>
                LinkedIn <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="proof-ribbon mt-6" aria-label="Recruiter signal highlights">
              {TEAM_SIGNALS.map((signal, index) => (
                <motion.article
                  key={signal.title}
                  custom={index}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + index * 0.05, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="proof-chip"
                >
                  <span>{signal.eyebrow}</span>
                  <strong>{signal.title}</strong>
                  <p>{signal.body}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <ProductDeck />
        </motion.div>
        <div className="section-divider" aria-hidden />
      </section>

      {/* About — split with quick facts */}
      <section id="about" className={SECTION}>
        <SectionHeading
          kicker="01 — Profile"
          title="About"
          description="Industrial engineering roots; today focused on native iOS and production-grade delivery."
          compact
        />
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-3">
          <GlassCard compact revealIndex={0} className="story-panel">
            <p className="text-sm text-zinc-300 leading-relaxed">
              4+ years building consumer and clinical iOS apps in Swift, SwiftUI, and UIKit. I lead technical
              delivery end-to-end — architecture, Appium/XCTest automation, Fastlane + GitHub Actions, and
              cross-functional work with Product & Design. Team reference for AI-assisted development: pioneered
              GitHub Copilot at IBM, scaled Gemini CLI at ITJuana. Independently published{' '}
              <button type="button" className="text-zinc-100 link-underline" onClick={onNavigateToApp}>
                WoRD
              </button>{' '}
              and{' '}
              <button type="button" className="text-zinc-100 link-underline" onClick={onNavigateToRemainingWeeks}>
                RemainingWeeks
              </button>{' '}
              on the App Store (widgets, watchOS, RevenueCat subscriptions).
            </p>
          </GlassCard>
          <GlassCard compact className="story-panel flex flex-col justify-center gap-2" revealIndex={1}>
            <p className="section-kicker text-zinc-500">Focus areas</p>
            {['Clinical & regulated SDKs', 'High-scale retail iOS', 'CI/CD & test automation', 'Monetization & App Store'].map(
              (item) => (
                <p key={item} className="text-xs text-zinc-400 flex gap-2">
                  <span className="text-sky-500">▸</span>
                  {item}
                </p>
              )
            )}
          </GlassCard>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className={SECTION}>
        <SectionHeading
          kicker="02 — Career"
          title="Experience"
          description="Consulting healthcare SDKs, US retail at millions of users, freelance App Store ship, and manufacturing automation."
          compact
        />
        <div className="grid grid-cols-1 gap-3">
          {experienceData.map((exp, i) => (
            <ExperienceCard key={exp.company} item={exp} index={i} />
          ))}
        </div>
        <div className="section-divider mt-10" aria-hidden />
      </section>

      {/* Projects */}
      <section id="projects" className={SECTION}>
        <SectionHeading
          kicker="03 — Ship"
          title="Projects"
          description="App Store products and production web apps with clear user value."
          compact
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* WoRD — featured full width */}
          <GlassCard id="project-word" className="lg:col-span-12 bento-card project-card project-card-word group flex flex-col scroll-mt-24" accent="rose" revealIndex={0}>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-4 items-start">
              <div>
                <div className="flex items-start gap-3 mb-2">
                  <img src="/word-icon.webp" alt="WoRD" className="project-emblem w-12 h-12 rounded-xl border border-white/10 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-zinc-50">WoRD</h3>
                      <span className="tag-pill text-rose-300/90 border-rose-500/20 bg-rose-500/10">App Store · 4.4★</span>
                    </div>
                    <p className="text-xs font-mono text-zinc-600 mt-0.5">Speed Reading Trainer · SwiftUI</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  CADisplayLink RSVP engine, personalized Reading Plans, 720 stories in 4 languages, WidgetKit widgets,
                  Swift Charts analytics, and shareable stat cards. RevenueCat subscriptions (WoRD Pro) with a
                  conversion-focused paywall + AdMob behind a single entitlement, plus ongoing ASO and social growth.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['SwiftUI', 'MVVM', 'RevenueCat', 'AdMob', 'WidgetKit'].map((t) => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/[0.06]">
                  <button
                    type="button"
                    className="btn-primary text-xs py-2 px-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(WORD_APP_STORE_URL, '_blank');
                    }}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> App Store
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs text-sky-400 font-medium"
                    onClick={onNavigateToApp}
                  >
                    Case study <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <ScreenshotGallery items={WORD_SCREENSHOTS} variant="phone" />
            </div>
          </GlassCard>

          {/* RemainingWeeks — featured full width */}
          <GlassCard id="project-remainingweeks" className="lg:col-span-12 bento-card project-card project-card-rweeks group flex flex-col scroll-mt-24" accent="amber" revealIndex={1}>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-4 items-start">
              <div>
                <div className="flex items-start gap-3 mb-2">
                  <img src="/remainingweeks-icon.webp" alt="RemainingWeeks" className="project-emblem w-12 h-12 rounded-xl border border-white/10 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-zinc-50">RemainingWeeks</h3>
                      <span className="tag-pill text-orange-300/90 border-orange-500/20 bg-orange-500/10">App Store · New</span>
                    </div>
                    <p className="text-xs font-mono text-zinc-600 mt-0.5">Memento mori life calendar · SwiftUI</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Your life expectancy as a grid of weeks — iPhone, iPad, Home &amp; Lock Screen widgets, and Apple
                  Watch complications, all fed by one shared design system. Custom countdowns, a weekly reflection
                  journal, Shortcuts wallpaper automation, iCloud sync, and RevenueCat subscriptions with a 7-day trial.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['SwiftUI', 'SwiftData', 'WidgetKit', 'watchOS', 'RevenueCat'].map((t) => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/[0.06]">
                  <button
                    type="button"
                    className="btn-primary text-xs py-2 px-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(RWEEKS_APP_STORE_URL, '_blank');
                    }}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> App Store
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs text-orange-300 font-medium"
                    onClick={onNavigateToRemainingWeeks}
                  >
                    Case study <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <ScreenshotGallery items={RWEEKS_SCREENSHOTS} variant="phone" />
            </div>
          </GlassCard>

          {/* Cachoquiniela — full-width desktop screenshots */}
          <GlassCard id="project-cachoquiniela" className="lg:col-span-12 bento-card project-card project-card-cacho flex flex-col scroll-mt-24" accent="emerald" revealIndex={2}>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 items-start">
              <div>
                <div className="flex items-start gap-3 mb-2">
                  <div className="project-emblem w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-zinc-50">Cachoquiniela</h3>
                      <span className="tag-pill text-emerald-300/90 border-emerald-500/20 bg-emerald-500/10">Vercel</span>
                    </div>
                    <p className="text-xs font-mono text-zinc-600">World Cup prediction pool with friends</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  World Cup pool for friends with 72 predictions per player (W/D/L), live leaderboard, match tabs,
                  streak and unique-hit analytics, and PIN-gated admin via Supabase RPC.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['React 19', 'TypeScript', 'Supabase', 'Vite'].map((t) => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn-ghost mt-3 text-xs py-2"
                  onClick={() => window.open('https://cachoquiniela.vercel.app/', '_blank')}
                >
                  cachoquiniela.vercel.app <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <ScreenshotGallery items={CACHO_SCREENSHOTS} variant="desktop" />
            </div>
          </GlassCard>

          {/* CODTR — full-width desktop screenshots */}
          <GlassCard id="project-codtr" className="lg:col-span-12 bento-card project-card project-card-codtr flex flex-col scroll-mt-24" accent="sky" revealIndex={3}>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 items-start">
              <div>
                <div className="flex items-start gap-3 mb-2">
                  <div className="project-emblem w-12 h-12 rounded-xl bg-zinc-800 border border-white/[0.08] flex items-center justify-center font-mono font-semibold text-zinc-200 shrink-0">
                    C
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-zinc-50">CODTR</h3>
                      <span className="tag-pill text-sky-300/90 border-sky-500/20 bg-sky-500/10">Completed, now discontinued</span>
                    </div>
                    <p className="text-xs font-mono text-zinc-600">CoD Warzone tournament platform · discontinued</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Past production platform for Call of Duty Warzone tournaments: live brackets, WebSocket score sync, OAuth,
                  WSOW/CDL scoring rules — Next.js 15, TypeScript, PostgreSQL. The project has since been discontinued.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['Next.js', 'WebSockets', 'PostgreSQL', 'OAuth'].map((t) => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
              </div>
              <ScreenshotGallery items={CODTR_SCREENSHOTS} variant="desktop" />
            </div>
          </GlassCard>
        </div>
        <div className="built-strip mt-3" aria-label="Portfolio tooling">
          <div>
            <p className="section-kicker text-zinc-600">Built with</p>
            <p className="text-xs text-zinc-400 mt-1">
              This portfolio was built in Cursor and deployed on Vercel.
            </p>
          </div>
          <div className="built-strip-tags">
            {PORTFOLIO_TOOLING.map((tool) => (
              <span key={tool} className="tag-pill">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section id="coming-soon" className={SECTION}>
        <SectionHeading
          kicker="04 — Next"
          title="Coming soon"
          description="Products currently in progress or planned for the next release cycle."
          compact
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <GlassCard className="bento-card project-card flex flex-col" accent="emerald" revealIndex={0}>
            <div className="flex items-start gap-3 mb-2">
              <div className="project-emblem w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-zinc-50">Rolya</h3>
                  <span className="tag-pill text-emerald-300/90 border-emerald-500/20 bg-emerald-500/10">WIP</span>
                </div>
                <p className="text-xs font-mono text-zinc-600">Shift scheduling SaaS · Next.js</p>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Mobile-friendly scheduling and attendance tooling for Mexican SMBs: employee setup, recurring shift
              templates, weekly schedules, time-off requests, and planned attendance/reporting workflows.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['Next.js', 'React 19', 'Supabase', 'Stripe'].map((t) => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Education + Skills — 2 columns */}
      <section id="education" className={SECTION}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <SectionHeading kicker="05 — Background" title="Education" compact />
            <div className="space-y-2">
              {educationData.map((edu, i) => (
                <GlassCard key={edu.school} compact revealIndex={i}>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-sky-400/80">{edu.period}</p>
                  <h3 className="text-sm font-semibold text-zinc-50 mt-1 leading-snug">{edu.degree}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{edu.school}</p>
                  {edu.location && <p className="text-[11px] text-zinc-600 font-mono">{edu.location}</p>}
                </GlassCard>
              ))}
            </div>
          </div>
          <div id="skills">
            <SectionHeading
              kicker="06 — Stack"
              title="Technical skills"
              description="Mobile-first; quality and web when the product needs it."
              compact
            />
            <div className="space-y-4">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="section-kicker text-zinc-600 mb-2">{group.label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span key={skill.name} className={`tag-pill text-xs py-1 px-2 ${skill.textColor}`}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI tools */}
      <section id="tools" className={SECTION}>
        <SectionHeading
          kicker="07 — Workflow"
          title="AI & tooling"
          description="I introduce AI tools to teams and make them stick — not just use them solo."
          compact
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              custom={i}
              initial={reduceMotion ? false : 'hidden'}
              whileInView={reduceMotion ? undefined : 'visible'}
              viewport={{ once: true, margin: '-30px' }}
              variants={toolReveal}
              className="card-interactive liquid-glass rounded-2xl p-4 relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] transition-transform duration-200 group-hover:scale-105">{tool.icon}</div>
                  <span className="font-mono text-[9px] uppercase text-zinc-600">{tool.type}</span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-50">{tool.name}</h3>
                <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{tool.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20">
        <GlassCard className="text-center py-8 md:py-10">
          <Sparkles className="w-5 h-5 text-sky-400 mx-auto mb-3" strokeWidth={1.5} />
          <h2 className="text-xl md:text-2xl font-semibold text-zinc-50 mb-2">Let&apos;s build something solid</h2>
          <p className="text-zinc-500 max-w-sm mx-auto mb-6 text-xs leading-relaxed">
            iOS roles, contract work, or product collaborations — I respond quickly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <button type="button" className="btn-primary text-sm py-2 px-4" onClick={() => window.open('mailto:alangloriasilva@hotmail.com')}>
              <Mail className="w-3.5 h-3.5" /> alangloriasilva@hotmail.com
            </button>
            <button type="button" className="btn-ghost text-sm py-2 px-4" onClick={() => window.open('https://www.linkedin.com/in/alan-gloria/', '_blank')}>
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </button>
          </div>
          <p className="font-mono text-[10px] text-zinc-700 mt-6">
            © {new Date().getFullYear()} Alan Gloria
          </p>
        </GlassCard>
      </section>
    </div>
  );
};
