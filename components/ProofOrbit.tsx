'use client';

import { motion, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useRef } from 'react';
import { proofs } from '../lib/content';
import { useOpenProof } from './ProofContext';
import styles from './ProofOrbit.module.css';

const ITEMS = proofs.filter((p) => p.image).slice(0, 14);

/** A 3D ring of proof images: scroll spins it, dragging throws it. */
export default function ProofOrbit() {
  const ref = useRef<HTMLElement>(null);
  const open = useOpenProof();
  const drag = useMotionValue(0);
  const { scrollYProgress, scrollY } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scrollSpin = useTransform(scrollYProgress, [0, 1], [-60, 300]);
  const rotateY = useSpring(useTransform(() => scrollSpin.get() + drag.get()), { stiffness: 60, damping: 20 });
  const tilt = useSpring(useTransform(useVelocity(scrollY), [-3000, 3000], [14, -14]), { stiffness: 80, damping: 20 });
  const step = 360 / ITEMS.length;

  return (
    <section ref={ref} className={styles.section} aria-label="Proof orbit" data-theme="ink">
      <div className={styles.label}>
        <p className="mono muted">Drag to spin · click to open · psst, type “aku”</p>
        <h2 className={styles.title}>
          {ITEMS.length} moments, <span className="serif accent">one orbit.</span>
        </h2>
      </div>
      <motion.div
        className={styles.stage}
        onPan={(_, info) => drag.set(drag.get() + info.delta.x * 0.35)}
        data-cursor="Drag"
      >
        <motion.div className={styles.ring} style={{ rotateY, rotateX: tilt }}>
          {ITEMS.map((p, i) => (
            <button
              key={p.key}
              className={styles.item}
              style={{ transform: `rotateY(${i * step}deg) translateZ(var(--radius))` }}
              onClick={() => open(p.key)}
              data-cursor="Open"
            >
              <img src={p.image} alt={p.title} loading="lazy" draggable={false} />
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
