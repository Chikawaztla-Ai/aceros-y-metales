import { AdminModuleHeader } from '@/components/admin/module-header';

const trucks = [
  { id: 'TRK-902', status: 'En Tránsito', driver: 'J. Domínguez', route: 'MTY → Saltillo', eta: 'ETA: 14:30' },
  { id: 'TRK-114', status: 'Cargando', driver: 'R. Salinas', route: 'Planta Norte', eta: 'Salida: 13:00' },
  { id: 'TRK-551', status: 'En Tránsito', driver: 'M. Guerra', route: 'MTY → Apodaca', eta: 'ETA: 15:15' },
  { id: 'TRK-308', status: 'Mantenimiento', driver: '—', route: 'Taller Central', eta: 'Fuera de servicio' },
];

const telemetry = [
  { label: 'Velocidad', value: '82 km/h' },
  { label: 'Combustible', value: '64%' },
  { label: 'Temp. Motor', value: '91 °C' },
  { label: 'Carga', value: '18.2 Ton' },
];

const alerts = [
  { unit: 'TRK-308', issue: 'Frenos Críticos', level: 'error' },
  { unit: 'TRK-122', issue: 'Cambio de Aceite', level: 'warn' },
];

const docs = [
  { name: 'REMISION_9021.pdf', size: '240 KB' },
  { name: 'CARTA_PORTE_902.pdf', size: '180 KB' },
  { name: 'EVIDENCIA_ENTREGA.jpg', size: '1.2 MB' },
];

const bottomStats = [
  { label: 'Volumen Mensual', value: '1,240 Ton', dark: true },
  { label: 'Incidentes de Seguridad', value: '0' },
  { label: 'Consumo Prom. Combustible', value: '3.8 km/L' },
  { label: 'Salud del Sistema', value: '98%', accent: true },
];

function truckBadge(status: string) {
  switch (status) {
    case 'En Tránsito': return 'bg-tertiary-fixed text-on-tertiary-container';
    case 'Cargando': return 'bg-secondary-container text-on-secondary-container';
    case 'Mantenimiento': return 'bg-red-100 text-red-800';
    default: return 'bg-surface-container text-on-surface-variant';
  }
}

export default function AdminLogistica() {
  return (
    <div className="p-10 space-y-6">
      <AdminModuleHeader
        title="Monitoreo de Flota y Logística"
        subtitle="Estatus en vivo de unidades, rutas y protocolo de mantenimiento."
        actions={
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Unidades Activas</p>
              <p className="font-montserrat font-bold text-xl text-primary">08 / 12</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Índice Eficiencia</p>
              <p className="font-montserrat font-bold text-xl text-on-tertiary-container">94%</p>
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Lista de flota */}
        <div className="md:col-span-4 bg-white border border-outline-variant shadow-sm flex flex-col">
          <div className="p-5 border-b border-outline-variant">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Estatus de Flota en Vivo</h3>
          </div>
          <div className="divide-y divide-outline-variant">
            {trucks.map((t) => (
              <div key={t.id} className="p-5 hover:bg-surface-low transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-primary">ID: {t.id}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${truckBadge(t.status)}`}>{t.status}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>{t.route}</span>
                  <span className="text-primary font-bold">{t.eta}</span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-1">Operador: {t.driver}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feed en vivo + telemetría + alertas + docs */}
        <div className="md:col-span-8 space-y-6">
          {/* Mapa / feed */}
          <div className="bg-primary text-white border border-outline shadow-sm overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-widest">Feed en Vivo: TRK-902</h3>
              <span className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> En línea
              </span>
            </div>
            {/* Placeholder de mapa con rejilla */}
            <div className="relative h-48 industrial-grid bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-container text-[64px]!">location_on</span>
              <span className="absolute bottom-3 right-4 text-[11px] text-on-primary-container">MTY → Saltillo · 42 km restantes</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5">
              {telemetry.map((t) => (
                <div key={t.label}>
                  <p className="text-[10px] uppercase tracking-widest text-on-primary-container">{t.label}</p>
                  <p className="text-lg font-bold">{t.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alertas */}
            <div className="bg-white border border-outline-variant p-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[20px]!">warning</span>
                Alertas de Mantenimiento
              </h3>
              <div className="space-y-3">
                {alerts.map((a) => (
                  <div key={a.unit} className="flex items-center justify-between border-b border-outline-variant pb-3 last:border-0 last:pb-0">
                    <p className={`text-sm font-bold ${a.level === 'error' ? 'text-error' : 'text-on-tertiary-container'}`}>
                      {a.unit}: {a.issue}
                    </p>
                    <button className="text-xs font-bold uppercase underline text-on-tertiary-container">Agendar</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentación */}
            <div className="bg-white border border-outline-variant p-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-on-tertiary-container text-[20px]!">description</span>
                Documentación de Entrega
              </h3>
              <div className="space-y-3">
                {docs.map((d) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]!">picture_as_pdf</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold truncate">{d.name}</p>
                      <p className="text-[10px] text-on-surface-variant">{d.size}</p>
                    </div>
                    <button className="text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]!">download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats inferiores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {bottomStats.map((s) => (
          <div
            key={s.label}
            className={`p-6 border shadow-sm ${s.dark ? 'bg-primary border-primary text-white' : 'bg-white border-outline-variant'}`}
          >
            <p className={`text-[10px] font-bold uppercase tracking-widest ${s.dark ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
              {s.label}
            </p>
            <p className={`font-montserrat font-bold text-2xl mt-1 ${s.accent ? 'text-on-tertiary-container' : s.dark ? 'text-white' : 'text-primary'}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
