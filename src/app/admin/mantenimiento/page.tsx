import { AdminModuleHeader } from '@/components/admin/module-header';

const stats = [
  { label: 'Unidades Operativas', value: '42', icon: 'check_circle', valueCls: 'text-primary' },
  { label: 'En Mantenimiento', value: '08', icon: 'build', valueCls: 'text-on-tertiary-container' },
  { label: 'Alertas Críticas', value: '03', icon: 'warning', valueCls: 'text-error' },
];

const enMantenimiento = [
  { id: 'TRK-102', modelo: 'Scania R500 V8', tipo: 'Revisión Motor', odometro: '145,280 km', ultimo: '12 Oct 2023', pct: 65, fin: '18 May' },
  { id: 'TRK-215', modelo: 'Volvo FH16', tipo: 'Frenos', odometro: '88,412 km', ultimo: '05 Ene 2024', pct: 20, fin: '22 May' },
  { id: 'TRK-098', modelo: 'Kenworth T680', tipo: 'Hidráulica', odometro: '212,005 km', ultimo: '15 Mar 2024', pct: 85, fin: 'Mañana' },
];

type Unidad = { id: string; estado: 'Operativo' | 'Carga Pesada'; capacidad: string; odometro: string; revision: string };
const operativas: Unidad[] = [
  { id: 'TRK-101', estado: 'Operativo', capacidad: '40 Tons', odometro: '12,400 km', revision: '02 May 2024' },
  { id: 'TRK-332', estado: 'Carga Pesada', capacidad: '65 Tons', odometro: '54,120 km', revision: '12 Abr 2024' },
  { id: 'TRK-005', estado: 'Operativo', capacidad: '30 Tons', odometro: '198,400 km', revision: '28 Abr 2024' },
  { id: 'TRK-404', estado: 'Carga Pesada', capacidad: '80 Tons', odometro: '32,150 km', revision: '10 May 2024' },
];

const proximosRetiros = [
  { id: 'TRK-098', hora: 'Mañana 08:00' },
  { id: 'TRK-551', hora: 'Mañana 14:00' },
];

