import Link from 'next/link';
import { BuyBox } from '@/components/cart/buy-box';

// Mock — en producción viene de Supabase con generateStaticParams()
const product = {
  sku: '4140-RD-025',
  name: 'Acero Cromo-Molibdeno 4140',
  eyebrow: 'Acero Grado Maquinaria',
  subtitle: 'Barra Redonda · Acabado Col ROL (Laminado en Caliente)',
  grade: '4140',
  category: 'Aceros Especiales',
  categorySlug: 'aceros-especiales',
  price: 185,
  unit: 'kg',
  inStock: true,
  stockQty: 250,
  gallery: [
    '/images/producto/galeria-2.jpg',
    '/images/producto/galeria-3.jpg',
    '/images/producto/galeria-4.jpg',
  ],
  specs: [
    { prop: 'Composición Química', value: 'C: 0.38-0.43% | Mn: 0.75-1.00% | Cr: 0.80-1.10% | Mo: 0.15-0.25%' },
    { prop: 'Dureza (Recocido)', value: 'Max 241 HB (Brinell)' },
    { prop: 'Estado de Entrega', value: 'Laminado en Caliente, Tratado Térmicamente' },
    { prop: 'Maquinabilidad', value: 'Excelente (Aproximadamente 65% del 1212)' },
    { prop: 'Aplicaciones Sugeridas', value: 'Engranajes, cigüeñales, ejes de alta resistencia, pernos de conexión.' },
  ],
  equivalences: [
    { label: 'USA / AISI', designation: '4140 / G41400' },
    { label: 'Alemania / DIN', designation: '1.7225 / 42CrMo4' },
    { label: 'Japón / JIS', designation: 'SCM 440' },
    { label: 'Reino Unido / BS', designation: '708M40' },
  ],
  related: [
    { name: '4140 Barra Cuadrada', slug: 'acero-4140-barra-cuadrada', category: 'Acero Maquinaria', price: 385, image: '/images/home/prod-ptr.jpg' },
    { name: '8620 Barra Redonda', slug: 'acero-8620-barra-redonda', category: 'Acero Maquinaria', price: 312, image: '/images/home/prod-viga-ipr.jpg' },
    { name: '1045 Barra Redonda', slug: 'acero-1045-barra-redonda', category: 'Acero Carbono', price: 215, image: '/images/producto/galeria-1.jpg' },
    { name: 'H13 Barra Redonda', slug: 'acero-h13-barra-redonda', category: 'Acero Herramienta', price: 380, image: '/images/home/prod-barra-cobre.jpg' },
  ],
};

