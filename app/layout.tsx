import type { Metadata } from 'next';
import React from 'react';
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://aakashk.vercel.app'),
  title: 'AAKASH — Marketer, Brand Builder, Creator, Speaker',
  description:
    'A marketer, creator, web builder and motivational speaker turning ideas into real opportunities.',
  openGraph: {
    title: 'AAKASH — Marketer, Brand Builder, Creator, Speaker',
    description: 'I build brands, digital experiences and ideas that move people.',
    type: 'website',
    url: 'https://aakashk.vercel.app/',
    images: [{ url: '/assets/aakash_authentic_portrait.png', alt: 'AAKASH' }],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%23d4ff3f'/><text x='50' y='72' font-size='64' text-anchor='middle' font-family='Georgia' font-style='italic'>a</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
