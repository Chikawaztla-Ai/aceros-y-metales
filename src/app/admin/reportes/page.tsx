import { AdminModuleHeader } from '@/components/admin/module-header';

const barras = [
  { label: 'Acero', pct: 85, color: 'bg-primary', text: 'text-primary' },
  { label: 'Aluminio', pct: 62, color: 'bg-on-tertiary-container', text: 'text-on-tertiary-container' },
  { label: 'Maquinaria', pct: 45, color: 'bg-secondary', text: 'text-secondary' },
];

const rutas = [
  { nombre: 'Ruta Norte', avg: '1.2 días avg', pct: 90, color: 'bg-on-tertiary-container' },
  { nombre: 'Ruta Sur', avg: '2.5 días avg', pct: 65, color: 'bg-error' },
  { nombre: 'Ruta Industrial', avg: '0.8 días avg', pct: 98, color: 'bg-on-tertiary-container' },
];

const ventas = [
  { mes: 'Enero', tn: '2,140', ingresos: '$720,000', crec: '+4.2%', up: true },
  { mes: 'Febrero', tn: '1,980', ingresos: '$685,000', crec: '-1.5%', up: false },
  { mes: 'Marzo', tn: '2,450', ingresos: '$840,000', crec: '+8.4%', up: true },
  { mes: 'Abril', tn: '2,890', ingresos: '$990,000', crec: '+10.2%', up: true },
  { mes: 'Mayo', tn: '3,050', ingresos: '$1,050,000', crec: '+5.5%', up: true },
];

const acciones = [
  { icon: 'picture_as_pdf', label: 'Reporte PDF' },
  { icon: 'table_view', label: 'Datos Excel' },
  { icon: 'share', label: 'Compartir' },
  { icon: 'archive', label: 'Archivar' },
];

