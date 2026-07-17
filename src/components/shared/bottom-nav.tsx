'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

/**
 * Barra de navegación inferior, estilo app (diseño móvil de Stitch).
 * Solo en móvil: en escritorio la navegación vive en el header.
 * El layout público agrega padding inferior para que el contenido no
 * quede tapado por esta barra.
 */
const items = [
  { href: '/', label: 'Inicio', icon: 'home' },
  { href: '/catalogo', label: 'Catálogo', icon: 'grid_view' },
  { href: '/portal', label: 'Pedidos', icon: 'receipt_long' },
  { href: '/portal/cuenta', label: 'Perfil', icon: 'person' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center bg-white z-50 h-20 shadow-lg border-t border-outline-variant">
      {items.map((item) => {
        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex flex-col items-center justify-center rounded-xl px-3 py-1 transition-transform active:scale-90',
              active ? 'bg-tertiary-fixed text-on-tertiary-container' : 'text-secondary'
            )}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="text-[11px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
