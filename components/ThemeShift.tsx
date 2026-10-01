'use client';

import { useEffect } from 'react';

/** Morphs the page palette to the [data-theme] of whichever section crosses mid-screen. */
export default function ThemeShift() {
  useEffect(() => {
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) root.dataset.theme = (e.target as HTMLElement).dataset.theme ?? 'dark';
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    document.querySelectorAll('main > section, main > div').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
