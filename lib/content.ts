import { selectedProjects } from '../data/projects';
import { proofData } from '../data/proof';
import { journeyMilestones } from '../data/journey';
import { ROLES_DATA } from '../data/roles';
import { DIGI_MARKETRIX_DATA } from '../data/experience';
import { SOCIALS_DATA, contactDetails } from '../data/socials';

const abs = (p?: string) => (p ? (p.startsWith('/') ? p : `/${p}`) : undefined);

export const projects = selectedProjects;
export const roles = ROLES_DATA;
export const journey = journeyMilestones;
export const digi = DIGI_MARKETRIX_DATA;
export const socials = SOCIALS_DATA;
export const contact = contactDetails;

export type Proof = {
  key: string;
  title: string;
  category: string;
  period?: string;
  desc?: string;
  image?: string;
  video?: string;
  poster?: string;
  linkText?: string;
  linkUrl?: string;
};

export const getProof = (key: string): Proof | null => {
  const p = proofData[key];
  if (!p) return null;
  return {
    key,
    title: p.title,
    category: p.category,
    period: p.period,
    desc: p.desc,
    image: abs(p.image),
    video: abs(p.video),
    poster: abs(p.poster),
    linkText: p.linkText,
    linkUrl: p.linkUrl,
  };
};

export const proofs: Proof[] = (() => {
  const seen = new Set<string>();
  const result: Proof[] = [];
  for (const key of Object.keys(proofData)) {
    const p = getProof(key);
    if (!p) continue;
    const media = p.image || p.poster;
    if (!media || seen.has(media)) continue;
    seen.add(media);
    result.push(p);
  }
  return result;
})();

export type ProofGroup = {
  id: string;
  name: string;
  tag: 'Clients' | 'Agency' | 'Creator' | 'Recognition' | 'Tech';
  items: Proof[];
};

const GROUPS: { id: string; name: string; tag: ProofGroup['tag']; match: RegExp }[] = [
  { id: 'digi', name: 'Digi Marketrix', tag: 'Agency', match: /^digi-/ },
  { id: 'talentrix', name: 'Talentrix', tag: 'Agency', match: /^talentrix/ },
  { id: 'jaya', name: 'Jayashakthi Tours', tag: 'Clients', match: /jayashakthi/ },
  { id: 'u6nick', name: 'U6NICK', tag: 'Clients', match: /^u6nick-|^purple-|^personal-branding/ },
  { id: 'salemrr', name: 'Salem RR Biriyani', tag: 'Clients', match: /^salemrr/ },
  { id: 'chinnadurai', name: 'Chinnadurai Textiles', tag: 'Clients', match: /^chinnadurai/ },
  { id: 'vedha', name: 'Vedha Rice', tag: 'Clients', match: /^vedha/ },
  { id: 'lwa', name: 'Life With Aakash', tag: 'Creator', match: /^lwa-/ },
  { id: 'cinema', name: 'Cinema & Music', tag: 'Creator', match: /^mraku-(roshan|paranthu|tourist|nayanthara)/ },
  { id: 'mraku', name: 'Mr Aku Vlogs', tag: 'Creator', match: /^mraku-/ },
  { id: 'awards', name: 'Awards & Recognition', tag: 'Recognition', match: /^award-/ },
  { id: 'tech', name: 'MineGuardian', tag: 'Tech', match: /^tech-mine/ },
];

export const proofGroups: ProofGroup[] = (() => {
  const used = new Set<string>();
  return GROUPS.map((g) => {
    const items = proofs.filter((p) => !used.has(p.key) && g.match.test(p.key));
    items.forEach((p) => used.add(p.key));
    return { id: g.id, name: g.name, tag: g.tag, items };
  }).filter((g) => g.items.length);
})();

/** "Brand — Detail" → "Detail"; falls back to the full title. */
export const proofSubtitle = (p: Proof) => p.title.split(/ — | \/\/ /)[1] ?? p.title;
