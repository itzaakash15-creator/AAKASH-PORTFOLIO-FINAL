'use client';

import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import SmoothScroll from '../components/SmoothScroll';
import Preloader from '../components/Preloader';
import Cursor from '../components/Cursor';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Manifesto from '../components/Manifesto';
import Work from '../components/Work';
import Roles from '../components/Roles';
import Experience from '../components/Experience';
import ProofIndex from '../components/ProofIndex';
import Journey from '../components/Journey';
import Contact from '../components/Contact';
import Lightbox from '../components/Lightbox';
import ProofOrbit from '../components/ProofOrbit';
import ThemeShift from '../components/ThemeShift';
import EasterEgg from '../components/EasterEgg';
import { ProofContext } from '../components/ProofContext';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [proof, setProof] = useState<string | null>(null);
  const done = useCallback(() => setLoading(false), []);

  return (
    <SmoothScroll>
      <ProofContext.Provider value={setProof}>
        <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
        <Cursor />
        <Nav ready={!loading} />
        <main>
          <Hero ready={!loading} />
          <Marquee items={['Marketer', 'Brand Builder', 'Creator', 'Speaker', 'Web Builder']} />
          <Manifesto />
          <Work />
          <Roles />
          <Experience />
          <Marquee items={['Receipts', 'Not claims', 'Real clients', 'Real results']} baseVelocity={3} />
          <ProofOrbit />
          <ProofIndex />
          <Journey />
        </main>
        <Contact />
        <ThemeShift />
        <EasterEgg />
        <Lightbox activeKey={proof} onChange={setProof} />
        <div className="grain" aria-hidden="true" />
      </ProofContext.Provider>
    </SmoothScroll>
  );
}
