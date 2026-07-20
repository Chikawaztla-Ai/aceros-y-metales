'use client';

import { useState } from 'react';

const stats = [
  { label: 'Remisiones Hoy', value: '124', note: '+12% vs ayer', noteCls: 'text-on-tertiary-container', border: 'border-l-on-tertiary-container', valueCls: 'text-primary' },
  { label: 'Tickets de Báscula', value: '89', note: 'Operación Normal', noteCls: 'text-secondary', border: 'border-l-primary', valueCls: 'text-primary' },
  { label: 'Tonelaje Total', value: '3,420', unit: 'tn', icon: 'scale', border: 'border-l-secondary', valueCls: 'text-primary' },
  { label: 'POD Pendientes', value: '12', icon: 'warning', iconCls: 'text-error', border: 'border-l-on-tertiary-container', valueCls: 'text-on-tertiary-container' },
];

type Doc = {
  id: string;
  tipo: string;
  docKind: 'remision' | 'bascula';
  estatus: 'Verificado' | 'Pendiente POD';
  cliente: string;
  fecha: string;
  m1: { label: string; value: string };
  m2: { label: string; value: string };
  action: 'visibility' | 'print';
};

const docs: Doc[] = [
  { id: 'ORD-88210-MX', tipo: 'Remisión de Embarque', docKind: 'remision', estatus: 'Verificado', cliente: 'Constructora Delta S.A.', fecha: '24/10/2023 08:45', m1: { label: 'Peso', value: '28.5 TN' }, m2: { label: 'Grado', value: 'ASTM A36' }, action: 'visibility' },
  { id: 'TKT-004459', tipo: 'Ticket de Báscula', docKind: 'bascula', estatus: 'Pendiente POD', cliente: 'Aceros del Norte', fecha: '24/10/2023 10:12', m1: { label: 'Bruto', value: '42.1 TN' }, m2: { label: 'Tara', value: '14.0 TN' }, action: 'print' },
  { id: 'ORD-88215-MX', tipo: 'Remisión de Embarque', docKind: 'remision', estatus: 'Verificado', cliente: 'Infraestructura Global', fecha: '24/10/2023 11:30', m1: { label: 'Peso', value: '15.2 TN' }, m2: { label: 'Grado', value: 'Grade 60' }, action: 'visibility' },
  { id: 'TKT-004462', tipo: 'Ticket de Báscula', docKind: 'bascula', estatus: 'Verificado', cliente: 'Minera del Oeste', fecha: '24/10/2023 13:45', m1: { label: 'Bruto', value: '39.8 TN' }, m2: { label: 'Tara', value: '14.1 TN' }, action: 'print' },
];

const operaciones = [
  { id: 'ORD-88210-MX', cliente: 'Constructora Delta S.A.', tipo: 'Remisión', icon: 'description', iconCls: 'text-primary', peso: '28.50', estatus: 'Verificado' as const },
  { id: 'TKT-004459', cliente: 'Aceros del Norte', tipo: 'Báscula', icon: 'scale', iconCls: 'text-secondary', peso: '42.10', estatus: 'Pendiente' as const },
  { id: 'ORD-88215-MX', cliente: 'Infraestructura Global', tipo: 'Remisión', icon: 'description', iconCls: 'text-primary', peso: '15.20', estatus: 'Verificado' as const },
];

const filtros = ['Hoy', 'Esta Semana', 'Rango Personalizado'];

function estatusBadge(estatus: string) {
  if (estatus === 'Verificado') return 'bg-green-100 text-green-800';
  return 'bg-amber-100 text-amber-800';
}

