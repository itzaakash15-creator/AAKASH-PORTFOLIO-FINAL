'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import Magnetic from './Magnetic';
import { ease } from '../lib/motion';
import { socials } from '../lib/content';
import { useLenis } from './SmoothScroll';
import styles from './Nav.module.css';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#roles', label: 'Disciplines' },
  { href: '#proof', label: 'Proof' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 300);
  });

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, lenis]);

  return (
    <>
      <motion.header
        className={styles.bar}
        style={{ mixBlendMode: open ? 'normal' : 'difference', color: open ? 'var(--accent-ink)' : undefined }}
        initial={{ y: -100 }}
        animate={{ y: ready && (!hidden || open) ? 0 : -100 }}
        transition={{ duration: 0.8, ease }}
      >
        <a href="#top" className={styles.logo} data-cursor="Top">
          <span className={styles.logoMark}>©</span>
          <span className={styles.logoSlide}>
            <span>Aakash K</span>
            <span>Brand Builder</span>
          </span>
        </a>
        <Magnetic>
          <button
            className={styles.menuBtn}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            data-cursor=""
          >
            <span className={styles.burger} data-open={open} />
            <span className="mono">{open ? 'Close' : 'Menu'}</span>
          </button>
        </Magnetic>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            className={styles.overlay}
            initial={{ clipPath: 'circle(0% at 95% 4%)' }}
            animate={{ clipPath: 'circle(150% at 95% 4%)' }}
            exit={{ clipPath: 'circle(0% at 95% 4%)' }}
            transition={{ duration: 0.9, ease }}
          >
            <p className="mono muted">Navigation</p>
            <ul className={styles.links}>
              {LINKS.map((l, i) => (
                <li key={l.href} className="line-mask">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={styles.link}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.06 }}
                    data-cursor="Go"
                  >
                    <span className="mono muted">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className={styles.socials}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
            >
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="mono">
                  {s.label} ↗
                </a>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
