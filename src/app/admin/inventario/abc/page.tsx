import Link from 'next/link';

type Row = {
  sku: string;
  producto: string;
  sub: string;
  categoria: string;
  grado: string;
  dims: string;
  stock: string;
  estado: 'ok' | 'low';
  precio: string;
};

const rows: Row[] = [
  { sku: 'ST-IB-A36-001', producto: 'Viga I-Beam A36', sub: 'Acero Estructural', categoria: 'Viga', grado: 'A36', dims: '10" x 15lb x 40\'', stock: 'En Stock (45)', estado: 'ok', precio: '$1,240.00' },
  { sku: 'AL-TB-6061-052', producto: 'Tubo Redondo 6061', sub: 'Aluminio Aeroespacial', categoria: 'Tubo', grado: '6061-T6', dims: '2" OD x 0.125" x 20\'', stock: 'Bajo Stock (4)', estado: 'low', precio: '$450.00' },
  { sku: 'SS-PL-304-015', producto: 'Placa Inoxidable 304', sub: 'Acero Grado Alimenticio', categoria: 'Placa', grado: '304', dims: "4' x 8' x 1/4\"", stock: 'En Stock (12)', estado: 'ok', precio: '$890.00' },
  { sku: 'ST-AG-A36-092', producto: 'Ángulo de Acero A36', sub: 'Acero al Carbono', categoria: 'Ángulo', grado: 'A36', dims: '3" x 3" x 3/8" x 20\'', stock: 'En Stock (88)', estado: 'ok', precio: '$315.00' },
];

const filtros = [
  { label: 'Material', options: ['Todos los materiales', 'Acero', 'Aluminio', 'Acero Inoxidable'] },
  { label: 'Forma', options: ['Todas las formas', 'Viga (I-Beam)', 'Tubo', 'Placa', 'Ángulo'] },
  { label: 'Grado', options: ['Todos los grados', 'A36', '304', '316', '6061-T6'] },
  { label: 'Estado de Stock', options: ['Todos los estados', 'En Stock', 'Bajo Stock', 'Agotado'] },
];

const selectCls =
  'border border-outline-variant rounded p-2.5 text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none';

