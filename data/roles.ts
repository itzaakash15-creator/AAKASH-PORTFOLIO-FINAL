export interface RoleData {
  id: string;
  num: string;
  category: string;
  title: string;
  sub: string;
  metric: string;
  quote: string;
  tags: string[];
}

export const ROLES_DATA: RoleData[] = [
  {
    id: 'role-frame-1',
    num: '01',
    category: 'DISCIPLINE // STRATEGY',
    title: 'MARKETER',
    sub: 'STRATEGY • DIGITAL • GROWTH',
    metric: 'REAL CLIENT WORK',
    quote: 'Strategy before tactics. Revenue over impressions.',
    tags: ['GROWTH', 'STRATEGY', 'CAMPAIGNS'],
  },
  {
    id: 'role-frame-2',
    num: '02',
    category: 'DISCIPLINE // IDENTITY',
    title: 'BRAND BUILDER',
    sub: 'POSITIONING • TRUST • IDENTITY',
    metric: 'PERSONAL BRANDING',
    quote: 'A brand is not a logo. It is a reputation built over time.',
    tags: ['FOUNDATION', 'POSITIONING', 'REPUTATION'],
  },
  {
    id: 'role-frame-3',
    num: '03',
    category: 'DISCIPLINE // MEDIA',
    title: 'CREATOR',
    sub: 'STORYTELLING • VIDEO • CONTENT',
    metric: 'PUBLISHED CONTENT',
    quote: 'Attention is earned through authenticity and visual discipline.',
    tags: ['STORYTELLING', 'VIDEO', 'CONTENT'],
  },
  {
    id: 'role-frame-4',
    num: '04',
    category: 'DISCIPLINE // VOICE',
    title: 'SPEAKER',
    sub: 'LIFE • MOTIVATION • COMMUNICATION',
    metric: 'MOTIVATIONAL VOICE',
    quote: 'Inspiring people through authentic reflection and practical mindset lessons.',
    tags: ['LIFE', 'MOTIVATION', 'COMMUNICATION'],
  },
];
