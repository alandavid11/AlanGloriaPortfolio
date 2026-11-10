import type { ViewState } from '../types';
import type { RouteSeo } from '../utils/seo';

export const VIEW_ROUTES: Record<ViewState, RouteSeo> = {
  portfolio: {
    path: '/',
    title: 'Alan Gloria — iOS Engineer',
    description:
      'iOS Engineer. Founder of WalletMe + POSMe, a point of sale and Wallet loyalty platform live with businesses in Mexico, plus six iOS apps on the App Store: Raro, Triplook, WoRD, RemainingWeeks, POSMe and POSMe Caja.',
  },
  'walletme-detail': {
    path: '/apps/walletme',
    title: 'WalletMe + POSMe case study: point of sale and Wallet loyalty | Alan Gloria',
    description:
      'How I built WalletMe + POSMe solo: Apple Wallet and Google Wallet loyalty passes, signed NFC taps, an offline-first point of sale on Windows, Android and iPad, CFDI 4.0 invoicing, and a SwiftUI owner app.',
  },
  'raro-detail': {
    path: '/apps/raro',
    title: 'Raro case study — collectible cards from real places | Alan Gloria',
    description:
      'How I built Raro: an iOS camera that turns real places into collectible cards — server-side rarity rolls, world-first Card #1, Metal foils, H3 geo-cells, Supabase and App Attest.',
  },
  'triplook-detail': {
    path: '/apps/triplook',
    title: 'Triplook case study — AI travel outfit planner for iOS | Alan Gloria',
    description:
      'How I built Triplook: SwiftUI digital closet with AI background removal, weather-aware outfit planning per trip day, auto packing lists, and the App Store release.',
  },
  'app-detail': {
    path: '/apps/word',
    title: 'WoRD case study — speed reading trainer for iOS | Alan Gloria',
    description:
      'How I built WoRD (4.4★ on the App Store): CADisplayLink RSVP engine, WidgetKit widgets, Swift Charts analytics, and RevenueCat subscriptions.',
  },
  'remainingweeks-detail': {
    path: '/apps/remainingweeks',
    title: 'RemainingWeeks case study — life calendar for iPhone & Apple Watch | Alan Gloria',
    description:
      'How I built RemainingWeeks: SwiftData, WidgetKit, watchOS complications, iCloud sync, and RevenueCat subscriptions on a shared design system.',
  },
};

export const viewFromPath = (pathname: string): ViewState => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const match = (Object.keys(VIEW_ROUTES) as ViewState[]).find(
    (view) => VIEW_ROUTES[view].path === clean
  );
  return match ?? 'portfolio';
};
