'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { CartBadge } from '@/components/cart/cart-badge';

const navLinks = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/cotizacion', label: 'Cotización' },
  { href: '/blog', label: 'Blog' },
  { href: '/nosotros', label: 'Nosotros' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-primary-container border-b border-outline-variant">
      <div className="max-w-container mx-auto px-10 h-[76px] flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-montserrat font-bold text-lg text-on-primary tracking-tight">
            ACEROS <span className="text-on-tertiary-container">Y</span> METALES
          </span>
          <span className="text-[10px] font-medium text-on-primary-container tracking-[3px] uppercase">
            URGENTES
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'text-sm font-medium transition-colors duration-200',
                pathname.startsWith(link.href)
                  ? 'text-on-tertiary-container'
                  : 'text-on-primary-container/80 hover:text-on-tertiary-container'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cotizacion"
            className="hidden sm:inline-flex items-center bg-on-tertiary-container text-white text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-all"
          >
            Cotizar ahora
          </Link>
          <CartBadge />
          <Link href="/login" className="text-on-primary-container/80 hover:text-on-tertiary-container transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
