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

const inputCls =
  'w-full bg-white border border-outline-variant rounded-md py-2.5 px-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-primary-container outline-none';

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
      <div className="max-w-container mx-auto px-10 py-20 text-center min-h-[50vh]">
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
    <div className="max-w-container mx-auto px-10 py-8">
      <h1 className="font-montserrat font-bold text-3xl text-primary-container uppercase tracking-tight mb-8">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8"
      >
        <div className="space-y-6">
          {/* SECCIÓN 1 — Facturación */}
          <section className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm">
            <h2 className="font-montserrat font-bold text-lg text-primary-container mb-4">
              <span className="text-on-tertiary-container">1.</span> Datos de facturación
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Nombre / Razón social *
                </label>
                <input {...register('contactName')} className={inputCls} placeholder="Aceros del Norte S.A." />
                {errors.contactName && <p className="text-xs text-error mt-1">{errors.contactName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Teléfono *
                </label>
                <input {...register('contactPhone')} className={inputCls} placeholder="5512345678" />
                {errors.contactPhone && <p className="text-xs text-error mt-1">{errors.contactPhone.message}</p>}
              </div>
            </div>
            <label className="flex items-center gap-2 mt-4 cursor-pointer">
              <input type="checkbox" {...register('needsCfdi')} className="w-4 h-4 rounded border-outline-variant text-primary-container" />
              <span className="text-sm text-on-surface-variant">Requiero factura CFDI</span>
            </label>
            {needsCfdi && (
              <div className="mt-3">
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">RFC *</label>
                <input {...register('billingRfc')} className={inputCls + ' uppercase'} placeholder="XAXX010101000" />
                {errors.billingRfc && <p className="text-xs text-error mt-1">{errors.billingRfc.message}</p>}
              </div>
            )}
          </section>

          {/* SECCIÓN 2 — Envío */}
          <section className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm">
            <h2 className="font-montserrat font-bold text-lg text-primary-container mb-4">
              <span className="text-on-tertiary-container">2.</span> Entrega
            </h2>
            <div className="flex gap-3 mb-4">
              {(['delivery', 'pickup'] as const).map((t) => (
                <label
                  key={t}
                  className={`flex-1 border rounded-lg p-3 cursor-pointer text-sm font-semibold text-center transition-all ${
                    shippingType === t
                      ? 'border-primary-container bg-primary-container/5 text-primary-container'
                      : 'border-outline-variant text-on-surface-variant'
                  }`}
                >
                  <input type="radio" value={t} {...register('shippingType')} className="sr-only" />
                  {t === 'delivery' ? '🚚 Envío a domicilio' : '🏭 Recoger en sucursal'}
                </label>
              ))}
            </div>

            {shippingType === 'delivery' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">Calle y número *</label>
                  <input {...register('street')} className={inputCls} />
                  {errors.street && <p className="text-xs text-error mt-1">{errors.street.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">Colonia *</label>
                  <input {...register('colony')} className={inputCls} />
                  {errors.colony && <p className="text-xs text-error mt-1">{errors.colony.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">Ciudad *</label>
                  <input {...register('city')} className={inputCls} />
                  {errors.city && <p className="text-xs text-error mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">Estado *</label>
                  <input {...register('state')} className={inputCls} />
                  {errors.state && <p className="text-xs text-error mt-1">{errors.state.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">C.P. *</label>
                  <input {...register('zip')} className={inputCls} placeholder="03100" />
                  {errors.zip && <p className="text-xs text-error mt-1">{errors.zip.message}</p>}
                </div>
              </div>
            )}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">Notas (opcional)</label>
              <textarea {...register('notes')} rows={2} className={inputCls} placeholder="Especificaciones de corte, horario de entrega, etc." />
            </div>
          </section>

          {/* SECCIÓN 3 — Pago */}
          <section className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm">
            <h2 className="font-montserrat font-bold text-lg text-primary-container mb-4">
              <span className="text-on-tertiary-container">3.</span> Método de pago
            </h2>
            <div className="space-y-3">
              <label
                className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-all ${
                  method === 'mercadopago' ? 'border-primary-container bg-primary-container/5' : 'border-outline-variant'
                }`}
              >
                <input type="radio" checked={method === 'mercadopago'} onChange={() => setMethod('mercadopago')} className="mt-1" />
                <div>
                  <p className="font-semibold text-sm text-on-surface">Mercado Pago</p>
                  <p className="text-xs text-on-surface-variant">Tarjeta de crédito/débito, OXXO o SPEI. Pago inmediato.</p>
                </div>
              </label>
              <label
                className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-all ${
                  method === 'transferencia' ? 'border-primary-container bg-primary-container/5' : 'border-outline-variant'
                }`}
              >
                <input type="radio" checked={method === 'transferencia'} onChange={() => setMethod('transferencia')} className="mt-1" />
                <div>
                  <p className="font-semibold text-sm text-on-surface">Transferencia bancaria</p>
                  <p className="text-xs text-on-surface-variant">Te damos la CLABE. Confirmamos al recibir el pago (48 h máx).</p>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* RESUMEN + CTA */}
        <aside className="lg:sticky lg:top-[92px] lg:self-start">
          <div className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm space-y-4">
            <h2 className="font-montserrat font-bold text-lg text-primary-container uppercase tracking-tight">
              Tu pedido
            </h2>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {mounted &&
                items.map((i) => (
                  <div key={i.productId + i.unitType} className="flex justify-between text-sm">
                    <span className="text-on-surface-variant truncate pr-2">
                      {i.qty} × {i.name}
                    </span>
                    <span className="font-semibold text-on-surface whitespace-nowrap">
                      {formatMXN(i.subtotal)}
                    </span>
                  </div>
                ))}
            </div>
            <hr className="border-outline-variant" />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-semibold">{formatMXN(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">IVA (16%)</span>
                <span className="font-semibold">{formatMXN(totals.tax)}</span>
              </div>
            </div>
            <hr className="border-outline-variant" />
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-on-surface">Total</span>
              <span className="font-montserrat font-bold text-2xl text-primary-container">
                {formatMXN(totals.total)}
              </span>
            </div>

            {apiError && (
              <p className="text-sm text-error bg-error/5 border border-error/20 rounded-md p-3">
                {apiError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-on-tertiary-container text-white text-sm font-bold uppercase tracking-wide py-3.5 rounded-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting
                ? 'Procesando…'
                : method === 'mercadopago'
                  ? `Pagar ${formatMXN(totals.total)}`
                  : `Confirmar pedido — ${formatMXN(totals.total)}`}
            </button>
            <p className="text-[11px] text-on-surface-variant/70 text-center">
              Al confirmar aceptas los términos y condiciones.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="max-w-container mx-auto px-10 py-16 min-h-[50vh]" />}>
      <CheckoutInner />
    </Suspense>
  );
}
