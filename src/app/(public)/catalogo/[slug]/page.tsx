import Link from 'next/link';
import { WeightCalculator } from '@/components/calculadora/weight-calculator';

// Mock — en producción viene de Supabase con generateStaticParams()
const product = {
  sku: '4140-RD-025',
  name: 'Acero Cromo-Molibdeno 4140',
  grade: '4140',
  category: 'Aceros Especiales',
  categorySlug: 'aceros-especiales',
  price: 185,
  unit: 'kg',
  inStock: true,
  stockQty: 250,
  description: 'Acero de alta resistencia con excelente tenacidad. Ideal para ejes, engranajes, bielas y componentes sometidos a esfuerzos mecánicos elevados.',
  specs: {
    'Grado AISI': '4140',
    'Composición': 'C 0.38-0.43 / Cr 0.80-1.10 / Mo 0.15-0.25 / Mn 0.75-1.00',
    'Dureza Brinell': '197-235 HB (recocido)',
    'Resistencia a la tensión': '95,000 PSI (655 MPa)',
    'Límite elástico': '60,000 PSI (414 MPa)',
    'Aplicaciones': 'Ejes, engranajes, bielas, cigüeñales, pernos de alta resistencia',
    'Norma': 'ASTM A29 / SAE J403',
  },
  equivalences: [
    { country: 'USA', standard: 'AISI/SAE', designation: '4140' },
    { country: 'Alemania', standard: 'DIN', designation: '42CrMo4' },
    { country: 'Europa', standard: 'EN', designation: '1.7225' },
    { country: 'Japón', standard: 'JIS', designation: 'SCM440' },
  ],
  related: [
    { name: 'Acero 4340', slug: 'acero-4340-barra-redonda', grade: '4340', price: 220 },
    { name: 'Acero 8620', slug: 'acero-8620-barra-redonda', grade: '8620', price: 165 },
    { name: 'Acero 1045', slug: 'acero-1045-barra-redonda', grade: '1045', price: 85 },
  ],
};