export default function PodPage() {
  const [filtro, setFiltro] = useState('Hoy');

  return (
    <div className="p-4 md:p-10 space-y-8">
      <div>
        <h1 className="font-montserrat font-bold text-[32px] leading-10 text-primary">Documentación y Pesajes</h1>
        <p className="text-on-surface-variant mt-1">
          Vault digital de remisiones, tickets de báscula y pruebas de entrega (POD).
        </p>
      </div>

      {/* Filtros */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-surface-low p-1 rounded-lg border border-outline-variant">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 text-sm font-semibold rounded flex items-center gap-2 transition-colors ${
                filtro === f
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {f === 'Rango Personalizado' && (
                <span className="material-symbols-outlined text-[18px]!">calendar_month</span>
              )}
              {f}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-6 py-2 border-2 border-primary text-primary text-sm font-bold uppercase tracking-wider rounded hover:bg-primary hover:text-white transition-all">
          <span className="material-symbols-outlined text-[18px]!">download</span>
          Exportar Reporte
        </button>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className={`bg-white border border-outline-variant border-l-4 ${s.border} rounded-lg shadow-sm p-6`}>
            <p className="text-xs text-outline uppercase mb-1 font-semibold">{s.label}</p>
            <div className="flex justify-between items-end">
              <span className={`font-montserrat font-bold text-[32px] leading-none ${s.valueCls}`}>
                {s.value}
                {s.unit && <span className="text-sm font-normal text-outline"> {s.unit}</span>}
              </span>
              {s.note && <span className={`font-mono text-xs ${s.noteCls}`}>{s.note}</span>}
              {s.icon && (
                <span className={`material-symbols-outlined text-[24px]! ${s.iconCls ?? 'text-on-primary-container'}`}>
                  {s.icon}
                </span>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Grid de documentos */}
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {docs.map((d) => (
          <div key={d.id} className="bg-white border border-outline-variant rounded hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-surface-container">
              <div className="flex justify-between items-start mb-4 gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded ${
                      d.docKind === 'remision' ? 'bg-primary-container text-primary' : 'bg-secondary-container text-secondary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[28px]!">
                      {d.docKind === 'remision' ? 'description' : 'scale'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-montserrat text-sm font-bold text-primary">{d.id}</h3>
                    <p className="text-xs text-outline">{d.tipo}</p>
                  </div>
                </div>
                <span className={`${estatusBadge(d.estatus)} text-[10px] font-bold px-2 py-1 rounded uppercase whitespace-nowrap`}>
                  {d.estatus}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-outline">Cliente:</span>
                  <span className="font-semibold text-on-surface">{d.cliente}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-outline">Fecha:</span>
                  <span className="font-mono text-[13px]">{d.fecha}</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-low p-4 flex justify-between items-center rounded-b">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-[10px] text-outline uppercase">{d.m1.label}</p>
                  <p className="font-mono text-sm font-bold">{d.m1.value}</p>
                </div>
                <div className="h-8 w-px bg-outline-variant" />
                <div className="text-center">
                  <p className="text-[10px] text-outline uppercase">{d.m2.label}</p>
                  <p className="font-mono text-sm font-bold">{d.m2.value}</p>
                </div>
              </div>
              <button className="p-2 text-primary hover:bg-white rounded transition-colors">
                <span className="material-symbols-outlined text-[24px]!">{d.action}</span>
              </button>
            </div>
          </div>
        ))}

        {/* Integridad de datos */}
        <div className="relative bg-primary text-white rounded overflow-hidden min-h-[200px] p-6 flex flex-col justify-between">
          <div>
            <h4 className="font-montserrat font-semibold text-xl">Integridad de Datos</h4>
            <p className="text-sm opacity-80 mt-2">
              Nuestras remisiones digitales están encriptadas y cumplen con los protocolos de seguridad
              industrial ISO 27001.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-on-tertiary-container text-[24px]!">shield</span>
            <span className="text-xs uppercase tracking-widest font-semibold">Protocolo Activo</span>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/5 text-[140px]!">lock</span>
        </div>

        {/* Cargar documentos */}
        <button className="bg-surface-container border-2 border-dashed border-outline-variant rounded flex flex-col items-center justify-center p-8 gap-4 hover:bg-surface-container-high transition-colors group min-h-[200px]">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-outline group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[36px]!">upload_file</span>
          </div>
          <div className="text-center">
            <p className="font-montserrat text-sm font-bold text-on-surface-variant">Cargar Documentos</p>
            <p className="text-xs text-outline mt-1">Arrastra PDFs o fotos de tickets aquí</p>
          </div>
        </button>
      </section>

      {/* Tabla de operaciones recientes */}
      <section className="bg-white border border-outline-variant rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-primary text-white flex justify-between items-center">
          <h3 className="font-montserrat text-sm uppercase tracking-widest font-semibold">
            Detalle de Operaciones Recientes
          </h3>
          <span className="text-xs opacity-70 font-mono">Actualizado: hace 2 min</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-primary text-white text-[11px] uppercase tracking-tight">
                <th className="px-6 py-3 font-semibold">Order ID</th>
                <th className="px-6 py-3 font-semibold">Cliente</th>
                <th className="px-6 py-3 font-semibold">Tipo Doc</th>
                <th className="px-6 py-3 font-semibold text-right">Peso (TN)</th>
                <th className="px-6 py-3 font-semibold">Estatus POD</th>
                <th className="px-6 py-3 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {operaciones.map((o, i) => (
                <tr
                  key={o.id}
                  className={`border-b border-outline-variant hover:bg-surface-low transition-colors ${
                    i % 2 === 1 ? 'bg-surface-low' : ''
                  }`}
                >
                  <td className="px-6 py-4 font-mono text-[13px]">{o.id}</td>
                  <td className="px-6 py-4">{o.cliente}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center">
                      <span className={`material-symbols-outlined text-[18px]! mr-2 ${o.iconCls}`}>{o.icon}</span>
                      {o.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-[13px]">{o.peso}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-[10px] rounded font-bold uppercase ${
                        o.estatus === 'Verificado' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {o.estatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-on-surface-variant hover:text-primary">
                      <span className="material-symbols-outlined text-[20px]!">more_vert</span>
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
