export default function HomePage() {
  return (
    <section className="max-w-container mx-auto px-10 py-20">
      <h1 className="font-montserrat font-extrabold text-5xl text-primary tracking-tight mb-4">
        Acero y Metales —<br />
        <span className="text-on-tertiary-container">Disponibilidad Inmediata</span>
      </h1>
      <p className="text-lg text-on-surface-variant max-w-xl mb-8">
        Más de 500 materiales en stock. Compra por metro, kilo o pieza. Cotiza en 2 minutos.
      </p>
      <div className="flex gap-4">
        <a
          href="/catalogo"
          className="bg-on-tertiary-container text-white text-sm font-bold uppercase tracking-wide px-8 py-3 rounded-lg hover:brightness-110 active:scale-95 transition-all"
        >
          Ver Catálogo
        </a>
        <a
          href="/cotizacion"
          className="border-2 border-primary-container text-primary-container text-sm font-bold uppercase tracking-wide px-8 py-3 rounded-lg hover:bg-primary-container hover:text-white transition-all"
        >
          Solicitar Cotización
        </a>
      </div>
    </section>
  );
}