export default function ProductoPage() {
  return (
    <div className="max-w-container mx-auto px-10 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-6">
        <Link href="/" className="hover:text-primary-container transition-colors">Inicio</Link>
        <span>›</span>
        <Link href="/catalogo" className="hover:text-primary-container transition-colors">Catálogo</Link>
        <span>›</span>
        <Link href={`/catalogo?cat=${product.categorySlug}`} className="hover:text-primary-container transition-colors">{product.category}</Link>
        <span>›</span>
        <span className="font-semibold text-on-surface">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        {/* CONTENIDO IZQUIERDO */}
        <div>
          {/* Galería */}
          <div className="relative bg-surface-low border border-outline-variant rounded-lg h-[400px] mb-4 flex items-center justify-center">
            <span className="text-6xl text-on-surface-variant/10">⬡</span>
            {product.inStock && (
              <span className="absolute top-4 left-4 bg-on-surface text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                En Stock
              </span>
            )}
          </div>
          <div className="flex gap-2 mb-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-16 bg-surface-low border border-outline-variant rounded-md flex items-center justify-center cursor-pointer hover:border-primary-container transition-colors">
                <span className="text-xl text-on-surface-variant/15">⬡</span>
              </div>
            ))}
          </div>

          {/* Info */}
          <p className="text-[10px] font-semibold uppercase tracking-[2px] text-on-tertiary-container mb-2">
            {product.category}
          </p>
          <h1 className="font-montserrat font-bold text-3xl text-primary-container uppercase tracking-tight mb-2">
            {product.name}
          </h1>
          <p className="text-on-surface-variant mb-8">{product.description}</p>

          {/* Especificaciones */}
          <h2 className="font-montserrat font-bold text-xl text-primary-container uppercase tracking-tight mb-4">
            Especificaciones Técnicas
          </h2>
          <div className="border border-outline-variant rounded-lg overflow-hidden shadow-sm mb-10">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-high">
                  <th className="text-left px-6 py-3 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">Propiedad</th>
                  <th className="text-left px-6 py-3 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {Object.entries(product.specs).map(([key, value], i) => (
                  <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-surface-low'}>
                    <td className="px-6 py-3 text-sm font-semibold text-on-surface">{key}</td>
                    <td className="px-6 py-3 text-sm text-on-surface-variant">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Equivalencias */}
          <h3 className="font-montserrat font-bold text-lg text-primary-container uppercase mb-4">
            Equivalencias Internacionales
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {product.equivalences.map((eq) => (
              <div key={eq.country} className="bg-white border border-outline-variant rounded-lg p-4 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[2px] text-on-tertiary-container mb-1">
                  {eq.country} · {eq.standard}
                </p>
                <p className="text-sm font-medium text-on-surface">{eq.designation}</p>
              </div>
            ))}
          </div>

          {/* Documentación */}
          <h3 className="font-montserrat font-bold text-lg text-primary-container uppercase mb-4">
            Documentación técnica
          </h3>
          <div className="flex gap-3 mb-16">
            <button className="flex items-center gap-2 border-2 border-primary-container text-primary-container text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-primary-container hover:text-white transition-all">
              ↓ Ficha Técnica PDF
            </button>
            <button className="flex items-center gap-2 border-2 border-outline text-on-surface-variant text-sm font-bold px-5 py-2.5 rounded-lg hover:border-primary-container hover:text-primary-container transition-all">
              ↓ Plano DWG
            </button>
          </div>

          {/* Relacionados */}
          <h2 className="font-montserrat font-bold text-xl text-primary-container uppercase tracking-tight mb-6">
            Materiales Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {product.related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/catalogo/${rel.slug}`}
                className="group bg-white border border-outline-variant rounded-lg p-4 hover:shadow-card-hover transition-all"
              >
                <div className="h-24 bg-surface-low rounded-md mb-3 flex items-center justify-center">
                  <span className="text-2xl text-on-surface-variant/15">⬡</span>
                </div>
                <p className="text-[9px] font-semibold uppercase tracking-[2px] text-on-surface-variant">{rel.grade}</p>
                <h3 className="font-montserrat font-bold text-primary-container text-sm group-hover:text-on-tertiary-container transition-colors">{rel.name}</h3>
                <span className="text-on-tertiary-container font-bold text-sm">${rel.price} MXN/kg</span>
              </Link>
            ))}
          </div>
        </div>

        {/* PANEL DE COMPRA (sticky) */}
        <aside className="lg:sticky lg:top-[92px] lg:self-start">
          <div className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[1px] text-on-tertiary-container mb-1">
                SKU: {product.sku}
              </p>
              <h2 className="font-bold text-lg text-on-surface">{product.name}</h2>
            </div>

            <hr className="border-outline-variant" />

            {/* Selector Metro/Kilo/Pieza */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-on-surface-variant mb-2">Unidad de compra</p>
              <div className="flex bg-surface-low p-1 rounded-lg">
                {['Por Metro', 'Por Kilo', 'Por Pieza'].map((tab, i) => (
                  <button
                    key={tab}
                    className={`flex-1 text-xs font-semibold py-2 rounded-md transition-all ${
                      i === 1
                        ? 'bg-white shadow-sm text-primary-container border-b-2 border-primary-container'
                        : 'text-on-surface-variant hover:text-primary-container'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculadora embebida */}
            <WeightCalculator />

            {/* Precio */}
            <div>
              <p className="text-xs text-on-surface-variant">Precio desde:</p>
              <div className="flex items-baseline gap-2">
                <span className="font-montserrat font-bold text-2xl text-on-tertiary-container">
                  ${product.price}.00
                </span>
                <span className="text-sm text-on-surface-variant">MXN/{product.unit}</span>
              </div>
              <p className="text-[11px] text-on-surface-variant/70 mt-1">
                Precio varía según cantidad. Cotiza para precio especial.
              </p>
            </div>

            {/* CTAs */}
            <button className="w-full bg-on-tertiary-container text-white text-sm font-bold uppercase tracking-wide py-3.5 rounded-lg hover:brightness-110 active:scale-95 transition-all">
              Agregar al Carrito
            </button>
            <button className="w-full border-2 border-primary-container text-primary-container text-sm font-bold uppercase tracking-wide py-3 rounded-lg hover:bg-primary-container hover:text-white transition-all">
              Solicitar Cotización
            </button>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '5215519232398'}?text=Hola, me interesa el ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#16a34a] text-white text-sm font-bold py-3 rounded-lg hover:brightness-110 transition-all"
            >
              💬 Consultar disponibilidad
            </a>

            {/* Beneficios */}
            <div className="space-y-3 pt-2">
              {[
                { icon: '📦', text: 'Entrega el mismo día CDMX' },
                { icon: '✂️', text: 'Cortes a medida disponibles' },
                { icon: '🧾', text: 'Factura CFDI incluida' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-surface-low rounded flex items-center justify-center text-sm">{b.icon}</span>
                  <span className="text-xs text-on-surface-variant">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
