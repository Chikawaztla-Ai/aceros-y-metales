import Link from 'next/link';
import { WeightCalculator } from '@/components/calculadora/weight-calculator';

const categories = [
  {
    name: 'Aceros',
    subtitle: 'PTR, IPR, HSS, Canales',
    slug: 'aceros-comerciales',
    image: '/images/home/cat-aceros.jpg',
  },
  {
    name: 'Aluminio',
    subtitle: '6061, 7075, Placa, Perfil',
    slug: 'aluminio',
    image: '/images/home/cat-aluminio.jpg',
  },
  {
    name: 'No Ferrosos',
    subtitle: 'Cobre, Bronce, Latón',
    slug: 'no-ferrosos',
    image: '/images/home/cat-noferrosos.jpg',
  },
  {
    name: 'Maquinaria',
    subtitle: 'Corte, Doblez, CNC',
    slug: 'maquinaria',
    image: '/images/home/cat-maquinaria.jpg',
  },
];

const featuredProducts = [
  {
    name: 'Acero Cromo-Molibdeno 4140',
    slug: 'acero-4140-barra-redonda',
    price: 185,
    stock: '124 pzas',
    badge: 'Disponible',
    image: '/images/home/prod-viga-ipr.jpg',
    specs: [
      { label: 'Grado:', value: 'AISI 4140' },
      { label: 'Dureza:', value: '28-32 HRC' },
    ],
  },
  {
    name: 'Aluminio 6061-T6 Placa',
    slug: 'aluminio-6061-placa',
    price: 210,
    stock: '45 pzas',
    badge: 'Disponible',
    image: '/images/home/prod-placa-aluminio.jpg',
    specs: [
      { label: 'Temple:', value: 'T6' },
      { label: 'Formato:', value: 'Placa' },
    ],
  },
  {
    name: 'Acero al Cromo D2',
    slug: 'acero-d2-barra-redonda',
    price: 320,
    stock: '300+ pzas',
    badge: 'Disponible',
    image: '/images/home/prod-ptr.jpg',
    specs: [
      { label: 'Grado:', value: 'AISI D2' },
      { label: 'Uso:', value: 'Troqueles' },
    ],
  },
  {
    name: 'Bronce SAE 660',
    slug: 'bronce-sae660-barra',
    price: 280,
    stock: '12 pzas',
    badge: 'En Tránsito',
    image: '/images/home/prod-barra-cobre.jpg',
    specs: [
      { label: 'Norma:', value: 'SAE 660' },
      { label: 'Uso:', value: 'Bujes' },
    ],
  },
];

const trustItems = [
  {
    icon: 'inventory_2',
    title: 'Inventario Disponible',
    desc: 'Contamos con más de 5,000 toneladas en stock real para entrega inmediata sin demoras.',
  },
  {
    icon: 'verified_user',
    title: 'Compra Segura',
    desc: 'Procesos de pago encriptados y trazabilidad total en cada etapa de su pedido logístico.',
  },
  {
    icon: 'support_agent',
    title: 'Atención Especializada',
    desc: 'Ingenieros y técnicos expertos listos para asesorarle en la selección del material óptimo.',
  },
];

const b2bBenefits = [
  'Crédito Industrial',
  'Escalas de Precio',
  'Logística Prioritaria',
  'Certificados de Calidad',
];

