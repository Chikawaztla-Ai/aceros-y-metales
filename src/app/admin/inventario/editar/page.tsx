'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const fieldCls =
  'w-full bg-white border border-outline-variant rounded px-4 py-3 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all';
const monoField = `${fieldCls} font-mono`;
const labelCls = 'text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block';

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-outline-variant rounded-lg p-5 md:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <span className="material-symbols-outlined text-on-tertiary-container text-[24px]!">{icon}</span>
        <h2 className="font-montserrat font-semibold text-xl uppercase">{title}</h2>
      </div>
      {children}
    </div>
  );
}

const volumeRules = [
  { range: '500 - 1,999 kg', discount: '2.5%' },
  { range: '2,000+ kg', discount: '5.0%' },
];

export default function EditarProductoPage() {
  const [dims, setDims] = useState({ thickness: '', width: '', length: '' });

  // Peso teórico: (t/1000) * (w/1000) * (l/1000) * densidad acero 7850 kg/m³
  const weight = useMemo(() => {
    const t = parseFloat(dims.thickness) || 0;
    const w = parseFloat(dims.width) || 0;
    const l = parseFloat(dims.length) || 0;
    return ((t / 1000) * (w / 1000) * (l / 1000) * 7850).toFixed(2);
  }, [dims]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('Producto guardado correctamente en el catálogo industrial.');
  }

  return (
    <div className="p-4 md:p-10 pb-36">
      {/* Breadcrumb + título */}
      <div className="mb-8">
        <Link
          href="/admin/inventario"
          className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:text-primary transition-colors mb-3"
        >
          <span className="material-symbols-outlined text-[18px]!">arrow_back</span>
          Inventario
        </Link>
        <h1 className="font-montserrat font-bold text-[32px] leading-10 text-primary">Editar Producto</h1>
        <p className="text-on-surface-variant mt-1">
          Añade o modifica un material del catálogo industrial.
        </p>
      </div>

      <form id="productForm" onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* Columna principal */}
          <section className="col-span-12 lg:col-span-8 space-y-6">
            {/* Información básica */}
            <SectionCard icon="info" title="Información Básica">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelCls}>Nombre del Producto</label>
                  <input
                    className={fieldCls}
                    placeholder="Ej: Placa de Acero A36 Laminada en Caliente"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label className={labelCls}>SKU / Identificador Técnico</label>
                  <input className={monoField} placeholder="ST-A36-PLATE-001" type="text" />
                </div>
                <div>
                  <label className={labelCls}>Categoría</label>
                  <select className={fieldCls} defaultValue="Placas y Láminas">
                    <option>Placas y Láminas</option>
                    <option>Perfiles Estructurales</option>
                    <option>Barras y Alambrón</option>
                    <option>Tubería Industrial</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Grado de Material</label>
                  <input className={fieldCls} placeholder="ASTM A36 / Grade 50" type="text" />
                </div>
              </div>
            </SectionCard>

            {/* Especificaciones técnicas */}
            <SectionCard icon="precision_manufacturing" title="Especificaciones Técnicas">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelCls}>Espesor (mm)</label>
                  <input
                    className={monoField}
                    placeholder="0.00"
                    step="0.01"
                    type="number"
                    value={dims.thickness}
                    onChange={(e) => setDims((d) => ({ ...d, thickness: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Ancho (mm)</label>
                  <input
                    className={monoField}
                    placeholder="0"
                    step="1"
                    type="number"
                    value={dims.width}
                    onChange={(e) => setDims((d) => ({ ...d, width: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Largo (mm)</label>
                  <input
                    className={monoField}
                    placeholder="0"
                    step="1"
                    type="number"
                    value={dims.length}
                    onChange={(e) => setDims((d) => ({ ...d, length: e.target.value }))}
                  />
                </div>

                {/* Peso teórico calculado */}
                <div className="md:col-span-2 bg-surface-low p-6 rounded border-l-4 border-primary">
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="text-xs text-secondary uppercase tracking-wider font-semibold">
                        Peso Teórico Calculado
                      </p>
                      <p className="font-montserrat font-bold text-2xl text-primary mt-1">
                        {weight} kg
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-outline uppercase">Densidad base (Acero)</p>
                      <p className="text-sm font-medium font-mono">7,850 kg/m³</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Unidad de Medida</label>
                  <select className={fieldCls} defaultValue="Kilogramo (kg)">
                    <option>Kilogramo (kg)</option>
                    <option>Tonelada (ton)</option>
                    <option>Pieza (pz)</option>
                    <option>Metro (m)</option>
                  </select>
                </div>
              </div>
            </SectionCard>

            {/* Inventario y precios */}
            <SectionCard icon="payments" title="Inventario y Precios">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase text-secondary tracking-wider">
                    Control de Existencias
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Cantidad en Stock</label>
                      <input className={monoField} type="number" defaultValue={0} />
                    </div>
                    <div>
                      <label className={labelCls}>Stock Mínimo</label>
                      <input className={monoField} type="number" defaultValue={10} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase text-secondary tracking-wider">
                    Tarifas Unitarias
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Precio por kg (USD)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-outline">$</span>
                        <input
                          className={`${monoField} pl-8`}
                          placeholder="0.00"
                          step="0.01"
                          type="number"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Precio por lb (USD)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-outline">$</span>
                        <input
                          className={`${monoField} pl-8`}
                          placeholder="0.00"
                          step="0.01"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reglas de descuento por volumen */}
                <div className="md:col-span-2 pt-2">
                  <h3 className="text-xs font-bold uppercase text-secondary tracking-wider mb-4">
                    Reglas de Descuento por Volumen
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-outline-variant/40 text-left rounded overflow-hidden min-w-[420px]">
                      <thead className="bg-primary text-on-primary">
                        <tr>
                          <th className="px-4 py-3 text-xs font-semibold uppercase">Rango de Cantidad</th>
                          <th className="px-4 py-3 text-xs font-semibold uppercase">Descuento (%)</th>
                          <th className="px-4 py-3 text-xs font-semibold uppercase">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {volumeRules.map((r, i) => (
                          <tr key={r.range} className={i % 2 === 1 ? 'bg-surface-low' : 'bg-white'}>
                            <td className="px-4 py-3 border-b border-outline-variant/20 text-sm">{r.range}</td>
                            <td className="px-4 py-3 border-b border-outline-variant/20 text-sm font-medium">
                              {r.discount}
                            </td>
                            <td className="px-4 py-3 border-b border-outline-variant/20">
                              <button
                                type="button"
                                className="text-error text-sm font-medium hover:underline"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    className="mt-4 text-secondary text-sm flex items-center gap-1 font-bold hover:underline"
                  >
                    <span className="material-symbols-outlined text-[18px]!">add</span>
                    Añadir Regla de Volumen
                  </button>
                </div>
              </div>
            </SectionCard>
          </section>

          {/* Columna lateral: multimedia + referencia */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <SectionCard icon="upload_file" title="Multimedia">
              <div className="space-y-6">
                <div>
                  <label className={labelCls}>Fotos del Producto</label>
                  <div className="border-2 border-dashed border-outline-variant rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer group bg-surface-low">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary mb-2 text-[40px]!">
                      add_a_photo
                    </span>
                    <p className="text-sm text-on-surface-variant font-medium">
                      Arrastra o selecciona imágenes
                    </p>
                    <p className="text-xs text-outline mt-1">Soporta JPG, PNG (Máx 5MB)</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="aspect-square bg-surface-container rounded border border-outline-variant/30 overflow-hidden flex items-center justify-center text-outline">
                      <span className="material-symbols-outlined text-[24px]!">image</span>
                    </div>
                    <div className="aspect-square bg-surface-container rounded border border-outline-variant/30 flex items-center justify-center text-outline">
                      <span className="material-symbols-outlined text-[24px]!">image</span>
                    </div>
                    <div className="aspect-square bg-surface-container rounded border border-outline-variant/30 flex items-center justify-center text-outline">
                      <span className="material-symbols-outlined text-[24px]!">image</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-outline-variant/40">
                  <label className={labelCls}>Datasheets Técnicos (PDF)</label>
                  <div className="border border-outline-variant rounded p-4 flex items-center gap-3 bg-white hover:shadow-sm transition-all mb-3 cursor-pointer">
                    <span className="material-symbols-outlined text-primary text-[24px]!">picture_as_pdf</span>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-bold truncate">A36_Spec_Sheet_Rev2.pdf</p>
                      <p className="text-xs text-outline">2.4 MB • PDF Document</p>
                    </div>
                    <button
                      type="button"
                      className="material-symbols-outlined text-outline hover:text-error text-[20px]!"
                    >
                      close
                    </button>
                  </div>
                  <button
                    type="button"
                    className="w-full border-2 border-secondary border-dashed rounded py-3 text-secondary text-sm font-bold uppercase hover:bg-secondary-container/20 transition-colors"
                  >
                    Cargar Documento PDF
                  </button>
                </div>
              </div>
            </SectionCard>

            {/* Tarjeta de referencia */}
            <div className="bg-primary-container text-on-primary-container rounded-lg p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-on-tertiary-container text-[24px]!">
                  auto_awesome
                </span>
                <h3 className="font-montserrat font-semibold text-xl text-on-primary">Referencia</h3>
              </div>
              <p className="text-sm opacity-90 mb-4 leading-relaxed">
                Asegúrese de que el SKU coincida con la nomenclatura de SAP para evitar errores de
                sincronización en la próxima actualización de inventario.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold bg-white/10 p-3 rounded">
                <span className="material-symbols-outlined text-on-tertiary-container text-[20px]!">sync</span>
                Última sincronización: Hace 12 min
              </div>
            </div>
          </aside>
        </div>
      </form>

      {/* Footer sticky de acciones */}
      <footer className="fixed bottom-0 left-0 md:left-[260px] right-0 bg-white border-t border-outline-variant px-4 md:px-10 py-4 flex justify-end gap-3 md:gap-4 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link
          href="/admin/inventario"
          className="px-6 md:px-8 py-3 rounded border-2 border-secondary text-secondary font-bold uppercase tracking-wider text-sm hover:bg-surface-low transition-all active:scale-95"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          form="productForm"
          className="px-8 md:px-10 py-3 rounded bg-on-tertiary-container text-white font-bold uppercase tracking-wider text-sm shadow-lg hover:brightness-110 transition-all active:scale-95"
        >
          Guardar Producto
        </button>
      </footer>
    </div>
  );
}
