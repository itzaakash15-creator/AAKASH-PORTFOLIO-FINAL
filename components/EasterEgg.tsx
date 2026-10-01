'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const WORDS = ['Marketer', 'Creator', 'Speaker', 'Brand Builder', 'Aku!', 'வணக்கம்', 'Talentrix', '59K', 'Mr Aku', 'Hire me'];

/** Type "aku" anywhere to trigger a burst of words. */
export default function EasterEgg() {
  const [burst, setBurst] = useState<number | null>(null);

  useEffect(() => {
    let buf = '';
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea')) return;
      buf = (buf + e.key.toLowerCase()).slice(-3);
      if (buf === 'aku') {
        setBurst(Date.now());
        setTimeout(() => setBurst(null), 2600);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {burst && (
        <motion.div
          key={burst}
          aria-hidden="true"
          style={{ position: 'fixed', inset: 0, zIndex: 180, pointerEvents: 'none', overflow: 'hidden' }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          {Array.from({ length: 28 }, (_, i) => {
            const angle = (i / 28) * Math.PI * 2;
            const dist = 25 + Math.random() * 30;
            return (
              <motion.span
                key={i}
                initial={{ x: '-50%', y: '-50%', left: '50%', top: '50%', scale: 0, rotate: 0 }}
                animate={{
                  left: `${50 + Math.cos(angle) * dist}%`,
                  top: `${50 + Math.sin(angle) * dist}%`,
                  scale: 1,
                  rotate: Math.random() * 60 - 30,
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 12, delay: i * 0.015 }}
                style={{
                  position: 'absolute',
                  padding: '0.5rem 1rem',
                  borderRadius: 999,
                  whiteSpace: 'nowrap',
                  fontWeight: 700,
                  fontSize: `${1 + Math.random() * 1.6}rem`,
                  background: i % 3 ? 'var(--accent)' : 'var(--fg)',
                  color: 'var(--accent-ink)',
                }}
              >
                {WORDS[i % WORDS.length]}
              </motion.span>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
