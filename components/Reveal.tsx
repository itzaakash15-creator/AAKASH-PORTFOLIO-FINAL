'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ease, easeOut } from '../lib/motion';

/** Splits text into masked lines/words that slide up when scrolled into view. */
export function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const lines = text.split('\n');

  return (
    <Tag ref={ref as never} className={className} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask" aria-hidden="true">
          <motion.span
            initial={{ y: '110%', rotate: 4 }}
            animate={inView ? { y: '0%', rotate: 0 } : undefined}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.09 }}
            style={{ transformOrigin: 'left bottom' }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}
