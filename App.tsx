import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Dock } from './components/Dock';
import { ViewState } from './types';
import { applySeo, RouteSeo } from './utils/seo';

const PortfolioView = React.lazy(() =>
  import('./views/PortfolioView').then((m) => ({ default: m.PortfolioView }))
);
const AppDetailView = React.lazy(() =>
  import('./views/AppDetailView').then((m) => ({ default: m.AppDetailView }))
);
const RemainingWeeksDetailView = React.lazy(() =>
  import('./views/RemainingWeeksDetailView').then((m) => ({ default: m.RemainingWeeksDetailView }))
);
const TriplookDetailView = React.lazy(() =>
  import('./views/TriplookDetailView').then((m) => ({ default: m.TriplookDetailView }))
);
const ParticleBackground3D = React.lazy(
  () => import('./components/three/ParticleBackground3D').then((m) => ({ default: m.ParticleBackground3D }))
);

const VIEW_ROUTES: Record<ViewState, RouteSeo> = {
  portfolio: {
    path: '/',
    title: 'Alan Gloria — iOS Engineer',
    description:
      'iOS Engineer building clinical SDKs, retail apps at scale, and App Store products — Triplook (AI travel outfits), WoRD and RemainingWeeks. Saltillo, Mexico.',
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

const viewFromPath = (pathname: string): ViewState => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const match = (Object.keys(VIEW_ROUTES) as ViewState[]).find(
    (view) => VIEW_ROUTES[view].path === clean
  );
  return match ?? 'portfolio';
};

function ViewFallback() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 pb-28 pt-5 md:pt-8 animate-pulse">
      <div className="h-48 rounded-2xl bg-white/[0.03] border border-white/[0.06]" />
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(() =>
    viewFromPath(window.location.pathname)
  );

  const navigate = useCallback((view: ViewState) => {
    setCurrentView(view);
    const route = VIEW_ROUTES[view];
    if (window.location.pathname.replace(/\/+$/, '') !== route.path.replace(/\/+$/, '')) {
      window.history.pushState(null, '', route.path);
    }
    applySeo(route);
  }, []);

  useEffect(() => {
    applySeo(VIEW_ROUTES[viewFromPath(window.location.pathname)]);

    const handlePopState = () => {
      const view = viewFromPath(window.location.pathname);
      setCurrentView(view);
      applySeo(VIEW_ROUTES[view]);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#09090b] text-zinc-50 antialiased">
      <div className="mesh-bg" aria-hidden />
      <Suspense fallback={null}>
        <ParticleBackground3D />
      </Suspense>
      <div className="noise-bg" aria-hidden />
      <div className="grid-lines" aria-hidden />

      <main>
        <Suspense fallback={<ViewFallback />}>
          {currentView === 'portfolio' ? (
            <PortfolioView
              onNavigateToApp={() => navigate('app-detail')}
              onNavigateToRemainingWeeks={() => navigate('remainingweeks-detail')}
              onNavigateToTriplook={() => navigate('triplook-detail')}
            />
          ) : currentView === 'app-detail' ? (
            <AppDetailView onBack={() => navigate('portfolio')} />
          ) : currentView === 'triplook-detail' ? (
            <TriplookDetailView onBack={() => navigate('portfolio')} />
          ) : (
            <RemainingWeeksDetailView onBack={() => navigate('portfolio')} />
          )}
        </Suspense>
      </main>

      <Dock currentView={currentView} setView={navigate} />
    </div>
  );
}

export default App;
