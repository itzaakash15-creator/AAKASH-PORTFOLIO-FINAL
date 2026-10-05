export interface JourneyStep {
  year: string;
  title: string;
  desc: string;
  proofKey: string;
}

export const progressionSteps: string[] = [
  'CREATE',
  'EXPAND',
  'RECOGNIZE',
  'INTERN',
  'BRAND',
  'BUILD',
  'VISION.',
];

export const journeyMilestones: JourneyStep[] = [
  {
    year: '2020 // ORIGIN',
    title: 'CONTENT CREATION',
    desc: 'Started content creation through Mr Aku Vlogs on YouTube, mastering initial video recording, local exploration, and raw visual storytelling.',
    proofKey: 'mraku-joined',
  },
  {
    year: '2023 // CREATOR GROWTH',
    title: 'EXPANDED PRESENCE',
    desc: 'Expanded creator presence through Instagram (@mr._aku_vlogs), conducting on-camera street interviews and promotional media collaborations for regional cinema.',
    proofKey: 'mraku-paranthu',
  },
  {
    year: '2025 // RECOGNITION',
    title: 'VERIFIED AWARDS',
    desc: 'Honored with the Best Reels Creator Award and Young Informative Content Award for creative pacing, narrative structure, and high-impact digital storytelling.',
    proofKey: 'award-business-excellence',
  },
  {
    year: 'MAY — JULY 2026 // AGENCY',
    title: 'DIGI MARKETRIX INTERNSHIP',
    desc: 'Completed full-time agency internship at Digi Marketrix, working across content research, scripting, videography, client shoots, video editing, and social media content.',
    proofKey: 'digi-cert',
  },
  {
    year: '2026 // PERSONAL BRANDING',
    title: 'U6NICK & CLIENT PROJECTS',
    desc: 'Directed personal branding and digital content work for editorial model U6NICK (building the profile to ~3K followers) alongside independent commercial client campaigns.',
    proofKey: 'purple-bts',
  },
  {
    year: '2026 — PRESENT // ACADEMICS',
    title: 'AI & DATA SCIENCE',
    desc: 'Pursuing B.Tech in Artificial Intelligence & Data Science at Rathinam Technical Campus, engineering web platforms like Jayashakthi Tours and IoT hardware systems.',
    proofKey: 'jayashakthi-site',
  },
  {
    year: 'NOW & NEXT // HORIZON',
    title: 'AGENCY & AI SYSTEMS',
    desc: 'Building across digital marketing, personal branding, web, and technology, with long-term direction toward agency ambitions and AI-assisted marketing systems.',
    proofKey: 'digi-working',
  },
];

export const JOURNEY_DATA = journeyMilestones;
