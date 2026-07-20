const enTransito = [
  {
    cliente: 'ArcelorMittal Global',
    lugar: 'Planta Monterrey III',
    eta: 'ETA: 14:45',
    etaCls: 'text-on-tertiary-container',
    sub: 'En 45 mins',
    pct: 75,
    barCls: 'bg-primary',
    po: 'PO-45920-X',
    estado: '75% Completado',
  },
  {
    cliente: 'Ternium Mexico',
    lugar: 'Altamira Export',
    eta: 'ETA: 16:20',
    etaCls: 'text-primary',
    sub: 'En 2h 20m',
    pct: 40,
    barCls: 'bg-primary',
    po: 'PO-45921-S',
    estado: '40% Completado',
  },
  {
    cliente: 'Automotriz Norte',
    lugar: 'Saltillo Logistics',
    eta: 'RETRASO',
    etaCls: 'text-error',
    sub: 'ETA: 15:10',
    pct: 90,
    barCls: 'bg-error',
    po: 'PO-45922-A',
    estado: 'Tráfico Intenso',
  },
];

type Driver = {
  initials: string;
  nombre: string;
  unidad: string;
  estado: string;
  estadoCls: string;
  dotCls: string;
  horas: string;
  avatarCls: string;
  dim?: boolean;
};

const drivers: Driver[] = [
  { initials: 'RC', nombre: 'Roberto Cano', unidad: 'Unidad: T-102', estado: 'En Ruta', estadoCls: 'text-green-700', dotCls: 'bg-green-600', horas: '06:45h', avatarCls: 'bg-secondary-container text-primary' },
  { initials: 'MA', nombre: 'Miguel Ángel', unidad: 'Unidad: T-205', estado: 'Descanso', estadoCls: 'text-on-tertiary-container', dotCls: 'bg-on-tertiary-container', horas: '04:12h', avatarCls: 'bg-secondary-fixed text-primary' },
  { initials: 'SP', nombre: 'Sergio Peña', unidad: 'Unidad: T-088', estado: 'Cargando', estadoCls: 'text-green-700', dotCls: 'bg-green-600', horas: '01:30h', avatarCls: 'bg-surface-highest text-primary' },
  { initials: 'LV', nombre: 'Luis Valdés', unidad: 'Turno Finalizado', estado: 'Off-duty', estadoCls: 'text-outline', dotCls: 'bg-outline', horas: '08:00h', avatarCls: 'bg-surface-container text-outline', dim: true },
];

