'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const phoneRegex = /^\+?[\d\s()-]{10,20}$/;

const formSchema = z.object({
  fullName: z.string().min(2, 'Nombre requerido').max(200),
  company: z.string().min(2, 'Empresa requerida').max(200),
  phone: z.string().regex(phoneRegex, 'Teléfono válido a 10 dígitos'),
  email: z.string().email('Correo inválido'),
  material: z.string().min(1, 'Selecciona un material'),
  quantity: z.string().min(1, 'Indica la cantidad'),
  measurements: z.string().min(1, 'Indica las medidas'),
  notes: z.string().max(1000).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

const materials = [
  'Acero Inoxidable (304, 316)',
  'Acero al Carbón / Estructural',
  'Acero Herramienta (D2, H13, O1)',
  'Aluminio Estructural (6061, 7075)',
  'Metales No Ferrosos (Bronce, Cobre, Latón)',
  'Placas de Grado Industrial',
  'Otro / No estoy seguro',
];

const benefits = [
  {
    icon: 'payments',
    title: 'Líneas de Crédito',
    desc: 'Esquemas de financiamiento a 30, 60 y 90 días para proyectos industriales a gran escala.',
  },
  {
    icon: 'percent',
    title: 'Descuentos por Volumen',
    desc: 'Precios preferenciales y escalonados según el tonelaje o volumen de compra mensual.',
  },
  {
    icon: 'support_agent',
    title: 'Ejecutivo Dedicado',
    desc: 'Gestión personalizada para seguimiento de pedidos y asesoría técnica especializada.',
  },
];

const specRows = [
  { material: 'Acero Inoxidable', grade: '304', hardness: '123 HB', use: 'Alimenticio / Farmacéutico', psi: '75,000' },
  { material: 'Acero al Carbón', grade: 'A36', hardness: '112-140 HB', use: 'Construcción Estructural', psi: '58,000 - 80,000' },
  { material: 'Aluminio', grade: '6061-T6', hardness: '95 HB', use: 'Aeroespacial / Marino', psi: '45,000' },
  { material: 'Bronce', grade: 'SAE 64', hardness: '75-85 HB', use: 'Bujes y Chumaceras', psi: '35,000' },
];

const inputCls =
  'h-12 w-full border border-outline px-4 rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none';
const labelCls = 'text-sm font-semibold text-primary';

export default function CotizacionPage() {
  const [fileName, setFileName] = useState('');
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  async function onSubmit(values: FormValues) {
    // TODO: cablear a /api/cotizacion (Resend) cuando exista el endpoint.
    // Por ahora simula el envío para no perder el lead en el front.
    await new Promise((r) => setTimeout(r, 600));
    console.info('Cotización solicitada:', values);
    setSent(true);
    reset();
    setFileName('');
  }

  return (
    <main className="relative">
      {/* Fondo punteado industrial (stitch) */}
      <div className="absolute inset-0 industrial-grid -z-10 pointer-events-none" />

      {/* Hero */}
      <section className="max-w-container mx-auto px-10 pt-16 pb-8">
        <h1 className="font-montserrat font-bold text-4xl md:text-[48px] md:leading-[56px] tracking-[-0.02em] text-primary mb-4">
          Solicita tu Cotización Industrial
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl mb-4">
          Recibe una propuesta técnica detallada en menos de 2 horas. Nuestra infraestructura
          logística garantiza disponibilidad inmediata para los sectores más exigentes.
        </p>
      </section>

      {/* Grid principal */}
      <section className="max-w-container mx-auto px-10 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* IZQUIERDA — formulario (7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 border border-outline-variant shadow-sm rounded-lg">
          {sent ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-[56px] text-green-600 mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <h2 className="font-montserrat font-bold text-2xl text-primary mb-2">¡Solicitud enviada!</h2>
              <p className="text-on-surface-variant mb-6">
                Un ejecutivo revisará tu requerimiento y te contactará en menos de 2 horas hábiles.
              </p>
              <button
                onClick={() => setSent(false)}
                className="inline-flex bg-on-tertiary-container text-white text-sm font-bold uppercase tracking-wide px-6 py-3 rounded-lg hover:brightness-110 transition-all"
              >
                Enviar otra cotización
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className={labelCls}>Nombre Completo</label>
                <input {...register('fullName')} className={inputCls} placeholder="Ej. Juan Pérez" />
                {errors.fullName && <p className="text-xs text-error">{errors.fullName.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelCls}>Empresa</label>
                <input {...register('company')} className={inputCls} placeholder="Nombre de la compañía" />
                {errors.company && <p className="text-xs text-error">{errors.company.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelCls}>Teléfono</label>
                <input {...register('phone')} className={inputCls} placeholder="+52 ..." />
                {errors.phone && <p className="text-xs text-error">{errors.phone.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelCls}>Correo Electrónico</label>
                <input {...register('email')} className={inputCls} placeholder="correo@empresa.com" />
                {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className={labelCls}>Material Requerido</label>
                <select {...register('material')} className={inputCls + ' bg-white appearance-none'} defaultValue="">
                  <option value="" disabled>Selecciona un material…</option>
                  {materials.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                {errors.material && <p className="text-xs text-error">{errors.material.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelCls}>Cantidad</label>
                <input {...register('quantity')} className={inputCls} placeholder="Ej. 50 piezas o 2 toneladas" />
                {errors.quantity && <p className="text-xs text-error">{errors.quantity.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelCls}>Medidas (Espesor, Diámetro, Largo)</label>
                <input {...register('measurements')} className={inputCls} placeholder={`Ej. 1/2" x 20ft`} />
                {errors.measurements && <p className="text-xs text-error">{errors.measurements.message}</p>}
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className={labelCls}>Notas adicionales (opcional)</label>
                <textarea
                  {...register('notes')}
                  rows={2}
                  className="border border-outline px-4 py-3 rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Tolerancias, tratamiento térmico, plazo de entrega, etc."
                />
              </div>

              {/* Adjuntar plano (stitch) */}
              <div className="md:col-span-2 mt-2">
                <label className="text-sm font-semibold text-primary block mb-2">Adjuntar plano PDF o DWG</label>
                <label className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center bg-surface-low hover:bg-surface-high transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-4xl text-secondary mb-2 group-hover:scale-110 transition-transform">
                    upload_file
                  </span>
                  <p className="text-sm text-on-surface-variant">
                    {fileName || 'Arrastra tus archivos aquí o haz clic para buscar'}
                  </p>
                  <p className="text-xs text-outline mt-1">Máximo 25MB. Formatos: PDF, DWG, DXF, JPG.</p>
                  <input
                    type="file"
                    accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
                  />
                </label>
              </div>

              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-on-tertiary-container text-white py-4 px-8 rounded-lg font-montserrat font-semibold text-base uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando…' : 'Enviar Solicitud de Cotización'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* DERECHA — beneficios + confianza (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6">
            <h3 className="font-montserrat font-semibold text-2xl text-primary mb-2">Beneficios Corporativos</h3>
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex gap-6 p-6 border border-outline-variant bg-white rounded-lg hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 bg-secondary-container flex items-center justify-center rounded-xl text-primary shrink-0">
                  <span className="material-symbols-outlined text-3xl">{b.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">{b.title}</h4>
                  <p className="text-on-surface-variant">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sellos de confianza */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-outline uppercase tracking-widest mb-6">
              Certificaciones y Confianza
            </h3>
            <div className="grid grid-cols-3 gap-8">
              {[
                { icon: 'verified', label: 'ISO 9001:2015' },
                { icon: 'workspace_premium', label: 'ASTM Standard' },
                { icon: 'bolt', label: 'Entrega 24h' },
              ].map((seal) => (
                <div key={seal.label} className="flex flex-col items-center gap-2 text-center">
                  <span className="material-symbols-outlined text-4xl text-secondary">{seal.icon}</span>
                  <span className="text-xs text-on-surface-variant">{seal.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen logística */}
          <div className="relative rounded-lg overflow-hidden h-64 mt-4 group">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/images/home/almacen-cotizacion.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
              <p className="text-white font-bold text-2xl leading-tight">Stock permanente con envío inmediato.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla de especificaciones (stitch) */}
      <section className="bg-surface-low py-20 border-y border-outline-variant">
        <div className="max-w-container mx-auto px-10">
          <div className="mb-12">
            <h2 className="font-montserrat font-bold text-[32px] leading-10 text-primary">
              Tabla de Especificaciones Técnicas
            </h2>
            <p className="text-on-surface-variant mt-2">Consulta las propiedades más comunes antes de cotizar.</p>
          </div>
          <div className="overflow-x-auto border border-outline-variant rounded-lg">
            <table className="w-full text-left border-collapse bg-white min-w-[720px]">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="p-6 font-semibold border-r border-white/10">Material</th>
                  <th className="p-6 font-semibold border-r border-white/10">Grado</th>
                  <th className="p-6 font-semibold border-r border-white/10">Dureza (Brinell)</th>
                  <th className="p-6 font-semibold border-r border-white/10">Aplicación</th>
                  <th className="p-6 font-semibold">Resistencia (PSI)</th>
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => (
                  <tr
                    key={row.material}
                    className={`${i % 2 === 1 ? 'bg-surface-low' : ''} hover:bg-surface-container transition-colors ${
                      i < specRows.length - 1 ? 'border-b border-outline-variant' : ''
                    }`}
                  >
                    <td className="p-6 border-r border-outline-variant font-medium">{row.material}</td>
                    <td className="p-6 border-r border-outline-variant text-sm font-medium">{row.grade}</td>
                    <td className="p-6 border-r border-outline-variant">{row.hardness}</td>
                    <td className="p-6 border-r border-outline-variant">{row.use}</td>
                    <td className="p-6">{row.psi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
