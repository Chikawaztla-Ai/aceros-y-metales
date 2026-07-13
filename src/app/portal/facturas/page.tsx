const invoices = [
  { folio: 'A-10482', date: '24 Oct 2024', order: 'ORD-88291', total: '$49,300.00', status: 'Pagada' },
  { folio: 'A-10450', date: '12 Oct 2024', order: 'ORD-88120', total: '$21,155.00', status: 'Pagada' },
  { folio: 'A-10399', date: '28 Sep 2024', order: 'ORD-87540', total: '$37,004.00', status: 'Por pagar' },
  { folio: 'A-10350', date: '15 Sep 2024', order: 'ORD-87201', total: '$12,800.00', status: 'Vencida' },
];

const stats = [
  { label: 'Facturado (mes)', value: '$70,455.00' },
  { label: 'Por Pagar', value: '$37,004.00', accent: true },
  { label: 'Días de Crédito', value: '60' },
];

function badge(status: string) {
  switch (status) {
    case 'Pagada': return 'bg-green-100 text-green-800 border border-green-200';
    case 'Por pagar': return 'bg-amber-100 text-amber-800';
    case 'Vencida': return 'bg-red-100 text-red-800';
    default: return 'bg-surface-container text-on-surface-variant';
  }
}

export default function PortalFacturas() {
  return (
    <>
      <header className="mb-8 border-b border-outline-variant pb-6">
        <h1 className="font-montserrat font-bold text-[32px] leading-10 text-primary uppercase">Mis Facturas</h1>
        <p className="text-on-surface-variant mt-2">Consulta y descarga tus comprobantes fiscales (CFDI).</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-outline-variant p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase text-on-surface-variant mb-1">{s.label}</p>
            <p className={`font-montserrat font-bold text-2xl ${s.accent ? 'text-on-tertiary-container' : 'text-primary'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-primary-container text-on-primary text-sm font-semibold">
                <th className="px-6 py-4 border-r border-outline">Folio Fiscal</th>
                <th className="px-6 py-4 border-r border-outline">Fecha</th>
                <th className="px-6 py-4 border-r border-outline">Pedido</th>
                <th className="px-6 py-4 border-r border-outline text-right">Total</th>
                <th className="px-6 py-4 border-r border-outline text-center">Estado</th>
                <th className="px-6 py-4 text-center">Descarga</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={inv.folio} className={`border-b border-outline-variant hover:bg-surface-container transition-colors ${i % 2 === 1 ? 'bg-surface-low' : 'bg-white'}`}>
                  <td className="px-6 py-5 text-sm font-medium text-primary">{inv.folio}</td>
                  <td className="px-6 py-5 text-sm">{inv.date}</td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant">{inv.order}</td>
                  <td className="px-6 py-5 text-right text-sm font-bold text-primary">{inv.total}</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-3 py-1 rounded text-[11px] font-semibold uppercase ${badge(inv.status)}`}>{inv.status}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">
                      <button className="text-on-surface hover:text-error transition-colors" title="Descargar PDF">
                        <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                      </button>
                      <button className="text-on-surface hover:text-primary transition-colors" title="Descargar XML">
                        <span className="material-symbols-outlined text-[20px]">code</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
