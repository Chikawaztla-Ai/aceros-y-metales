import Link from 'next/link';
import { articles, categories, topArticles } from '@/lib/blog';

export const metadata = {
  title: 'Blog Técnico',
  description:
    'Guías, aplicaciones y comparativas de materiales industriales. Información estratégica para la industria metalmecánica.',
};

export default function BlogPage() {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured.slug);

  return (
    <>
      {/* Hero editorial (stitch) */}
      <header className="bg-surface-low py-16 md:py-24">
        <div className="max-w-container mx-auto px-10 text-center">
          <p className="text-on-tertiary-container text-sm font-semibold uppercase tracking-wide mb-4">
            Centro de Recursos
          </p>
          <h1 className="font-montserrat font-bold text-4xl md:text-[48px] md:leading-[56px] tracking-[-0.02em] text-primary mb-6">
            Blog Técnico
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
            Guías, aplicaciones y comparativas de materiales para tu proyecto. Información
            estratégica para la industria metalmecánica.
          </p>
          <div className="max-w-xl mx-auto relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar por material, norma o aplicación..."
              className="w-full pl-12 pr-4 py-4 border border-outline-variant rounded bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none shadow-sm text-sm"
            />
          </div>
        </div>
      </header>

      {/* Layout principal */}
      <main className="max-w-container mx-auto px-10 py-16 flex flex-col md:flex-row gap-6">
        {/* Grid de artículos (2/3) */}
        <div className="w-full md:w-2/3">
          {/* Artículo destacado */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group block mb-12 bg-white border border-outline-variant overflow-hidden hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="aspect-video relative overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${featured.image}')` }}
              />
              <div className="absolute top-6 left-6 bg-on-tertiary-container text-white px-4 py-1 text-sm font-semibold uppercase">
                {featured.category}
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4 text-outline text-[13px] font-medium uppercase tracking-wider">
                <span>{featured.date}</span>
                <span className="w-1 h-1 bg-outline rounded-full" />
                <span>{featured.minutes} min de lectura</span>
              </div>
              <h2 className="font-montserrat font-bold text-[32px] leading-10 text-primary mb-4 group-hover:text-on-tertiary-container transition-colors">
                {featured.title}
              </h2>
              <p className="text-on-surface-variant mb-6 line-clamp-3">{featured.excerpt}</p>
              <div className="flex items-center text-primary font-bold uppercase text-sm group-hover:translate-x-2 transition-transform">
                Leer artículo completo
                <span className="material-symbols-outlined ml-2">arrow_forward</span>
              </div>
            </div>
          </Link>

          {/* Grid regular */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((art) => (
              <Link
                key={art.slug}
                href={`/blog/${art.slug}`}
                className="group bg-white border border-outline-variant hover:shadow-lg transition-all cursor-pointer block"
              >
                <div className="aspect-[4/3] bg-surface-container overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${art.image}')` }}
                  />
                </div>
                <div className="p-6">
                  <span className="text-on-tertiary-container text-sm font-semibold uppercase block mb-2">
                    {art.category}
                  </span>
                  <h3 className="font-montserrat font-semibold text-xl text-primary mb-3 leading-tight group-hover:text-on-tertiary-container transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-on-surface-variant mb-4 line-clamp-2">{art.excerpt}</p>
                  <span className="text-[13px] font-medium text-outline">{art.date}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-16 flex justify-center gap-2">
            <button
              className="w-12 h-12 flex items-center justify-center border border-outline-variant bg-white text-primary font-bold hover:bg-surface-container transition-colors disabled:opacity-40"
              disabled
              aria-label="Anterior"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-primary bg-primary text-white font-bold">
              1
            </button>
            <button
              className="w-12 h-12 flex items-center justify-center border border-outline-variant bg-white text-primary font-bold hover:bg-surface-container transition-colors disabled:opacity-40"
              disabled
              aria-label="Siguiente"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Sidebar (1/3) */}
        <aside className="w-full md:w-1/3">
          <div className="sticky top-24 space-y-8">
            {/* Categorías */}
            <section className="bg-white border border-outline-variant p-8">
              <h4 className="font-montserrat font-semibold text-xl text-primary mb-6 flex items-center">
                <span className="material-symbols-outlined mr-3">category</span> Categorías
              </h4>
              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li key={cat.name} className="flex justify-between items-center group cursor-pointer">
                    <span className="text-on-surface-variant font-medium group-hover:text-primary transition-colors">
                      {cat.name}
                    </span>
                    <span className="bg-surface-container px-3 py-1 text-xs font-bold text-primary">
                      {cat.count}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Destacados */}
            <section className="bg-white border border-outline-variant p-8">
              <h4 className="font-montserrat font-semibold text-xl text-primary mb-6">Artículos Destacados</h4>
              <div className="space-y-6">
                {topArticles.map((art) => (
                  <Link key={art.slug} href={`/blog/${art.slug}`} className="flex gap-4 group cursor-pointer">
                    <div className="w-20 h-20 bg-surface-container flex-shrink-0 overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform"
                        style={{ backgroundImage: `url('${art.image}')` }}
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-primary leading-tight group-hover:text-on-tertiary-container transition-colors">
                        {art.title}
                      </h5>
                      <span className="text-[11px] font-medium text-outline">{art.minutes} min de lectura</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA cotización */}
            <section className="bg-primary p-10 text-white flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-on-tertiary-container text-5xl mb-6">request_quote</span>
              <h4 className="font-montserrat font-semibold text-xl mb-4">¿Necesitas una cotización urgente?</h4>
              <p className="mb-8 opacity-80">Enviamos materiales a todo el país con entrega inmediata.</p>
              <Link
                href="/cotizacion"
                className="w-full bg-on-tertiary-container text-white py-4 font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all active:scale-95"
              >
                Solicitar Cotización
              </Link>
            </section>
          </div>
        </aside>
      </main>
    </>
  );
}
