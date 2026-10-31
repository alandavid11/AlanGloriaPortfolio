import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { APPS } from '../../data/apps';

interface LauncherApp {
  id: string;
  label: string;
  name: string;
  icon: string;
  screen: string;
  rgb: string;
  tagline: string;
  status: string;
}

const SHORT_LABEL: Record<string, string> = { RARO: 'Raro', RemainingWeeks: 'Weeks' };

const LAUNCHER: LauncherApp[] = [
  {
    id: 'posme',
    label: 'POSMe',
    name: 'POSMe for iPhone',
    icon: '/posme-icon.webp',
    screen: '/posme-iphone-inicio.webp',
    rgb: '167, 139, 250',
    tagline: 'The owner app for my point of sale.',
    status: 'App Store · SwiftUI',
  },
  ...APPS.map((app) => ({
    id: app.anchorId,
    label: SHORT_LABEL[app.name] ?? app.name,
    name: app.name,
    icon: app.icon,
    screen: app.screen,
    rgb: app.rgb,
    tagline: app.tagline,
    status: app.status,
  })),
];

type Phase = 'home' | 'tapping' | 'open';

const PHASE_MS: Record<Phase, number> = { home: 1500, tapping: 380, open: 3000 };
const NEXT_PHASE: Record<Phase, Phase> = { home: 'tapping', tapping: 'open', open: 'home' };
const SPRING = { type: 'spring' as const, stiffness: 260, damping: 30 };

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function weeksLeftThisYear(now = new Date()): number {
  const end = new Date(now.getFullYear() + 1, 0, 1);
  return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / WEEK_MS));
}

const WeeksWidget: React.FC = () => {
  const left = weeksLeftThisYear();
  const lived = 52 - left;
  return (
    <div className="hp-widget">
      <div>
        <p className="hp-widget-number">{left}</p>
        <p className="hp-widget-label">weeks left this year</p>
      </div>
      <div className="hp-weeks" aria-hidden>
        {Array.from({ length: 52 }, (_, i) => (
          <span key={i} className={i < lived ? 'is-lived' : i === lived ? 'is-now' : ''} />
        ))}
      </div>
    </div>
  );
};

/** An iPhone home screen with my own apps that open and close themselves, like a demo reel. */
export const HeroPhone: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('home');
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const running = !reduceMotion && inView && pageVisible;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      if (phase === 'open') setIndex((i) => (i + 1) % LAUNCHER.length);
      setPhase(NEXT_PHASE[phase]);
    }, PHASE_MS[phase]);
    return () => window.clearTimeout(timer);
  }, [phase, running]);

  const current = LAUNCHER[index];

  const openApp = (i: number) => {
    setIndex(i);
    setPhase('open');
  };

  return (
    <div ref={rootRef} className="hero-phone-wrap" style={{ '--app-rgb': current.rgb } as React.CSSProperties}>
      <div className="hero-phone-glow" aria-hidden />
      <motion.div
        className="hero-phone"
        initial={reduceMotion ? false : { opacity: 0, y: 30, rotate: -2 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <div className="hero-phone-screen">
          <LayoutGroup>
            <div className="hp-home">
              <div className="hp-status">
                <span>9:41</span>
                <span className="hp-status-icons" aria-hidden>
                  <i />
                  <i />
                  <i />
                  <b />
                </span>
              </div>
              <WeeksWidget />
              <ul className="hp-grid">
                {LAUNCHER.map((app, i) => (
                  <li key={app.id}>
                    <button type="button" className="hp-app" onClick={() => openApp(i)} aria-label={`Open ${app.name}`}>
                      <span className="hp-icon-slot">
                        {!(phase === 'open' && i === index) && (
                          <motion.img
                            layoutId={`hp-${app.id}`}
                            src={app.icon}
                            alt=""
                            className="hp-icon"
                            style={{ borderRadius: 12 }}
                            animate={{ scale: phase === 'tapping' && i === index ? 0.88 : 1 }}
                            transition={SPRING}
                          />
                        )}
                        {phase === 'tapping' && i === index && (
                          <motion.span
                            className="hp-ripple"
                            initial={{ scale: 0.4, opacity: 0.55 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                          />
                        )}
                      </span>
                      <span className="hp-label">{app.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="hp-small-widgets">
                <div className="hp-small hp-small-word">
                  <p className="hp-small-app">WoRD</p>
                  <p className="hp-small-number">580</p>
                  <p className="hp-small-label">WPM reading level</p>
                </div>
                <div className="hp-small hp-small-posme">
                  <p className="hp-small-app">POSMe · today</p>
                  <p className="hp-small-number">$7,479</p>
                  <p className="hp-small-label">+31% vs last week</p>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {phase === 'open' && (
                <motion.button
                  key={current.id}
                  type="button"
                  layoutId={`hp-${current.id}`}
                  className="hp-open"
                  style={{ borderRadius: 34 }}
                  transition={SPRING}
                  onClick={() => setPhase('home')}
                  aria-label={`Close ${current.name}`}
                >
                  <img src={current.screen} alt={`${current.name} running on iPhone`} />
                </motion.button>
              )}
            </AnimatePresence>
          </LayoutGroup>
          <span className="hp-island" aria-hidden />
          <span className="hp-home-indicator" aria-hidden />
        </div>
      </motion.div>

      <div className="hero-phone-caption">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-semibold text-zinc-50">{current.name}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{current.tagline}</p>
          </motion.div>
        </AnimatePresence>
        <div className="hp-dots" role="tablist" aria-label="My apps">
          {LAUNCHER.map((app, i) => (
            <button
              key={app.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={app.name}
              className={i === index ? 'is-active' : ''}
              onClick={() => openApp(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
