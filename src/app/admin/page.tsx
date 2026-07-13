import Link from 'next/link';

const kpis = [
  {
    label: 'Ventas Hoy',
    value: '$128,450',
    delta: '+12.5%',
    deltaColor: 'text-[#16A34A]',
    note: 'Vs ayer ($114k)',
    noteIcon: 'trending_up',
    variant: 'default',
    href: '/admin/crm',
  },
  {
    label: 'Pedidos Pendientes',
    value: '24',
    delta: 'Urgentes',
    deltaColor: 'text-on-tertiary-container',
    note: 'Promedio entrega: 4hrs',
    noteIcon: 'schedule',
    variant: 'dark',
    href: '/admin/pedidos',
  },
  {
    label: 'Cotizaciones Hoy',
    value: '42',
    delta: '8 pendientes',
    deltaColor: 'text-on-surface-variant',
    note: 'Valor est.: $2.4M',
    noteIcon: 'pending_actions',
    variant: 'error',
    href: '/admin/cotizaciones',
  },
  {
    label: 'Nuevos Clientes',
    value: '15',
    delta: '+3',
    deltaColor: 'text-[#16A34A]',
    note: 'Total mes: 124',
    noteIcon: 'person_add',
    variant: 'success',
    href: '/admin/clientes',
  },
];

const orders = [
  { id: '#URG-8902', client: 'Constructora Alerza', material: 'Viga IPR 12" x 40', amount: '$45,200', status: 'En proceso' },
  { id: '#URG-8901', client: 'Metales del Norte', material: 'Lámina R-101 Cal 22', amount: '$12,800', status: 'Entregado' },
  { id: '#URG-8900', client: 'Taller Mecánico Ruiz', material: 'Placa A-36 1/2"', amount: '$8,450', status: 'Pendiente' },
  { id: '#URG-8899', client: 'Estructuras León', material: 'PTR 4" x 4" x 1/4"', amount: '$67,300', status: 'Entregado' },
];

const lowStock = [
  { name: 'Viga H-Steel 14"', pct: 12, color: 'bg-error', text: 'text-error' },
  { name: 'Placa de Acero 1"', pct: 28, color: 'bg-on-tertiary-container', text: 'text-on-tertiary-container' },
  { name: 'Tubo Redondo 3"', pct: 45, color: 'bg-on-tertiary-container', text: 'text-on-tertiary-container' },
];

const pendingQuotes = [
  { client: 'Grupo Industrial Vega', value: '$340,000', time: 'Hace 12 min' },
  { client: 'Herrería Moderna', value: '$28,500', time: 'Hace 1 hora' },
  { client: 'Fábrica de Moldes SA', value: '$156,000', time: 'Hace 3 horas' },
];

function statusBadge(status: string) {
  switch (status) {
    case 'En proceso':
      return 'bg-on-tertiary-container/10 text-on-tertiary-container';
    case 'Entregado':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'Pendiente':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-surface-container text-on-surface-variant';
  }
}

function kpiClasses(variant: string) {
  switch (variant) {
    case 'dark':
      return 'bg-primary-container text-white';
    case 'error':
      return 'bg-white border-l-4 border-l-error';
    case 'success':
      return 'bg-white border-l-4 border-l-[#16A34A]';
    default:
      return 'bg-white';
  }
}

