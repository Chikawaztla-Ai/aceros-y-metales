import { AdminModuleHeader, AdminStat } from '@/components/admin/module-header';

const stats = [
  { label: 'Unidades Operativas', value: '12' },
  { label: 'En Mantenimiento', value: '2', accent: true },
  { label: 'Disponibilidad', value: '92%' },
];

const machines = [
  { model: 'Cortadora Plasma CNC-500', hours: '4,210 h', power: '75 kW', service: '12 Nov 2024', crit: 'Óptimo' },
  { model: 'Sierra Cinta Industrial SB-2', hours: '8,940 h', power: '30 kW', service: '02 Nov 2024', crit: 'Vigilar' },
  { model: 'Dobladora Hidráulica HB-120', hours: '2,150 h', power: '55 kW', service: '28 Dic 2024', crit: 'Óptimo' },
  { model: 'Torno CNC TX-40', hours: '11,320 h', power: '45 kW', service: '20 Oct 2024', crit: 'Crítico' },
  { model: 'Prensa Punzonadora PP-80', hours: '6,780 h', power: '90 kW', service: '15 Nov 2024', crit: 'Vigilar' },
];

function critBadge(crit: string) {
  switch (crit) {
    case 'Óptimo': return 'bg-green-100 text-green-800';
    case 'Vigilar': return 'bg-amber-100 text-amber-800';
    case 'Crítico': return 'bg-red-100 text-red-800';
    default: return 'bg-surface-container text-on-surface-variant';
  }
}

export default function AdminMaquinaria() {
  return (
    <div className="p-10">
      <AdminModuleHeader
        title="Control de Maquinaria"
        subtitle="Estatus en tiempo real y protocolo de mantenimiento de unidades de procesamiento."
        searchPlaceholder="Buscar unidad..."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <AdminStat key={s.label} {...s} />
        ))}
      </div>

      <div className="bg-white border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[840px]">
            <thead>
              <tr className="bg-primary text-white">
                {['Unidad / Modelo', 'Horas de Operación', 'Consumo (kW)', 'Próximo Servicio', 'Criticidad'].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {machines.map((m, i) => (
                <tr key={m.model} className={`border-b border-outline-variant ${i % 2 === 1 ? 'bg-surface-low' : ''} hover:bg-surface-container transition-colors`}>
                  <td className="px-6 py-4 text-sm font-bold">{m.model}</td>
                  <td className="px-6 py-4 text-sm font-medium">{m.hours}</td>
                  <td className="px-6 py-4 text-sm font-medium">{m.power}</td>
                  <td className="px-6 py-4 text-sm">{m.service}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 font-bold rounded text-xs uppercase ${critBadge(m.crit)}`}>{m.crit}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
