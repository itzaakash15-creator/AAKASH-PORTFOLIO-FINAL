export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  service: string;
  category: string;
  scope: string;
  proofKey: string;
  previewImg: string;
  year?: string;
  drawerId?: string;
}

export const selectedProjects: ProjectItem[] = [
  {
    id: 'proj-jayashakthi',
    num: '01',
    title: 'JAYASHAKTHI TOURS & TRAVELS',
    service: 'WEBSITE DESIGN & DEPLOYMENT',
    category: 'WEBSITE BUILDER // FULL-STACK',
    scope: 'Designed, developed, and deployed full responsive commercial website with custom administrative portal for travel fleet management.',
    proofKey: 'jayashakthi-site',
    previewImg: '/assets/proofs_optimized/jayashakthi_website.jpg',
    year: '2025',
    drawerId: 'drawer-jaya',
  },
  {
    id: 'proj-salemrr',
    num: '02',
    title: 'SALEM RR',
    service: 'VIDEOGRAPHY / SCRIPTING / VJ',
    category: 'COMMERCIAL VIDEOGRAPHY & POST-PRODUCTION',
    scope: 'Brand promotion, on-location cinematic videography, screenplay, editing, video VJ presentation, and content strategy.',
    proofKey: 'salemrr-bts',
    previewImg: '/assets/proofs_optimized/salemrr_shoot_bts.jpg',
    year: '2026',
    drawerId: 'drawer-salemrr',
  },
  {
    id: 'proj-chinnadurai',
    num: '03',
    title: 'CHINNADURAI MD',
    service: 'PERSONAL BRANDING / SCRIPTING',
    category: 'PERSONAL BRANDING STRATEGY',
    scope: 'Executive personal branding, content strategy, and scriptwriting achieving ~10K–15K organic views.',
    proofKey: 'chinnadurai-retention',
    previewImg: '/assets/proofs_optimized/chinnadurai_retention.jpg',
    year: '2026',
    drawerId: 'drawer-branding',
  },
  {
    id: 'proj-u6nick',
    num: '04',
    title: 'U6NICK',
    service: 'EDITORIAL MODEL PERSONAL BRANDING',
    category: 'EDITORIAL MODEL // PERSONAL BRANDING',
    scope: 'Personal branding and digital content work for an editorial model, focused on strengthening digital identity, content presence, and building the profile to ~3K followers.',
    proofKey: 'purple-bts',
    previewImg: '/assets/proofs_optimized/purple_collection_bts.jpg',
    year: '2026',
    drawerId: 'drawer-u6nick',
  },
  {
    id: 'proj-mraku',
    num: '05',
    title: 'MR AKU VLOGS',
    service: 'CREATOR PLATFORM & CINEMA PROMOS',
    category: 'CREATOR PLATFORM ARCHIVE',
    scope: 'Foundational content creation across YouTube (2020) and Instagram (2023), local business promotions, videography, and storytelling reaching 2,177+ followers.',
    proofKey: 'mraku-joined',
    previewImg: '/assets/proofs_optimized/mr_aku_logo.png',
    year: '2020 — Present',
    drawerId: 'drawer-mraku',
  },
  {
    id: 'proj-vedha',
    num: '06',
    title: 'VEDHA RICE',
    service: 'COMMERCIAL VJ / PRODUCT REEL',
    category: 'BRAND PROMOTION // FMCG',
    scope: 'Commercial on-camera VJ presentation, scriptwriting, and promotional reel delivering regional brand value.',
    proofKey: 'vedha-rice',
    previewImg: '/assets/proofs_optimized/vedha_rice_vj.jpg',
    year: '2026',
    drawerId: 'drawer-vedha',
  },
];

export const PROJECTS_DATA = selectedProjects;
