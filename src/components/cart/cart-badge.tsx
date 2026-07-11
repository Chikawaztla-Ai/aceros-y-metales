'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/carrito';

/** Ícono de carrito con contador. Evita mismatch de hidratación con `mounted`. */
export function CartBadge() {
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.getItemCount());
  useEffect(() => setMounted(true), []);

  return (
    <Link
      href="/carrito"
      aria-label="Carrito"
      className="relative text-on-primary-container/80 hover:text-on-tertiary-container transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      {mounted && count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-on-tertiary-container text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}
