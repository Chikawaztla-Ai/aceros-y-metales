'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Retraso en ms antes de aparecer (para escalonar cards). */
  delay?: number;
  className?: string;
}

/**
 * Aparición al entrar en viewport: fade + subida sutil (DESIGN-SYSTEM §8).
 * Respeta prefers-reduced-motion (el CSS anula la transición).
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const show = () => entry.target.classList.add('reveal-visible');
            if (delay > 0) setTimeout(show, delay);
            else show();
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
