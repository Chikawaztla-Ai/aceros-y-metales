import { AdminModuleHeader } from '@/components/admin/module-header';

const categorias = [
  {
    nombre: 'Acero Estructural',
    desc: 'Vigas I, Canales U, Perfiles H y placas.',
    icon: 'foundation',
    productos: '1,245 unidades',
    regla: '+2.0% Base',
    reglaAccent: true,
    highlight: false,
  },
  {
    nombre: 'Acero Inoxidable',
    desc: 'Grados 304, 316, 430 en lámina y barra.',
    icon: 'precision_manufacturing',
    productos: '856 unidades',
    regla: 'Standard Market',
    reglaAccent: false,
    highlight: false,
  },
  {
    nombre: 'Tubería Industrial',
    desc: 'SCH 40/80, galvanizada y sin costura.',
    icon: 'plumbing',
    productos: '542 unidades',
    regla: '+5.5% Promo Q4',
    reglaAccent: true,
    highlight: true,
  },
  {
    nombre: 'Maquinaria Pesada',
    desc: 'Componentes hidráulicos y repuestos.',
    icon: 'construction',
    productos: '112 unidades',
    regla: 'Standard Market',
    reglaAccent: false,
    highlight: false,
  },
];

const filtros = [
  { label: 'Acero Estructural', checked: true },
  { label: 'Acero Inoxidable', checked: true },
  { label: 'Maquinaria Pesada', checked: false },
  { label: 'Consumibles Soldadura', checked: false },
];

const historial = [
  { fecha: '24 Oct, 2023', categoria: 'Acero Estructural', ajuste: '+2.00%', accent: true, autor: 'Admin_Rodriguez' },
  { fecha: '21 Oct, 2023', categoria: 'Inoxidable 316', ajuste: '-0.50%', accent: false, autor: 'Admin_Rodriguez' },
  { fecha: '15 Oct, 2023', categoria: 'Tubería SCH', ajuste: '+5.50%', accent: true, autor: 'Global_Sync' },
];

export default function CategoriasPage() {
  return (
    <div className="p-4 md:p-10">
      <AdminModuleHeader
        title="Categorías y Precios"
        subtitle="Administra las categorías del catálogo y las reglas de precio globales por tipo de material."
        searchPlaceholder="Buscar categoría..."
        actions={
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 text-sm font-bold uppercase rounded hover:brightness-110 transition-all active:scale-95 whitespace-nowrap">
            <span className="material-symbols-outlined text-[20px]!">sync</span>
            Sincronizar
          </button>
        }
      />

      {/* Regla global activa */}
      <section className="mb-10 bg-primary-container text-on-primary-container rounded-lg p-6 md:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm rounded"
              style={{
                background:
                  'repeating-linear-gradient(45deg, #f78b30, #f78b30 10px, #d35400 10px, #d35400 20px)',
              }}
            >
              Global Activa
            </span>
            <h3 className="font-montserrat font-semibold text-xl text-on-primary">
              Incremento Global Acero +2%
            </h3>
          </div>
          <p className="text-on-primary-container max-w-md text-sm">
            Regla activa aplicada a todos los productos ferrosos basada en el índice de mercado semanal.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded p-4 min-w-[150px]">
            <span className="text-[10px] uppercase font-bold text-on-primary-container block mb-1">
              Última Actualización
            </span>
            <span className="font-mono text-sm text-white">24/10/2023 09:42</span>
          </div>
          <button className="bg-on-tertiary-container hover:brightness-110 text-white px-6 py-3 rounded font-bold uppercase text-sm flex items-center justify-center gap-2 self-center active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[18px]!">edit</span>
            Editar Regla
          </button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6">
        {/* Filtros + panel */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-white border border-outline-variant shadow-sm p-6">
            <h4 className="text-sm font-montserrat font-bold text-primary uppercase tracking-tight mb-4">
              Filtrar por Tipo
            </h4>
            <div className="space-y-3">
              {filtros.map((f) => (
                <label key={f.label} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    defaultChecked={f.checked}
                    className="h-5 w-5 rounded-none border-outline-variant text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                    {f.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="relative h-64 overflow-hidden rounded shadow-sm border border-outline-variant bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center p-6 text-center">
            <span className="material-symbols-outlined absolute right-4 bottom-4 text-white/10 text-[120px]!">
              monitoring
            </span>
            <p className="relative text-white font-montserrat text-sm font-bold uppercase tracking-widest leading-relaxed">
              Monitoreo de Índice en Tiempo Real
            </p>
          </div>
        </div>

        {/* Grid de categorías + historial */}
        <div className="col-span-12 lg:col-span-9">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-montserrat font-semibold text-xl text-primary">Categorías de Inventario</h4>
            <span className="text-sm font-medium text-outline">
              Mostrando {categorias.length} categorías
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categorias.map((c) => (
              <div
                key={c.nombre}
                className={`bg-white border border-outline-variant shadow-sm hover:shadow-md transition-all flex flex-col ${
                  c.highlight ? 'border-l-4 border-l-on-tertiary-container' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <div>
                      <h5 className="text-sm font-montserrat font-bold text-primary uppercase">{c.nombre}</h5>
                      <p className="text-sm text-on-surface-variant mt-1">{c.desc}</p>
                    </div>
                    <span className="material-symbols-outlined text-on-primary-container text-[36px]! shrink-0">
                      {c.icon}
                    </span>
                  </div>
                  <div className="space-y-2 mb-2 font-mono text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-outline">Productos:</span>
                      <span className="font-bold">{c.productos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-outline">Regla Aplicada:</span>
                      <span className={`font-bold ${c.reglaAccent ? 'text-on-tertiary-container' : 'text-primary'}`}>
                        {c.regla}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto border-t border-outline-variant/40 bg-surface-low p-4 flex gap-3">
                  <button className="flex-1 bg-white border-2 border-primary text-primary py-2 font-bold uppercase text-xs hover:bg-primary hover:text-white transition-all rounded">
                    Detalles
                  </button>
                  <button className="flex-1 bg-primary text-white py-2 font-bold uppercase text-xs hover:brightness-125 transition-all flex items-center justify-center gap-2 rounded">
                    <span className="material-symbols-outlined text-[16px]!">edit</span>
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Historial de ajustes globales */}
          <div className="mt-10 bg-white border border-outline-variant shadow-sm overflow-hidden">
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <h4 className="text-sm font-bold uppercase">Historial de Ajustes Globales</h4>
              <span className="material-symbols-outlined opacity-70 text-[24px]!">history</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="bg-surface-low border-b border-outline-variant">
                    {['Fecha', 'Categoría', 'Ajuste', 'Autor', 'Estado'].map((h) => (
                      <th key={h} className="p-4 text-xs font-bold text-primary uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono text-[13px]">
                  {historial.map((h, i) => (
                    <tr
                      key={h.fecha}
                      className={`border-b border-outline-variant/40 hover:bg-surface transition-colors ${
                        i % 2 === 1 ? 'bg-surface-low' : 'bg-white'
                      }`}
                    >
                      <td className="p-4">{h.fecha}</td>
                      <td className="p-4 font-bold">{h.categoria}</td>
                      <td className={`p-4 font-bold ${h.accent ? 'text-on-tertiary-container' : 'text-primary'}`}>
                        {h.ajuste}
                      </td>
                      <td className="p-4">{h.autor}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold uppercase rounded">
                          Ejecutado
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
