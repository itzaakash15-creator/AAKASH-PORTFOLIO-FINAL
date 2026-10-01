'use client';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';
import { useRef } from 'react';
import styles from './Marquee.module.css';

/** Infinite marquee whose speed and direction react to scroll velocity. */
export default function Marquee({ items, baseVelocity = -3 }: { items: string[]; baseVelocity?: number }) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(velocity, [-2000, 2000], [8, -8]);
  const x = useTransform(base, (v) => `${wrap(-25, -50, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    base.set(base.get() + move);
  });

  const row = items.flatMap((t, i) => [
    <span key={`t${i}`} className={i % 2 ? 'serif' : undefined}>
      {t}
    </span>,
    <span key={`s${i}`} className={styles.star} aria-hidden="true">
      ✺
    </span>,
  ]);

  return (
    <div className={styles.wrap} aria-label={items.join(', ')}>
      <motion.div className={styles.track} style={{ x, skewX: skew }} aria-hidden="true">
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
