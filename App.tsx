import React, { useState, Suspense } from 'react';
import { Dock } from './components/Dock';
import { ViewState } from './types';

const PortfolioView = React.lazy(() =>
  import('./views/PortfolioView').then((m) => ({ default: m.PortfolioView }))
);
const AppDetailView = React.lazy(() =>
  import('./views/AppDetailView').then((m) => ({ default: m.AppDetailView }))
);
const RemainingWeeksDetailView = React.lazy(() =>
  import('./views/RemainingWeeksDetailView').then((m) => ({ default: m.RemainingWeeksDetailView }))
);
const ParticleBackground3D = React.lazy(
  () => import('./components/three/ParticleBackground3D').then((m) => ({ default: m.ParticleBackground3D }))
);

function ViewFallback() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 pb-28 pt-5 md:pt-8 animate-pulse">
      <div className="h-48 rounded-2xl bg-white/[0.03] border border-white/[0.06]" />
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('portfolio');

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
              onNavigateToApp={() => setCurrentView('app-detail')}
              onNavigateToRemainingWeeks={() => setCurrentView('remainingweeks-detail')}
            />
          ) : currentView === 'app-detail' ? (
            <AppDetailView onBack={() => setCurrentView('portfolio')} />
          ) : (
            <RemainingWeeksDetailView onBack={() => setCurrentView('portfolio')} />
          )}
        </Suspense>
      </main>

      <Dock currentView={currentView} setView={setCurrentView} />
    </div>
  );
}

export default App;
