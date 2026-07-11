const orders = [
  {
    id: 'ORD-88291',
    date: '12 OCT 2024',
    materials: ['Placa A-36 (12 unidades)', 'Viga IPR 10" x 20\''],
    total: '$42,500.00',
    status: 'En Tránsito',
  },
  {
    id: 'ORD-87990',
    date: '05 OCT 2024',
    materials: ['Ángulo Estructural 2" (50 unidades)'],
    total: '$18,220.50',
    status: 'Entregado',
  },
  {
    id: 'ORD-87540',
    date: '28 SEP 2024',
    materials: ['Barra 4140 1" (30 unidades)', 'Aluminio 6061 Placa'],
    total: '$31,900.00',
    status: 'Entregado',
  },
];

const tabs = ['Todos', 'Pendientes', 'En tránsito', 'Entregados'];

function statusBadge(status: string) {
  switch (status) {
    case 'En Tránsito':
      return 'bg-secondary-container text-on-secondary-container border border-outline-variant';
    case 'Entregado':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'Pendiente':
      return 'bg-red-100 text-red-800 border border-red-200';
    default:
      return 'bg-surface-container text-on-surface-variant';
  }
}

export default function PortalPedidos() {
  return (
    <>
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-10 border-b border-outline-variant pb-6">
        <div>
          <h1 className="font-montserrat font-bold text-[32px] leading-10 text-primary uppercase">Mis Pedidos</h1>
          <p className="text-on-surface-variant mt-2">Historial completo de compras y estatus de materiales</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar pedido..."
              className="pl-10 pr-4 py-2 bg-white border border-outline-variant rounded-lg text-sm w-full md:w-72 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-secondary text-on-secondary text-sm font-semibold rounded-lg hover:opacity-90 transition-all active:scale-95 whitespace-nowrap">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Exportar
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Área de pedidos (9) */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-outline-variant gap-8 overflow-x-auto">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={`pb-3 px-1 border-b-2 text-sm font-semibold uppercase transition-all whitespace-nowrap ${
                  i === 0
                    ? 'border-primary text-primary'
                    : 'border-transparent text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tabla */}
          <div className="bg-white rounded-lg border border-outline-variant overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="bg-primary-container text-on-primary text-sm font-semibold">
                    <th className="px-6 py-4 border-r border-outline"># Pedido</th>
                    <th className="px-6 py-4 border-r border-outline">Fecha</th>
                    <th className="px-6 py-4 border-r border-outline">Materiales</th>
                    <th className="px-6 py-4 border-r border-outline text-right">Total</th>
                    <th className="px-6 py-4 border-r border-outline text-center">Estado</th>
                    <th className="px-6 py-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr
                      key={o.id}
                      className={`border-b border-outline-variant hover:bg-surface-container transition-colors ${
                        i % 2 === 1 ? 'bg-surface-low' : 'bg-white'
                      }`}
                    >
                      <td className="px-6 py-5 text-sm font-medium text-primary underline cursor-pointer">{o.id}</td>
                      <td className="px-6 py-5 text-sm text-on-surface">{o.date}</td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">{o.materials[0]}</span>
                          {o.materials[1] && (
                            <span className="text-xs text-on-surface-variant">{o.materials[1]}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right text-sm font-bold text-primary">{o.total}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-3 py-1 rounded text-[11px] font-semibold uppercase ${statusBadge(o.status)}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-4">
                          <button className="text-on-surface hover:text-on-tertiary-container transition-colors" title="Ver detalle">
                            <span className="material-symbols-outlined">visibility</span>
                          </button>
                          <button className="text-on-surface hover:text-on-tertiary-container transition-colors" title="Repetir pedido">
                            <span className="material-symbols-outlined">replay</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Paginación */}
            <div className="p-4 flex items-center justify-between bg-surface-low border-t border-outline-variant">
              <span className="text-xs text-on-surface-variant">Mostrando {orders.length} de 128 pedidos</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container transition-all disabled:opacity-40" disabled>
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary text-sm font-semibold">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container transition-all text-sm font-semibold">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container transition-all">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar de cuenta (3) */}
        <div className="col-span-12 lg:col-span-3">
          <div className="sticky top-24 space-y-6">
            {/* Card nivel */}
            <div className="bg-white rounded-lg border border-outline-variant p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="material-symbols-outlined text-on-tertiary-container text-[32px]">verified</span>
                <span className="px-3 py-1 bg-on-tertiary-container text-white text-[10px] font-semibold rounded uppercase tracking-wider">
                  Cliente Preferente
                </span>
              </div>
              <h3 className="font-montserrat font-semibold text-2xl text-primary mb-2 leading-tight">Tu Nivel: Oro</h3>
              <p className="text-on-surface-variant text-sm mb-6">
                Disfrutas de beneficios exclusivos y tiempos de entrega prioritarios.
              </p>
              <div className="bg-surface-container p-4 rounded border border-outline-variant mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-on-surface-variant uppercase">Descuento vigente:</span>
                  <span className="font-montserrat font-semibold text-2xl text-on-tertiary-container">12%</span>
                </div>
                <p className="text-sm font-bold text-primary">En todo el catálogo de materiales.</p>
              </div>
              <button className="w-full py-3 bg-primary text-on-primary text-sm font-semibold uppercase tracking-wider rounded hover:opacity-90 transition-all active:scale-95">
                Solicitar nueva cotización
              </button>
            </div>

            {/* Quick stats */}
            <div className="space-y-4">
              <div className="bg-white border border-outline-variant p-4 rounded-lg">
                <p className="text-[10px] font-semibold text-on-surface-variant uppercase mb-1">Crédito Disponible</p>
                <p className="font-montserrat font-semibold text-2xl text-primary">$245,000.00</p>
                <div className="w-full h-2 bg-surface-container mt-3 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-on-tertiary-container" />
                </div>
              </div>
              <div className="bg-white border border-outline-variant p-4 rounded-lg">
                <p className="text-[10px] font-semibold text-on-surface-variant uppercase mb-1">Entregas del Mes</p>
                <p className="font-montserrat font-semibold text-2xl text-primary">14</p>
              </div>
            </div>

            {/* Asesor */}
            <div className="p-4 border border-dashed border-outline rounded-lg flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary">support_agent</span>
              <div>
                <p className="text-xs font-semibold text-on-surface">Asesor Asignado:</p>
                <p className="text-sm font-bold text-primary">Ing. Ricardo Mendoza</p>
                <a
                  href="mailto:soporte@acerosymetalesurgentes.com"
                  className="text-xs text-on-tertiary-container underline hover:no-underline"
                >
                  Contactar soporte
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
