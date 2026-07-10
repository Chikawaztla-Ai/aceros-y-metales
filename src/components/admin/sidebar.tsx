'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const adminNav = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/pedidos', label: 'Pedidos', icon: '📦' },
  { href: '/admin/inventario', label: 'Inventario', icon: '🏭' },
  { href: '/admin/cotizaciones', label: 'Cotizaciones', icon: '📋' },
  { href: '/admin/clientes', label: 'Clientes', icon: '👥' },
  { href: '/admin/blog', label: 'Blog', icon: '✏️' },
  { href: '/admin/config', label: 'Configuración', icon: '⚙️' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-[260px] bg-primary flex flex-col">
      <div className="p-6 border-b border-white/10">
        <span className="font-montserrat font-bold text-on-primary text-sm tracking-tight">
          ACEROS <span className="text-on-tertiary-container">Y</span> METALES
        </span>
        <span className="block text-[9px] text-on-primary-container tracking-[2px] mt-1">ADMIN PANEL</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {adminNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors',
              pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                ? 'bg-white/10 text-on-tertiary-container border-l-[3px] border-on-tertiary-container'
                : 'text-on-primary-container hover:bg-white/5'
            )}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
