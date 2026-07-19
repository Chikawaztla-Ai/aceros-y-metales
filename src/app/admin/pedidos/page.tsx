import { AdminModuleHeader, AdminStat, AdminExportButton } from '@/components/admin/module-header';

const stats = [
  { label: 'Pedidos Pendientes', value: '24' },
  { label: 'Total Despachado (kg)', value: '14,250', accent: true },
  { label: 'Valor Mensual (MXN)', value: '$1.2M' },
];

const orders = [
  { id: '#AMU-9021', client: 'Construcciones Alpha S.A.', date: '24 Oct 2024', material: 'Viga IPR 12" x 6"', weight: '2,450.00', total: '$45,600.00', status: 'Enviado' },
  { id: '#AMU-9022', client: 'Industrial Monterrey Q.', date: '25 Oct 2024', material: 'Placa A-36 1/2"', weight: '840.50', total: '$18,200.00', status: 'Pendiente' },
  { id: '#AMU-9023', client: 'Logística Global S.C.', date: '25 Oct 2024', material: 'Ángulo Estructural 2x2', weight: '1,120.00', total: '$22,450.00', status: 'Cancelado' },
  { id: '#AMU-9024', client: 'Aceros del Bajío', date: '26 Oct 2024', material: 'Barra 4140 1"', weight: '560.00', total: '$14,300.00', status: 'Enviado' },
  { id: '#AMU-9025', client: 'Metalúrgica del Norte', date: '27 Oct 2024', material: 'PTR 4x4 Cal 11', weight: '3,200.00', total: '$67,800.00', status: 'Pendiente' },
];

function badge(status: string) {
  switch (status) {
    case 'Enviado': return 'bg-green-100 text-green-800';
    case 'Pendiente': return 'bg-amber-100 text-amber-800';
    case 'Cancelado': return 'bg-red-100 text-red-800';
    default: return 'bg-surface-container text-on-surface-variant';
  }
}

export default function AdminPedidos() {
  return (
    <div className="p-10">
      <AdminModuleHeader
        title="Gestión de Pedidos"
        subtitle="Monitoreo técnico de suministros y logística industrial."
        searchPlaceholder="Buscar ID o Cliente..."
        actions={<AdminExportButton />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <AdminStat key={s.label} {...s} />
        ))}
      </div>

      <div className="bg-white border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-primary text-white">
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">Material</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-right">Peso (kg)</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-right">Total (MXN)</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-center">Estatus</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id} className={`border-b border-outline-variant ${i % 2 === 1 ? 'bg-surface-low' : ''} hover:bg-surface-container transition-colors`}>
                  <td className="px-6 py-4 text-sm font-medium text-primary">{o.id}</td>
                  <td className="px-6 py-4 text-sm font-bold">{o.client}</td>
                  <td className="px-6 py-4 text-sm">{o.date}</td>
                  <td className="px-6 py-4 text-sm">{o.material}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium">{o.weight}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium">{o.total}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 font-bold rounded text-xs uppercase ${badge(o.status)}`}>{o.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 hover:bg-surface-container text-primary transition-colors" title="Ver detalle">
                        <span className="material-symbols-outlined text-[20px]!">visibility</span>
                      </button>
                      <button
                        className={`p-2 transition-colors ${o.status === 'Cancelado' ? 'opacity-30 cursor-not-allowed' : 'hover:bg-surface-container text-on-tertiary-container'}`}
                        title="Facturar"
                        disabled={o.status === 'Cancelado'}
                      >
                        <span className="material-symbols-outlined text-[20px]!">receipt_long</span>
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
