import Link from 'next/link';

export const metadata = {
  title: 'Nosotros',
  description:
    'Más de tres décadas proveyendo soluciones metálicas críticas con la precisión técnica que la industria pesada demanda.',
};

const valores = [
  {
    icon: 'verified',
    title: 'Calidad',
    desc: 'Suministramos exclusivamente materiales que superan las pruebas de tensión y pureza más rigurosas del mercado global.',
    tag: 'Tolerancia ±0.01mm',
    dark: false,
  },
  {
    icon: 'bolt',
    title: 'Rapidez',
    desc: 'Entendemos que el tiempo es capital. Nuestra logística está optimizada para entregas en menos de 24 horas en zonas industriales clave.',
    tag: 'Logística Express H24',
    dark: true,
  },
  {
    icon: 'architecture',
    title: 'Precisión',
    desc: 'Corte y dimensionamiento técnico computarizado. Lo que ordenas es exactamente lo que recibes, sin margen de error.',
    tag: 'Corte Láser CNC',
    dark: false,
  },
];

const infraestructura = [
  {
    title: 'Centro de Distribución Automatizado',
    desc: 'Más de 5,000 m² de almacenamiento climatizado para prevenir oxidación.',
  },
  {
    title: 'Flotilla Logística Propia',
    desc: 'Transporte pesado equipado con rastreo GPS y control de carga en tiempo real.',
  },
  {
    title: 'Laboratorio de Pruebas',
    desc: 'Equipamiento avanzado para análisis metalúrgico y pruebas de fatiga.',
  },
];

