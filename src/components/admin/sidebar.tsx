'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { clsx } from 'clsx';

const adminNav = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { href: '/admin/pedidos', label: 'Pedidos', icon: 'receipt_long' },
  { href: '/admin/inventario', label: 'Inventario', icon: 'inventory_2' },
  { href: '/admin/cotizaciones', label: 'Cotizaciones', icon: 'request_quote' },
  { href: '/admin/crm', label: 'CRM / Ventas', icon: 'insights' },
  { href: '/admin/clientes', label: 'Clientes', icon: 'group' },
  { href: '/admin/logistica', label: 'Logística', icon: 'local_shipping' },
  { href: '/admin/maquinaria', label: 'Maquinaria', icon: 'precision_manufacturing' },
  { href: '/admin/config', label: 'Ajustes', icon: 'settings' },
];

/** Contenido interno del sidebar, compartido entre el fijo (escritorio) y el drawer (móvil). */
function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="p-6 border-b border-white/10">
        <span className="font-montserrat font-bold text-on-primary text-[20px] uppercase tracking-tight leading-none block">
          Aceros y Metales
        </span>
        <span className="block text-[10px] text-on-tertiary-container tracking-[2px] mt-1 uppercase font-semibold">
          Admin Panel
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {adminNav.map((item) => {
          const active =
            pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={clsx(
                'flex items-center gap-4 px-4 py-3 rounded transition-colors group',
                active
                  ? 'text-on-tertiary-container bg-white/10 border-l-4 border-on-tertiary-container'
                  : 'text-on-primary-container hover:bg-white/5'
              )}
            >
              <span
                className="material-symbols-outlined group-hover:text-on-tertiary-container text-[24px]!"
                style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className={clsx('text-sm', active && 'font-bold')}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Perfil */}
      <div className="p-4 mt-auto border-t border-white/10">
        <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded border border-on-tertiary-container/30 bg-secondary text-white flex items-center justify-center font-bold shrink-0">
            CM
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-white leading-none truncate">Carlos Mendoza</span>
            <span className="text-[10px] text-on-primary-container uppercase mt-1 font-semibold">Administrador</span>
          </div>
          <span className="material-symbols-outlined text-on-primary-container ml-auto text-[24px]!">more_vert</span>
        </div>
      </div>
    </>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Barra superior — solo móvil (en escritorio el sidebar fijo ya está visible). */}
      <div className="md:hidden sticky top-0 z-40 flex items-center gap-3 bg-primary px-4 py-3 border-b border-white/10">
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="text-on-primary shrink-0"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
            menu
          </span>
        </button>
        <span className="font-montserrat font-bold text-on-primary text-base uppercase tracking-tight leading-none">
          Aceros y Metales{' '}
          <span className="text-on-tertiary-container">· Admin</span>
        </span>
      </div>

      {/* Drawer móvil */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setOpen(false)}
        >
          <aside
            className="absolute inset-y-0 left-0 w-[260px] max-w-[85%] bg-primary flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="absolute top-4 right-3 text-on-primary-container z-10"
            >
              <span className="material-symbols-outlined text-[24px]!">close</span>
            </button>
            <SidebarBody onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Sidebar fijo — solo escritorio. */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-[260px] bg-primary flex-col">
        <SidebarBody />
      </aside>
    </>
  );
}
