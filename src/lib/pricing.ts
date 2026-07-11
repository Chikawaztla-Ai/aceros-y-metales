// ============================================================
// Pricing — acerosymetalesurgentes.com
// Regla de negocio: los precios del catálogo son SIN IVA.
// El IVA (16%) se suma en el checkout sobre el subtotal gravable.
// ============================================================

export const IVA_RATE = 0.16;

/** Redondeo a 2 decimales sin errores de punto flotante. */
export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
}

/**
 * Calcula los totales de una orden.
 * @param subtotal Suma de subtotales de línea (sin IVA).
 * @param opts descuento (monto) y envío (monto).
 */
export function computeTotals(
  subtotal: number,
  opts: { discount?: number; shipping?: number } = {}
): OrderTotals {
  const discount = round2(opts.discount ?? 0);
  const shipping = round2(opts.shipping ?? 0);
  const taxable = Math.max(0, round2(subtotal - discount));
  const tax = round2(taxable * IVA_RATE);
  const total = round2(taxable + tax + shipping);
  return { subtotal: round2(subtotal), discount, tax, shipping, total };
}

const mxn = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
});

/** Formatea un monto en pesos mexicanos: 1234.5 → "$1,234.50". */
export function formatMXN(n: number): string {
  return mxn.format(n ?? 0);
}
