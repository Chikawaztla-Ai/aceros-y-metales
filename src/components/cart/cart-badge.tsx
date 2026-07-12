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
      <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
      {mounted && count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-on-tertiary-container text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}
