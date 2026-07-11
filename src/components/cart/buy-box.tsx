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

      {/* CTAs */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={!inStock}
        className="w-full bg-on-tertiary-container text-white text-sm font-bold uppercase tracking-wide py-3.5 rounded-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {added ? 'Agregado ✓' : inStock ? 'Agregar al carrito' : 'Sin stock'}
      </button>
      <Link
        href="/cotizacion"
        className="w-full block text-center border-2 border-primary-container text-primary-container text-sm font-bold uppercase tracking-wide py-3 rounded-lg hover:bg-primary-container hover:text-white transition-all"
      >
        Solicitar Cotización
      </Link>
      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '5215519232398'}?text=Hola, me interesa el ${product.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-[#16a34a] text-white text-sm font-bold py-3 rounded-lg hover:brightness-110 transition-all"
      >
        💬 Consultar disponibilidad
      </a>
    </div>
  );
}
