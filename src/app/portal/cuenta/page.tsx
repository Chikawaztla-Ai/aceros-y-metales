'use client';

import { useState } from 'react';

const fieldCls =
  'bg-surface-low border border-outline-variant px-4 py-3 text-sm text-on-surface focus:ring-0 focus:border-primary outline-none transition-all';
const labelCls = 'text-xs font-semibold text-on-surface-variant uppercase tracking-wider';

export default function MiPerfilPage() {
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [savingSecurity, setSavingSecurity] = useState(false);
  const [securitySaved, setSecuritySaved] = useState(false);

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setTimeout(() => {
      setSavingProfile(false);
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2000);
    }, 1000);
  }

  function handleUpdateSecurity(e: React.FormEvent) {
    e.preventDefault();
    setSavingSecurity(true);
    setTimeout(() => {
      setSavingSecurity(false);
      setSecuritySaved(true);
      setTimeout(() => setSecuritySaved(false), 2000);
    }, 1000);
  }

  return (
    <div className="space-y-6">
      <header className="border-b border-outline-variant pb-6">
        <h1 className="font-montserrat font-bold text-[32px] leading-10 text-primary uppercase">Perfil y Datos</h1>
        <p className="text-on-surface-variant mt-2">ID Usuario: AMU-99210</p>
      </header>

      {/* Información personal */}
      <div className="bg-white border border-outline-variant p-8">
        <div className="flex items-center justify-between mb-8 border-b border-outline-variant pb-4">
          <h2 className="font-montserrat font-semibold text-xl text-on-background uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">edit_square</span>
            Información Personal
          </h2>
          <span className="text-xs font-semibold text-primary uppercase">Actualización Requerida</span>
        </div>
        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className={labelCls}>Nombre Completo / Razón Social</label>
            <input type="text" defaultValue="Juan Delgado" className={fieldCls} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelCls}>Correo Electrónico Institucional</label>
            <input type="email" defaultValue="juan.delgado@logistica.mx" className={fieldCls} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelCls}>Teléfono de Contacto Directo</label>
            <input type="tel" defaultValue="+52 (55) 4321-8890" className={fieldCls} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelCls}>RFC (Opcional)</label>
            <input type="text" placeholder="XAXX010101000" className={fieldCls} />
          </div>
          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={savingProfile}
              className="bg-primary text-white text-sm font-semibold px-8 py-3 uppercase tracking-wider hover:bg-primary-container transition-all shadow-sm disabled:opacity-60 flex items-center gap-2"
            >
              {savingProfile && <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>}
              {profileSaved && <span className="material-symbols-outlined text-[18px]">check_circle</span>}
              {savingProfile ? 'Procesando…' : profileSaved ? 'Actualizado' : 'Guardar Cambios de Perfil'}
            </button>
          </div>
        </form>
      </div>

      {/* Seguridad */}
      <div className="bg-primary text-white p-8 border-l-4 border-on-tertiary-container">
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <h2 className="font-montserrat font-semibold text-xl uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">lock_reset</span>
            Gestión de Seguridad
          </h2>
        </div>
        <form onSubmit={handleUpdateSecurity} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-on-primary-container uppercase tracking-wider">
              Contraseña Actual
            </label>
            <input
              type="password"
              className="bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:ring-0 focus:border-on-tertiary-container outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-on-primary-container uppercase tracking-wider">
              Nueva Contraseña
            </label>
            <input
              type="password"
              className="bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:ring-0 focus:border-on-tertiary-container outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-on-primary-container uppercase tracking-wider">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className="bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:ring-0 focus:border-on-tertiary-container outline-none transition-all"
            />
          </div>
          <div className="md:col-span-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
            <p className="text-sm text-on-primary-container max-w-md italic">
              Asegúrese de usar al menos 12 caracteres, incluyendo números y símbolos especiales
              para mayor protección industrial.
            </p>
            <button
              type="submit"
              disabled={savingSecurity}
              className="border-2 border-on-tertiary-container text-on-tertiary-container text-sm font-semibold px-8 py-3 uppercase tracking-wider hover:bg-on-tertiary-container hover:text-white transition-all shrink-0 disabled:opacity-60 flex items-center gap-2"
            >
              {savingSecurity && <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>}
              {securitySaved && <span className="material-symbols-outlined text-[18px]">check_circle</span>}
              {savingSecurity ? 'Procesando…' : securitySaved ? 'Actualizado' : 'Actualizar Credenciales'}
            </button>
          </div>
        </form>
      </div>

      {/* Imágenes de contexto industrial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-64">
        <div className="relative overflow-hidden group border border-outline-variant">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('/images/portal/perfil-materiales.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <p className="text-white text-sm font-semibold uppercase">Materiales de Grado Industrial</p>
          </div>
        </div>
        <div className="relative overflow-hidden group border border-outline-variant">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('/images/portal/perfil-precision.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <p className="text-white text-sm font-semibold uppercase">Procesos de Alta Precisión</p>
          </div>
        </div>
      </div>
    </div>
  );
}
