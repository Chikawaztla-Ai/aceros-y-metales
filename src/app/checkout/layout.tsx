import Link from 'next/link';

// Header simplificado del checkout (stitch): sin navegación, solo logo +
// indicador de seguridad. Sin footer — pantalla de conversión.
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-surface h-20 border-b border-outline-variant flex items-center sticky top-0 z-50">
        <div className="max-w-container mx-auto w-full px-10 flex justify-between items-center">
          <Link href="/" className="font-montserrat text-primary font-bold uppercase tracking-tight text-xl">
            ACEROS Y METALES <span className="text-on-tertiary-container">URGENTES</span>
          </Link>
          <div className="flex items-center gap-2 text-secondary text-sm font-semibold">
            <span className="material-symbols-outlined text-primary text-[24px]">lock</span>
            PAGO 100% SEGURO
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
