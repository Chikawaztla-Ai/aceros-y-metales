'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Anima un número hacia su valor objetivo (DESIGN-SYSTEM §8 "count-up").
 * Primera aparición: ~1s desde 0. Cambios posteriores: tween corto de 300ms
 * desde el valor anterior. Respeta prefers-reduced-motion.
 */
export function useCountUp(target: number): number {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);
  const firstRef = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      prevRef.current = target;
      setDisplay(target);
      return;
    }

    const from = prevRef.current;
    const duration = firstRef.current ? 1000 : 300;
    firstRef.current = false;
    prevRef.current = target;

    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cúbico
      setDisplay(from + (target - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return display;
}
