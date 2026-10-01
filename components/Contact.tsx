'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { contact, socials } from '../lib/content';
import Magnetic from './Magnetic';
import styles from './Contact.module.css';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <footer id="contact" ref={ref} className={styles.footer}>
      <motion.div style={{ y }} className={styles.inner}>
        <div className={styles.top}>
          <p className="mono">{contact.status}</p>
          <motion.span style={{ rotate }} className={styles.arrow} aria-hidden="true">
            ↘
          </motion.span>
        </div>

        <motion.h2 style={{ scale }} className={styles.big}>
          Let&apos;s make
          <br />
          something <span className="serif">loud.</span>
        </motion.h2>

        <div className={styles.actions}>
          <Magnetic strength={0.3}>
            <a href={`mailto:${contact.email}`} className={styles.pillBtn} data-cursor="Write">
              {contact.email}
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a href={`tel:${contact.phoneClean}`} className={styles.pillBtn} data-cursor="Call">
              {contact.phone}
            </a>
          </Magnetic>
          <button onClick={copy} className={`mono ${styles.copy}`}>
            {copied ? 'Copied ✓' : 'Copy email'}
          </button>
        </div>

        <div className={styles.bottom}>
          <div>
            <span className="mono">Version</span>
            <p>2026 © Aakash K</p>
          </div>
          <div>
            <span className="mono">Location</span>
            <p>{contact.location}</p>
          </div>
          <div className={styles.socials}>
            <span className="mono">Socials</span>
            <p>
              {socials
                .filter((s) => s.label !== 'Email')
                .map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ))}
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