export default function ReportesPage() {
  return (
    <div className="p-4 md:p-10 space-y-8">
      <AdminModuleHeader
        title="Reportes Analíticos"
        subtitle="Indicadores de gerencia: rentabilidad, tonelaje, eficiencia de flota y desempeño de ventas."
        actions={
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 text-sm font-bold uppercase rounded hover:brightness-110 transition-all active:scale-95 whitespace-nowrap">
            <span className="material-symbols-outlined text-[20px]!">sync</span>
            Sincronizar Datos
          </button>
        }
      />

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-outline-variant shadow-sm p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-2">Ventas Totales</p>
            <h3 className="font-montserrat font-bold text-[32px] leading-none text-primary">
              $4.2M <span className="text-sm font-normal text-on-tertiary-container align-middle">+12% vs Meta</span>
            </h3>
          </div>
          <div className="mt-4 w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div className="bg-on-tertiary-container h-full" style={{ width: '82%' }} />
          </div>
        </div>

        <div className="bg-white border border-outline-variant shadow-sm p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-2">Tonelaje Entregado</p>
            <h3 className="font-montserrat font-bold text-[32px] leading-none text-primary">12,450 TN</h3>
          </div>
          <p className="text-xs font-semibold text-secondary mt-3 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]!">trending_up</span>
            Rendimiento pico esta semana
          </p>
        </div>

        <div className="bg-white border border-outline-variant shadow-sm p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-2">Eficiencia de Flota</p>
            <h3 className="font-montserrat font-bold text-[32px] leading-none text-primary">94.8%</h3>
          </div>
          <p className="text-xs font-semibold text-error mt-3 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]!">warning</span>
            2 unidades en mantenimiento
          </p>
        </div>
      </section>

      {/* Gráficas */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Rentabilidad por categoría */}
        <div className="lg:col-span-8 bg-white border border-outline-variant shadow-sm p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
            <div>
              <h4 className="font-montserrat font-semibold text-xl text-primary">Rentabilidad por Categoría</h4>
              <p className="text-sm text-secondary">Margen operativo trimestral por unidad de negocio</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="bg-on-tertiary-container text-white px-4 py-2 text-sm font-semibold uppercase rounded hover:brightness-110 transition-all">
                PDF
              </button>
              <button className="border-2 border-primary text-primary px-4 py-2 text-sm font-semibold uppercase rounded hover:bg-primary hover:text-white transition-all">
                Excel
              </button>
            </div>
          </div>
          <div className="h-72 flex items-end justify-between gap-4 md:gap-8 px-2 pt-8">
            {barras.map((b) => (
              <div key={b.label} className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-surface-container relative flex flex-col justify-end h-56">
                  <span className={`absolute -top-7 left-1/2 -translate-x-1/2 text-[13px] font-mono font-bold ${b.text}`}>
                    {b.pct}%
                  </span>
                  <div className={`${b.color} w-full transition-all`} style={{ height: `${b.pct}%` }} />
                </div>
                <span className="mt-4 text-sm font-semibold text-primary uppercase">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Eficiencia logística */}
        <div className="lg:col-span-4 bg-primary text-on-primary shadow-sm p-6 md:p-8 flex flex-col">
          <h4 className="font-montserrat font-semibold text-xl mb-1 text-on-primary">Eficiencia Logística</h4>
          <p className="text-on-primary-container text-sm mb-8">Tiempo de entrega vs. objetivos</p>
          <div className="space-y-6 flex-1">
            {rutas.map((r) => (
              <div key={r.nombre} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{r.nombre}</span>
                  <span className="text-on-primary-container">{r.avg}</span>
                </div>
                <div className="h-2 bg-white/10 w-full overflow-hidden rounded-full">
                  <div className={`h-full ${r.color}`} style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 bg-on-tertiary-container/20 flex items-center justify-center rounded shrink-0">
              <span className="material-symbols-outlined text-on-tertiary-container text-[24px]!">local_shipping</span>
            </div>
            <div>
              <p className="font-mono text-[13px] text-on-primary-container">Promedio Global</p>
              <p className="font-montserrat font-bold text-xl text-on-primary">1.5 Días</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla de ventas */}
      <section className="bg-white border border-outline-variant shadow-sm overflow-hidden">
        <div className="bg-primary p-5 md:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h4 className="font-montserrat font-semibold text-xl text-white">Desempeño Mensual de Ventas</h4>
          <span className="text-on-primary-container text-xs uppercase tracking-widest">FY 2024 · Periodo Q1-Q2</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead className="bg-primary-container text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-4 border-b border-white/10">Mes</th>
                <th className="px-6 py-4 border-b border-white/10">Tonelaje (TN)</th>
                <th className="px-6 py-4 border-b border-white/10">Ingresos (USD)</th>
                <th className="px-6 py-4 border-b border-white/10 text-right">Crecimiento %</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[13px]">
              {ventas.map((v, i) => (
                <tr
                  key={v.mes}
                  className={`border-b border-outline-variant/40 hover:bg-surface-container transition-colors ${
                    i % 2 === 1 ? 'bg-surface-low' : 'bg-white'
                  }`}
                >
                  <td className="px-6 py-4 font-bold text-primary">{v.mes}</td>
                  <td className="px-6 py-4">{v.tn}</td>
                  <td className="px-6 py-4">{v.ingresos}</td>
                  <td className={`px-6 py-4 text-right font-bold ${v.up ? 'text-on-tertiary-container' : 'text-error'}`}>
                    {v.crec}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Grid inferior: visión de planta + acciones */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 relative overflow-hidden shadow-sm bg-gradient-to-r from-primary via-primary-container to-secondary">
          <div className="absolute inset-0 p-8 flex flex-col justify-center">
            <h5 className="text-white font-montserrat font-semibold text-xl mb-2">Visión de Planta</h5>
            <p className="text-on-primary-container text-sm max-w-sm">
              Monitoreo en tiempo real de las líneas de producción de acero galvanizado.
            </p>
            <button className="mt-6 flex items-center gap-2 text-on-tertiary-container font-bold uppercase text-sm hover:underline decoration-2 w-fit">
              Ver Cámaras en Vivo
              <span className="material-symbols-outlined text-[20px]!">arrow_right_alt</span>
            </button>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/10 text-[160px]!">
            videocam
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {acciones.map((a) => (
            <button
              key={a.label}
              className="bg-surface-container flex flex-col items-center justify-center p-6 text-center group hover:bg-on-tertiary-container transition-all rounded"
            >
              <span className="material-symbols-outlined text-[36px]! mb-2 text-primary group-hover:text-white">
                {a.icon}
              </span>
              <p className="text-sm font-bold text-primary group-hover:text-white uppercase">{a.label}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
