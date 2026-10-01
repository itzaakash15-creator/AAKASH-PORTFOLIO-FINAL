'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { projects } from '../lib/content';
import { useOpenProof } from './ProofContext';
import LiquidImage from './LiquidImage';
import styles from './Work.module.css';

/** Vertical scroll drives a pinned horizontal gallery. */
export default function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const open = useOpenProof();

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDistance(track.current.scrollWidth - window.innerWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current!);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.3 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="work" ref={section} className={styles.section} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className={styles.sticky}>
        <div className={styles.head}>
          <p className="mono muted">Selected work (0{projects.length})</p>
          <div className={styles.progress}>
            <motion.div style={{ scaleX: bar }} />
          </div>
        </div>
        <motion.div ref={track} className={styles.track} style={{ x: smoothX }}>
          <div className={styles.intro}>
            <h2 className="display">
              Selected
              <br />
              <span className="serif accent">work</span>
            </h2>
            <p className="muted">
              Websites, commercial films, personal brands and growth campaigns — shipped for real
              clients across Tamil Nadu.
            </p>
          </div>
          {projects.map((p, i) => (
            <motion.button
              key={p.id}
              className={styles.card}
              onClick={() => open(p.proofKey)}
              data-cursor="View"
              style={{ marginTop: i % 2 ? '8vh' : 0 }}
            >
              <div className={styles.media}>
                <LiquidImage src={p.previewImg} alt={p.title} />
                <span className={`mono ${styles.year}`}>{p.year}</span>
              </div>
              <div className={styles.info}>
                <span className="mono muted">{p.num}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p className="mono muted">{p.service}</p>
                </div>
              </div>
            </motion.button>
          ))}
          <div className={styles.outro}>
            <a href="#proof" className="serif" data-cursor="Proof">
              See all the proof →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
