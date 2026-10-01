'use client';

import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ease } from '../lib/motion';
import styles from './Preloader.module.css';

const WORDS = ['Hello', 'வணக்கம்', 'Marketer', 'Brand Builder', 'Creator', 'Speaker', 'Aakash'];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'));
  const [word, setWord] = useState(0);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    const controls = animate(count, 100, { duration: 2.4, ease: [0.65, 0, 0.35, 1] });
    const id = setInterval(() => setWord((w) => Math.min(w + 1, WORDS.length - 1)), 2400 / WORDS.length);
    const done = setTimeout(onDone, 2700);
    return () => {
      controls.stop();
      clearInterval(id);
      clearTimeout(done);
      document.documentElement.style.overflow = '';
    };
  }, [count, onDone]);

  return (
    <motion.div
      className={styles.loader}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.1, ease }}
    >
      <motion.svg className={styles.curve} viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          fill="var(--bg-2)"
          initial={{ d: 'M0 0 L100 0 L100 0 Q50 0 0 0 Z' }}
          exit={{ d: 'M0 0 L100 0 L100 0 Q50 10 0 0 Z' }}
          transition={{ duration: 1.1, ease }}
        />
      </motion.svg>

      <div className={styles.word}>
        <motion.span
          key={word}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease }}
        >
          <i className={styles.dot} /> {WORDS[word]}
        </motion.span>
      </div>

      <div className={styles.bar}>
        <motion.div className={styles.fill} style={{ scaleX: useTransform(count, [0, 100], [0, 1]) }} />
      </div>

      <motion.div className={styles.count}>{rounded}</motion.div>
      <p className={`mono ${styles.meta}`}>Portfolio ©2026 — Tamil Nadu, IN</p>
    </motion.div>
  );
}
