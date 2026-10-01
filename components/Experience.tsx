'use client';

import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { digi } from '../lib/content';
import { RevealText, FadeUp } from './Reveal';
import { useOpenProof } from './ProofContext';
import styles from './Experience.module.css';

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(\d+)(.*)$/);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    const c = animate(0, Number(match[1]), { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{match ? `${n}${match[2]}` : value}</span>;
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const open = useOpenProof();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const clip = useTransform(scrollYProgress, [0, 0.4], ['inset(18% 12% 18% 12% round 32px)', 'inset(0% 0% 0% 0% round 0px)']);

  return (
    <section className="section" id="experience">
      <p className="mono eyebrow">Experience — {digi.duration}</p>
      <RevealText className="display" text={`${digi.headline.line1}\n${digi.headline.highlight}\n${digi.headline.line2}`} />

      <div className={styles.grid}>
        <FadeUp>
          <p className={styles.lead}>{digi.overview}</p>
        </FadeUp>
        <FadeUp delay={0.1} className={styles.roleBox}>
          <span className="mono muted">Role</span>
          <p>{digi.role}</p>
          <span className="mono muted">Scope</span>
          <p>{digi.scope}</p>
        </FadeUp>
      </div>

      <div className={styles.stats}>
        {digi.stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.08} className={styles.stat}>
            <strong>
              <Counter value={s.value} />
            </strong>
            <span className="mono muted">{s.label}</span>
          </FadeUp>
        ))}
      </div>

      <div ref={ref} className={styles.bleed}>
        <motion.div style={{ clipPath: clip }} className={styles.bleedInner}>
          <motion.img src="/assets/proofs_optimized/digi_marketrix_gimbal_shoot.jpg" alt="Gimbal shoot at Digi Marketrix" style={{ y }} />
          <button className={styles.bleedCta} onClick={() => open('digi-video-shooting')} data-cursor="Play">
            ▶ Watch — shoot to upload
          </button>
        </motion.div>
      </div>

      <div className={styles.pillars}>
        {digi.pillars.map((p, i) => (
          <FadeUp key={p.title} delay={i * 0.1} className={styles.pillar}>
            <span className="mono accent">0{i + 1}</span>
            <h3>{p.title}</h3>
            <p className="muted">{p.description}</p>
            <ul>
              {p.deliverables.map((d) => (
                <li key={d} className="mono">{d}</li>
              ))}
            </ul>
          </FadeUp>
        ))}
        <FadeUp delay={0.2} className={`${styles.pillar} ${styles.talentrix}`}>
          <span className="mono">{digi.talentrix.kicker}</span>
          <h3>{digi.talentrix.title}</h3>
          <p>{digi.talentrix.description}</p>
          <span className={`mono ${styles.chip}`}>{digi.talentrix.badge}</span>
        </FadeUp>
      </div>
    </section>
  );
}
