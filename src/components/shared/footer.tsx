import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-primary-container border-t-4 border-on-tertiary-container">
      <div className="max-w-container mx-auto px-10 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex flex-col leading-none mb-4">
            <span className="font-montserrat font-bold text-lg text-on-primary tracking-tighter uppercase">
              ACEROS Y METALES
            </span>
            <span className="text-[10px] font-bold text-on-tertiary-container tracking-[3px] uppercase">
              URGENTES
            </span>
          </div>
          <p className="text-sm text-on-primary-container/70">
            Distribución industrial de acero, aluminio, cobre, bronce y metales especiales.
            Disponibilidad inmediata y calidad certificada.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-on-tertiary-container mb-4">
            Catálogo
          </h4>
          <nav className="flex flex-col gap-2">
            <Link href="/catalogo?cat=aceros-comerciales" className="text-sm text-on-primary-container/70 hover:underline decoration-on-tertiary-container">Aceros Comerciales</Link>
            <Link href="/catalogo?cat=aceros-especiales" className="text-sm text-on-primary-container/70 hover:underline decoration-on-tertiary-container">Aceros Especiales</Link>
            <Link href="/catalogo?cat=aluminio" className="text-sm text-on-primary-container/70 hover:underline decoration-on-tertiary-container">Aluminio</Link>
            <Link href="/catalogo?cat=no-ferrosos" className="text-sm text-on-primary-container/70 hover:underline decoration-on-tertiary-container">No Ferrosos</Link>
          </nav>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-on-tertiary-container mb-4">
            Servicios
          </h4>
          <nav className="flex flex-col gap-2">
            <Link href="/cotizacion" className="text-sm text-on-primary-container/70 hover:underline decoration-on-tertiary-container">Cotización rápida</Link>
            <Link href="/blog" className="text-sm text-on-primary-container/70 hover:underline decoration-on-tertiary-container">Blog técnico</Link>
            <Link href="/nosotros" className="text-sm text-on-primary-container/70 hover:underline decoration-on-tertiary-container">Nosotros</Link>
          </nav>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-on-tertiary-container mb-4">
            Contacto
          </h4>
          <div className="flex flex-col gap-3 text-sm text-on-primary-container/70">
            <span className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-on-tertiary-container">location_on</span>
              [Dirección del cliente]
            </span>
            <span className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-on-tertiary-container">phone</span>
              [Teléfono]
            </span>
            <span className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-on-tertiary-container">mail</span>
              [Email]
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-on-primary-container/10 py-6 text-center">
        <span className="text-[12px] font-medium text-on-primary-container/50">
          © {new Date().getFullYear()} Aceros y Metales Urgentes · acerosymetalesurgentes.com
        </span>
      </div>
    </footer>
  );
}