export default function InventarioAbcPage() {
  return (
    <div className="p-4 md:p-10">
      {/* Encabezado */}
      <section className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-montserrat font-bold text-[32px] md:text-[40px] leading-tight text-primary uppercase tracking-tight">
            Análisis de Inventario
          </h1>
          <p className="text-on-surface-variant max-w-2xl mt-1">
            Monitoreo de existencias estructurales y control de especificaciones técnicas en tiempo real.
          </p>
        </div>
        <Link
          href="/admin/inventario/editar"
          className="bg-on-tertiary-container text-white px-6 md:px-8 py-3 md:py-4 font-bold text-sm uppercase tracking-widest shadow-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap rounded"
        >
          <span className="material-symbols-outlined text-[20px]!">add</span>
          Añadir Producto
        </Link>
      </section>

      {/* Filtros */}
      <div className="bg-white border border-outline-variant p-6 mb-8 rounded shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 items-end">
        {filtros.map((f) => (
          <div key={f.label} className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-primary/70 tracking-wider">{f.label}</label>
            <select className={selectCls} defaultValue={f.options[0]}>
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        ))}
        <button className="bg-secondary text-white p-2.5 rounded font-bold text-sm hover:bg-primary transition-all flex items-center justify-center gap-2 h-[42px] uppercase">
          <span className="material-symbols-outlined text-[20px]!">filter_list</span>
          Aplicar
        </button>
      </div>

      {/* Grid de inventario */}
      <div className="bg-white border border-outline-variant rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[920px]">
            <thead className="bg-primary text-white">
              <tr>
                {['SKU', 'Producto', 'Categoría', 'Grado', 'Dimensiones', 'Stock', 'Precio (Base)', 'Acciones'].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] uppercase tracking-wider border-r border-white/10 last:border-r-0 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-on-surface">
              {rows.map((r, i) => (
                <tr key={r.sku} className={`border-b border-outline-variant/30 hover:bg-primary-container/5 transition-colors ${i % 2 === 1 ? 'bg-surface-low' : ''}`}>
                  <td className="px-6 py-4 font-mono text-[13px] text-primary whitespace-nowrap">{r.sku}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{r.producto}</span>
                      <span className="text-xs text-on-surface-variant">{r.sub}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{r.categoria}</td>
                  <td className="px-6 py-4 text-sm">{r.grado}</td>
                  <td className="px-6 py-4 font-mono text-[13px] whitespace-nowrap">{r.dims}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${r.estado === 'ok' ? 'bg-green-500' : 'bg-error'}`} />
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase border ${
                          r.estado === 'ok'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-error-container text-on-error-container border-error/20'
                        }`}
                      >
                        {r.stock}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-[13px] font-bold text-primary">{r.precio}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-on-surface-variant hover:text-primary transition-colors" title="Ver">
                        <span className="material-symbols-outlined text-[20px]!">visibility</span>
                      </button>
                      <Link href="/admin/inventario/editar" className="text-on-surface-variant hover:text-primary transition-colors" title="Editar">
                        <span className="material-symbols-outlined text-[20px]!">edit</span>
                      </Link>
                      <button className="text-error/70 hover:text-error transition-colors" title="Eliminar">
                        <span className="material-symbols-outlined text-[20px]!">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-surface-low flex flex-col sm:flex-row gap-3 justify-between items-center border-t border-outline-variant">
          <span className="text-sm text-on-surface-variant">Mostrando {rows.length} de 1,248 productos</span>
          <div className="flex gap-2">
            <button className="p-2 border border-outline-variant rounded hover:bg-white disabled:opacity-30" disabled>
              <span className="material-symbols-outlined text-[18px]!">chevron_left</span>
            </button>
            <button className="px-4 py-2 border border-primary bg-primary text-white rounded text-sm font-bold">1</button>
            <button className="px-4 py-2 border border-outline-variant hover:bg-white rounded text-sm font-bold">2</button>
            <button className="px-4 py-2 border border-outline-variant hover:bg-white rounded text-sm font-bold">3</button>
            <button className="p-2 border border-outline-variant rounded hover:bg-white">
              <span className="material-symbols-outlined text-[18px]!">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bento de resumen */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-outline-variant p-6 rounded relative overflow-hidden group shadow-sm">
          <span className="material-symbols-outlined absolute -top-4 -right-4 text-surface-container text-[110px]! rotate-12 group-hover:scale-110 transition-transform">precision_manufacturing</span>
          <h3 className="text-xs font-bold uppercase text-primary mb-4 tracking-widest relative z-10">Resumen de Carga</h3>
          <div className="flex items-end gap-2 mb-2 relative z-10">
            <span className="text-[32px] font-bold text-primary font-montserrat leading-none">1,420</span>
            <span className="text-xs text-on-surface-variant pb-1">Toneladas en stock</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden relative z-10">
            <div className="bg-on-tertiary-container h-full" style={{ width: '72%' }} />
          </div>
          <p className="mt-4 text-xs text-on-surface-variant relative z-10">72% de la capacidad total utilizada.</p>
        </div>

        <div className="bg-white border border-outline-variant p-6 rounded relative overflow-hidden group shadow-sm">
          <span className="material-symbols-outlined absolute -top-4 -right-4 text-surface-container text-[110px]! -rotate-12 group-hover:scale-110 transition-transform">warning</span>
          <h3 className="text-xs font-bold uppercase text-primary mb-4 tracking-widest relative z-10">Alertas de Stock</h3>
          <div className="flex items-end gap-2 mb-2 relative z-10">
            <span className="text-[32px] font-bold text-error font-montserrat leading-none">18</span>
            <span className="text-xs text-on-surface-variant pb-1">SKUs en stock bajo</span>
          </div>
          <div className="mt-4 flex gap-2 relative z-10">
            <span className="bg-error/10 text-error px-2 py-1 rounded text-[11px] font-bold uppercase">Urgente</span>
            <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-1 rounded text-[11px] font-bold uppercase">Re-pedido</span>
          </div>
        </div>

        <div className="bg-white border border-outline-variant p-6 rounded relative overflow-hidden group shadow-sm">
          <span className="material-symbols-outlined absolute -top-4 -right-4 text-surface-container text-[110px]! group-hover:scale-110 transition-transform">trending_up</span>
          <h3 className="text-xs font-bold uppercase text-primary mb-4 tracking-widest relative z-10">Valor de Inventario</h3>
          <div className="flex items-end gap-2 mb-2 relative z-10">
            <span className="text-[32px] font-bold text-primary font-montserrat leading-none">$4.2M</span>
            <span className="text-xs text-on-surface-variant pb-1">MXN estimado</span>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant relative z-10">Cálculo basado en precios base de mercado actuales.</p>
        </div>
      </section>
    </div>
  );
}
