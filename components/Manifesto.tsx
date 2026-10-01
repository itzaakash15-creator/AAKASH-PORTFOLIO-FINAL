'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Magnetic from './Magnetic';
import styles from './Manifesto.module.css';

const TEXT =
  "I don't fit into one box. Three years inside an agency taught me that strategy, story and craft are the same job — so I do all three: campaigns that convert, brands people trust, films that hold attention, and talks that move rooms.";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const accent = /box\.|trust,|attention,|rooms\./.test(word);
  return (
    <span className={styles.word}>
      <motion.span style={{ opacity }} className={accent ? 'serif accent' : undefined}>
        {word}
      </motion.span>
    </span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = TEXT.split(' ');

  return (
    <section className="section" id="about" data-theme="light">
      <p className="mono eyebrow">About — the short version</p>
      <p ref={ref} className={styles.text}>
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
      <div className={styles.row}>
        <p className="muted">
          Digital marketing strategist & creative lead at Digi Marketrix, founder of the Talentrix
          creator initiative, and the voice behind Life With Aakash.
        </p>
        <Magnetic strength={0.4}>
          <a href="#contact" className={styles.cta} data-cursor="Say hi">
            Let&apos;s
            <br />
            talk
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
