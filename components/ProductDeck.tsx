import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PHONES = [
  {
    name: 'Raro',
    meta: 'App Store · In review',
    anchorId: 'project-raro',
    icon: '/raro-icon.webp',
    src: '/raro-app-home.webp',
    alt: 'Raro collection grid with collectible cards of real places',
    accentClass: 'deck-phone-raro',
  },
  {
    name: 'Triplook',
    meta: 'App Store · New',
    anchorId: 'project-triplook',
    icon: '/triplook-icon.webp',
    src: '/triplook-closet.webp',
    alt: 'Triplook AI-tagged digital closet with background-removed garments',
    accentClass: 'deck-phone-triplook',
  },
  {
    name: 'WoRD',
    meta: 'App Store · 4.4★',
    anchorId: 'project-word',
    icon: '/word-icon.webp',
    src: '/word-01-home.webp',
    alt: 'WoRD speed reading app home screen',
    accentClass: 'deck-phone-word',
  },
  {
    name: 'RemainingWeeks',
    meta: 'App Store',
    anchorId: 'project-remainingweeks',
    icon: '/remainingweeks-icon.webp',
    src: '/remainingweeks-app-home.webp',
    alt: 'RemainingWeeks dashboard showing weeks left this year',
    accentClass: 'deck-phone-rweeks',
  },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export const ProductDeck: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const handleProjectScroll = (event: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
    event.preventDefault();
    const target = document.getElementById(anchorId);

    if (!target) return;

    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.pushState(null, '', `#${anchorId}`);
  };

  return (
    <motion.aside
      className="product-deck"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      aria-label="Selected shipped products"
    >
      <div className="product-deck-glow" aria-hidden />

      <div className="deck-showcase">
        <motion.a
          href="#project-rolya"
          className="deck-browser"
          aria-label="View Rolya project details"
          onClick={(event) => handleProjectScroll(event, 'project-rolya')}
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
        >
          <span className="deck-browser-chrome">
            <span className="deck-browser-dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span className="deck-browser-url">
              <img src="/rolya-icon.webp" alt="" aria-hidden />
              rolya.com.mx
            </span>
            <span className="deck-browser-live">
              <span className="deck-live-dot" aria-hidden />
              Live
            </span>
          </span>
          <img
            className="deck-browser-shot"
            src="/rolya-01-landing-960.webp"
            srcSet="/rolya-01-landing-960.webp 960w, /rolya-01-landing.webp 1600w"
            sizes="(min-width: 1024px) 640px, 92vw"
            alt="Rolya shift-scheduling SaaS landing page"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </motion.a>

        <div className="deck-phones">
          {PHONES.map((phone, index) => (
            <motion.a
              key={phone.name}
              href={`#${phone.anchorId}`}
              className={`deck-phone ${phone.accentClass}`}
              aria-label={`View ${phone.name} project details`}
              onClick={(event) => handleProjectScroll(event, phone.anchorId)}
              initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.94 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.24 + index * 0.12, duration: 0.6, ease: EASE }}
            >
              <span className="deck-phone-tilt">
                <span className="deck-phone-frame">
                  <img src={phone.src} alt={phone.alt} loading="eager" decoding="async" />
                </span>
                <span className="deck-phone-badge">
                  <img src={phone.icon} alt="" aria-hidden />
                  <span className="deck-phone-badge-copy">
                    <strong>{phone.name}</strong>
                    <small>{phone.meta}</small>
                  </span>
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="product-deck-caption">
        <div>
          <p className="section-kicker">Product deck</p>
          <h2>Four iOS apps and a live SaaS — Raro is the newest.</h2>
        </div>
        <span className="deck-link">Selected work</span>
      </div>
    </motion.aside>
  );
};
