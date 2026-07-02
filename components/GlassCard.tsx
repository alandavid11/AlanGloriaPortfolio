import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  compact?: boolean;
  accent?: 'rose' | 'emerald' | 'sky' | 'amber' | 'none';
  revealIndex?: number;
}

const ACCENT_STRIPE: Record<string, string> = {
  rose: 'before:bg-gradient-to-b before:from-rose-500/80 before:via-rose-400/40 before:to-transparent',
  emerald: 'before:bg-gradient-to-b before:from-emerald-500/80 before:via-emerald-400/40 before:to-transparent',
  sky: 'before:bg-gradient-to-b before:from-sky-500/80 before:via-sky-400/40 before:to-transparent',
  amber: 'before:bg-gradient-to-b before:from-orange-500/80 before:via-orange-400/40 before:to-transparent',
};

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  id,
  className = '',
  onClick,
  hoverEffect = true,
  compact = false,
  accent = 'none',
  revealIndex,
}) => {
  const reduceMotion = useReducedMotion();
  const hasAccent = accent !== 'none';
  const hasReveal = revealIndex !== undefined;

  return (
    <motion.div
      custom={revealIndex ?? 0}
      initial={hasReveal && !reduceMotion ? 'hidden' : false}
      whileInView={hasReveal && !reduceMotion ? 'visible' : undefined}
      viewport={{ once: true, margin: '-40px' }}
      variants={reveal}
      id={id}
      whileHover={
        hoverEffect && !reduceMotion
          ? { y: -3, transition: { type: 'spring', stiffness: 400, damping: 28 } }
          : undefined
      }
      whileTap={onClick && !reduceMotion ? { scale: 0.995 } : undefined}
      onClick={onClick}
      className={`
        card-interactive liquid-glass relative overflow-hidden rounded-2xl
        ${compact ? 'p-4' : 'p-4 md:p-5'}
        ${onClick ? 'cursor-pointer' : ''}
        ${hasAccent ? `accent-stripe ${ACCENT_STRIPE[accent]}` : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};
