'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/carrito';
import { computeTotals, formatMXN } from '@/lib/pricing';
import { formatWeight } from '@/lib/weight-calculator';

const UNIT_LABEL: Record<string, string> = {
  metro: 'Por Metro',
  kilo: 'Por Kilo',
  pieza: 'Por Pieza',
};

// Imágenes conocidas por SKU (mock; en producción viene de la BD)
const SKU_IMAGES: Record<string, string> = {
  '4140-RD-025': '/images/producto/galeria-2.jpg',
  '4140-RD': '/images/home/prod-viga-ipr.jpg',
  'D2-RD': '/images/home/prod-ptr.jpg',
  '6061-PL': '/images/home/prod-placa-aluminio.jpg',
  'BRZ-660': '/images/home/prod-barra-cobre.jpg',
};

export default function CarritoPage() {
  const [mounted, setMounted] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountMsg, setDiscountMsg] = useState('');
  useEffect(() => setMounted(true), []);

  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalWeight = useCartStore((s) => s.getTotalWeight());
  const subtotal = useCartStore((s) => s.getTotal());

  const totals = computeTotals(subtotal, { shipping: 0 });

  if (!mounted) {
    return <div className="max-w-container mx-auto px-10 py-16 min-h-[50vh]" />;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-container mx-auto px-10 py-20 text-center min-h-[50vh]">
        <span className="material-symbols-outlined text-[56px] text-on-surface-variant/30 mb-4">
          shopping_cart
        </span>
        <h1 className="font-montserrat font-bold text-2xl text-primary mb-2">
          Tu carrito está vacío
        </h1>
        <p className="text-on-surface-variant mb-6">
          Agrega materiales desde el catálogo para continuar.
        </p>
        <Link
          href="/catalogo"
          className="inline-flex bg-on-tertiary-container text-white text-sm font-bold uppercase tracking-wide px-6 py-3 rounded-lg hover:brightness-110 transition-all"
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-container mx-auto px-10 py-10">
      {/* Breadcrumb (stitch) */}
      <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-on-surface-variant">
        <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-primary font-bold">Carrito de Compras</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* IZQUIERDA — items (8 cols, stitch) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div>
            <h1 className="font-montserrat font-bold text-[32px] leading-10 text-primary mb-1">
              Tu Carrito
            </h1>
            <p className="text-on-surface-variant">
              {items.length} producto{items.length !== 1 ? 's' : ''} ·{' '}
              <span className="font-bold text-primary">{formatWeight(totalWeight)} totales</span>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.productId + item.unitType}
                className="bg-white border border-outline-variant p-4 rounded-lg flex flex-col md:flex-row gap-6 items-center shadow-sm"
              >
                <div className="w-20 h-20 bg-surface-container overflow-hidden rounded shrink-0 flex items-center justify-center">
                  {SKU_IMAGES[item.sku] ? (
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${SKU_IMAGES[item.sku]}')` }}
                    />
                  ) : (
                    <span className="text-2xl text-on-surface-variant/15">⬡</span>
                  )}
                </div>

                <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-4 items-center w-full">
                  {/* Nombre + SKU + unidad */}
                  <div className="md:col-span-5">
                    <p className="text-on-tertiary-container text-[13px] font-medium mb-1">
                      SKU: {item.sku}
                    </p>
                    <h3 className="text-lg text-primary font-bold leading-tight">{item.name}</h3>
                    <div className="mt-1">
                      <span className="inline-block bg-surface-container px-2 py-0.5 rounded text-[11px] font-bold text-secondary uppercase">
                        {UNIT_LABEL[item.unitType]}
                      </span>
                    </div>
                  </div>

                  {/* Cantidad (stitch stepper) */}
                  <div className="md:col-span-3 flex flex-col items-center">
                    <div className="flex items-center border border-outline rounded overflow-hidden h-10 bg-white">
                      <button
                        onClick={() => updateQty(item.productId, Math.max(0.01, item.qty - 1))}
                        className="px-3 h-full hover:bg-surface-container transition-colors text-primary"
                        aria-label="Disminuir"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <input
                        type="number"
                        value={item.qty}
                        min={0.01}
                        step="0.01"
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          if (!Number.isNaN(v) && v > 0) updateQty(item.productId, v);
                        }}
                        className="w-14 border-none text-center font-bold text-primary outline-none focus:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() => updateQty(item.productId, item.qty + 1)}
                        className="px-3 h-full hover:bg-surface-container transition-colors text-primary"
                        aria-label="Aumentar"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                    <p className="mt-1 text-[13px] text-on-surface-variant">{formatWeight(item.weightKg)}</p>
                  </div>

                  {/* Precio */}
                  <div className="md:col-span-3 text-right">
                    <p className="text-primary font-bold text-lg">
                      {formatMXN(item.subtotal)}{' '}
                      <span className="text-xs font-normal text-on-surface-variant">MXN</span>
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {formatMXN(item.unitPrice)} / {item.unitType === 'kilo' ? 'kg' : item.unitType === 'metro' ? 'm' : 'pza'}
                    </p>
                  </div>

                  {/* Eliminar */}
                  <div className="md:col-span-1 flex justify-end">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-outline hover:text-error transition-colors"
                      aria-label="Eliminar"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Código de descuento + seguir comprando (stitch) */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-2 gap-6">
            <div className="w-full md:w-auto">
              <div className="flex">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Código de descuento"
                  className="rounded-l-lg border border-outline-variant border-r-0 md:w-64 h-12 px-4 text-sm outline-none focus:border-primary"
                />
                <button
                  onClick={() =>
                    setDiscountMsg(
                      discountCode.trim()
                        ? 'Código no válido o expirado.'
                        : 'Ingresa un código de descuento.'
                    )
                  }
                  className="bg-primary text-white px-6 rounded-r-lg text-sm font-semibold h-12 hover:opacity-90 transition-all uppercase"
                >
                  Aplicar
                </button>
              </div>
              {discountMsg && <p className="text-xs text-error mt-1">{discountMsg}</p>}
            </div>
            <Link
              href="/catalogo"
              className="flex items-center gap-2 text-primary hover:underline text-sm font-semibold"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Continuar comprando
            </Link>
          </div>
        </div>

        {/* DERECHA — resumen sticky (4 cols, stitch) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-surface-low border border-outline-variant p-6 rounded-lg">
            <h2 className="font-montserrat font-semibold text-xl text-primary mb-6 border-b border-outline-variant pb-4">
              Resumen
            </h2>
            <div className="flex flex-col gap-4 mb-8 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-medium text-primary">{formatMXN(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Peso total</span>
                <span className="font-medium text-primary">{formatWeight(totalWeight)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Envío</span>
                <span className="text-[12px] italic text-on-surface-variant">Calculado en checkout</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">IVA (16%)</span>
                <span className="font-medium text-primary">{formatMXN(totals.tax)}</span>
              </div>
            </div>

            <div className="border-t border-primary pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-montserrat font-semibold text-xl text-primary">TOTAL</span>
                <div className="text-right">
                  <span className="block text-xs text-on-surface-variant">MXN (Incluye IVA)</span>
                  <span className="text-on-tertiary-container font-bold text-3xl">
                    {formatMXN(totals.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="/checkout"
                className="w-full bg-on-tertiary-container text-white text-sm font-bold uppercase py-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Proceder al pago
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                href="/cotizacion"
                className="w-full border-2 border-primary-container text-primary-container text-center text-sm font-bold uppercase py-4 rounded-lg hover:bg-primary hover:border-primary hover:text-white transition-all"
              >
                Solicitar cotización
              </Link>
            </div>

            {/* Íconos de confianza (stitch) */}
            <div className="mt-8 pt-6 border-t border-outline-variant grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center gap-2">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase leading-tight">
                  Seguridad Certificada
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <span className="material-symbols-outlined text-secondary">local_shipping</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase leading-tight">
                  Envío Express
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <span className="material-symbols-outlined text-secondary">description</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase leading-tight">
                  Certificaciones
                </span>
              </div>
            </div>
          </div>

          {/* Ayuda técnica (stitch) */}
          <div className="mt-6 flex flex-col gap-3 p-4 bg-primary text-white rounded-lg">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-tertiary-container">support_agent</span>
              <p className="text-sm font-semibold">¿Necesitas ayuda técnica?</p>
            </div>
            <p className="text-[13px] opacity-80">
              Nuestros ingenieros metalúrgicos están listos para asesorarte en tu selección.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
