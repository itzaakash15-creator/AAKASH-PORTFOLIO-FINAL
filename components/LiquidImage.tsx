'use client';

import { animate, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useId, useRef } from 'react';

/** Image that ripples like liquid while hovered (SVG turbulence + displacement). */
export default function LiquidImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const id = useId().replace(/:/g, '');
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const strength = useMotionValue(0);
  const zoom = useMotionValue(1);
  const img = useRef<HTMLImageElement>(null);

  useAnimationFrame((t) => {
    const s = strength.get();
    if (!disp.current || !turb.current || !img.current) return;
    if (s < 0.01 && zoom.get() === 1 && !zoom.isAnimating()) {
      if (img.current.style.filter !== 'none') img.current.style.filter = 'none';
      return;
    }
    disp.current.setAttribute('scale', String(s));
    const f = 0.008 + Math.sin(t / 900) * 0.003;
    turb.current.setAttribute('baseFrequency', `${f} ${f * 1.6}`);
    img.current.style.filter = s > 0.5 ? `url(#${id})` : 'none';
    img.current.style.transform = `scale(${zoom.get()})`;
  });

  const to = (s: number, z: number) => {
    animate(strength, s, { duration: s ? 0.6 : 1, ease: [0.22, 1, 0.36, 1] });
    animate(zoom, z, { duration: 1, ease: [0.22, 1, 0.36, 1] });
  };

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.01" numOctaves="2" seed="3" />
          <feDisplacementMap ref={disp} in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <img
        ref={img}
        src={src}
        alt={alt}
        loading="lazy"
        className={className}
        onPointerEnter={() => to(38, 1.08)}
        onPointerLeave={() => to(0, 1)}
      />
    </>
  );
}
