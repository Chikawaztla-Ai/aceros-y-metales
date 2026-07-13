import { AdminModuleHeader } from '@/components/admin/module-header';

const metrics = [
  { icon: 'person_search', label: 'Leads Activos', value: '124', delta: '+12%', deltaColor: 'text-green-600' },
  { icon: 'payments', label: 'Oportunidades', value: '$2.8M', unit: 'USD', delta: 'vs mes anterior', deltaColor: 'text-on-surface-variant' },
  { icon: 'verified', label: 'Tasa de Cierre', value: '68%', delta: 'Meta: 70%', deltaColor: 'text-on-surface-variant' },
  { icon: 'schedule', label: 'Tiempo Respuesta', value: '2.4', unit: 'h', delta: '−0.2h', deltaColor: 'text-error' },
];

const pipeline = [
  { stage: 'Prospección', count: '15', icon: 'contact_page', variant: 'light' },
  { stage: 'Calificación', count: '08', icon: 'fact_check', variant: 'light' },
  { stage: 'Cotización', count: '12', icon: 'request_quote', variant: 'focus' },
  { stage: 'Negociación', count: '05', icon: 'handshake', variant: 'light' },
  { stage: 'Ganado', count: '22', icon: 'workspace_premium', variant: 'won' },
];

const activity = [
  { icon: 'send', time: 'Hace 15 min', title: 'Cotización enviada a Constructora Vanguardia', detail: 'Lote: Vigas IPR Grade 50. Total: $42,500.00' },
  { icon: 'call', time: 'Hace 1 hora', title: 'Llamada registrada con Industrial Monterrey', detail: 'Seguimiento de crédito a 60 días.' },
  { icon: 'check_circle', time: 'Hace 3 horas', title: 'Pedido cerrado — Aceros del Bajío', detail: 'Placa A-36, $14,300.00' },
  { icon: 'person_add', time: 'Ayer', title: 'Nuevo lead: Metalúrgica del Norte', detail: 'Origen: campaña Google Ads.' },
];

const agents = [
  { rank: '#01', name: 'Alejandro Moreno', role: 'Sénior Account Exec', sales: '$942,000', closes: 18, perf: 92, initials: 'AM' },
  { rank: '#02', name: 'Sofía Valdés', role: 'Key Account Manager', sales: '$715,300', closes: 14, perf: 78, initials: 'SV' },
  { rank: '#03', name: 'Roberto Cantú', role: 'Sales Representative', sales: '$588,100', closes: 11, perf: 64, initials: 'RC' },
  { rank: '#04', name: 'Daniela Ríos', role: 'Sales Representative', sales: '$401,900', closes: 9, perf: 47, initials: 'DR' },
];

function stageClasses(variant: string) {
  switch (variant) {
    case 'focus':
      return 'bg-primary text-white shadow-lg lg:scale-105 z-10 border-y-2 border-on-tertiary-container';
    case 'won':
      return 'bg-on-tertiary-container text-white';
    default:
      return 'bg-surface-container-high text-primary hover:bg-secondary-fixed';
  }
}

export default function AdminCRM() {
  return (
    <div className="p-10 space-y-6">
      <AdminModuleHeader
        title="Resumen CRM"
        subtitle="Pipeline de ventas, interacciones y desempeño del equipo comercial."
        actions={
          <button className="px-6 py-2 border-2 border-primary text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
            Exportar Reporte
          </button>
        }
      />

      {/* Métricas */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white p-6 border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary-container text-white rounded">
                <span className="material-symbols-outlined text-[24px]">{m.icon}</span>
              </div>
              <span className={`text-xs font-medium ${m.deltaColor}`}>{m.delta}</span>
            </div>
            <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">{m.label}</p>
            <h3 className="font-montserrat font-bold text-4xl text-primary mt-1">
              {m.value}
              {m.unit && <span className="text-lg ml-1">{m.unit}</span>}
            </h3>
          </div>
        ))}
      </section>

      {/* Pipeline */}
      <section className="bg-white p-8 border border-outline-variant">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <h3 className="font-montserrat font-semibold text-2xl text-primary uppercase flex items-center gap-3">
            <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">timeline</span>
            Pipeline de Ventas
          </h3>
          <select className="bg-surface-low border border-outline-variant text-xs uppercase font-bold px-4 py-2 rounded outline-none">
            <option>Q2 2024 — Todos los Productos</option>
            <option>Acero Inoxidable</option>
            <option>Perfiles Estructurales</option>
          </select>
        </div>
        <div className="flex flex-col lg:flex-row gap-1">
          {pipeline.map((s) => (
            <div
              key={s.stage}
              className={`pipeline-arrow flex-1 p-4 pl-6 min-h-[100px] flex flex-col justify-center relative transition-colors cursor-pointer group ${stageClasses(s.variant)}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-tighter opacity-90">{s.stage}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-montserrat font-bold">{s.count}</span>
              </div>
              <div className="absolute bottom-2 right-6 opacity-25 group-hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-4xl">{s.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Feed de actividad */}
        <section className="lg:col-span-1 bg-white p-6 border border-outline-variant">
          <h3 className="font-montserrat font-semibold text-2xl text-primary uppercase mb-6 flex items-center justify-between">
            Interacciones
            <span className="material-symbols-outlined text-outline text-[24px]">history</span>
          </h3>
          <div className="space-y-6 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/40">
            {activity.map((a, i) => (
              <div key={i} className="relative pl-8 group">
                <div className="absolute left-0 top-1 w-6 h-6 bg-secondary-fixed rounded-full border-4 border-white z-10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[12px] text-primary">{a.icon}</span>
                </div>
                <p className="text-xs text-on-surface-variant">{a.time}</p>
                <h4 className="font-bold text-primary text-sm leading-tight group-hover:text-on-tertiary-container transition-colors">
                  {a.title}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1">{a.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top agentes */}
        <section className="lg:col-span-2 bg-white p-6 border border-outline-variant overflow-hidden">
          <h3 className="font-montserrat font-semibold text-2xl text-primary uppercase mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">stars</span>
            Top Agentes de Ventas
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-primary text-white">
                  {['Ranking', 'Agente', 'Ventas (USD)', 'Cierres', 'Desempeño'].map((h) => (
                    <th key={h} className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest last:text-right">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {agents.map((a, i) => (
                  <tr key={a.rank} className={`border-b border-outline-variant ${i % 2 === 1 ? 'bg-surface-low' : ''} hover:bg-surface-container transition-colors`}>
                    <td className="px-4 py-4 text-sm font-bold text-primary">{a.rank}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-secondary-fixed flex items-center justify-center font-bold text-xs text-primary shrink-0">
                          {a.initials}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-primary">{a.name}</p>
                          <p className="text-[10px] text-on-surface-variant uppercase">{a.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-bold">{a.sales}</td>
                    <td className="px-4 py-4 text-sm">{a.closes}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden inline-block max-w-[80px]">
                        <div className="bg-on-tertiary-container h-full" style={{ width: `${a.perf}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
