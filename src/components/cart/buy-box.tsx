'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore, type CartItem } from '@/store/carrito';
import { formatMXN } from '@/lib/pricing';

export interface BuyBoxProduct {
  id: string;
  sku: string;
  name: string;
  price: number;
  unitTypes?: CartItem['unitType'][];
  inStock?: boolean;
}

const UNIT_TABS: { value: CartItem['unitType']; label: string; short: string }[] = [
  { value: 'metro', label: 'Por Metro', short: 'm' },
  { value: 'kilo', label: 'Por Kilo', short: 'kg' },
  { value: 'pieza', label: 'Por Pieza', short: 'pza' },
];

export function BuyBox({ product }: { product: BuyBoxProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const available = product.unitTypes?.length
    ? UNIT_TABS.filter((t) => product.unitTypes!.includes(t.value))
    : UNIT_TABS;

  const [unitType, setUnitType] = useState<CartItem['unitType']>(available[0].value);
  const [qty, setQty] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const subtotal = product.price * (qty || 0);
  const inStock = product.inStock ?? true;

  function handleAdd() {
    if (!qty || qty <= 0) return;
    addItem({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      unitType,
      qty,
      unitPrice: product.price,
      // Cuando se compra por kilo, la cantidad ES el peso; en otros casos
      // el peso fino se refina con la calculadora / cotización.
      weightKg: unitType === 'kilo' ? qty : 0,
      subtotal,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="space-y-5">
      {/* Selector de unidad */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[2px] text-on-surface-variant mb-2">
          Unidad de compra
        </p>
        <div className="flex bg-surface-low p-1 rounded-lg">
          {available.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setUnitType(tab.value)}
              className={`flex-1 text-xs font-semibold py-2 rounded-md transition-all ${
                unitType === tab.value
                  ? 'bg-white shadow-sm text-primary-container border-b-2 border-primary-container'
                  : 'text-on-surface-variant hover:text-primary-container'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cantidad */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[2px] text-on-surface-variant mb-2">
          Cantidad ({UNIT_TABS.find((t) => t.value === unitType)?.short})
        </p>
        <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden w-fit">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2.5 text-on-surface-variant hover:bg-surface-low transition-colors"
            aria-label="Disminuir"
          >
            −
          </button>
          <input
            type="number"
            value={qty}
            min={1}
            step="0.01"
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setQty(Number.isNaN(v) ? 1 : v);
            }}
            className="w-20 text-center text-sm font-semibold text-on-surface outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="px-4 py-2.5 text-on-surface-variant hover:bg-surface-low transition-colors"
            aria-label="Aumentar"
          >
            +
          </button>
        </div>
      </div>

      {/* Precio */}
      <div>
        <p className="text-xs text-on-surface-variant">Subtotal (sin IVA):</p>
        <div className="flex items-baseline gap-2">
          <span className="font-montserrat font-bold text-2xl text-on-tertiary-container">
            {formatMXN(subtotal)}
          </span>
          <span className="text-sm text-on-surface-variant">
            {formatMXN(product.price)}/{UNIT_TABS.find((t) => t.value === unitType)?.short}
          </span>
        </div>
      </div>

      {/* CTAs (stitch) */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={!inStock}
        className="w-full bg-on-tertiary-container text-white text-sm font-bold uppercase tracking-wide py-4 rounded-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
        {added ? 'Agregado ✓' : inStock ? 'Agregar al carrito' : 'Sin stock'}
      </button>
      <Link
        href="/cotizacion"
        className="w-full block text-center bg-primary-container text-white text-sm font-bold uppercase tracking-wide py-3 rounded-lg hover:brightness-110 active:scale-95 transition-all"
      >
        Solicitar Cotización
      </Link>
      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '5215519232398'}?text=Hola, me interesa el ${product.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white text-sm font-bold uppercase py-3 rounded-lg hover:brightness-105 active:scale-95 transition-all"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.941-.708-1.793 0-.852.449-1.271.608-1.445.159-.175.348-.218.463-.218.116 0 .232.001.334.005.109.004.254-.041.398.305.144.346.491 1.197.535 1.285.044.088.072.19.014.305-.058.116-.087.188-.174.289-.087.101-.183.227-.261.306-.096.096-.197.201-.085.392.112.19.498.822 1.069 1.33.733.652 1.352.854 1.54.945.188.093.303.078.418-.036.116-.133.188-.224.318-.174.13.051.825.39.968.462.144.072.241.108.276.17.036.062.036.357-.108.762zM12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.657 1.443 5.166L2 22l5.013-1.316A9.952 9.952 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
        Venta por WhatsApp
      </a>
    </div>
  );
}
