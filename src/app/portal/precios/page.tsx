import Link from 'next/link';

const prices = [
  { sku: '4140-RD', name: 'Acero Cromo-Molibdeno 4140', list: 185, yours: 163, unit: 'kg' },
  { sku: 'D2-RD', name: 'Acero al Cromo D2', list: 320, yours: 282, unit: 'kg' },
  { sku: '6061-PL', name: 'Aluminio 6061-T6 Placa', list: 210, yours: 185, unit: 'kg' },
  { sku: '304-RD', name: 'Inoxidable 304', list: 145, yours: 128, unit: 'kg' },
  { sku: 'H13-RD', name: 'Acero H13 Trabajo en Caliente', list: 380, yours: 334, unit: 'kg' },
  { sku: 'BRZ-660', name: 'Bronce SAE 660', list: 280, yours: 246, unit: 'kg' },
];

export default function PortalPrecios() {
  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10 border-b border-outline-variant pb-6">
        <div>
          <h1 className="font-montserrat font-bold text-[32px] leading-10 text-primary uppercase">Lista de Precios</h1>
          <p className="text-on-surface-variant mt-2">Precios preferenciales de tu nivel <span className="font-bold text-on-tertiary-container">Oro</span> (−12%).</p>
        </div>
        <button className="border-2 border-primary text-primary text-sm font-semibold uppercase px-6 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all flex items-center gap-2 whitespace-nowrap">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Descargar PDF
        </button>
      </header>

      <div className="bg-white rounded-lg border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-primary-container text-on-primary text-sm font-semibold">
                <th className="px-6 py-4 border-r border-outline">SKU</th>
                <th className="px-6 py-4 border-r border-outline">Material</th>
                <th className="px-6 py-4 border-r border-outline text-right">Precio Lista</th>
                <th className="px-6 py-4 border-r border-outline text-right">Tu Precio</th>
                <th className="px-6 py-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((p, i) => (
                <tr key={p.sku} className={`border-b border-outline-variant hover:bg-surface-container transition-colors ${i % 2 === 1 ? 'bg-surface-low' : 'bg-white'}`}>
                  <td className="px-6 py-4 text-sm font-medium text-primary">{p.sku}</td>
                  <td className="px-6 py-4 text-sm font-bold">{p.name}</td>
                  <td className="px-6 py-4 text-right text-sm text-on-surface-variant line-through">${p.list}.00</td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-on-tertiary-container">${p.yours}.00 <span className="text-xs font-normal text-on-surface-variant">/{p.unit}</span></td>
                  <td className="px-6 py-4 text-center">
                    <Link href="/catalogo" className="inline-flex text-primary hover:text-on-tertiary-container transition-colors" title="Ver en catálogo">
                      <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-on-surface-variant mt-4">
        Precios sin IVA, sujetos a disponibilidad. Vigencia de la lista: mes en curso.
      </p>
    </>
  );
}