export default function HomePage() {
  return (
    <>
      {/* HERO — foto industrial + gradiente (stitch) */}
      <section className="relative h-[640px] flex items-center overflow-hidden bg-primary-container">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-60"
            style={{ backgroundImage: "url('/images/home/hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        </div>
        <div className="relative z-10 w-full px-10 max-w-container mx-auto">
          <div className="max-w-2xl">
            <h1 className="font-montserrat font-bold text-4xl md:text-[48px] md:leading-[56px] text-white tracking-[-0.02em] mb-6">
              Aceros, Aluminio y Metales Industriales con Entrega Rápida
            </h1>
            <p className="text-lg text-on-primary-container mb-10 max-w-lg">
              Compra en línea materiales industriales, perfiles estructurales, aluminio,
              cobre, bronce y más. Soluciones metalúrgicas de alta precisión para
              proyectos a gran escala.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalogo"
                className="bg-on-tertiary-container text-white text-sm font-bold uppercase px-10 py-4 hover:scale-105 transition-transform shadow-lg"
              >
                Comprar Ahora
              </Link>
              <Link
                href="/cotizacion"
                className="border-2 border-white text-white text-sm font-bold uppercase px-10 py-4 hover:bg-white hover:text-primary transition-all"
              >
                Solicitar Cotización
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BUSCADOR FLOTANTE (stitch) */}
      <section className="relative -mt-10 z-20 px-10">
        <form
          action="/catalogo"
          className="max-w-4xl mx-auto bg-surface p-2 shadow-2xl border border-outline-variant flex items-center gap-2"
        >
          <div className="flex-grow flex items-center px-4 gap-3 border-r border-outline-variant">
            <span className="material-symbols-outlined text-on-tertiary-container">search</span>
            <input
              type="text"
              name="q"
              placeholder="Busca por material, medida, calibre o categoría"
              className="w-full py-4 bg-transparent border-none focus:ring-0 outline-none text-sm text-primary placeholder:text-on-surface-variant/60"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white text-sm font-bold uppercase px-8 py-4 flex items-center gap-2 hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined">filter_list</span>
            <span className="hidden sm:inline">Explorar Materiales</span>
          </button>
        </form>
      </section>

      {/* CATEGORÍAS DESTACADAS (stitch) */}
      <section className="py-24 px-10 max-w-container mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-on-tertiary-container font-bold uppercase tracking-widest text-sm block mb-2">
              Catálogo Industrial
            </span>
            <h2 className="font-montserrat font-bold text-[32px] leading-10 text-primary">
              Categorías Destacadas
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-on-tertiary-container hover:border-on-tertiary-container transition-all"
          >
            Ver Todo el Inventario
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalogo?cat=${cat.slug}`}
              className="group cursor-pointer relative overflow-hidden h-[400px] border border-outline-variant block"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <h3 className="text-white font-montserrat font-semibold text-2xl mb-2">{cat.name}</h3>
                <p className="text-on-primary-container text-xs font-medium mb-4">{cat.subtitle}</p>
                <span className="inline-flex items-center text-white font-bold text-sm group-hover:translate-x-2 transition-transform">
                  Explorar
                  <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTOS EN EXISTENCIA (stitch) */}
      <section className="bg-surface-low py-24 industrial-grid">
        <div className="px-10 max-w-container mx-auto">
          <div className="mb-12">
            <h2 className="font-montserrat font-bold text-[32px] leading-10 text-primary mb-4">
              Productos en Existencia
            </h2>
            <p className="text-secondary">
              Disponibilidad inmediata para recolección o envío urgente.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.slug}
                className="bg-white border border-outline-variant group hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/catalogo/${product.slug}`} className="block h-56 relative overflow-hidden border-b border-outline-variant">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">
                    {product.badge}
                  </div>
                </Link>
                <div className="p-6">
                  <Link href={`/catalogo/${product.slug}`}>
                    <h4 className="font-montserrat font-semibold text-primary mb-2 hover:text-on-tertiary-container transition-colors">
                      {product.name}
                    </h4>
                  </Link>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-on-tertiary-container font-bold text-xl">
                      ${product.price}
                      <span className="text-xs font-medium text-on-surface-variant ml-1">MXN/kg</span>
                    </span>
                    <span className="text-on-surface-variant text-xs font-medium">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="bg-surface-low p-3 mb-4 flex flex-col gap-1">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between text-xs font-medium">
                        <span className="text-secondary">{spec.label}</span>
                        <span className="text-primary font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/catalogo/${product.slug}`}
                    className="w-full bg-primary text-white text-sm font-bold uppercase py-3 flex items-center justify-center gap-2 hover:bg-on-tertiary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                    Agregar al Carrito
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA DE PESO (stitch) */}
      <section id="calculadora" className="py-24 px-10 scroll-mt-20">
        <div className="max-w-container mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <span className="text-on-tertiary-container font-bold uppercase tracking-widest text-sm block mb-2">
              Herramientas de Precisión
            </span>
            <h2 className="font-montserrat font-bold text-[32px] leading-10 text-primary mb-6">
              Calculadora de Peso y Medidas
            </h2>
            <p className="text-secondary mb-8">
              Calcula con exactitud el peso teórico de tus materiales según dimensiones
              y aleaciones. Optimiza tu logística y presupuesto con datos técnicos precisos.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-2 rounded-lg">
                  <span className="material-symbols-outlined">precision_manufacturing</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">Precisión Milimétrica</h4>
                  <p className="text-sm text-secondary">Basado en densidades industriales certificadas.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-2 rounded-lg">
                  <span className="material-symbols-outlined">history</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">Historial de Cálculos</h4>
                  <p className="text-sm text-secondary">Guarda tus cotizaciones rápidas en tu cuenta.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <WeightCalculator />
          </div>
        </div>
      </section>

      {/* COMPRAS EMPRESARIALES (stitch) */}
      <section className="bg-primary py-24">
        <div className="px-10 max-w-container mx-auto overflow-hidden">
          <div className="bg-primary-container border border-outline p-12 lg:p-20 relative">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[200px] text-white">corporate_fare</span>
            </div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-white font-montserrat font-bold text-[32px] leading-10 mb-6">
                  Compras Empresariales
                </h2>
                <p className="text-on-primary-container text-lg mb-10">
                  Optimizamos la cadena de suministro para su empresa. Acceda a precios
                  por volumen, líneas de crédito exclusivas y un gestor de cuenta dedicado.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  {b2bBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-tertiary-container">check_circle</span>
                      <span className="text-white font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/registro"
                  className="inline-flex bg-on-tertiary-container text-white text-sm font-bold uppercase px-12 py-4 shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Abrir Cuenta Corporativa
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="h-48 bg-cover bg-center border border-outline"
                  style={{ backgroundImage: "url('/images/home/b2b-cascos.jpg')" }}
                />
                <div
                  className="h-48 bg-cover bg-center border border-outline mt-8"
                  style={{ backgroundImage: "url('/images/home/b2b-logistica.jpg')" }}
                />
                <div
                  className="h-48 bg-cover bg-center border border-outline -mt-8"
                  style={{ backgroundImage: "url('/images/home/b2b-handshake.jpg')" }}
                />
                <div
                  className="h-48 bg-cover bg-center border border-outline"
                  style={{ backgroundImage: "url('/images/home/b2b-bobinas.jpg')" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIANZA (stitch) */}
      <section className="py-24 bg-surface px-10">
        <div className="max-w-container mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            {trustItems.map((item) => (
              <div key={item.title} className="text-center group">
                <div className="w-20 h-20 bg-surface-container mx-auto flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                </div>
                <h3 className="font-montserrat font-semibold text-xl text-primary mb-3">{item.title}</h3>
                <p className="text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
