import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { ExperienceCard } from '../components/ExperienceCard';
import { HeroPhone } from '../components/home/HeroPhone';
import { Flagship } from '../components/home/Flagship';
import { AppShowcase, CaseStudyView } from '../components/home/AppShowcase';
import { Reveal, SectionHead } from '../components/home/Section';
import { experienceData } from '../data/experience';

const EMAIL = 'alangloriasilva@hotmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/alan-gloria/';
const GITHUB = 'https://github.com/alandavid11';

const HERO_METRICS = [
  { value: '6', label: 'iOS apps of mine live on the App Store' },
  { value: '3.1M', label: 'active users on the retail app I shipped at IBM' },
  { value: '99.97%', label: 'crash-free sessions at that scale' },
  { value: '~24%', label: 'faster regression runs on a clinical iOS SDK' },
];

const OTHER_WORK = [
  {
    title: 'Cachoquiniela',
    status: 'Web · React 19 + Supabase',
    body: 'A World Cup prediction pool for friends with a live leaderboard, match tabs, and streak and unique-hit analytics.',
    href: 'https://cachoquiniela.vercel.app/',
    cta: 'cachoquiniela.vercel.app',
    image: '/cacho-posiciones.webp',
  },
  {
    title: 'POSMe Caja',
    status: 'App Store · iPad',
    body: 'The POSMe register on iPad, sharing the same offline-first core and the WalletMe NFC loyalty flow as the Windows and Android registers.',
    href: 'https://apps.apple.com/mx/app/posme-caja/id6826106180',
    cta: 'Get it on the App Store',
    image: '/posme-ipad.webp',
  },
];

const FREE_TOOLS = [
  { label: 'Reading speed test', href: '/word/wpm-test' },
  { label: 'Weeks left this year', href: '/remainingweeks/weeks-left-this-year' },
  { label: 'Life in weeks calculator', href: '/remainingweeks/calculator' },
  { label: 'Packing list generator', href: '/triplook/packing-list' },
];

const STACK = [
  {
    label: 'iOS',
    items: 'Swift 6, SwiftUI, UIKit, Swift Concurrency, Combine, SwiftData, WidgetKit, watchOS, Metal, Vision, AVFoundation, App Attest, PassKit, StoreKit',
  },
  { label: 'Quality', items: 'XCTest, Swift Testing, Appium, TestRail, Fastlane, GitHub Actions' },
  { label: 'Product web', items: 'TypeScript, React 19, Next.js, Supabase, PostgreSQL with RLS, Stripe, Tauri 2 + Rust' },
];

const AI_WORKFLOW = [
  { tool: 'Claude Code', note: 'Daily driver. Spec first, a reviewed plan before any code, tests as the auditor.' },
  { tool: 'GitHub Copilot', note: 'Pioneered on the IBM iOS squad and rolled out at ITJuana.' },
  { tool: 'Gemini CLI', note: 'Led adoption at ITJuana, freeing capacity for two parallel SDK release tracks.' },
];

const EDUCATION = [
  { degree: 'B.S. Industrial & Systems Engineering', school: 'Monterrey Institute of Technology (ITESM)', period: '2016 to 2021' },
  { degree: 'Software Development Program', school: 'Platzi', period: '2021 to 2023' },
];

const SECTION = 'scroll-mt-20 mb-24 md:mb-36';
const EASE = [0.16, 1, 0.3, 1] as const;

