import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Home, User, Briefcase, Folder } from 'lucide-react';
import { ViewState } from '../types';

interface DockProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const NAV_ITEMS = [
  { id: 'top', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Work', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Folder },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]['id'];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
const WORD_ID = 'word';
const VIEWPORT_MARKER = 0.5;
const SCROLL_TARGET_ATTEMPTS = 120;

const isSectionId = (id: string): id is SectionId =>
  SECTION_IDS.includes(id as SectionId);

const hashSection = () => {
  const id = window.location.hash.replace('#', '');
  return isSectionId(id) ? id : null;
};

export const Dock: React.FC<DockProps> = ({ currentView, setView }) => {
  const [activeSection, setActiveSection] = useState<SectionId>('top');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (currentView !== 'portfolio') return;

    let frameId: number | null = null;
    let observer: MutationObserver | null = null;

    const getSections = () =>
      SECTION_IDS.map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section) && isSectionId(section.id));

    const updateActiveSection = () => {
      frameId = null;

      const sections = getSections();
      if (sections.length === 0) return;

      const marker = window.innerHeight * VIEWPORT_MARKER;
      const current = sections.reduce((active, section) => {
        return section.getBoundingClientRect().top <= marker ? section : active;
      }, sections[0]);

      if (isSectionId(current.id)) {
        setActiveSection((previous) => (previous === current.id ? previous : current.id));
      }
    };

    const queueUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateActiveSection);
      }
    };

    const handleHashChange = () => {
      const id = hashSection();
      if (id) setActiveSection(id);
      queueUpdate();
    };

    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate);
    window.addEventListener('hashchange', handleHashChange);

    if ('MutationObserver' in window) {
      observer = new MutationObserver(queueUpdate);
      observer.observe(document.body, { childList: true, subtree: true });
    }

    handleHashChange();

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
      window.removeEventListener('hashchange', handleHashChange);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [currentView]);

  const scrollToSection = (sectionId: SectionId, attempts = 0) => {
    const target = document.getElementById(sectionId);

    if (!target && attempts < SCROLL_TARGET_ATTEMPTS) {
      window.requestAnimationFrame(() => scrollToSection(sectionId, attempts + 1));
      return;
    }

    target?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const goSection = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    setView('portfolio');
    window.requestAnimationFrame(() => scrollToSection(sectionId));
  };

  const iconClass = (active: boolean) =>
    `w-[18px] h-[18px] transition-colors duration-200 ${
      active ? 'text-sky-400' : 'text-zinc-500 group-hover:text-zinc-200'
    }`;

  const activeItemId = currentView === 'app-detail' ? WORD_ID : activeSection;
  const showIndicator = (active: boolean) =>
    active && !reduceMotion ? (
      <motion.span
        layoutId="dock-indicator"
        className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06]"
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    ) : active ? (
      <span className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06]" />
    ) : null;

  return (
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-max max-w-[94vw]"
      aria-label="Section navigation"
    >
      <div className="liquid-glass dock-pulse relative flex items-center gap-0.5 px-1.5 py-1.5 rounded-full shadow-xl shadow-black/40 border border-white/[0.08]">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeItemId === id;
          return (
            <button
              key={id}
              type="button"
              className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
                isActive ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-100'
              }`}
              onClick={() => goSection(id)}
              aria-current={isActive ? 'location' : undefined}
            >
              {showIndicator(isActive)}
              <Icon className={`relative ${iconClass(isActive)}`} strokeWidth={1.5} />
              <span className="relative hidden sm:inline">{label}</span>
            </button>
          );
        })}

        <div className="w-px h-5 bg-white/10 mx-0.5" aria-hidden />

        <button
          type="button"
          className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
            activeItemId === WORD_ID ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-100'
          }`}
          onClick={() => {
            setView('app-detail');
            window.requestAnimationFrame(() => {
              window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
            });
          }}
          aria-current={activeItemId === WORD_ID ? 'page' : undefined}
        >
          {showIndicator(activeItemId === WORD_ID)}
          <img
            src="/word-icon.webp"
            alt="WoRD app icon"
            className={`relative w-[18px] h-[18px] shrink-0 rounded-[5px] object-cover ring-1 transition-shadow duration-200 ${
              activeItemId === WORD_ID ? 'ring-rose-300/50' : 'ring-white/10 group-hover:ring-white/25'
            }`}
          />
          <span className="relative hidden sm:inline">WoRD</span>
        </button>
      </div>
    </nav>
  );
};