export default function ProductoPage() {
  return (
    <div className="max-w-container mx-auto px-10 py-10">
      {/* Breadcrumb (stitch) */}
      <nav className="flex items-center gap-2 mb-8 text-[13px] font-medium text-on-surface-variant">
        <Link href="/" className="hover:text-primary-container transition-colors">Inicio</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link href="/catalogo" className="hover:text-primary-container transition-colors">Catálogo</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link href={`/catalogo?cat=${product.categorySlug}`} className="hover:text-primary-container transition-colors">
          {product.category}
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="font-bold text-on-surface">4140 Barra Redonda</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* IZQUIERDA — 8 columnas (stitch) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Galería + info hero */}
          <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
            {/* Galería (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative w-full h-[420px] bg-surface-high rounded-lg overflow-hidden group">
                {product.inStock && (
                  <div className="absolute top-4 left-4 z-10 bg-on-surface text-white px-3 py-1 flex items-center gap-2 rounded-full opacity-90">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[11px] font-medium uppercase tracking-wider">En Stock</span>
                  </div>
                )}
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url('${product.gallery[0]}')` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.gallery.map((img, i) => (
                  <div
                    key={img}
                    className={`h-24 bg-surface-container rounded-lg overflow-hidden cursor-pointer transition-colors ${
                      i === 0 ? 'border-2 border-primary-container' : 'border border-outline-variant hover:border-primary-container'
                    }`}
                  >
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Info hero (3 cols) */}
            <div className="md:col-span-3 flex flex-col justify-start">
              <span className="text-sm font-semibold text-on-tertiary-container uppercase mb-2">
                {product.eyebrow}
              </span>
              <h1 className="font-montserrat font-bold text-[32px] leading-10 text-primary-container uppercase mb-2">
                {product.name}
              </h1>
              <p className="text-on-surface-variant mb-6">{product.subtitle}</p>
              <div className="space-y-4">
                <button className="w-full border-2 border-primary-container text-primary-container py-3 text-sm font-semibold uppercase rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[24px]">download</span>
                  Ficha Técnica PDF
                </button>
                <button className="w-full border-2 border-outline text-on-surface-variant py-3 text-sm font-semibold uppercase rounded-lg flex items-center justify-center gap-2 hover:border-primary-container hover:text-primary-container transition-all">
                  <span className="material-symbols-outlined text-[24px]">architecture</span>
                  Plano DWG
                </button>
              </div>
            </div>
          </div>

          {/* Especificaciones técnicas (stitch) */}
          <section>
            <h2 className="font-montserrat font-semibold text-2xl text-primary-container mb-6 uppercase tracking-tight">
              Especificaciones Técnicas
            </h2>
            <div className="border border-outline-variant rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-high text-on-surface text-sm font-semibold uppercase">
                    <th className="px-6 py-4 border-b border-outline-variant">Propiedad</th>
                    <th className="px-6 py-4 border-b border-outline-variant">Valor / Detalle</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {product.specs.map((row, i) => (
                    <tr
                      key={row.prop}
                      className={`${i % 2 === 0 ? 'bg-white' : 'bg-surface-low'} ${
                        i < product.specs.length - 1 ? 'border-b border-outline-variant' : ''
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-on-surface">{row.prop}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Equivalencias internacionales (stitch) */}
          <section>
            <h3 className="font-montserrat font-semibold text-[20px] text-primary-container mb-4 uppercase">
              Equivalencias Internacionales
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.equivalences.map((eq) => (
                <div key={eq.label} className="p-4 bg-white border border-outline-variant rounded-lg shadow-sm">
                  <span className="block text-[10px] font-semibold text-on-tertiary-container mb-1 uppercase">
                    {eq.label}
                  </span>
                  <span className="text-sm font-medium text-on-surface">{eq.designation}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* DERECHA — panel sticky 4 columnas (stitch) */}
        <div className="lg:col-span-4 lg:sticky lg:top-[100px]">
          <div className="bg-white border border-outline-variant rounded-lg shadow-sm overflow-hidden p-6 space-y-6">
            {/* SKU + actualización */}
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-medium text-on-tertiary-container uppercase">
                SKU: {product.sku}
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium">ACTUALIZADO HOY</span>
            </div>

            {/* Precio (stitch) */}
            <div className="py-2 border-b border-outline-variant pb-4">
              <span className="block text-[11px] font-semibold text-on-surface-variant mb-1 uppercase">
                Precio Unitario
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-montserrat font-semibold text-[32px] text-primary-container leading-none tracking-tight">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-on-surface-variant">MXN/{product.unit}</span>
              </div>
              <span className="text-[10px] text-on-surface-variant mt-1 block italic">
                *Precios sujetos a cambios sin previo aviso e IVA.
              </span>
            </div>

            {/* Compra — unidad, cantidad, CTAs (conectado al carrito) */}
            <BuyBox
              product={{
                id: product.sku,
                sku: product.sku,
                name: product.name,
                price: product.price,
                inStock: product.inStock,
              }}
            />

            {/* Beneficios (stitch) */}
            <div className="pt-4 space-y-3 border-t border-outline-variant">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px] text-primary-container">local_shipping</span>
                <span className="text-sm">Entrega Urgente 24/48 hrs</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px] text-primary-container">verified</span>
                <span className="text-sm">Material Certificado (Mill Test)</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px] text-primary-container">cut</span>
                <span className="text-sm">Corte a Medida disponible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Materiales relacionados (stitch) */}
      <section className="mt-20">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-montserrat font-semibold text-2xl text-primary-container uppercase tracking-tight">
            Materiales Relacionados
          </h2>
          <Link href="/catalogo" className="text-sm font-semibold text-on-tertiary-container hover:underline uppercase">
            Ver Todo el Catálogo
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {product.related.map((rel) => (
            <Link
              key={rel.slug}
              href={`/catalogo/${rel.slug}`}
              className="bg-white border border-outline-variant rounded-lg p-4 hover:shadow-lg transition-all group cursor-pointer block"
            >
              <div className="h-40 bg-surface-container rounded-md mb-4 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform"
                  style={{ backgroundImage: `url('${rel.image}')` }}
                />
              </div>
              <span className="text-[9px] font-semibold text-on-surface-variant uppercase">{rel.category}</span>
              <h4 className="font-montserrat font-semibold text-[18px] text-primary-container mb-2">{rel.name}</h4>
              <div className="flex justify-between items-center">
                <span className="text-on-tertiary-container font-bold text-sm">${rel.price.toFixed(2)}/kg</span>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-tertiary-container transition-colors text-[24px]">
                  add_shopping_cart
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
