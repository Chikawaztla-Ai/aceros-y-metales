import Link from 'next/link';

// Header simplificado del checkout (stitch): sin navegación, solo logo +
// indicador de seguridad. Sin footer — pantalla de conversión.
// En móvil el logo baja de tamaño y el sello de seguridad se reduce al
// candado + "SEGURO" para que nada se parta en varias líneas.
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-surface h-16 md:h-20 border-b border-outline-variant flex items-center sticky top-0 z-50">
        <div className="max-w-container mx-auto w-full px-4 md:px-10 flex justify-between items-center gap-4">
          <Link
            href="/"
            className="font-montserrat text-primary font-bold uppercase tracking-tight text-sm md:text-xl leading-tight"
          >
            ACEROS Y METALES <span className="text-on-tertiary-container">URGENTES</span>
          </Link>
          <div className="flex items-center gap-2 text-secondary text-xs md:text-sm font-semibold shrink-0">
            <span className="material-symbols-outlined text-primary text-[20px]! md:text-[24px]!">lock</span>
            <span className="hidden sm:inline">PAGO 100% SEGURO</span>
            <span className="sm:hidden">SEGURO</span>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
