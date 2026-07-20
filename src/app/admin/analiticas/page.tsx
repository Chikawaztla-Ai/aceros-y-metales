import { AdminModuleHeader } from '@/components/admin/module-header';

const logistica = [
  { dia: 'LUN', pct: 60, cls: 'bg-secondary-container' },
  { dia: 'MAR', pct: 85, cls: 'bg-secondary-container' },
  { dia: 'MIE', pct: 100, cls: 'bg-primary' },
  { dia: 'JUE', pct: 70, cls: 'bg-secondary-container' },
  { dia: 'VIE', pct: 90, cls: 'bg-secondary-container' },
  { dia: 'SÁB', pct: 30, cls: 'bg-outline-variant' },
];

const categorias = [
  { material: 'Viga IPR 12"', volumen: '450 Tn', trend: 'up' as const },
  { material: 'Lámina R-101', volumen: '320 Tn', trend: 'up' as const },
  { material: 'Placa A-36', volumen: '285 Tn', trend: 'down' as const },
  { material: 'Tubo Mecánico', volumen: '190 Tn', trend: 'flat' as const },
];

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  if (trend === 'up')
    return <span className="material-symbols-outlined text-[18px]! text-green-600">trending_up</span>;
  if (trend === 'down')
    return <span className="material-symbols-outlined text-[18px]! text-error">trending_down</span>;
  return <span className="material-symbols-outlined text-[18px]! text-on-surface-variant">horizontal_rule</span>;
}

export default function AnaliticasPage() {
  return (
    <div className="p-4 md:p-10 space-y-8">
      <AdminModuleHeader
        title="Analíticas"
        subtitle="Resumen de rendimiento industrial y logística."
        actions={
          <button className="flex items-center gap-2 border-2 border-primary text-primary px-4 py-2 text-sm font-bold uppercase rounded hover:bg-primary hover:text-white transition-all whitespace-nowrap">
            <span className="material-symbols-outlined text-[20px]!">download</span>
            Exportar
          </button>
        }
      />

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-outline-variant shadow-sm p-6 flex flex-col justify-between">
          <div>
            <span className="material-symbols-outlined text-on-tertiary-container text-[24px]! mb-2">payments</span>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Ventas Total</p>
          </div>
          <div className="mt-3">
            <p className="font-montserrat font-bold text-[28px] leading-none text-primary">$1.2M</p>
            <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[14px]!">trending_up</span> +12%
            </p>
          </div>
        </div>

        <div className="bg-white border border-outline-variant shadow-sm p-6 flex flex-col justify-between">
          <div>
            <span className="material-symbols-outlined text-primary text-[24px]! mb-2">local_shipping</span>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Eficiencia</p>
          </div>
          <div className="mt-3">
            <p className="font-montserrat font-bold text-[28px] leading-none text-primary">94.8%</p>
            <p className="text-xs text-on-tertiary-container font-bold flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[14px]!">bolt</span> Óptimo
            </p>
          </div>
        </div>

        <div className="sm:col-span-2 bg-primary text-white shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-on-primary-container uppercase tracking-wider">Inventario Crítico</p>
              <p className="font-montserrat font-bold text-[28px] leading-none mt-2">42 SKUs</p>
            </div>
            <span className="material-symbols-outlined text-on-tertiary-container text-[28px]!">warning</span>
          </div>
          <div className="mt-4 bg-primary-container rounded h-2 w-full overflow-hidden">
            <div className="bg-on-tertiary-container h-full" style={{ width: '66%' }} />
          </div>
          <p className="mt-2 text-xs text-on-primary-container italic">
            Requiere reposición inmediata en Laminado Frío
          </p>
        </div>
      </section>

      {/* Gráfica + panel lateral */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Logística diaria */}
        <div className="lg:col-span-8 bg-white border border-outline-variant shadow-sm p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-montserrat font-semibold text-xl text-primary uppercase">Logística Diaria</h2>
            <span className="material-symbols-outlined text-on-surface-variant text-[24px]!">more_vert</span>
          </div>
          <div className="flex justify-between gap-3 md:gap-4 px-2">
            {logistica.map((l) => (
              <div key={l.dia} className="flex flex-col items-center flex-1">
                <div className="w-full h-56 flex items-end">
                  <div className={`${l.cls} w-full rounded-t-sm transition-all`} style={{ height: `${l.pct}%` }} />
                </div>
                <span className="font-mono text-[10px] mt-2 text-on-surface-variant">{l.dia}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-outline-variant grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="font-mono text-xs text-on-surface-variant">Promedio</p>
              <p className="font-bold text-primary">78%</p>
            </div>
            <div>
              <p className="font-mono text-xs text-on-surface-variant">Pico</p>
              <p className="font-bold text-primary">100%</p>
            </div>
            <div>
              <p className="font-mono text-xs text-on-surface-variant">Meta</p>
              <p className="font-bold text-on-tertiary-container">90%</p>
            </div>
          </div>
        </div>

        {/* Panel lateral: patio + nota */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative h-48 rounded-lg overflow-hidden shadow-sm bg-gradient-to-br from-primary via-primary-container to-secondary">
            <span className="material-symbols-outlined absolute right-3 top-3 text-white/10 text-[100px]!">warehouse</span>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end p-5">
              <div className="text-white">
                <h4 className="font-montserrat font-semibold text-sm uppercase">Estado del Patio Norte</h4>
                <p className="text-xs font-mono opacity-80 mt-1">Capacidad Operativa: 82%</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-high p-5 rounded border-l-4 border-primary">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[24px]!">info</span>
              <div>
                <h5 className="font-semibold text-primary uppercase text-xs tracking-wider">Nota de Operaciones</h5>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Retraso programado en ruta noreste por mantenimiento de grúas pórtico. Reajustar tiempos
                  de entrega estimados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top categorías */}
      <section className="bg-white border border-outline-variant shadow-sm rounded-lg overflow-hidden">
        <div className="p-4 bg-primary text-white flex justify-between items-center">
          <h3 className="font-montserrat text-sm uppercase tracking-widest font-semibold">Top Categorías</h3>
          <span className="font-mono text-xs opacity-80">Q3 2024</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[480px]">
            <thead className="bg-surface-container text-on-surface-variant">
              <tr>
                <th className="p-4 text-xs uppercase tracking-tight font-semibold">Material</th>
                <th className="p-4 text-xs uppercase tracking-tight font-semibold text-right">Volumen</th>
                <th className="p-4 text-xs uppercase tracking-tight font-semibold text-right">Tendencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {categorias.map((c, i) => (
                <tr key={c.material} className={i % 2 === 1 ? 'bg-surface-low' : 'bg-white'}>
                  <td className="p-4 text-sm font-semibold">{c.material}</td>
                  <td className="p-4 font-mono text-sm text-right">{c.volumen}</td>
                  <td className="p-4 text-right">
                    <span className="inline-flex justify-end w-full">
                      <TrendIcon trend={c.trend} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
