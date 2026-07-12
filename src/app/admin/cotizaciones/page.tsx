import { AdminModuleHeader, AdminStat, AdminExportButton } from '@/components/admin/module-header';

const stats = [
  { label: 'Cotizaciones Hoy', value: '42' },
  { label: 'Pendientes', value: '8', accent: true },
  { label: 'Valor Estimado (MXN)', value: '$2.4M' },
];

const quotes = [
  { id: 'COT-5501', company: 'Grupo Industrial Vega', date: '27 Oct 2024', summary: 'Viga IPR 10" (12 pzas) + corte', value: '$340,000' },
  { id: 'COT-5502', company: 'Herrería Moderna', date: '27 Oct 2024', summary: 'Solera 1/4" x 2" (surtido)', value: '$28,500' },
  { id: 'COT-5503', company: 'Fábrica de Moldes SA', date: '26 Oct 2024', summary: 'Acero D2 barra Ø 2" (rectificado)', value: '$156,000' },
  { id: 'COT-5504', company: 'Talleres Ruiz', date: '26 Oct 2024', summary: 'Placa A-36 3/8" (4 hojas)', value: '$42,300' },
  { id: 'COT-5505', company: 'Constructora del Valle', date: '25 Oct 2024', summary: 'PTR 6x6 + ángulo (proyecto nave)', value: '$512,800' },
];

export default function AdminCotizaciones() {
  return (
    <div className="p-10">
      <AdminModuleHeader
        title="Bandeja de Cotizaciones"
        subtitle="Gestión administrativa de solicitudes de materiales industriales pendientes."
        searchPlaceholder="Buscar folio o empresa..."
        actions={<AdminExportButton />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <AdminStat key={s.label} {...s} />
        ))}
      </div>

      <div className="bg-white border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[860px]">
            <thead>
              <tr className="bg-primary text-white">
                {['Folio', 'Prospecto / Empresa', 'Fecha', 'Resumen de Solicitud', 'Valor Est.', 'Acciones'].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quotes.map((q, i) => (
                <tr key={q.id} className={`border-b border-outline-variant ${i % 2 === 1 ? 'bg-surface-low' : ''} hover:bg-surface-container transition-colors`}>
                  <td className="px-6 py-4 text-sm font-medium text-primary">{q.id}</td>
                  <td className="px-6 py-4 text-sm font-bold">{q.company}</td>
                  <td className="px-6 py-4 text-sm">{q.date}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{q.summary}</td>
                  <td className="px-6 py-4 text-sm font-bold text-on-tertiary-container">{q.value}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-surface-container text-primary transition-colors" title="Responder cotización">
                        <span className="material-symbols-outlined text-[20px]">reply</span>
                      </button>
                      <button className="p-2 hover:bg-surface-container text-green-700 transition-colors" title="Aprobar">
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      </button>
                      <button className="p-2 hover:bg-surface-container text-error transition-colors" title="Descartar">
                        <span className="material-symbols-outlined text-[20px]">cancel</span>
                      </button>
                    </div>
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
