import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticle } from '@/lib/blog';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  return { title: article?.title ?? 'Artículo', description: article?.excerpt };
}

// Cuerpo genérico para artículos sin `body` en el mock.
const fallbackBody = [
  {
    heading: 'Introducción',
    paragraphs: [
      'Este material técnico forma parte de nuestro centro de recursos para la industria metalmecánica. Nuestro equipo de ingeniería recopila las mejores prácticas de selección, maquinado y aplicación de materiales industriales.',
    ],
  },
  {
    heading: 'Recomendaciones',
    paragraphs: [
      'Para una selección óptima, considera siempre las condiciones de servicio, los esfuerzos a los que estará sometido el componente y los requisitos de certificación de tu proyecto. Nuestro equipo puede asesorarte sin costo.',
    ],
  },
];

export default async function ArticuloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const body = article.body ?? fallbackBody;
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <main className="py-16 max-w-container mx-auto px-4 md:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm font-medium text-on-surface-variant">
        <Link href="/" className="hover:text-primary">Inicio</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link href="/blog" className="hover:text-primary">Blog</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">{article.category}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contenido (8/12) */}
        <article className="lg:col-span-8">
          <header className="mb-8">
            <span className="inline-block bg-tertiary-fixed text-on-tertiary-container px-3 py-1 rounded-sm text-sm font-semibold mb-4 uppercase tracking-widest">
              {article.category}
            </span>
            <h1 className="font-montserrat font-bold text-[40px] leading-tight text-primary mb-6">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 border-b border-outline-variant pb-6">
              <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold shrink-0">
                AM
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">Equipo Técnico AMU</p>
                <p className="text-on-surface-variant text-sm">
                  {article.date} • {article.minutes} min de lectura
                </p>
              </div>
            </div>
          </header>

          {/* Imagen destacada */}
          <figure className="mb-10">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-surface-container shadow-sm border border-outline-variant/10">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${article.image}')` }}
              />
            </div>
          </figure>

          {/* Cuerpo */}
          <div className="text-lg leading-relaxed text-on-surface space-y-8">
            <p>{article.excerpt}</p>
            {body.map((section) => (
              <div key={section.heading} className="space-y-6">
                <h2
                  id={section.heading.toLowerCase().replace(/\s+/g, '-')}
                  className="font-montserrat font-semibold text-2xl text-primary uppercase pt-4 border-l-4 border-on-tertiary-container pl-4 scroll-mt-24"
                >
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Footer del artículo */}
          <footer className="mt-16 pt-12 border-t border-outline-variant">
            <div className="flex flex-wrap gap-2 mb-12">
              {['#ACERO', '#METALURGIA', '#INGENIERIA', '#INDUSTRIAL'].map((tag) => (
                <span
                  key={tag}
                  className="bg-surface-high px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white cursor-pointer transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA de conversión */}
            <section className="bg-primary p-10 rounded-lg text-white flex flex-col md:flex-row items-center justify-between gap-8 mb-16 overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="font-montserrat font-semibold text-2xl mb-2">
                  ¿Necesita material para su proyecto?
                </h3>
                <p className="text-on-primary-container">
                  Contamos con stock inmediato y corte a medida de precisión.
                </p>
              </div>
              <Link
                href="/cotizacion"
                className="bg-on-tertiary-container text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all hover:brightness-110 active:scale-95 relative z-10 shrink-0"
              >
                Cotizar Ahora
              </Link>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  precision_manufacturing
                </span>
              </div>
            </section>

            {/* Relacionados */}
            <section>
              <h4 className="font-montserrat font-semibold text-2xl text-primary mb-8">Artículos Relacionados</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group cursor-pointer block">
                    <div className="aspect-video bg-surface-container rounded-lg overflow-hidden mb-4">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${rel.image}')` }}
                      />
                    </div>
                    <h5 className="font-montserrat font-semibold text-[18px] leading-tight text-primary mb-2 group-hover:text-on-tertiary-container transition-colors">
                      {rel.title}
                    </h5>
                    <p className="text-on-surface-variant text-sm line-clamp-2">{rel.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          </footer>
        </article>

        {/* Sidebar (4/12) */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-10">
            {/* Tabla de contenidos */}
            <nav className="bg-surface-low p-8 border border-outline-variant">
              <h4 className="font-montserrat font-semibold text-[18px] text-primary uppercase mb-6 tracking-wider">
                Contenido
              </h4>
              <ul className="space-y-4">
                {body.map((section) => (
                  <li key={section.heading}>
                    <a
                      href={`#${section.heading.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-on-surface-variant hover:text-on-tertiary-container flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                      <span className="w-4 h-[2px] bg-outline-variant" /> {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA cotización */}
            <section className="bg-primary p-10 text-white flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-on-tertiary-container text-5xl mb-6">request_quote</span>
              <h4 className="font-montserrat font-semibold text-xl mb-4">Cotización urgente</h4>
              <p className="mb-8 opacity-80 text-sm">Entrega inmediata a todo el país.</p>
              <Link
                href="/cotizacion"
                className="w-full bg-on-tertiary-container text-white py-4 font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all active:scale-95"
              >
                Solicitar Cotización
              </Link>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
}
