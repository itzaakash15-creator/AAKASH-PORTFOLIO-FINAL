'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const NAME = 'AAKASH'.split('');
const ROTATE = ['move people.', 'build trust.', 'earn attention.', 'drive growth.'];

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Subtle scroll fade when scrolling away from hero
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Rotator cycle for tagline phrase
  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % ROTATE.length), 2400);
    return () => clearInterval(id);
  }, [ready]);

  // Eagerly preload authentic transparent portrait asset into browser cache
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/aakash_authentic_portrait.png';
  }, []);

  return (
    <section id="top" ref={ref} className={styles.hero}>
      <motion.div className={styles.stage} style={{ opacity: scrollOpacity }}>
        {/* Layer 1: Oversized Name Behind Portrait at Shoulder Level */}
        <div className={styles.nameBackdrop}>
          <h1 className={styles.name} aria-label="AAKASH">
            {NAME.map((ch, i) => (
              <span key={i} className={styles.letterMask} aria-hidden="true">
                <motion.span
                  className={styles.letter}
                  initial={
                    shouldReduceMotion
                      ? { y: '0%', opacity: 1 }
                      : { y: '108%', opacity: 0 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { y: '0%', opacity: 1 }
                      : ready
                      ? { y: '0%', opacity: 1 }
                      : { y: '108%', opacity: 0 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.8, // ~800ms upward masked reveal
                    ease: [0.16, 1, 0.3, 1],
                    delay: shouldReduceMotion ? 0 : 0.28 + i * 0.045, // subtle letter stagger as curtain lifts
                  }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Layer 2: Transparent Portrait Cutout (Silhouetted directly against dark background) */}
        <motion.div
          className={styles.portraitWrapper}
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 60, scale: 1.04 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1, y: 0, scale: 1 }
              : ready
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 60, scale: 1.04 }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 1.0, // ~1,000ms duration
            ease: [0.22, 1, 0.36, 1], // smooth deceleration
            delay: shouldReduceMotion ? 0 : 0.72, // once name is readable
          }}
        >
          <img
            src="/assets/aakash_authentic_portrait.png"
            alt="Aakash — Portrait"
            className={styles.portraitImg}
            width={682}
            height={1024}
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

        {/* Layer 3: Supporting Text (Positioned over lower torso, completely clear of face) */}
        <div className={styles.supportingText}>
          <motion.p
            className={`mono ${styles.role}`}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : ready
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: shouldReduceMotion ? 0 : 1.45, // as portrait settles
            }}
          >
            (Marketer · Brand Builder · Creator · Speaker)
          </motion.p>

          <motion.p
            className={styles.tagline}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : ready
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: shouldReduceMotion ? 0 : 1.62, // short stagger after role
            }}
          >
            I build brands, digital experiences and ideas that{' '}
            <span className={styles.rotator}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={idx}
                  className="serif accent"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                >
                  {ROTATE[idx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>
        </div>
      </motion.div>

      {/* Layer 4: Bottom Navigation & Metadata Info */}
      <motion.div
        className={styles.foot}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : ready
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        transition={{
          duration: shouldReduceMotion ? 0 : 0.8,
          delay: shouldReduceMotion ? 0 : 1.75,
        }}
      >
        <span className="mono muted">Based in Tamil Nadu, India</span>
        <span className="mono muted">Scroll to explore</span>
        <span className="mono muted">Portfolio — ’26</span>
      </motion.div>
    </section>
  );
}
