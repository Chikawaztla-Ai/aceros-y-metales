import type { ReactNode } from 'react';

interface AdminModuleHeaderProps {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  /** Botón(es) de acción a la derecha. */
  actions?: ReactNode;
}

/** Encabezado consistente para las pantallas del panel admin (stitch). */
export function AdminModuleHeader({ title, subtitle, searchPlaceholder, actions }: AdminModuleHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
      <div>
        <h1 className="font-montserrat font-bold text-[32px] leading-10 text-primary">{title}</h1>
        {subtitle && <p className="text-on-surface-variant mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        {searchPlaceholder && (
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-outline-variant rounded bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">search</span>
          </div>
        )}
        {actions}
      </div>
    </div>
  );
}

/** Tarjeta de KPI simple (borde + sombra industrial). */
export function AdminStat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-white border border-outline-variant p-6 shadow-sm">
      <p className="text-[11px] font-semibold uppercase text-secondary mb-1">{label}</p>
      <h3 className={`font-montserrat font-bold text-[32px] leading-none ${accent ? 'text-on-tertiary-container' : 'text-primary'}`}>
        {value}
      </h3>
    </div>
  );
}

/** Botón "Exportar" outline reutilizable. */
export function AdminExportButton() {
  return (
    <button className="flex items-center gap-2 border-2 border-primary text-primary px-4 py-2 text-sm font-bold uppercase transition-all hover:bg-primary hover:text-white">
      <span className="material-symbols-outlined text-[20px]">download</span>
      Exportar
    </button>
  );
}