export default function RutasPage() {
  return (
    <div className="flex flex-col lg:h-screen">
      {/* Header del centro de control */}
      <div className="shrink-0 border-b border-outline-variant bg-surface h-auto md:h-16 px-4 md:px-6 py-3 md:py-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="font-montserrat font-bold text-xl md:text-2xl text-primary">Rutas y Operadores</h1>
          <div className="flex items-center gap-2 bg-surface-low px-3 py-1 rounded border border-outline-variant">
            <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse" />
            <span className="font-mono text-[13px] text-on-surface-variant">LIVE: 24 unidades activas</span>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Buscar unidad o ruta..."
            className="bg-white border border-outline-variant rounded-full pl-10 pr-4 py-2 w-64 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]!">
            search
          </span>
        </div>
      </div>

      {/* Mapa + panel lateral */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Mapa */}
        <div
          className="relative flex-1 bg-surface-container overflow-hidden min-h-[380px] lg:min-h-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(116,119,125,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(116,119,125,0.10) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        >
          {/* Ruta decorativa */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 300">
            <polyline
              points="40,250 120,190 210,160 300,90 360,50"
              fill="none"
              stroke="#f78b30"
              strokeWidth="3"
              strokeDasharray="9 7"
            />
            <circle cx="40" cy="250" r="6" fill="#162839" />
            <circle cx="360" cy="50" r="7" fill="#f78b30" />
          </svg>

          {/* Overlay: clima */}
          <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-card border border-outline-variant max-w-xs">
            <p className="text-sm font-semibold text-primary mb-2">Clima en Ruta</p>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-tertiary-container text-[24px]!">sunny</span>
                <span className="text-xl font-bold">28°C</span>
              </div>
              <span className="text-xs text-on-surface-variant">Viento: 12 km/h NE</span>
            </div>
          </div>

          {/* Tooltip flotante de unidad */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="bg-primary text-white p-4 rounded-lg shadow-xl relative animate-bounce">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-on-tertiary-container text-[20px]!">local_shipping</span>
                <span className="font-bold text-sm">UNIT-882</span>
              </div>
              <p className="text-[10px] uppercase opacity-70">Destino: Planta Altamira</p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45" />
            </div>
          </div>

          {/* Controles de mapa */}
          <div className="absolute bottom-6 left-6 z-10 flex gap-2">
            <button className="bg-white p-2 shadow-card rounded hover:bg-surface-highest transition-colors border border-outline-variant">
              <span className="material-symbols-outlined text-[20px]!">add</span>
            </button>
            <button className="bg-white p-2 shadow-card rounded hover:bg-surface-highest transition-colors border border-outline-variant">
              <span className="material-symbols-outlined text-[20px]!">remove</span>
            </button>
            <button className="bg-white px-4 py-2 shadow-card rounded text-sm font-semibold hover:bg-surface-highest transition-colors border border-outline-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]!">layers</span>
              Capas de Mapa
            </button>
          </div>
        </div>

        {/* Panel lateral derecho */}
        <aside className="w-full lg:w-96 shrink-0 border-t lg:border-t-0 lg:border-l border-outline-variant bg-surface flex flex-col lg:min-h-0">
          {/* En tránsito */}
          <div className="lg:h-1/2 flex flex-col lg:overflow-hidden border-b border-outline-variant">
            <div className="p-5 bg-surface-low flex items-center justify-between shrink-0">
              <h3 className="font-montserrat text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]!">conversion_path</span>
                En Tránsito
              </h3>
              <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">08</span>
            </div>
            <div className="flex-grow lg:overflow-y-auto p-4 space-y-3">
              {enTransito.map((t) => (
                <div
                  key={t.po}
                  className="bg-white border border-outline-variant p-4 rounded hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <div>
                      <p className="font-bold text-primary group-hover:text-on-tertiary-container transition-colors">
                        {t.cliente}
                      </p>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]!">location_on</span>
                        {t.lugar}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-mono font-bold block ${t.etaCls}`}>{t.eta}</span>
                      <span className="text-[9px] text-outline">{t.sub}</span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden mb-2">
                    <div className={`${t.barCls} h-full`} style={{ width: `${t.pct}%` }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono bg-surface-container px-2 py-0.5 rounded">{t.po}</span>
                    <span className="text-[10px] font-bold text-on-surface-variant">{t.estado}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estado de operadores */}
          <div className="lg:h-1/2 flex flex-col lg:overflow-hidden">
            <div className="p-5 bg-surface-low flex items-center justify-between shrink-0">
              <h3 className="font-montserrat text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]!">badge</span>
                Estado de Operadores
              </h3>
              <button className="text-primary hover:text-on-tertiary-container">
                <span className="material-symbols-outlined text-[20px]!">settings</span>
              </button>
            </div>
            <div className="flex-grow lg:overflow-y-auto">
              <table className="w-full text-left">
                <thead className="bg-primary text-white text-[10px] uppercase font-bold">
                  <tr>
                    <th className="px-4 py-2">Operador</th>
                    <th className="px-4 py-2">Estado</th>
                    <th className="px-4 py-2">Horas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {drivers.map((d) => (
                    <tr key={d.initials} className="hover:bg-surface-container transition-colors">
                      <td className="px-4 py-4">
                        <div className={`flex items-center gap-3 ${d.dim ? 'opacity-50' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${d.avatarCls}`}>
                            {d.initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{d.nombre}</p>
                            <p className="text-[10px] text-on-surface-variant">{d.unidad}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-bold ${d.estadoCls}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${d.dotCls}`} />
                          {d.estado}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs font-mono">{d.horas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
