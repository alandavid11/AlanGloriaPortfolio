import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';

/** Track normalized mouse position for cursor-reactive backgrounds (pointer-events: none canvases). */
export function useWindowPointer() {
  const { pointer } = useThree();
  const initialized = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      initialized.current = true;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [pointer]);
}
