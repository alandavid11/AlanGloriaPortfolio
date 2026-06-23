import React, { Suspense } from 'react';
import { use3DCapability } from '../../utils/use3DCapability';

interface Lazy3DProps<P extends object = Record<string, never>> {
  component: React.LazyExoticComponent<React.ComponentType<P>>;
  fallback: React.ReactNode;
  className?: string;
  componentProps?: P;
}

export function Lazy3D<P extends object = Record<string, never>>({
  component: Component,
  fallback,
  className,
  componentProps,
}: Lazy3DProps<P>) {
  const enabled = use3DCapability();

  if (!enabled) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      <div className={className}>
        <Component {...(componentProps as P)} />
      </div>
    </Suspense>
  );
}
