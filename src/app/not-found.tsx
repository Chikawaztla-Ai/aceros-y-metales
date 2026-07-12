import Link from 'next/link';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-surface">
        {/* Rejilla estructural de fondo */}
        <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-60">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={i < 11 ? 'border-r border-outline-variant/40 h-full' : 'h-full'} />
          ))}
        </div>

        <div className="relative max-w-container mx-auto px-10 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          {/* Emblema 404 */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-72 h-72 md:w-96 md:h-96 border-4 border-primary-container/20 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-primary-container text-[120px] md:text-[160px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                error
              </span>
              <div className="absolute top-0 right-0 border border-primary-container p-2 bg-surface shadow-sm -translate-y-1/2 translate-x-1/4">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Err_Code: 404</p>
              </div>
              <div className="absolute bottom-8 left-0 border border-outline p-2 bg-surface shadow-sm -translate-x-1/4">
                <p className="text-xs font-medium text-on-surface-variant uppercase">Status: Structural_Failure</p>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-on-tertiary-container uppercase tracking-widest mb-4">
              Sistemas Interrumpidos
            </p>
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-on-surface uppercase mb-6 leading-tight">
              Material No Encontrado
            </h1>
            <p className="text-lg text-on-surface-variant mb-10 max-w-lg">
              La ruta solicitada se encuentra fuera de servicio o el material ha sido removido de
              nuestro inventario activo. Verifique las especificaciones e intente de nuevo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalogo"
                className="bg-primary-container text-on-primary hover:bg-primary transition-all px-8 py-4 rounded-[6px] text-sm font-bold uppercase flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined">inventory_2</span>
                Volver al Catálogo
              </Link>
              <Link
                href="/"
                className="border-2 border-on-background text-on-background hover:bg-on-background hover:text-surface transition-all px-8 py-4 rounded-[6px] text-sm font-bold uppercase flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined">home</span>
                Ir al Inicio
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-outline-variant">
              <p className="text-xs font-semibold text-on-surface-variant uppercase mb-1">Reporte Técnico</p>
              <p className="text-sm font-medium text-error flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">link_off</span>
                Enlace Roto Detectado
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
