'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-primary-container border-b border-outline-variant shadow-sm">
      <div className="max-w-container mx-auto px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-montserrat font-bold text-lg text-on-primary tracking-tighter">
              ACEROS Y METALES
            </span>
            <span className="text-[10px] font-bold text-on-tertiary-container tracking-[3px] uppercase">
              URGENTES
            </span>
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

        <div className="flex items-center gap-5">
          {/* Buscador pill — estilo stitch */}
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-primary-container/70 pointer-events-none">
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

          <Link
            href="/#calculadora"
            aria-label="Calculadora de peso"
            className="material-symbols-outlined text-on-primary-container/80 hover:text-on-tertiary-container transition-colors text-[24px]"
          >
            calculate
          </Link>

          <CartBadge />

          <Link
            href="/login"
            aria-label="Mi cuenta"
            className="material-symbols-outlined text-on-primary-container/80 hover:text-on-tertiary-container transition-colors text-[24px]"
          >
            account_circle
          </Link>

          <Link
            href="/cotizacion"
            className="hidden sm:inline-flex items-center bg-on-tertiary-container text-white text-sm font-semibold uppercase tracking-wide px-6 py-2 rounded-full hover:brightness-110 active:scale-95 transition-all"
          >
            Cotizar ahora
          </Link>
        </div>
      </div>
    </header>
  );
}
