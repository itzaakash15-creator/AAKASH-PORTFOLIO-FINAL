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
          <Magnetic strength={0.3}>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.pillBtn} ${styles.whatsappBtn}`}
              data-cursor="WhatsApp"
            >
              <svg
                className={styles.waIcon}
                viewBox="0 0 24 24"
                width="19"
                height="19"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.27-2.42 5.82a8.19 8.19 0 0 1-5.82 2.42c-1.46 0-2.88-.38-4.14-1.12l-.3-.18-3.08.81.82-3-.2-.31a8.21 8.21 0 0 1-1.26-4.44c0-4.54 3.7-8.24 8.24-8.24m4.52 11.59c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.42 1.03 2.59.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29" />
              </svg>
              <span>WhatsApp</span>
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
