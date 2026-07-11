'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/carrito';
import { computeTotals, formatMXN } from '@/lib/pricing';
import { formatWeight } from '@/lib/weight-calculator';

const UNIT_LABEL: Record<string, string> = {
  metro: 'metro',
  kilo: 'kg',
  pieza: 'pza',
};

export default function CarritoPage() {
  const [mounted, setMounted] = useState(false);
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
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="font-montserrat font-bold text-2xl text-primary-container mb-2">
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
    <div className="max-w-container mx-auto px-10 py-8">
      <h1 className="font-montserrat font-bold text-3xl text-primary-container uppercase tracking-tight mb-8">
        Carrito
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* LISTA DE ITEMS */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId + item.unitType}
              className="bg-white border border-outline-variant rounded-lg p-4 flex gap-4 items-center shadow-sm"
            >
              <div className="w-16 h-16 bg-surface-low rounded-md flex items-center justify-center shrink-0">
                <span className="text-2xl text-on-surface-variant/15">⬡</span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[1px] text-on-surface-variant">
                  SKU: {item.sku}
                </p>
                <h3 className="font-montserrat font-bold text-primary-container leading-tight truncate">
                  {item.name}
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {formatMXN(item.unitPrice)} / {UNIT_LABEL[item.unitType]} ·{' '}
                  {formatWeight(item.weightKg)}
                </p>
              </div>

              {/* Cantidad */}
              <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden">
                <button
                  onClick={() =>
                    updateQty(item.productId, Math.max(0.01, item.qty - 1))
                  }
                  className="px-3 py-2 text-on-surface-variant hover:bg-surface-low transition-colors"
                  aria-label="Disminuir"
                >
                  −
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
                  className="w-16 text-center text-sm font-semibold text-on-surface outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => updateQty(item.productId, item.qty + 1)}
                  className="px-3 py-2 text-on-surface-variant hover:bg-surface-low transition-colors"
                  aria-label="Aumentar"
                >
                  +
                </button>
              </div>

              {/* Subtotal + eliminar */}
              <div className="text-right w-28 shrink-0">
                <p className="font-montserrat font-bold text-on-tertiary-container">
                  {formatMXN(item.subtotal)}
                </p>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-[11px] text-on-surface-variant hover:text-error transition-colors mt-1"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-sm text-primary-container hover:text-on-tertiary-container transition-colors mt-2"
          >
            ← Seguir comprando
          </Link>
        </div>

        {/* RESUMEN */}
        <aside className="lg:sticky lg:top-[92px] lg:self-start">
          <div className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm space-y-4">
            <h2 className="font-montserrat font-bold text-lg text-primary-container uppercase tracking-tight">
              Resumen
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Peso total</span>
                <span className="font-semibold text-on-surface">
                  {formatWeight(totalWeight)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-semibold text-on-surface">
                  {formatMXN(totals.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">IVA (16%)</span>
                <span className="font-semibold text-on-surface">
                  {formatMXN(totals.tax)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Envío</span>
                <span className="text-xs text-on-surface-variant">Por coordinar</span>
              </div>
            </div>

            <hr className="border-outline-variant" />

            <div className="flex justify-between items-baseline">
              <span className="font-bold text-on-surface">Total</span>
              <span className="font-montserrat font-bold text-2xl text-primary-container">
                {formatMXN(totals.total)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="w-full block text-center bg-on-tertiary-container text-white text-sm font-bold uppercase tracking-wide py-3.5 rounded-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Proceder al pago
            </Link>
            <p className="text-[11px] text-on-surface-variant/70 text-center">
              El costo de envío se coordina tras confirmar el pedido.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
