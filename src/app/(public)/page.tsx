import Link from 'next/link';
import { WeightCalculator } from '@/components/calculadora/weight-calculator';

const categories = [
  { name: 'Aceros Comerciales', slug: 'aceros-comerciales', icon: '🏗️', count: 45 },
  { name: 'Aceros Especiales', slug: 'aceros-especiales', icon: '⚙️', count: 38 },
  { name: 'Aluminio', slug: 'aluminio', icon: '🔩', count: 22 },
  { name: 'No Ferrosos', slug: 'no-ferrosos', icon: '🔬', count: 18 },
  { name: 'Maquinaria', slug: 'maquinaria', icon: '🏭', count: 15 },
  { name: 'Herramientas', slug: 'herramientas', icon: '🛠️', count: 30 },
];

const trustItems = [
  { icon: '🚚', text: 'Entrega el mismo día' },
  { icon: '📦', text: '+500 SKUs en stock' },
  { icon: '✂️', text: 'Cortes a medida' },
  { icon: '🧾', text: 'Factura CFDI' },
  { icon: '💬', text: 'Asesor WhatsApp' },
];

const featuredProducts = [
  { sku: '4140-RD', name: 'Acero 4140', grade: 'AISI 4140', price: 185, unit: 'kg', slug: 'acero-4140-barra-redonda', badge: 'Más vendido' },
  { sku: 'D2-RD', name: 'Acero D2', grade: 'AISI D2', price: 320, unit: 'kg', slug: 'acero-d2-barra-redonda', badge: null },
  { sku: '6061-PL', name: 'Aluminio 6061', grade: '6061-T6', price: 210, unit: 'kg', slug: 'aluminio-6061-placa', badge: 'En stock' },
  { sku: '304-RD', name: 'Inoxidable 304', grade: 'AISI 304', price: 145, unit: 'kg', slug: 'inoxidable-304-barra-redonda', badge: null },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-[#f7f9fb] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#162839 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
        <div className="relative max-w-container mx-auto px-10 py-20 md:py-28">
          <p className="text-[10px] font-semibold uppercase tracking-[4px] text-on-tertiary-container mb-4">
            Distribución Industrial
          </p>
          <h1 className="font-montserrat font-extrabold text-4xl md:text-6xl text-primary tracking-tight leading-[1.05] mb-6">
            Acero y Metales —<br />
            <span className="text-on-tertiary-container">Disponibilidad Inmediata</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl mb-10">
            Más de 500 materiales en stock. Compra por metro, kilo o pieza.
            Cotiza en 2 minutos.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/catalogo"
              className="bg-on-tertiary-container text-white text-sm font-bold uppercase tracking-wide px-8 py-3.5 rounded-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Ver Catálogo
            </Link>
            <Link
              href="/cotizacion"
              className="border-2 border-primary-container text-primary-container text-sm font-bold uppercase tracking-wide px-8 py-3.5 rounded-lg hover:bg-primary-container hover:text-white transition-all"
            >
              Solicitar Cotización
            </Link>
          </div>

          {/* Barra de búsqueda */}
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Busca por clave, grado o material... Ej: 4140, D2, 6061"
                className="w-full bg-white border border-outline-variant rounded-lg py-3.5 pl-12 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none shadow-card"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* BARRA DE CONFIANZA */}
      <section className="bg-surface-low border-y border-outline-variant">
        <div className="max-w-container mx-auto px-10 py-5">
          <div className="flex flex-wrap justify-between items-center gap-6">
            {trustItems.map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-medium text-on-surface-variant">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="max-w-container mx-auto px-10 py-16">
        <h2 className="font-montserrat font-bold text-2xl text-primary-container uppercase tracking-tight mb-8">
          Categorías
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalogo?cat=${cat.slug}`}
              className="group bg-white border border-outline-variant rounded-lg p-6 hover:shadow-card-hover hover:border-primary-container transition-all"
            >
              <span className="text-3xl mb-3 block">{cat.icon}</span>
              <h3 className="font-montserrat font-bold text-primary-container text-lg mb-1">
                {cat.name}
              </h3>
              <span className="text-sm text-on-surface-variant">
                {cat.count} productos
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CALCULADORA DE PESO */}
      <section className="bg-surface-low border-y border-outline-variant">
        <div className="max-w-container mx-auto px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-montserrat font-bold text-2xl text-primary-container uppercase tracking-tight mb-4">
                Calculadora de Peso
              </h2>
              <p className="text-on-surface-variant mb-6">
                Calcula el peso teórico de cualquier material antes de comprar.
                Selecciona material, perfil e ingresa las dimensiones.
              </p>
              <p className="text-xs text-on-surface-variant/70">
                El peso es aproximado. Varía según aleación y tolerancia de fabricación.
              </p>
            </div>
            <WeightCalculator />
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="max-w-container mx-auto px-10 py-16">
        <h2 className="font-montserrat font-bold text-2xl text-primary-container uppercase tracking-tight mb-8">
          Más Solicitados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <Link
              key={product.sku}
              href={`/catalogo/${product.slug}`}
              className="group bg-white border border-outline-variant rounded-lg p-4 hover:shadow-card-hover transition-all"
            >
              {/* Image placeholder */}
              <div className="relative h-40 bg-surface-low rounded-md mb-4 overflow-hidden flex items-center justify-center">
                <span className="text-4xl text-on-surface-variant/20">⬡</span>
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-on-tertiary-container text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-on-surface-variant mb-1">
                {product.grade}
              </p>
              <h3 className="font-montserrat font-bold text-primary-container text-lg mb-2 group-hover:text-on-tertiary-container transition-colors">
                {product.name}
              </h3>
              <div className="flex items-baseline justify-between">
                <span className="text-on-tertiary-container font-bold text-lg">
                  ${product.price}
                </span>
                <span className="text-xs text-on-surface-variant">MXN/{product.unit}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CLIENTES EMPRESARIALES */}
      <section className="bg-primary text-white">
        <div className="max-w-container mx-auto px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[4px] text-on-tertiary-container mb-4">
                Portal B2B
              </p>
              <h2 className="font-montserrat font-bold text-3xl tracking-tight mb-6">
                ¿Compras en Volumen?
              </h2>
              <p className="text-on-primary-container/80 mb-8">
                Registra tu empresa y accede a precios especiales, crédito a 30-60-90 días
                y atención personalizada de un asesor dedicado.
              </p>
              <Link
                href="/registro"
                className="inline-flex bg-on-tertiary-container text-white text-sm font-bold uppercase tracking-wide px-8 py-3.5 rounded-lg hover:brightness-110 active:scale-95 transition-all"
              >
                Registrar mi empresa
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '💰', title: 'Precios por volumen', desc: 'Descuentos automáticos según tu nivel' },
                { icon: '🏢', title: 'Portal empresarial', desc: 'Historial, cotizaciones y facturas' },
                { icon: '📅', title: 'Crédito 30-60-90', desc: 'Línea de crédito para tu empresa' },
                { icon: '🧾', title: 'Facturas CFDI', desc: 'Facturación automática al instante' },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-lg p-5">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-on-primary-container/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
