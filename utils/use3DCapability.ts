import { useEffect, useState } from 'react';

export function use3DCapability(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setEnabled(!mobile && !reduced);
    };
    check();
    const mqMobile = window.matchMedia('(max-width: 768px)');
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    mqMobile.addEventListener('change', check);
    mqReduced.addEventListener('change', check);
    return () => {
      mqMobile.removeEventListener('change', check);
      mqReduced.removeEventListener('change', check);
    };
  }, []);

  return enabled;
}

export function useTabVisible(): boolean {
  const [visible, setVisible] = useState(
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  );

  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return visible;
}
