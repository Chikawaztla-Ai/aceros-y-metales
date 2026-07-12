'use client';

import { useState } from 'react';

interface Address {
  id: string;
  name: string;
  code: string;
  icon: string;
  street: string;
  city: string;
  country: string;
  contact: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    id: '1',
    name: 'Planta de Producción Norte',
    code: 'AMU-7729-N',
    icon: 'factory',
    street: 'Avenida Industrial del Acero #450, Nave 12-B',
    city: 'Parque Industrial Apodaca, N.L. C.P. 66600',
    country: 'México',
    contact: 'Ing. Roberto Garza',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Almacén Central Santa Catarina',
    code: 'AMU-1120-SC',
    icon: 'warehouse',
    street: 'Carretera Saltillo KM 12.5, Interior C',
    city: 'Santa Catarina, N.L. C.P. 66350',
    country: 'México',
    contact: 'Lic. María Elena Sosa',
    isDefault: false,
  },
];

const modalFieldCls =
  'border border-outline-variant bg-white rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none';

export default function MisDireccionesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [modalOpen, setModalOpen] = useState(false);

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') || 'Nueva Dirección');
    const street = String(form.get('street') || '');
    const state = String(form.get('state') || '');
    const contact = String(form.get('contact') || 'Sin asignar');
    setAddresses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        code: `AMU-${Math.floor(1000 + Math.random() * 9000)}`,
        icon: 'location_on',
        street: street || 'Dirección sin especificar',
        city: state,
        country: 'México',
        contact,
        isDefault: false,
      },
    ]);
    setModalOpen(false);
    e.currentTarget.reset();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-montserrat font-bold text-[32px] leading-10 text-primary">Mis Direcciones</h1>
          <p className="text-on-surface-variant mt-2">
            Gestiona tus puntos de entrega para una logística eficiente.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-primary text-white text-sm font-semibold uppercase px-6 py-2.5 rounded-[6px] transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nueva Dirección
        </button>
      </div>

      {/* Grid de direcciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`relative overflow-hidden rounded-xl p-6 flex flex-col gap-4 border transition-all hover:shadow-lg ${
              addr.isDefault ? 'bg-white border-primary-container' : 'bg-surface-low border-outline-variant'
            }`}
          >
            {addr.isDefault && (
              <div className="absolute top-0 right-0 bg-primary-container text-white px-3 py-1 text-[11px] font-semibold rounded-bl-lg">
                Predeterminada
              </div>
            )}
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                  addr.isDefault ? 'bg-primary/10' : 'bg-on-surface-variant/5'
                }`}
              >
                <span className={`material-symbols-outlined ${addr.isDefault ? 'text-primary' : 'text-on-surface-variant'} text-[24px]`}>
                  {addr.icon}
                </span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-on-surface">{addr.name}</h3>
                <p className="text-xs text-on-surface-variant">ID: {addr.code}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-on-surface">{addr.street}</p>
              <p className="text-sm text-on-surface-variant">{addr.city}</p>
              <p className="text-sm text-on-surface-variant">{addr.country}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-outline-variant flex items-center justify-between">
              <span className="text-xs font-medium text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">person</span> {addr.contact}
              </span>
              <div className="flex gap-1">
                <button className="p-1 hover:text-primary transition-colors" aria-label="Editar">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="p-1 hover:text-error transition-colors"
                  aria-label="Eliminar"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Card añadir nueva */}
        <button
          onClick={() => setModalOpen(true)}
          className="group border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all min-h-[220px]"
        >
          <div className="w-16 h-16 rounded-full border-2 border-outline-variant group-hover:border-primary flex items-center justify-center transition-all">
            <span className="material-symbols-outlined text-outline-variant group-hover:text-primary" style={{ fontSize: 24 }}>
              add_location
            </span>
          </div>
          <p className="text-sm font-semibold text-on-surface-variant group-hover:text-primary uppercase tracking-widest">
            Añadir Nueva Dirección
          </p>
        </button>
      </div>

      {/* Banner logístico */}
      <div className="p-6 bg-primary rounded-xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-14 h-14 rounded-full bg-on-tertiary-container flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-white" style={{ fontSize: 32 }}>local_shipping</span>
        </div>
        <div className="flex-grow">
          <h4 className="text-sm font-bold text-on-tertiary-container uppercase mb-1">Optimización Logística</h4>
          <p className="text-sm text-on-primary-container">
            Al guardar tus direcciones industriales exactas, reducimos el tiempo de cotización y
            despacho en un 25%. Asegúrate de incluir referencias específicas de naves y accesos
            de carga.
          </p>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-on-background/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary p-6 flex items-center justify-between">
              <h2 className="font-montserrat font-semibold text-lg text-white">Registrar Nueva Dirección</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white hover:text-on-tertiary-container transition-colors"
                aria-label="Cerrar"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase">Nombre de Dirección</label>
                <input name="name" placeholder="Ej. Planta Fundición" className={modalFieldCls} required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase">Tipo de Punto</label>
                <select name="type" className={modalFieldCls}>
                  <option>Planta / Manufactura</option>
                  <option>Almacén / CEDI</option>
                  <option>Obra en Sitio</option>
                  <option>Oficina Corporativa</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase">
                  Dirección (Calle, Número, Local)
                </label>
                <input name="street" placeholder="Calle Industrial #123" className={modalFieldCls} required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase">Estado</label>
                <input name="state" placeholder="Nuevo León" className={modalFieldCls} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase">Contacto en sitio</label>
                <input name="contact" placeholder="Nombre del responsable" className={modalFieldCls} />
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white text-sm font-semibold uppercase px-6 py-2.5 rounded-[6px] hover:brightness-110 transition-all active:scale-95"
                >
                  Guardar Dirección
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
