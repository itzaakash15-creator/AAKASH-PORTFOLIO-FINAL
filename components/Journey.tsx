'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { journey } from '../lib/content';
import { RevealText } from './Reveal';
import { useOpenProof } from './ProofContext';
import styles from './Journey.module.css';

export default function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const open = useOpenProof();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end 0.6'] });
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="section" id="journey" data-theme="ink">
      <p className="mono eyebrow">Journey 2020 → now</p>
      <RevealText className="display" text={'Create. Edit. Shoot.\nMarket. Build. Lead.'} />
      <ol ref={ref} className={styles.list}>
        <motion.span className={styles.line} style={{ scaleY: line }} aria-hidden="true" />
        {journey.map((m, i) => (
          <motion.li
            key={m.title}
            className={styles.item}
            initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.node} aria-hidden="true" />
            <span className="mono accent">{m.year}</span>
            <h3>{m.title}</h3>
            <p className="muted">{m.desc}</p>
            <button className={`mono ${styles.link}`} onClick={() => open(m.proofKey)} data-cursor="Proof">
              View proof ↗
            </button>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
