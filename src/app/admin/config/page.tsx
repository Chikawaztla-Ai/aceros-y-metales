import { AdminModuleHeader } from '@/components/admin/module-header';

const zones = [
  { zone: 'Zona Metropolitana MTY', base: '$1,200', maxWeight: '20 Ton', lead: 'Mismo día', active: true },
  { zone: 'Bajío (Qro / Gto / SLP)', base: '$3,500', maxWeight: '25 Ton', lead: '24-48 h', active: true },
  { zone: 'CDMX y Centro', base: '$4,800', maxWeight: '25 Ton', lead: '48-72 h', active: true },
  { zone: 'Occidente (Gdl)', base: '$4,200', maxWeight: '25 Ton', lead: '48 h', active: false },
];

const fieldCls =
  'w-full bg-white border border-outline-variant rounded px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all';
const labelCls = 'text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block';

export default function AdminConfig() {
  return (
    <div className="p-10">
      <AdminModuleHeader
        title="Ajustes de Administración"
        subtitle="Gestione los parámetros globales, tarifas logísticas y términos comerciales de la plataforma."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasas de cambio y crédito */}
        <section className="bg-white border border-outline-variant p-8 shadow-sm">
          <h2 className="font-montserrat font-semibold text-xl text-primary uppercase mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">payments</span>
            Tasas de Cambio y Crédito
          </h2>
          <div className="space-y-5">
            <div>
              <label className={labelCls}>Tipo de Cambio USD/MXN</label>
              <input type="text" defaultValue="18.50" className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Interés por Mora B2B (% mensual)</label>
              <input type="text" defaultValue="3.5" className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Términos de Crédito Predeterminados</label>
              <select className={fieldCls} defaultValue="30-60-90">
                <option value="contado">Contado</option>
                <option value="30">30 días</option>
                <option value="30-60-90">30-60-90 días</option>
              </select>
            </div>
          </div>
        </section>

        {/* Seguridad y acceso */}
        <section className="bg-white border border-outline-variant p-8 shadow-sm">
          <h2 className="font-montserrat font-semibold text-xl text-primary uppercase mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">shield</span>
            Seguridad y Acceso
          </h2>
          <div className="space-y-5">
            <div>
              <label className={labelCls}>API Key &amp; Webhooks</label>
              <div className="flex gap-2">
                <input type="password" defaultValue="sk_live_••••••••••••4210" className={fieldCls} readOnly />
                <button className="shrink-0 border-2 border-primary text-primary px-4 text-sm font-bold uppercase hover:bg-primary hover:text-white transition-all rounded">
                  Regenerar
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-low rounded border border-outline-variant">
              <div>
                <p className="text-sm font-bold text-on-surface">Autenticación en 2 pasos</p>
                <p className="text-xs text-on-surface-variant">Requerida para todos los administradores.</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 font-bold rounded text-xs uppercase">Activa</span>
            </div>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-on-tertiary-container hover:underline">
              Ver Documentación
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            </a>
          </div>
        </section>
      </div>

      {/* Tarifario de despacho */}
      <section className="bg-white border border-outline-variant shadow-sm mt-6 overflow-hidden">
        <div className="p-6 border-b border-outline-variant flex items-center justify-between">
          <h2 className="font-montserrat font-semibold text-xl text-primary uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">local_shipping</span>
            Tarifario de Despacho por Zona
          </h2>
          <button className="flex items-center gap-2 bg-on-tertiary-container text-white px-4 py-2 text-sm font-bold uppercase hover:brightness-110 transition-all rounded">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Agregar Zona
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-surface-low text-on-surface-variant">
                {['Región / Zona', 'Costo Base (MXN)', 'Peso Máx.', 'Lead Time', 'Estado', 'Acciones'].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {zones.map((z, i) => (
                <tr key={z.zone} className={`border-b border-outline-variant ${i % 2 === 1 ? 'bg-surface-low' : ''} hover:bg-surface-container transition-colors`}>
                  <td className="px-6 py-4 text-sm font-bold">{z.zone}</td>
                  <td className="px-6 py-4 text-sm font-medium">{z.base}</td>
                  <td className="px-6 py-4 text-sm">{z.maxWeight}</td>
                  <td className="px-6 py-4 text-sm">{z.lead}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 font-bold rounded text-xs uppercase ${z.active ? 'bg-green-100 text-green-800' : 'bg-surface-container text-on-surface-variant'}`}>
                      {z.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-surface-container text-primary transition-colors" title="Editar">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