const certificaciones = [
  { code: 'ISO 9001', label: 'Calidad' },
  { code: 'ISO 14001', label: 'Ambiental' },
  { code: 'ISO 45001', label: 'Seguridad' },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[560px] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-60"
            style={{ backgroundImage: "url('/images/nosotros/hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-container mx-auto px-4 md:px-10 w-full">
          <div className="max-w-2xl">
            <span className="text-on-tertiary-container text-sm font-semibold uppercase tracking-widest block mb-4">
              Trayectoria Industrial
            </span>
            <h1 className="font-montserrat font-bold text-4xl md:text-[48px] md:leading-[56px] tracking-[-0.02em] text-white mb-6">
              Liderazgo en Acero
            </h1>
            <p className="text-lg text-on-primary-container max-w-xl mb-10">
              Más de tres décadas proveyendo soluciones metálicas críticas con la precisión
              técnica que la industria pesada demanda. Rapidez logística y calidad certificada.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalogo"
                className="bg-on-tertiary-container text-white px-8 py-4 text-sm font-bold uppercase rounded-lg hover:brightness-110 transition-all active:scale-95"
              >
                Ver Catálogo
              </Link>
              <a
                href="#infraestructura"
                className="border-2 border-white text-white px-8 py-4 text-sm font-bold uppercase rounded-lg hover:bg-white hover:text-primary transition-all active:scale-95"
              >
                Nuestra Infraestructura
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-24 px-4 md:px-10 max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <span className="text-on-tertiary-container text-sm font-semibold uppercase tracking-widest block">
              Nuestra Historia
            </span>
            <h2 className="font-montserrat font-bold text-[32px] leading-10 text-primary">
              Cimentando el Futuro Industrial
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <p className="text-on-surface-variant">
                Fundada bajo el principio de urgencia operativa, nuestra organización nació para
                resolver el cuello de botella más crítico de la construcción y manufactura: el
                suministro inmediato de materiales de alta especificación.
              </p>
              <p className="text-on-surface-variant">
                Hoy, operamos como el núcleo logístico para contratistas de la región,
                manteniendo un inventario dinámico que garantiza que ninguna línea de producción
                se detenga por falta de componentes metálicos.
              </p>
            </div>
            <div className="flex flex-wrap gap-10 pt-6 border-t border-outline-variant">
              <div>
                <div className="font-montserrat font-bold text-2xl text-primary">30+</div>
                <div className="text-xs font-semibold text-on-surface-variant uppercase">Años de Experiencia</div>
              </div>
              <div>
                <div className="font-montserrat font-bold text-2xl text-primary">15k</div>
                <div className="text-xs font-semibold text-on-surface-variant uppercase">Toneladas Anuales</div>
              </div>
              <div>
                <div className="font-montserrat font-bold text-2xl text-primary">24/7</div>
                <div className="text-xs font-semibold text-on-surface-variant uppercase">Servicio de Urgencia</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-outline-variant">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/images/nosotros/historia.jpg')" }}
              />
            </div>
            <div className="hidden md:block absolute -bottom-6 -left-6 bg-primary p-4 border border-outline-variant">
              <span className="text-[11px] font-semibold text-on-tertiary-container uppercase block mb-2">
                Plano Maestro v.2.4
              </span>
              <div className="w-24 h-1 bg-on-tertiary-container mb-2" />
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white/20" />
                <div className="w-2 h-2 bg-white/20" />
                <div className="w-2 h-2 bg-on-tertiary-container" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 bg-surface-low px-4 md:px-10">
        <div className="max-w-container mx-auto">
          <div className="text-center mb-16">
            <span className="text-on-tertiary-container text-sm font-semibold uppercase tracking-widest block mb-2">
              Principios Operativos
            </span>
            <h2 className="font-montserrat font-bold text-[32px] leading-10 text-primary">
              Excelencia en el Detalle
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valores.map((v) => (
              <div
                key={v.title}
                className={`p-8 border rounded-xl group hover:shadow-xl transition-all duration-300 ${
                  v.dark ? 'bg-primary border-primary' : 'bg-white border-outline-variant'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                    v.dark ? 'bg-on-tertiary-container' : 'bg-primary-container/10 group-hover:bg-primary-container'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined ${v.dark ? 'text-white' : 'text-primary-container group-hover:text-white'} text-[24px]`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {v.icon}
                  </span>
                </div>
                <h3 className={`font-montserrat font-bold text-lg mb-3 uppercase ${v.dark ? 'text-white' : 'text-primary'}`}>
                  {v.title}
                </h3>
                <p className={v.dark ? 'text-on-primary-container' : 'text-on-surface-variant'}>{v.desc}</p>
                <div className={`mt-8 pt-4 border-t ${v.dark ? 'border-white/20' : 'border-outline-variant'}`}>
                  <span className="text-sm font-semibold text-on-tertiary-container">{v.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infraestructura */}
      <section id="infraestructura" className="py-24 px-4 md:px-10 bg-primary text-white overflow-hidden scroll-mt-20">
        <div className="max-w-container mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <span className="text-on-tertiary-container text-sm font-semibold uppercase tracking-widest block mb-2">
              Capacidad Instalada
            </span>
            <h2 className="font-montserrat font-bold text-[32px] leading-10 mb-8 uppercase">
              Infraestructura de Clase Mundial
            </h2>
            <ul className="space-y-6">
              {infraestructura.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">check_circle</span>
                  <div>
                    <h4 className="font-bold uppercase text-sm">{item.title}</h4>
                    <p className="text-on-primary-container mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 relative grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden border border-outline">
              <div
                className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"
                style={{ backgroundImage: "url('/images/nosotros/infra-corte.jpg')" }}
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden border border-outline mt-8">
              <div
                className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"
                style={{ backgroundImage: "url('/images/nosotros/infra-almacen.jpg')" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="py-12 px-4 md:px-10 bg-surface-low border-y border-outline-variant">
        <div className="max-w-container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 40 }}>verified_user</span>
            <div>
              <h5 className="font-montserrat font-bold text-lg text-primary uppercase">Certificaciones ISO</h5>
              <p className="text-sm text-on-surface-variant">Estándares internacionales de gestión y calidad.</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {certificaciones.map((cert) => (
              <div key={cert.code} className="text-center px-6 py-2 border border-outline-variant rounded-md bg-white">
                <span className="font-montserrat font-bold text-lg block text-primary">{cert.code}</span>
                <span className="text-xs font-semibold uppercase text-on-surface-variant">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
