'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const portalNav = [
  { href: '/portal/pedidos', label: 'Mis pedidos', icon: 'inventory_2' },
  { href: '/portal/cotizaciones', label: 'Mis cotizaciones', icon: 'request_quote' },
  { href: '/portal/precios', label: 'Lista de precios', icon: 'list_alt' },
  { href: '/portal/facturas', label: 'Facturas', icon: 'receipt_long' },
  { href: '/portal/cuenta', label: 'Mis Datos', icon: 'manage_accounts' },
];

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-surface border-r border-outline-variant flex flex-col p-4 pt-24 h-screen overflow-y-auto">
      <div className="mb-8 px-2">
        <h2 className="font-montserrat font-semibold text-lg text-primary">Portal Industrial</h2>
        <p className="text-sm text-on-surface-variant">Centro de Distribución</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {portalNav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-4 px-4 py-3 rounded-lg transition-all group',
                active
                  ? 'bg-secondary-fixed text-on-secondary-fixed font-bold'
                  : 'text-on-surface-variant hover:bg-surface-high'
              )}
            >
              <span className="material-symbols-outlined group-hover:text-primary">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-outline-variant">
        <Link
          href="/cotizacion"
          className="block w-full bg-primary text-on-primary text-center py-3 rounded-lg text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-all"
        >
          Nueva cotización
        </Link>
        <div className="flex items-center gap-3 mt-6 px-2">
          <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold shrink-0">
            JD
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-on-surface truncate">Juan Delgado</p>
            <p className="text-xs text-on-surface-variant truncate">Logística S.A.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
