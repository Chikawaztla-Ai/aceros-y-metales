import Link from 'next/link';

// IDs de ejemplo que pre-renderizamos (coinciden con la tabla de clientes).
export function generateStaticParams() {
  return ['CLI-0012', 'CLI-0034', 'CLI-0058', 'CLI-0071', 'CLI-0090'].map((id) => ({ id }));
}

const timeline = [
  { icon: 'local_shipping', time: 'Hace 2 días', title: 'Pedido Entregado', detail: 'ORD-88291 · Placa A-36 (12 pzas) · $42,500.00' },
  { icon: 'call', time: 'Hace 5 días', title: 'Llamada Registrada', detail: 'Seguimiento de línea de crédito con Ing. Alarcón.' },
  { icon: 'request_quote', time: 'Hace 1 semana', title: 'Cotización Enviada', detail: 'QT-8892-VANGUARD · Vigas IPR Grade 50' },
];

const documents = [
  'ISO-9001-CERT_2024.pdf',
  'RFC_TAX_DOC_CVA.pdf',
  'CREDIT_CONTRACT_SIGNED.pdf',
];

export default async function ClientePerfil({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="p-10 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-on-surface-variant">
        <Link href="/admin/clientes" className="hover:text-primary flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span> Clientes
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">{id}</span>
      </nav>

      {/* Encabezado */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-outline-variant pb-6">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="font-montserrat font-bold text-[32px] leading-none text-primary">Constructora Vanguardia S.A.</h1>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-bold text-xs uppercase flex items-center gap-1 border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" /> Activo
            </span>
          </div>
          <p className="text-on-surface-variant mt-2">ID de Cuenta: {id}-MEX-01</p>
        </div>
        <div className="flex flex-col lg:items-end gap-1">
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Límite de Crédito Total</p>
          <p className="font-montserrat font-bold text-4xl text-primary leading-none">$250,000.00</p>
        </div>
      </div>

      {/* Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Izquierda: metadatos + finanzas */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-outline-variant p-6 shadow-sm">
            <h3 className="font-montserrat font-semibold text-lg text-primary border-b border-outline-variant pb-3 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">info</span>
              Metadatos del Cliente
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-on-surface-variant uppercase mb-1">Industria</p>
                <p className="text-primary font-semibold">Construcción Civil Pesada</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant uppercase mb-1">Contacto Principal</p>
                <p className="text-primary font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary">person</span>
                  Ing. Ricardo Alarcón
                </p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant uppercase mb-1">Teléfono Directo</p>
                <p className="text-primary font-medium">+52 55 8901 2231</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant uppercase mb-1">Dirección Fiscal</p>
                <p className="text-on-surface-variant leading-relaxed">
                  Av. Paseo de la Reforma 450, Piso 12, Ciudad de México, 06600
                </p>
              </div>
            </div>
          </div>

          {/* Salud financiera */}
          <div className="bg-primary-container text-white p-6 shadow-md border-l-4 border-on-tertiary-container">
            <h3 className="font-montserrat font-semibold text-lg text-on-primary-container mb-6 flex items-center justify-between">
              Salud Financiera
              <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">payments</span>
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs uppercase opacity-70">Uso de Crédito</span>
                  <span className="text-lg font-bold text-on-tertiary-container">62%</span>
                </div>
                <div className="w-full h-3 bg-primary rounded-full overflow-hidden">
                  <div className="h-full bg-on-tertiary-container" style={{ width: '62%' }} />
                </div>
                <div className="flex justify-between mt-2 text-[11px] opacity-60">
                  <span>Usado: $155,000</span>
                  <span>Disp: $95,000</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-[10px] uppercase opacity-50 mb-1">Pendiente</p>
                  <p className="font-bold text-sm">$42,120.00</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase opacity-50 mb-1">Pago Promedio</p>
                  <p className="font-bold text-sm">18 Días</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centro: timeline */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-outline-variant p-8 shadow-sm h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-montserrat font-semibold text-lg text-primary flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px]">history</span>
                Registro de Actividad
              </h3>
              <button className="text-primary hover:underline text-sm font-medium">Ver auditoría completa</button>
            </div>
            <div className="space-y-8 relative before:content-[''] before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/40">
              {timeline.map((t, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 bg-secondary-fixed rounded-full border-4 border-white z-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-primary">{t.icon}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">{t.time}</p>
                  <h4 className="font-bold text-primary">{t.title}</h4>
                  <p className="text-sm text-on-surface-variant mt-1">{t.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Derecha: documentos + proyecto */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-outline-variant p-6 shadow-sm">
            <h3 className="font-montserrat font-semibold text-lg text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">folder</span>
              Documentos
            </h3>
            <div className="space-y-3">
              {documents.map((d) => (
                <div key={d} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error text-[20px]">picture_as_pdf</span>
                  <p className="text-sm font-medium truncate flex-1">{d}</p>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-low border border-outline-variant p-6">
            <h4 className="font-montserrat font-semibold text-sm text-primary mb-2 uppercase tracking-tight">
              Contexto de Proyecto Activo
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Torre corporativa de 22 niveles en construcción. Requiere suministro constante de
              vigas IPR y placa estructural con entregas programadas cada 15 días.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
