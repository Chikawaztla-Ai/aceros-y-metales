'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { CartBadge } from '@/components/cart/cart-badge';
import { BrandLogo } from '@/components/shared/brand-logo';

const navLinks = [
  { href: '/catalogo', label: 'Catálogo', icon: 'grid_view' },
  { href: '/cotizacion', label: 'Cotización', icon: 'request_quote' },
  { href: '/blog', label: 'Blog', icon: 'menu_book' },
  { href: '/nosotros', label: 'Nosotros', icon: 'domain' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    // El drawer vive dentro del header. Como el header crea contexto de
    // apilamiento, su z debe superar al de BottomNav (z-50) cuando el menú
    // está abierto; si no, la barra inferior se pinta encima del drawer.
    <header
      className={clsx(
        'sticky top-0 bg-primary-container border-b border-outline-variant shadow-sm',
        menuAbierto ? 'z-[60]' : 'z-50'
      )}
    >
      <div className="max-w-container mx-auto px-4 md:px-10 py-3 md:py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          {/* Hamburguesa — solo móvil (en escritorio el nav está visible).
              md:hidden va en el <button>, NO en el ícono: la hoja de Google
              (sin capa) fija display:inline-block y le ganaría a md:hidden. */}
          <button
            onClick={() => setMenuAbierto(true)}
            aria-label="Abrir menú"
            className="md:hidden shrink-0 text-on-primary"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
              menu
            </span>
          </button>

          <Link href="/" className="flex items-center gap-3 shrink-0">
            <BrandLogo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm font-semibold transition-colors duration-200',
                  pathname.startsWith(link.href)
                    ? 'text-on-tertiary-container'
                    : 'text-on-primary-container/80 hover:text-on-tertiary-container'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          {/* Buscador pill — estilo stitch */}
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px]! text-on-primary-container/70 pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar material..."
              className="bg-primary/20 border-none rounded-full py-2 pl-10 pr-4 text-on-primary placeholder:text-on-primary-container/50 text-sm focus:ring-1 focus:ring-on-tertiary-container outline-none w-64"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const q = e.currentTarget.value.trim();
                  if (q) router.push(`/catalogo?q=${encodeURIComponent(q)}`);
                }
              }}
            />
          </div>

          {/* hidden/sm:inline en el <Link>, no en el ícono (ver nota en layout.tsx) */}
          <Link
            href="/#calculadora"
            aria-label="Calculadora de peso"
            className="hidden sm:inline text-on-primary-container/80 hover:text-on-tertiary-container transition-colors"
          >
            <span className="material-symbols-outlined">calculate</span>
          </Link>

          <CartBadge />

          <Link
            href="/login"
            aria-label="Mi cuenta"
            className="material-symbols-outlined text-on-primary-container/80 hover:text-on-tertiary-container transition-colors text-[24px]!"
          >
            account_circle
          </Link>

          <Link
            href="/cotizacion"
            className="hidden sm:inline-flex items-center bg-on-tertiary-container text-white text-sm font-semibold uppercase tracking-wide px-6 py-2 rounded-full hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
          >
            Cotizar ahora
          </Link>
        </div>
      </div>

      {/* Drawer móvil */}
      {menuAbierto && (
        <div
          className="md:hidden fixed inset-0 z-[60] bg-black/50"
          onClick={() => setMenuAbierto(false)}
        >
          <div
            className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-primary-container shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <BrandLogo />
              <button
                onClick={() => setMenuAbierto(false)}
                aria-label="Cerrar menú"
                className="material-symbols-outlined text-on-primary text-[24px]!"
              >
                close
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {navLinks.map((link) => {
                const activo = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuAbierto(false)}
                    className={clsx(
                      'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors',
                      activo
                        ? 'bg-white/10 text-on-tertiary-container font-bold'
                        : 'text-on-primary-container hover:bg-white/5'
                    )}
                  >
                    <span className="material-symbols-outlined text-[24px]!">{link.icon}</span>
                    <span className="text-sm">{link.label}</span>
                  </Link>
                );
              })}
              <Link
                href="/#calculadora"
                onClick={() => setMenuAbierto(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-primary-container hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]!">calculate</span>
                <span className="text-sm">Calculadora de peso</span>
              </Link>
            </nav>

            <div className="p-4 border-t border-white/10">
              <Link
                href="/cotizacion"
                onClick={() => setMenuAbierto(false)}
                className="block w-full text-center bg-on-tertiary-container text-white text-sm font-semibold uppercase tracking-wide py-3 rounded-full active:scale-95 transition-all"
              >
                Cotizar ahora
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
