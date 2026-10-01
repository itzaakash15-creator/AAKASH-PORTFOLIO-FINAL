'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { roles } from '../lib/content';
import { RevealText } from './Reveal';
import styles from './Roles.module.css';

const IMAGES = [
  '/assets/proofs_optimized/digi_marketrix_office.jpg',
  '/assets/proofs_optimized/purple_collection_bts_large.jpg',
  '/assets/proofs_optimized/mr_aku_vj_shoot.jpg',
  '/assets/proofs_optimized/award_1_business_excellence.jpg',
];
const TINTS = ['#171715', '#d4ff3f', '#e9e5da', '#ff5b2e'];
const INK = ['#f1efe8', '#0b0b0a', '#0b0b0a', '#0b0b0a'];

function Card({
  i,
  progress,
  range,
  target,
}: {
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  target: number;
}) {
  const r = roles[i];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.6, 1]);
  const scale = useTransform(progress, range, [1, target]);

  return (
    <div ref={ref} className={styles.sticky}>
      <motion.article
        className={styles.card}
        style={{ scale, top: `calc(10vh + ${i * 28}px)`, background: TINTS[i], color: INK[i] }}
      >
        <div className={styles.cardText}>
          <div className={styles.meta}>
            <span className="mono">{r.num} / 04</span>
            <span className="mono">{r.category}</span>
          </div>
          <h3 className={styles.title}>{r.title}</h3>
          <p className={`serif ${styles.quote}`}>“{r.quote}”</p>
          <div className={styles.tags}>
            {r.tags.map((t) => (
              <span key={t} className="mono">
                {t}
              </span>
            ))}
          </div>
          <p className={`mono ${styles.metric}`}>{r.metric}</p>
        </div>
        <div className={styles.media}>
          <motion.img src={IMAGES[i]} alt="" style={{ scale: imgScale }} loading="lazy" />
        </div>
      </motion.article>
    </div>
  );
}

export default function Roles() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section className="section" id="roles" style={{ paddingBottom: 0 }}>
      <p className="mono eyebrow">Disciplines (04)</p>
      <RevealText className="display" text={'One person.\nFour disciplines.'} />
      <div ref={ref} className={styles.stack}>
        {roles.map((_, i) => (
          <Card
            key={i}
            i={i}
            progress={scrollYProgress}
            range={[i / roles.length, 1]}
            target={1 - (roles.length - i) * 0.05}
          />
        ))}
      </div>
    </section>
  );
}
