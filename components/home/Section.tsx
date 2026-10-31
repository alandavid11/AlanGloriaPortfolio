import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

export const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

export const SectionHead: React.FC<{ eyebrow: string; title: React.ReactNode; lead?: string }> = ({
  eyebrow,
  title,
  lead,
}) => (
  <Reveal className="mb-8 md:mb-10 max-w-3xl">
    <p className="eyebrow mb-3">{eyebrow}</p>
    <h2 className="text-3xl md:text-[2.75rem] font-semibold tracking-[-0.035em] leading-[1.02] text-zinc-50">{title}</h2>
    {lead && <p className="mt-4 text-base md:text-lg text-zinc-400 leading-relaxed">{lead}</p>}
  </Reveal>
);
