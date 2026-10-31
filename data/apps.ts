export type CaseStudyView = 'raro-detail' | 'triplook-detail' | 'app-detail' | 'remainingweeks-detail';

export interface AppProduct {
  anchorId: string;
  name: string;
  nameClass?: string;
  status: string;
  tagline: string;
  hook: string;
  stack: string[];
  rgb: string;
  icon: string;
  shots: [string, string, string];
  /** Raw in-app screen, no marketing frame. */
  screen: string;
  appStoreUrl: string;
  website: string;
  caseStudy: CaseStudyView;
}

export const APPS: AppProduct[] = [
  {
    anchorId: 'project-raro',
    name: 'RARO',
    nameClass: 'tracking-[0.2em]',
    status: 'App Store · v1.1',
    tagline: 'Collect real places as trading cards.',
    hook: 'Server-side rarity from H3 geo-cells, App Attest anti-cheat, on-device Vision grading and Metal foils.',
    stack: ['Swift 6', 'Metal', 'Vision', 'Supabase'],
    rgb: '220, 192, 138',
    icon: '/raro-icon.webp',
    shots: ['/raro-04-coleccion.webp', '/raro-01-camara.webp', '/raro-03-primero.webp'],
    appStoreUrl: 'https://apps.apple.com/app/id6790924401',
    website: '/raro/',
    caseStudy: 'raro-detail',
    screen: '/raro-app-home.webp',
  },
  {
    anchorId: 'project-word',
    name: 'WoRD',
    status: 'App Store · 4.4★',
    tagline: 'A speed reading trainer with an arcade inside.',
    hook: 'A CADisplayLink RSVP engine, a Game Center league, widgets and RevenueCat subscriptions.',
    stack: ['SwiftUI', 'WidgetKit', 'Game Center', 'RevenueCat'],
    rgb: '251, 113, 133',
    icon: '/word-icon.webp',
    shots: ['/word-03.webp', '/word-01.webp', '/word-02.webp'],
    appStoreUrl: 'https://apps.apple.com/us/app/word-speed-reading-trainer/id6757875956',
    website: '/word',
    caseStudy: 'app-detail',
    screen: '/word-01-home.webp',
  },
  {
    anchorId: 'project-triplook',
    name: 'Triplook',
    nameClass: 'triplook-serif font-normal',
    status: 'App Store · EN/ES',
    tagline: 'AI travel outfits and a smart closet.',
    hook: 'AI background removal and tagging through a Cloudflare Worker, weather-aware outfits and CloudKit sync.',
    stack: ['SwiftUI', 'CloudKit', 'Claude API', 'RevenueCat'],
    rgb: '193, 156, 110',
    icon: '/triplook-icon.webp',
    shots: ['/triplook-tripDetail.webp', '/triplook-closet.webp', '/triplook-looks.webp'],
    appStoreUrl: 'https://apps.apple.com/us/app/triplook-travel-outfits/id6784750326',
    website: '/triplook/',
    caseStudy: 'triplook-detail',
    screen: '/triplook-closet.webp',
  },
  {
    anchorId: 'project-remainingweeks',
    name: 'RemainingWeeks',
    status: 'App Store',
    tagline: 'Your life in weeks, on iPhone and Apple Watch.',
    hook: 'SwiftData, WidgetKit and watchOS complications, all from one shared design system.',
    stack: ['SwiftData', 'WidgetKit', 'watchOS', 'RevenueCat'],
    rgb: '199, 97, 71',
    icon: '/remainingweeks-icon.webp',
    shots: ['/remainingweeks-03-grid.webp', '/remainingweeks-02-dashboard.webp', '/remainingweeks-08-watch.webp'],
    appStoreUrl: 'https://apps.apple.com/us/app/remainingweeks-time-left/id6785275888',
    website: '/remainingweeks',
    caseStudy: 'remainingweeks-detail',
    screen: '/remainingweeks-app-home.webp',
  },
];
