import Link from 'next/link';
import { AdminModuleHeader, AdminStat, AdminExportButton } from '@/components/admin/module-header';

const stats = [
  { label: 'SKUs Activos', value: '512' },
  { label: 'Stock Bajo', value: '18', accent: true },
  { label: 'Valor Inventario (MXN)', value: '$8.4M' },
];

const items = [
  { sku: '4140-RD-100', name: 'Acero 4140 Barra Redonda', grade: 'AISI 4140', dims: 'Ø 1" x 6m', stock: 'Alto', location: 'A-12', pct: 82 },
  { sku: 'A36-PL-050', name: 'Placa Estructural A-36', grade: 'ASTM A36', dims: '1/2" x 4x8', stock: 'Medio', location: 'B-03', pct: 48 },
  { sku: 'H13-RD-075', name: 'Acero H13 Trabajo Caliente', grade: 'AISI H13', dims: 'Ø 3/4" x 3m', stock: 'Bajo', location: 'C-21', pct: 14 },
  { sku: '6061-PL-025', name: 'Aluminio 6061-T6 Placa', grade: '6061-T6', dims: '1" x 4x8', stock: 'Alto', location: 'D-08', pct: 76 },
  { sku: 'PTR-4X4-C11', name: 'PTR Estructural 4x4', grade: 'C-11', dims: '4" x 6m', stock: 'Medio', location: 'A-30', pct: 55 },
];

function stockColor(stock: string) {
  switch (stock) {
    case 'Alto': return { text: 'text-green-700', bar: 'bg-green-600' };
    case 'Medio': return { text: 'text-on-tertiary-container', bar: 'bg-on-tertiary-container' };
    case 'Bajo': return { text: 'text-error', bar: 'bg-error' };
    default: return { text: 'text-on-surface-variant', bar: 'bg-outline' };
  }
}

export default function AdminInventario() {
  return (
    <div className="p-10">
      <AdminModuleHeader
        title="Control de Inventario"
        subtitle="Existencias en tiempo real, ubicaciones y niveles de reorden."
        searchPlaceholder="Buscar SKU o material..."
        actions={
          <div className="flex gap-3">
            <AdminExportButton />
            <Link
              href="/admin/inventario/editar"
              className="flex items-center gap-2 bg-on-tertiary-container text-white px-4 py-2 text-sm font-bold uppercase hover:brightness-110 transition-all rounded whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[20px]!">add</span>
              Nuevo SKU
            </Link>
          </div>
        }
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
                {['SKU', 'Material', 'Grado', 'Dimensiones', 'Nivel de Stock', 'Ubicación', 'Acciones'].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => {
                const c = stockColor(it.stock);
                return (
                  <tr key={it.sku} className={`border-b border-outline-variant ${i % 2 === 1 ? 'bg-surface-low' : ''} hover:bg-surface-container transition-colors`}>
                    <td className="px-6 py-4 text-sm font-medium text-primary">{it.sku}</td>
                    <td className="px-6 py-4 text-sm font-bold">{it.name}</td>
                    <td className="px-6 py-4 text-sm">{it.grade}</td>
                    <td className="px-6 py-4 text-sm">{it.dims}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="flex-1 h-2 bg-surface-high rounded-full overflow-hidden">
                          <div className={`h-full ${c.bar}`} style={{ width: `${it.pct}%` }} />
                        </div>
                        <span className={`text-xs font-bold ${c.text}`}>{it.stock}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{it.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-surface-container text-primary transition-colors" title="Editar">
                          <span className="material-symbols-outlined text-[20px]!">edit</span>
                        </button>
                        <button className="p-2 hover:bg-surface-container text-on-tertiary-container transition-colors" title="Reabastecer">
                          <span className="material-symbols-outlined text-[20px]!">add_box</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
