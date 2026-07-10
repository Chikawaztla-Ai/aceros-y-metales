'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const portalNav = [
  { href: '/portal/pedidos', label: 'Mis Pedidos' },
  { href: '/portal/cotizaciones', label: 'Mis Cotizaciones' },
  { href: '/portal/precios', label: 'Lista de Precios' },
  { href: '/portal/facturas', label: 'Mis Facturas' },
  { href: '/portal/cuenta', label: 'Datos de Empresa' },
];

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-surface border-r border-outline-variant pt-20">
      <div className="p-6">
        <h2 className="font-montserrat font-bold text-primary text-sm">Portal de Clientes</h2>
      </div>
      <nav className="px-4 space-y-1">
        {portalNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'block px-4 py-2.5 rounded-lg text-sm transition-colors',
              pathname.startsWith(item.href)
                ? 'bg-secondary-fixed text-primary font-bold'
                : 'text-on-surface-variant hover:bg-surface-high'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
