'use client';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useState } from 'react';
import { proofGroups, proofs, proofSubtitle, type ProofGroup } from '../lib/content';
import { ease } from '../lib/motion';
import { RevealText } from './Reveal';
import { useOpenProof } from './ProofContext';
import styles from './ProofIndex.module.css';

const FILTERS = ['All', 'Clients', 'Agency', 'Creator', 'Recognition', 'Tech'] as const;
type Filter = (typeof FILTERS)[number];
const cover = (g: ProofGroup) => g.items[0].image ?? g.items[0].poster;

/** Brand-grouped proof index: rows expand into a swipeable gallery; desktop gets a pointer-trailing preview. */
export default function ProofIndex() {
  const open = useOpenProof();
  const [filter, setFilter] = useState<Filter>('All');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const groups = proofGroups.filter((g) => filter === 'All' || g.tag === filter);

  return (
    <section
      className="section"
      id="proof"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <p className="mono eyebrow">Proof of work ({proofs.length})</p>
      <div className={styles.head}>
        <RevealText className="display" text={'Receipts,\nnot claims.'} />
        <div className={styles.filters} role="tablist" aria-label="Filter proof">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => {
                setFilter(f);
                setExpanded(null);
              }}
              className={styles.filter}
            >
              {filter === f && (
                <motion.span layoutId="filter-pill" className={styles.pill} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              <span>{f}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className={styles.list} onPointerLeave={() => setHover(null)}>
        {groups.map((g, i) => {
          const isOpen = expanded === g.id;
          return (
            <motion.li
              key={`${filter}-${g.id}`}
              className={styles.group}
              data-open={isOpen}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: i * 0.04 }}
            >
              <button
                className={styles.row}
                onClick={() => {
                  setExpanded(isOpen ? null : g.id);
                  setHover(null);
                }}
                onPointerEnter={(e) => e.pointerType === 'mouse' && !isOpen && setHover(proofGroups.indexOf(g))}
                onPointerLeave={() => setHover(null)}
                aria-expanded={isOpen}
                data-cursor={isOpen ? 'Close' : 'Expand'}
              >
                <span className="mono muted">{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.name}>{g.name}</span>
                <span className={`mono muted ${styles.tag}`}>{g.tag}</span>
                <span className={styles.thumbs} aria-hidden="true">
                  {g.items.slice(0, 3).map((p) => (
                    <img key={p.key} src={p.image ?? p.poster} alt="" loading="lazy" />
                  ))}
                </span>
                <span className={`mono ${styles.count}`}>{String(g.items.length).padStart(2, '0')}</span>
                <span className={styles.plus} aria-hidden="true" />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className={styles.panel}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <div className={styles.gallery}>
                      {g.items.map((p, j) => (
                        <motion.button
                          key={p.key}
                          className={styles.card}
                          onClick={() => open(p.key)}
                          data-cursor={p.video ? 'Play' : 'Open'}
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, ease, delay: 0.1 + j * 0.05 }}
                        >
                          <span className={styles.cardMedia}>
                            <img src={p.image ?? p.poster} alt={p.title} loading="lazy" />
                            {p.video && <span className={styles.play}>▶</span>}
                          </span>
                          <span className={styles.cardTitle}>{proofSubtitle(p)}</span>
                          <span className="mono muted">{p.category}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>

      <motion.div
        className={styles.preview}
        style={{ x, y }}
        animate={{ scale: hover !== null ? 1 : 0, opacity: hover !== null ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        aria-hidden="true"
      >
        <div className={styles.previewInner}>
          <motion.div
            className={styles.strip}
            animate={{ y: `${-(hover ?? 0) * 100}%` }}
            transition={{ duration: 0.6, ease }}
          >
            {proofGroups.map((g) => (
              <img key={g.id} src={cover(g)} alt="" loading="lazy" />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
