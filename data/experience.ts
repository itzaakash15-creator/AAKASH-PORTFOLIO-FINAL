export interface ExperienceChapter {
  id: string;
  number: string;
  kicker: string;
  headline: {
    line1: string;
    highlight: string;
    line2: string;
  };
  title: string;
  tagline: string;
  overview: string;
  duration: string;
  role: string;
  scope: string;
  stats: {
    label: string;
    value: string;
  }[];
  pillars: {
    title: string;
    description: string;
    deliverables: string[];
  }[];
  talentrix: {
    kicker: string;
    title: string;
    badge: string;
    description: string;
    stats: {
      label: string;
      value: string;
    }[];
  };
}

export const DIGI_MARKETRIX_DATA: ExperienceChapter = {
  id: 'work',
  number: '01',
  kicker: '01 // AGENCY INTERNSHIP',
  headline: {
    line1: 'HANDS-ON.',
    highlight: 'WHERE THEORY BECAME',
    line2: 'DAILY AGENCY EXECUTION.',
  },
  title: 'DIGI MARKETRIX',
  tagline: 'MARKETING THE DIGITAL PRESENCE',
  overview:
    'Digi Marketrix is where digital marketing stopped being theory and became daily execution. During a full-time internship, I worked across content research, scripting, videography, client shoots, video editing, personal branding, and social media content on real client projects.',
  duration: 'May 2026 — July 2026',
  role: 'Digital Marketing & Creative Intern',
  scope: 'Digital Marketing · Content Research · Videography · Video Editing · Personal Branding',
  stats: [
    { label: 'Client Shoots & Campaigns', value: 'REAL' },
    { label: 'Commercial Deliverables', value: 'PUBLISHED' },
    { label: 'Executive Positioning', value: 'BRANDING' },
    { label: 'Content Strategy & Media', value: 'DIGITAL' },
  ],
  pillars: [
    {
      title: 'AGENCY WORKFLOW',
      description:
        'Executing commercial marketing workflows from content research and client shoots to cross-platform digital distribution and social media publishing.',
      deliverables: ['Content Research', 'Client Shoots', 'Social Media Content', 'Content Planning'],
    },
    {
      title: 'CREATIVE PRODUCTION',
      description:
        'Hands-on video production, camera operation, on-location client shoots, and post-production timeline editing to deliver high-retention commercial reels.',
      deliverables: ['Scriptwriting', 'Videography', 'Video Editing', 'Personal Branding'],
    },
  ],
  talentrix: {
    kicker: 'CONCEPT // EXPLORATION',
    title: 'TALENTRIX',
    badge: 'INITIATIVE IN DEVELOPMENT',
    description:
      'An internal influencer marketing and creator talent concept in development, explored during the Digi Marketrix internship to evaluate creator partnerships for regional brands.',
    stats: [
      { label: 'Initiative Status', value: 'In Development' },
      { label: 'Strategic Focus', value: 'Creator Network' },
      { label: 'Target Market', value: 'Regional' },
    ],
  },
};