export default function MantenimientoPage() {
  return (
    <div className="p-4 md:p-10 space-y-10">
      <AdminModuleHeader
        title="Estatus de Flota y Mantenimiento"
        subtitle="Estado operativo, servicios preventivos en curso y próximos retornos al servicio."
        searchPlaceholder="Buscar unidad..."
      />

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-outline-variant shadow-sm p-6 h-32 relative overflow-hidden flex flex-col justify-between group">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider relative z-10">{s.label}</p>
            <h3 className={`font-montserrat font-bold text-[44px] leading-none relative z-10 ${s.valueCls}`}>{s.value}</h3>
            <span className="material-symbols-outlined absolute -bottom-3 -right-3 text-surface-container text-[110px]! group-hover:scale-110 transition-transform">
              {s.icon}
            </span>
          </div>
        ))}
      </section>

      {/* En mantenimiento */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-3 h-8 bg-on-tertiary-container" />
          <h4 className="font-montserrat font-semibold text-xl text-primary">En Mantenimiento</h4>
          <span className="text-sm text-outline ml-1">({enMantenimiento.length} unidades)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enMantenimiento.map((u) => (
            <div key={u.id} className="bg-white border border-outline-variant hover:border-primary transition-all p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4 gap-3">
                <div>
                  <h5 className="font-montserrat font-semibold text-xl text-primary">{u.id}</h5>
                  <p className="font-mono text-[13px] text-on-surface-variant">{u.modelo}</p>
                </div>
                <span className="bg-primary-container/10 text-on-tertiary-container px-3 py-1 text-[11px] font-bold uppercase rounded whitespace-nowrap border border-on-tertiary-container/30">
                  {u.tipo}
                </span>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] text-outline uppercase font-semibold">Odómetro</p>
                    <p className="font-mono text-[13px] text-primary">{u.odometro}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-outline uppercase font-semibold">Último Servicio</p>
                    <p className="font-mono text-[13px] text-primary">{u.ultimo}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-xs font-semibold text-primary">Progreso Reparación</p>
                    <p className="font-mono text-[13px] text-primary">{u.pct}%</p>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-on-tertiary-container h-full" style={{ width: `${u.pct}%` }} />
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                  <div className="flex items-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]! mr-1">calendar_today</span>
                    <span className="text-xs">Finalización: {u.fin}</span>
                  </div>
                  <button className="text-primary text-xs font-semibold underline hover:text-on-tertiary-container">Detalles</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Operativo / carga pesada */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-3 h-8 bg-primary" />
          <h4 className="font-montserrat font-semibold text-xl text-primary">Operativo / Carga Pesada</h4>
          <span className="text-sm text-outline ml-1">({operativas.length} unidades activas)</span>
        </div>
        <div className="bg-white border border-outline-variant overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-primary text-white">
                  {['ID Unidad', 'Estado', 'Capacidad', 'Odómetro', 'Última Revisión', 'Acciones'].map((h) => (
                    <th key={h} className="p-4 text-[11px] font-semibold uppercase tracking-tight border-r border-white/10 last:border-r-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {operativas.map((u, i) => (
                  <tr key={u.id} className={`border-b border-outline-variant/40 hover:bg-surface-container transition-colors ${i % 2 === 1 ? '' : 'bg-surface-low'}`}>
                    <td className="p-4 font-mono text-[13px] text-primary font-bold">{u.id}</td>
                    <td className="p-4">
                      <span className="flex items-center text-sm text-on-surface-variant font-medium">
                        <span className={`w-2 h-2 rounded-full mr-2 ${u.estado === 'Operativo' ? 'bg-green-500' : 'bg-blue-500'}`} />
                        {u.estado}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[13px] text-on-surface-variant">{u.capacidad}</td>
                    <td className="p-4 font-mono text-[13px] text-on-surface-variant">{u.odometro}</td>
                    <td className="p-4 font-mono text-[13px] text-on-surface-variant">{u.revision}</td>
                    <td className="p-4">
                      <button className="text-primary hover:text-on-tertiary-container flex items-center gap-1">
                        <span className="material-symbols-outlined text-[20px]!">monitoring</span>
                        <span className="text-xs font-semibold">Telemetría</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mapa + próximos retiros */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div
          className="lg:col-span-8 bg-white border border-outline-variant p-6 relative h-[360px] overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(rgba(116,119,125,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(116,119,125,0.10) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        >
          <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur p-4 border border-outline-variant shadow-lg">
            <h6 className="font-montserrat font-semibold text-primary text-base">Ubicación Global de Flota</h6>
            <p className="text-xs text-on-surface-variant">Monitoreo GPS en Tiempo Real</p>
          </div>
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 300">
            <polyline points="50,230 130,170 210,200 290,110 350,140" fill="none" stroke="#162839" strokeWidth="2.5" strokeDasharray="7 6" opacity="0.5" />
            <circle cx="130" cy="170" r="6" fill="#f78b30" />
            <circle cx="290" cy="110" r="6" fill="#162839" />
            <circle cx="350" cy="140" r="6" fill="#16a34a" />
          </svg>
          <span className="material-symbols-outlined absolute bottom-4 right-4 text-primary/10 text-[120px]!">map</span>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-primary text-white p-6 h-full flex flex-col justify-between min-h-[360px]">
            <div>
              <h6 className="font-montserrat font-semibold text-xl mb-2 text-on-primary">Próximos Retiros</h6>
              <p className="text-sm text-on-primary-container">
                {proximosRetiros.length} unidades listas para re-incorporarse al servicio en las próximas 24 h.
              </p>
            </div>
            <ul className="space-y-4 my-6">
              {proximosRetiros.map((r) => (
                <li key={r.id} className="flex justify-between items-center bg-white/10 p-3 rounded">
                  <span className="font-mono text-[13px]">{r.id}</span>
                  <span className="text-xs bg-on-tertiary-container px-2 py-0.5 rounded uppercase font-semibold">{r.hora}</span>
                </li>
              ))}
            </ul>
            <button className="w-full border-2 border-white/20 py-2 font-bold uppercase text-sm hover:bg-white hover:text-primary transition-all">
              Ver Calendario
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
