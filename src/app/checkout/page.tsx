'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/store/carrito';
import { computeTotals, formatMXN } from '@/lib/pricing';

const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
const cpRegex = /^\d{5}$/;
const phoneRegex = /^\+?\d{10,15}$/;

const formSchema = z
  .object({
    contactName: z.string().min(2, 'Nombre requerido').max(200),
    contactPhone: z.string().regex(phoneRegex, 'Teléfono a 10 dígitos'),
    needsCfdi: z.boolean(),
    billingRfc: z.string().optional().or(z.literal('')),
    shippingType: z.enum(['delivery', 'pickup']),
    street: z.string().optional().or(z.literal('')),
    colony: z.string().optional().or(z.literal('')),
    city: z.string().optional().or(z.literal('')),
    state: z.string().optional().or(z.literal('')),
    zip: z.string().optional().or(z.literal('')),
    notes: z.string().max(500).optional().or(z.literal('')),
  })
  .superRefine((v, ctx) => {
    if (v.needsCfdi && !rfcRegex.test(v.billingRfc || '')) {
      ctx.addIssue({ code: 'custom', path: ['billingRfc'], message: 'RFC inválido' });
    }
    if (v.shippingType === 'delivery') {
      if (!v.street || v.street.length < 3)
        ctx.addIssue({ code: 'custom', path: ['street'], message: 'Requerido' });
      if (!v.colony) ctx.addIssue({ code: 'custom', path: ['colony'], message: 'Requerido' });
      if (!v.city) ctx.addIssue({ code: 'custom', path: ['city'], message: 'Requerido' });
      if (!v.state) ctx.addIssue({ code: 'custom', path: ['state'], message: 'Requerido' });
      if (!cpRegex.test(v.zip || ''))
        ctx.addIssue({ code: 'custom', path: ['zip'], message: 'CP a 5 dígitos' });
    }
  });

type FormValues = z.infer<typeof formSchema>;

// Inputs de checkout: esquinas cuadradas (rounded-none) — distintivo stitch
const inputCls =
  'h-12 w-full border border-outline px-4 rounded-none bg-surface text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-0 outline-none';
const labelCls = 'text-[11px] font-semibold text-on-surface-variant uppercase';

// Imágenes conocidas por SKU (mock; en producción viene de la BD)
const SKU_IMAGES: Record<string, string> = {
  '4140-RD-025': '/images/producto/galeria-2.jpg',
  '4140-RD': '/images/home/prod-viga-ipr.jpg',
  'D2-RD': '/images/home/prod-ptr.jpg',
  '6061-PL': '/images/home/prod-placa-aluminio.jpg',
  'BRZ-660': '/images/home/prod-barra-cobre.jpg',
};

function SectionHeader({ num, title }: { num: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="bg-primary text-white w-8 h-8 flex items-center justify-center font-bold font-montserrat text-sm">
        {num}
      </span>
      <h2 className="font-montserrat font-semibold text-xl uppercase tracking-wide text-on-surface">{title}</h2>
    </div>
  );
}

function CheckoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [method, setMethod] = useState<'mercadopago' | 'transferencia'>('mercadopago');
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getTotal());
  const clear = useCartStore((s) => s.clear);
  const totals = computeTotals(subtotal, { shipping: 0 });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { shippingType: 'delivery', needsCfdi: false },
  });

  useEffect(() => {
    setMounted(true);
    if (searchParams.get('error') === 'pago') {
      setApiError('El pago no se completó. Puedes intentar de nuevo.');
    }
  }, [searchParams]);

  const needsCfdi = watch('needsCfdi');
  const shippingType = watch('shippingType');

  if (mounted && items.length === 0) {
    return (
      <div className="max-w-container mx-auto px-4 md:px-10 py-20 text-center min-h-[50vh]">
        <p className="text-lg text-on-surface-variant mb-4">Tu carrito está vacío.</p>
        <Link href="/catalogo" className="text-on-tertiary-container hover:underline">
          Ir al catálogo →
        </Link>
      </div>
    );
  }

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    setApiError(null);

    const payload = {
      items: items.map((i) => ({
        productId: i.productId,
        sku: i.sku,
        name: i.name,
        unitType: i.unitType,
        qty: i.qty,
        unitPrice: i.unitPrice,
        weightKg: i.weightKg,
      })),
      paymentMethod: method,
      shippingType: values.shippingType,
      shippingAddress:
        values.shippingType === 'delivery'
          ? {
              street: values.street!,
              colony: values.colony!,
              city: values.city!,
              state: values.state!,
              zip: values.zip!,
            }
          : undefined,
      contactName: values.contactName,
      contactPhone: values.contactPhone,
      billingRfc: values.billingRfc || '',
      needsCfdi: values.needsCfdi,
      notes: values.notes || undefined,
    };

    try {
      const endpoint =
        method === 'mercadopago' ? '/api/pagos/crear' : '/api/pagos/transferencia';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || 'No se pudo procesar el pedido.');
        setSubmitting(false);
        return;
      }

      if (method === 'mercadopago' && data.init_point) {
        // Redirige a Checkout Pro de Mercado Pago.
        window.location.href = data.init_point;
        return;
      }
      // Transferencia: vaciar carrito e ir a confirmación.
      clear();
      router.push(`/confirmacion?order=${data.orderNumber}`);
    } catch {
      setApiError('Error de conexión. Intenta de nuevo.');
      setSubmitting(false);
    }
  }

  return (
    <main className="max-w-container mx-auto px-4 md:px-10 py-8 md:py-12 min-h-screen relative">
      {/* Decoración de fondo (stitch) */}
      <div className="absolute inset-0 industrial-grid opacity-50 pointer-events-none" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
      >
        {/* IZQUIERDA — formularios (7 cols, stitch) */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-10">
          {/* 1. FACTURACIÓN */}
          <section className="bg-white border border-outline-variant p-8 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <SectionHeader num={1} title="Datos de Facturación" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className={labelCls}>Nombre / Razón Social *</label>
                <input {...register('contactName')} className={inputCls} placeholder="Juan Pérez" />
                {errors.contactName && <p className="text-xs text-error">{errors.contactName.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelCls}>Teléfono *</label>
                <input {...register('contactPhone')} className={inputCls} placeholder="5512345678" />
                {errors.contactPhone && <p className="text-xs text-error">{errors.contactPhone.message}</p>}
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <input
                type="checkbox"
                id="cfdi"
                {...register('needsCfdi')}
                className="w-5 h-5 border-2 border-outline rounded-none text-primary focus:ring-0"
              />
              <label htmlFor="cfdi" className="text-sm text-on-surface cursor-pointer">
                Requiero factura CFDI 4.0
              </label>
            </div>
            {needsCfdi && (
              <div className="mt-4 flex flex-col gap-2 md:w-1/2">
                <label className={labelCls}>RFC *</label>
                <input {...register('billingRfc')} className={inputCls + ' uppercase'} placeholder="XAXX010101000" />
                {errors.billingRfc && <p className="text-xs text-error">{errors.billingRfc.message}</p>}
              </div>
            )}
          </section>

          {/* 2. ENTREGA */}
          <section className="bg-white border border-outline-variant p-8 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <SectionHeader num={2} title="Entrega" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {(
                [
                  { value: 'delivery', icon: 'local_shipping', title: 'Envío a domicilio', desc: 'Entrega urgente 24/48 hrs' },
                  { value: 'pickup', icon: 'factory', title: 'Recoger en sucursal', desc: 'Sin costo de envío' },
                ] as const
              ).map((opt) => (
                <label key={opt.value} className="block cursor-pointer">
                  <input type="radio" value={opt.value} {...register('shippingType')} className="peer sr-only" />
                  <div className="border border-outline-variant p-6 flex items-center gap-4 transition-all peer-checked:border-primary peer-checked:bg-surface-low">
                    <span className="material-symbols-outlined text-primary text-[28px]!">{opt.icon}</span>
                    <div>
                      <p className="font-montserrat font-semibold text-primary text-sm uppercase">{opt.title}</p>
                      <p className="text-sm text-on-surface-variant">{opt.desc}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {shippingType === 'delivery' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className={labelCls}>Calle y número *</label>
                  <input {...register('street')} className={inputCls} />
                  {errors.street && <p className="text-xs text-error">{errors.street.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelCls}>Colonia *</label>
                  <input {...register('colony')} className={inputCls} />
                  {errors.colony && <p className="text-xs text-error">{errors.colony.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelCls}>Ciudad *</label>
                  <input {...register('city')} className={inputCls} />
                  {errors.city && <p className="text-xs text-error">{errors.city.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelCls}>Estado *</label>
                  <input {...register('state')} className={inputCls} />
                  {errors.state && <p className="text-xs text-error">{errors.state.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelCls}>C.P. *</label>
                  <input {...register('zip')} className={inputCls} placeholder="03100" />
                  {errors.zip && <p className="text-xs text-error">{errors.zip.message}</p>}
                </div>
              </div>
            )}
            <div className="mt-6 flex flex-col gap-2">
              <label className={labelCls}>Notas (opcional)</label>
              <textarea
                {...register('notes')}
                rows={2}
                className="border border-outline px-4 py-3 rounded-none bg-surface text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-0 outline-none"
                placeholder="Especificaciones de corte, horario de entrega, etc."
              />
            </div>
          </section>

          {/* 3. MÉTODO DE PAGO */}
          <section className="bg-white border border-outline-variant p-8 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <SectionHeader num={3} title="Método de Pago" />
            <div className="flex flex-col gap-4">
              {(
                [
                  {
                    value: 'mercadopago',
                    icon: 'credit_card',
                    title: 'Mercado Pago',
                    desc: 'Tarjeta de crédito/débito, OXXO o SPEI. Pago inmediato.',
                  },
                  {
                    value: 'transferencia',
                    icon: 'account_balance',
                    title: 'Transferencia Bancaria',
                    desc: 'Te damos la CLABE. Confirmamos al recibir el pago (48 h máx).',
                  },
                ] as const
              ).map((opt) => {
                const active = method === opt.value;
                return (
                  <label key={opt.value} className="block cursor-pointer">
                    <input
                      type="radio"
                      checked={active}
                      onChange={() => setMethod(opt.value)}
                      className="sr-only"
                    />
                    <div
                      className={`border p-6 flex items-center justify-between transition-all ${
                        active ? 'border-primary bg-surface-low' : 'border-outline-variant'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-outline-variant rounded flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-[24px]!">{opt.icon}</span>
                        </div>
                        <div>
                          <p className="font-montserrat font-semibold text-primary text-sm uppercase">{opt.title}</p>
                          <p className="text-sm text-on-surface-variant">{opt.desc}</p>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          active ? 'border-primary' : 'border-outline'
                        }`}
                      >
                        {active && <div className="w-3 h-3 bg-primary rounded-full" />}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        {/* DERECHA — resumen oscuro sticky (5 cols, stitch) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <section className="bg-primary text-white p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined" style={{ fontSize: 128 }}>receipt_long</span>
            </div>
            <h2 className="font-montserrat font-semibold text-xl mb-8 border-b border-white/20 pb-4 uppercase tracking-tighter">
              Resumen del Pedido
            </h2>

            <div className="flex flex-col gap-6 mb-8">
              {mounted &&
                items.map((i) => (
                  <div key={i.productId + i.unitType} className="flex justify-between items-start gap-3">
                    <div className="flex gap-4 min-w-0">
                      <div className="w-16 h-16 bg-white/10 border border-white/20 flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {SKU_IMAGES[i.sku] ? (
                          <div
                            className="w-full h-full bg-cover bg-center opacity-80"
                            style={{ backgroundImage: `url('${SKU_IMAGES[i.sku]}')` }}
                          />
                        ) : (
                          <span className="text-xl text-white/30">⬡</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-montserrat font-semibold text-sm uppercase truncate">{i.name}</p>
                        <p className="text-xs text-on-primary-container">
                          {i.unitType === 'kilo' ? 'Por Kilo' : i.unitType === 'metro' ? 'Por Metro' : 'Por Pieza'} ·
                          Cantidad: {i.qty}
                        </p>
                      </div>
                    </div>
                    <p className="font-montserrat font-semibold text-sm whitespace-nowrap">{formatMXN(i.subtotal)}</p>
                  </div>
                ))}
            </div>

            <div className="space-y-3 border-t border-white/20 pt-6 text-sm">
              <div className="flex justify-between text-on-primary-container">
                <span>Subtotal</span>
                <span>{formatMXN(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-on-primary-container">
                <span>Envío</span>
                <span className="italic">Por coordinar</span>
              </div>
              <div className="flex justify-between text-on-primary-container">
                <span>IVA (16%)</span>
                <span>{formatMXN(totals.tax)}</span>
              </div>
              <div className="flex justify-between font-montserrat text-xl font-bold mt-4 pt-4 border-t border-white/40">
                <span className="uppercase">Total (MXN)</span>
                <span className="text-on-tertiary-container">{formatMXN(totals.total)}</span>
              </div>
            </div>

            {apiError && (
              <p className="mt-6 text-sm text-white bg-error/80 border border-white/20 p-3">{apiError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-10 bg-on-tertiary-container hover:brightness-110 transition-all text-white py-6 font-montserrat font-semibold text-lg uppercase tracking-widest shadow-lg active:scale-95 duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Procesando…' : 'Confirmar Pedido'}
            </button>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 opacity-60">
              <div className="flex flex-col items-center gap-2 text-[10px] uppercase font-bold text-center">
                <span className="material-symbols-outlined text-white text-[24px]!">verified</span>
                <span>Garantía de Calidad</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-[10px] uppercase font-bold text-center">
                <span className="material-symbols-outlined text-white text-[24px]!">bolt</span>
                <span>Entrega Urgente</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-[10px] uppercase font-bold text-center">
                <span className="material-symbols-outlined text-white text-[24px]!">support_agent</span>
                <span>Soporte Técnico</span>
              </div>
            </div>
          </section>
          <p className="mt-4 text-[11px] text-on-surface-variant/70 text-center">
            Al confirmar aceptas los términos y condiciones.
          </p>
        </div>
      </form>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="max-w-container mx-auto px-4 md:px-10 py-16 min-h-[50vh]" />}>
      <CheckoutInner />
    </Suspense>
  );
}
