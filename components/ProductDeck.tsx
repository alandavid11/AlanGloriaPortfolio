import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SURFACES = [
  {
    name: 'WoRD',
    descriptor: 'App Store product',
    anchorId: 'project-word',
    src: '/word-01-home.webp',
    alt: 'WoRD speed reading app home screen',
    shape: 'phone',
    className: 'deck-surface deck-surface-phone',
  },
  {
    name: 'CODTR',
    descriptor: 'CoD Warzone tournament platform',
    anchorId: 'project-codtr',
    src: '/codtr-01-home.webp',
    alt: 'CODTR tournament platform dashboard',
    shape: 'desktop',
    className: 'deck-surface deck-surface-codtr',
  },
  {
    name: 'Cachoquiniela',
    descriptor: 'World Cup pool with friends',
    anchorId: 'project-cachoquiniela',
    src: '/cacho-posiciones.webp',
    alt: 'Cachoquiniela World Cup prediction pool leaderboard',
    shape: 'desktop',
    className: 'deck-surface deck-surface-cacho',
    previews: [
      { src: '/cacho-partidos.webp', alt: 'Cachoquiniela matches tab preview', label: 'Matches' },
      { src: '/cacho-stats-overview.webp', alt: 'Cachoquiniela stats analytics preview', label: 'Stats' },
    ],
  },
] as const;

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
      initial={reduceMotion ? false : { opacity: 0, y: 18, rotateX: 4 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Selected shipped product surfaces"
    >
      <div className="product-deck-glow" aria-hidden />
      <div className="product-deck-stage">
        {SURFACES.map((surface, index) => (
          <motion.a
            key={surface.name}
            href={`#${surface.anchorId}`}
            aria-label={`View ${surface.name} project details`}
            className={surface.className}
            onClick={(event) => handleProjectScroll(event, surface.anchorId)}
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.12 + index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`deck-frame deck-frame-${surface.shape}`}>
              <img src={surface.src} alt={surface.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
              {'previews' in surface && (
                <div className="deck-preview-strip" aria-label={`${surface.name} supporting screenshots`}>
                  {surface.previews.map((preview) => (
                    <span className="deck-preview-card" key={preview.src}>
                      <img src={preview.src} alt={preview.alt} loading="lazy" decoding="async" />
                      <small>{preview.label}</small>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="deck-caption-rail">
              <span className="deck-caption-index">0{index + 1}</span>
              <span className="deck-caption-copy">
                <strong>{surface.name}</strong>
                <small>{surface.descriptor}</small>
              </span>
              <span className="deck-caption-action">Explore</span>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="product-deck-caption">
        <div>
          <p className="section-kicker">Product deck</p>
          <h2>Three shipped products, presented with room to breathe.</h2>
        </div>
        <span className="deck-link">Selected work</span>
      </div>
    </motion.aside>
  );
};
