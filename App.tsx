import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Dock } from './components/Dock';
import { ViewState } from './types';
import { applySeo } from './utils/seo';
import { VIEW_ROUTES, viewFromPath } from './data/routes';

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
const WalletMeDetailView = React.lazy(() =>
  import('./views/WalletMeDetailView').then((m) => ({ default: m.WalletMeDetailView }))
);
const RaroDetailView = React.lazy(() =>
  import('./views/RaroDetailView').then((m) => ({ default: m.RaroDetailView }))
);

function ViewFallback() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 pb-28 pt-5 md:pt-8 animate-pulse min-h-[80dvh]">
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
      <div className="noise-bg" aria-hidden />
      <div className="grid-lines" aria-hidden />

      <main>
        <Suspense fallback={<ViewFallback />}>
          {currentView === 'portfolio' ? (
            <PortfolioView
              onNavigateToApp={() => navigate('app-detail')}
              onNavigateToRemainingWeeks={() => navigate('remainingweeks-detail')}
              onNavigateToTriplook={() => navigate('triplook-detail')}
              onNavigateToRaro={() => navigate('raro-detail')}
              onNavigateToWalletMe={() => navigate('walletme-detail')}
            />
          ) : currentView === 'app-detail' ? (
            <AppDetailView onBack={() => navigate('portfolio')} />
          ) : currentView === 'triplook-detail' ? (
            <TriplookDetailView onBack={() => navigate('portfolio')} />
          ) : currentView === 'walletme-detail' ? (
            <WalletMeDetailView onBack={() => navigate('portfolio')} />
          ) : currentView === 'raro-detail' ? (
            <RaroDetailView onBack={() => navigate('portfolio')} />
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