interface PortfolioViewProps {
  onNavigateToApp: () => void;
  onNavigateToRemainingWeeks: () => void;
  onNavigateToTriplook: () => void;
  onNavigateToRaro: () => void;
  onNavigateToWalletMe: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  onNavigateToApp,
  onNavigateToRemainingWeeks,
  onNavigateToTriplook,
  onNavigateToRaro,
  onNavigateToWalletMe,
}) => {
  const reduceMotion = useReducedMotion();
  const openCaseStudy: Record<CaseStudyView, () => void> = {
    'raro-detail': onNavigateToRaro,
    'triplook-detail': onNavigateToTriplook,
    'app-detail': onNavigateToApp,
    'remainingweeks-detail': onNavigateToRemainingWeeks,
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-28 pt-8 md:pt-14">
      <section id="top" className={SECTION}>
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-14 items-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-7">
              <span className="status-dot" aria-hidden />
              <span className="text-xs text-zinc-400">Open to iOS roles</span>
            </div>
            <h1 className="text-6xl sm:text-7xl font-semibold tracking-[-0.055em] leading-[0.9] text-zinc-50">
              Alan Gloria
            </h1>
            <p className="mt-6 text-2xl sm:text-3xl tracking-[-0.03em] leading-tight text-zinc-400 max-w-[24ch]">
              iOS engineer. I build products people use, and pay for.
            </p>
            <p className="mt-6 text-base md:text-lg text-zinc-400 leading-relaxed max-w-[58ch]">
              Native iOS for a clinical-grade medical device and a 3.1M-user retail app. On my own, six apps on the
              App Store and{' '}
              <a href="#project-walletme" className="text-zinc-100 link-underline">
                WalletMe + POSMe
              </a>
              , a point of sale running in real stores.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-8">
              <a className="btn-primary text-sm py-2.5 px-5" href={`mailto:${EMAIL}`}>
                <Mail className="w-4 h-4" strokeWidth={1.75} /> Get in touch
              </a>
              <a className="btn-ghost text-sm py-2.5 px-5" href={LINKEDIN} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a className="btn-ghost text-sm py-2.5 px-5" href={GITHUB} target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-zinc-500">
              <MapPin className="w-3.5 h-3.5" strokeWidth={1.75} /> Saltillo, Mexico · Remote · Spanish and English
            </p>
          </motion.div>
          <HeroPhone />
        </div>

        <dl className="mt-14 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 border-t border-white/[0.08] pt-8">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1.5">
              <dt className="order-2 metric-label max-w-[24ch]">{metric.label}</dt>
              <dd className="metric-value">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="projects" className={SECTION}>
        <SectionHead
          eyebrow="Selected work"
          title="Products I built and run."
          lead="Everything here is live: a platform with paying businesses and four apps on the App Store, each designed, engineered and shipped by me."
        />
        <Flagship onOpenCaseStudy={onNavigateToWalletMe} />
        <div className="mt-4">
          <AppShowcase onOpen={(view) => openCaseStudy[view]()} />
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {OTHER_WORK.map((work, i) => (
            <Reveal key={work.title} delay={i * 0.05}>
              <a href={work.href} target="_blank" rel="noreferrer" className="other-card group">
                <div className="other-thumb">
                  <img src={work.image} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-zinc-500">{work.status}</p>
                  <h3 className="text-base font-semibold text-zinc-50 mt-1">{work.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mt-2">{work.body}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm text-zinc-300 group-hover:text-zinc-50">
                    {work.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
          <Reveal delay={0.1}>
            <div className="other-card p-5 h-full">
              <p className="text-xs text-zinc-500">Free web tools</p>
              <h3 className="text-base font-semibold text-zinc-50 mt-1">Growth funnels for my apps</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mt-2">
                Bilingual SEO tools that rank on Google and send readers to the App Store.
              </p>
              <ul className="mt-4 space-y-2">
                {FREE_TOOLS.map((tool) => (
                  <li key={tool.href}>
                    <a href={tool.href} className="inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-zinc-50">
                      {tool.label} <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="experience" className={SECTION}>
        <SectionHead
          eyebrow="Experience"
          title="Where I've shipped."
          lead="A regulated medical-device SDK, a US retail app at millions of users, a solo App Store launch, and the factory floor where I started."
        />
        <div className="border-b border-white/[0.08]">
          {experienceData.map((exp, i) => (
            <ExperienceCard key={exp.company} item={exp} index={i} />
          ))}
        </div>
      </section>

      <section id="about" className={SECTION}>
        <SectionHead eyebrow="About" title="How I work." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <Reveal>
            <p className="text-lg text-zinc-300 leading-relaxed">
              I came to software from industrial engineering, so I think in systems and in what actually happens on
              the floor. I own features end to end: architecture, tests, CI/CD, release and what the numbers say after
              launch.
            </p>
            <h3 className="eyebrow mt-10 mb-4">AI in my workflow</h3>
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {AI_WORKFLOW.map((row) => (
                <li key={row.tool} className="grid grid-cols-[140px_1fr] gap-4 py-4">
                  <span className="text-sm font-medium text-zinc-100">{row.tool}</span>
                  <span className="text-sm text-zinc-400 leading-relaxed">{row.note}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="eyebrow mb-4">Stack</h3>
            <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {STACK.map((group) => (
                <div key={group.label} className="grid grid-cols-[110px_1fr] gap-4 py-4">
                  <dt className="text-sm font-medium text-zinc-100">{group.label}</dt>
                  <dd className="text-sm text-zinc-400 leading-relaxed">{group.items}</dd>
                </div>
              ))}
            </dl>
            <h3 className="eyebrow mt-10 mb-4">Education</h3>
            <ul className="space-y-3">
              {EDUCATION.map((edu) => (
                <li key={edu.degree} className="flex flex-wrap justify-between gap-x-4 text-sm">
                  <span className="text-zinc-200">
                    {edu.degree} <span className="text-zinc-500">· {edu.school}</span>
                  </span>
                  <span className="font-mono text-xs text-zinc-500">{edu.period}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20">
        <Reveal>
          <div className="contact-band px-6 py-14 md:px-14 md:py-20">
            <p className="eyebrow mb-4">Contact</p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.045em] leading-[0.98] text-zinc-50 max-w-[16ch]">
              Let&apos;s build something people use.
            </h2>
            <p className="mt-5 text-base md:text-lg text-zinc-400 max-w-[48ch]">
              iOS roles, contract work or product collaborations. I reply fast.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              <a className="btn-primary text-sm py-2.5 px-5" href={`mailto:${EMAIL}`}>
                <Mail className="w-4 h-4" strokeWidth={1.75} /> {EMAIL}
              </a>
              <a className="btn-ghost text-sm py-2.5 px-5" href={LINKEDIN} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </Reveal>
        <p className="font-mono text-[11px] text-zinc-600 mt-8 text-center">© {new Date().getFullYear()} Alan Gloria</p>
      </section>
    </div>
  );
};
