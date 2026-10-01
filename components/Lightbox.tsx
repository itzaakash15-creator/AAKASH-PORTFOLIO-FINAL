'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { getProof, proofs } from '../lib/content';
import { ease } from '../lib/motion';
import { useLenis } from './SmoothScroll';
import styles from './Lightbox.module.css';

export default function Lightbox({ activeKey, onChange }: { activeKey: string | null; onChange: (k: string | null) => void }) {
  const lenis = useLenis();
  const proof = activeKey ? getProof(activeKey) : null;
  const idx = proof ? proofs.findIndex((p) => p.key === proof.key) : -1;

  const step = (d: number) => {
    if (idx < 0) return;
    onChange(proofs[(idx + d + proofs.length) % proofs.length].key);
  };

  useEffect(() => {
    if (!proof) return;
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {proof && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.3 } }}
          onClick={() => onChange(null)}
          role="dialog"
          aria-modal="true"
          aria-label={proof.title}
        >
          <motion.div
            className={styles.panel}
            initial={{ clipPath: 'inset(100% 0 0 0 round 24px)' }}
            animate={{ clipPath: 'inset(0% 0 0 0 round 24px)' }}
            exit={{ clipPath: 'inset(0 0 100% 0 round 24px)' }}
            transition={{ duration: 0.8, ease }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            <div className={styles.media}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={proof.key}
                  className={styles.mediaInner}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {proof.video ? (
                    <video src={proof.video} poster={proof.poster} controls autoPlay playsInline />
                  ) : (
                    <img src={proof.image} alt={proof.title} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className={styles.info}>
              <div className={styles.topRow}>
                <span className="mono accent">{proof.category}</span>
                <button className={styles.close} onClick={() => onChange(null)} aria-label="Close" data-cursor="Close">
                  ✕
                </button>
              </div>
              <h3>{proof.title}</h3>
              {proof.period && <p className="mono muted">{proof.period}</p>}
              <p className={styles.desc}>{proof.desc}</p>
              {proof.linkUrl && (
                <a href={proof.linkUrl} target="_blank" rel="noreferrer" className={styles.ext}>
                  {proof.linkText ?? 'Open ↗'}
                </a>
              )}
              {idx >= 0 && (
                <div className={styles.nav}>
                  <button onClick={() => step(-1)} data-cursor="Prev">←</button>
                  <span className="mono muted">
                    {String(idx + 1).padStart(2, '0')} / {proofs.length}
                  </span>
                  <button onClick={() => step(1)} data-cursor="Next">→</button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