export default function AdminDashboard() {
  return (
    <>
      {/* Topbar */}
      <header className="h-[76px] bg-white px-10 flex items-center justify-between sticky top-0 z-40 border-b border-outline-variant">
        <h1 className="font-montserrat font-semibold text-2xl text-on-surface uppercase">Dashboard</h1>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-surface-low px-4 py-2 rounded border border-outline-variant">
            <span className="material-symbols-outlined text-on-surface-variant mr-2 text-[24px]">search</span>
            <input
              type="text"
              placeholder="Buscar pedido o material..."
              className="bg-transparent border-none focus:ring-0 outline-none text-sm w-64 placeholder:text-outline"
            />
          </div>
          <Link href="/admin/pedidos" className="bg-on-tertiary-container text-white px-6 py-2.5 rounded text-sm font-semibold uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Nuevo Pedido
          </Link>
        </div>
      </header>

      {/* Canvas */}
      <div className="p-10 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {kpis.map((kpi) => (
            <Link
              href={kpi.href}
              key={kpi.label}
              className={`block p-6 rounded border border-outline-variant hover:shadow-md hover:-translate-y-0.5 transition-all ${kpiClasses(kpi.variant)}`}
            >
              <p
                className={`text-[11px] uppercase font-semibold mb-2 ${
                  kpi.variant === 'dark' ? 'text-on-primary-container' : 'text-on-surface-variant'
                }`}
              >
                {kpi.label}
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className={`font-montserrat font-semibold text-2xl ${
                    kpi.variant === 'error' ? 'text-error' : kpi.variant === 'success' ? 'text-[#16A34A]' : kpi.variant === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  {kpi.value}
                </span>
                <span className={`text-xs font-bold ${kpi.deltaColor}`}>{kpi.delta}</span>
              </div>
              <div
                className={`mt-4 flex items-center text-sm ${
                  kpi.variant === 'dark' ? 'text-on-primary-container' : 'text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] mr-1">{kpi.noteIcon}</span>
                {kpi.note}
              </div>
            </Link>
          ))}
        </div>

        {/* Grid 2/3 + 1/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Pedidos recientes */}
          <div className="lg:col-span-2 bg-white rounded border border-outline-variant overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="font-montserrat font-semibold text-[20px] text-on-surface uppercase">Pedidos Recientes</h2>
              <Link href="/admin/pedidos" className="text-primary-container text-sm font-semibold hover:underline">Ver todos</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-surface-low text-on-surface-variant text-[11px] font-semibold uppercase">
                    <th className="px-6 py-4">ID Pedido</th>
                    <th className="px-6 py-4">Cliente</th>
                    <th className="px-6 py-4">Material</th>
                    <th className="px-6 py-4">Monto</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {orders.map((o, i) => (
                    <tr key={o.id} className={`${i % 2 === 1 ? 'bg-surface-low' : 'bg-white'} hover:bg-surface-container transition-colors`}>
                      <td className="px-6 py-4 text-sm font-medium text-on-background">{o.id}</td>
                      <td className="px-6 py-4 text-sm font-bold text-on-surface">{o.client}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{o.material}</td>
                      <td className="px-6 py-4 text-sm font-medium">{o.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${statusBadge(o.status)}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link href="/admin/pedidos" className="text-sm text-primary font-bold hover:underline">Detalles</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side cards */}
          <div className="space-y-6">
            {/* Stock bajo */}
            <div className="bg-white p-6 rounded border border-outline-variant">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-montserrat font-semibold text-[20px] text-on-surface uppercase">Stock Bajo</h3>
                <span className="material-symbols-outlined text-error text-[24px]">warning</span>
              </div>
              <div className="space-y-5">
                {lowStock.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-on-surface">{item.name}</span>
                      <span className={`font-bold ${item.text}`}>{item.pct}%</span>
                    </div>
                    <div className="w-full bg-surface-high h-2 rounded-full overflow-hidden">
                      <div className={`${item.color} h-full`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cotizaciones pendientes */}
            <div className="bg-white p-6 rounded border border-outline-variant">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-montserrat font-semibold text-[20px] text-on-surface uppercase">Cotizaciones</h3>
                <Link href="/admin/cotizaciones" className="text-primary-container text-sm font-semibold hover:underline">Ver todas</Link>
              </div>
              <div className="space-y-4">
                {pendingQuotes.map((q) => (
                  <div key={q.client} className="flex items-center justify-between border-b border-outline-variant pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-bold text-on-surface">{q.client}</p>
                      <p className="text-xs text-on-surface-variant">{q.time}</p>
                    </div>
                    <span className="text-sm font-bold text-on-tertiary-container">{q.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
