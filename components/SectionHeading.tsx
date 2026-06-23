import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  description,
  className = '',
  compact = false,
}) => (
  <motion.header
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ type: 'spring', stiffness: 120, damping: 22 }}
    className={`${compact ? 'mb-4' : 'mb-5 md:mb-6'} ${className}`}
  >
    <p className="section-kicker mb-1.5">{kicker}</p>
    <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
      <span className="text-zinc-50">{title}</span>
    </h2>
    {description && (
      <p className="mt-2 text-sm text-zinc-500 leading-snug max-w-[62ch]">{description}</p>
    )}
  </motion.header>
);
