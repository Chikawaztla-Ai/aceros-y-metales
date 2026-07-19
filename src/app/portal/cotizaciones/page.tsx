import Link from 'next/link';

const quotes = [
  { id: 'COT-4821', date: '26 Oct 2024', summary: 'Placa A-36 1/2" (4 hojas)', total: '$42,300.00', status: 'Vigente', expires: 'Vence 02 Nov' },
  { id: 'COT-4790', date: '18 Oct 2024', summary: 'Barra 4140 Ø 1" (30 pzas) + corte', total: '$14,300.00', status: 'Vigente', expires: 'Vence 25 Oct' },
  { id: 'COT-4712', date: '05 Oct 2024', summary: 'PTR 4x4 Cal 11 (proyecto nave)', total: '$67,800.00', status: 'Convertida', expires: 'Pedido ORD-88291' },
  { id: 'COT-4655', date: '22 Sep 2024', summary: 'Aluminio 6061 Placa (surtido)', total: '$21,050.00', status: 'Expirada', expires: 'Venció 30 Sep' },
];

function badge(status: string) {
  switch (status) {
    case 'Vigente': return 'bg-secondary-container text-on-secondary-container';
    case 'Convertida': return 'bg-green-100 text-green-800 border border-green-200';
    case 'Expirada': return 'bg-surface-container text-on-surface-variant';
    default: return 'bg-surface-container text-on-surface-variant';
  }
}

export default function PortalCotizaciones() {
  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10 border-b border-outline-variant pb-6">
        <div>
          <h1 className="font-montserrat font-bold text-[32px] leading-10 text-primary uppercase">Mis Cotizaciones</h1>
          <p className="text-on-surface-variant mt-2">Historial de solicitudes y su estatus de conversión.</p>
        </div>
        <Link
          href="/cotizacion"
          className="bg-on-tertiary-container text-white text-sm font-semibold uppercase px-6 py-2.5 rounded-lg hover:brightness-110 transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[18px]!">add</span>
          Nueva Cotización
        </Link>
      </header>

      <div className="bg-white rounded-lg border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-primary-container text-on-primary text-sm font-semibold">
                <th className="px-6 py-4 border-r border-outline">Folio</th>
                <th className="px-6 py-4 border-r border-outline">Fecha</th>
                <th className="px-6 py-4 border-r border-outline">Resumen</th>
                <th className="px-6 py-4 border-r border-outline text-right">Total</th>
                <th className="px-6 py-4 border-r border-outline text-center">Estado</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q, i) => (
                <tr key={q.id} className={`border-b border-outline-variant hover:bg-surface-container transition-colors ${i % 2 === 1 ? 'bg-surface-low' : 'bg-white'}`}>
                  <td className="px-6 py-5 text-sm font-medium text-primary underline cursor-pointer">{q.id}</td>
                  <td className="px-6 py-5 text-sm">{q.date}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{q.summary}</span>
                      <span className="text-xs text-on-surface-variant">{q.expires}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right text-sm font-bold text-primary">{q.total}</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-3 py-1 rounded text-[11px] font-semibold uppercase ${badge(q.status)}`}>{q.status}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-4">
                      <button className="text-on-surface hover:text-on-tertiary-container transition-colors" title="Ver / descargar PDF">
                        <span className="material-symbols-outlined text-[20px]!">download</span>
                      </button>
                      <Link href="/carrito" className="text-on-surface hover:text-on-tertiary-container transition-colors" title="Convertir en pedido">
                        <span className="material-symbols-outlined text-[20px]!">shopping_cart</span>
                      </Link>
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
