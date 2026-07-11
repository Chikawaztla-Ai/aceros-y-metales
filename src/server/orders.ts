// ============================================================
// Order builder (servidor) — acerosymetalesurgentes.com
// Crea la orden de forma autoritativa: re-cotiza contra la BD,
// verifica stock, calcula totales (IVA/envío) e inserta la orden
// + sus items usando el service role. Usado por /api/pagos/crear
// y /api/pagos/transferencia.
// ============================================================

import { createAdminClient } from '@/lib/supabase/server';
import { computeTotals, round2, type OrderTotals } from '@/lib/pricing';
import type { CheckoutPayload } from '@/lib/validations';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const TRANSFER_TTL_HOURS = 48;

export class CheckoutError extends Error {
  constructor(
    message: string,
    public status: number = 400
  ) {
    super(message);
    this.name = 'CheckoutError';
  }
}

export interface CustomerContext {
  userId: string;
  email: string;
  fullName: string;
}

export interface BuiltOrder {
  id: string;
  orderNumber: string;
  status: string;
  totals: OrderTotals;
  items: {
    productId: string;
    sku: string;
    name: string;
    unitType: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  contactEmail: string;
  contactName: string;
  expiresAt: string | null;
}

type AdminClient = ReturnType<typeof createAdminClient>;

async function ensureCustomer(admin: AdminClient, ctx: CustomerContext) {
  const { data: existing } = await admin
    .from('customers')
    .select('id, email, full_name, phone')
    .eq('user_id', ctx.userId)
    .maybeSingle();
  if (existing) return existing;

  const { data: created, error } = await admin
    .from('customers')
    .insert({
      user_id: ctx.userId,
      full_name: ctx.fullName || ctx.email,
      email: ctx.email,
    })
    .select('id, email, full_name, phone')
    .single();
  if (error) throw new CheckoutError('No se pudo crear el cliente', 500);
  return created;
}

/**
 * Construye e inserta una orden. NO cobra ni envía emails — eso lo hace
 * cada API route según el método de pago.
 */
export async function buildOrder(
  payload: CheckoutPayload,
  ctx: CustomerContext
): Promise<BuiltOrder> {
  const admin = createAdminClient();
  const customer = await ensureCustomer(admin, ctx);

  // --- Re-cotizar contra la BD (fuente de verdad) ---
  const uuidIds = payload.items
    .map((i) => i.productId)
    .filter((id) => UUID_RE.test(id));

  const dbMap = new Map<
    string,
    { id: string; sku: string; name: string; base_price: number; stock_qty: number }
  >();
  if (uuidIds.length) {
    const { data: dbProducts } = await admin
      .from('products')
      .select('id, sku, name, base_price, stock_qty')
      .in('id', uuidIds);
    for (const p of dbProducts ?? []) dbMap.set(p.id, p);
  }

  const items = payload.items.map((line) => {
    const db = dbMap.get(line.productId);
    // Con producto en BD: precio/nombre/sku autoritativos + verificación de stock.
    // Sin producto en BD (catálogo mock): se usa la línea del cliente (puente dev).
    if (db) {
      if (db.stock_qty < line.qty) {
        throw new CheckoutError(
          `Sin stock suficiente de ${db.name} (disponible: ${db.stock_qty})`,
          409
        );
      }
      const unitPrice = Number(db.base_price);
      return {
        productId: db.id,
        sku: db.sku,
        name: db.name,
        unitType: line.unitType,
        quantity: line.qty,
        unitPrice,
        weightKg: line.weightKg,
        subtotal: round2(unitPrice * line.qty),
      };
    }
    return {
      productId: line.productId,
      sku: line.sku,
      name: line.name,
      unitType: line.unitType,
      quantity: line.qty,
      unitPrice: line.unitPrice,
      weightKg: line.weightKg,
      subtotal: round2(line.unitPrice * line.qty),
    };
  });

  const subtotal = round2(items.reduce((s, i) => s + i.subtotal, 0));
  const totals = computeTotals(subtotal, { shipping: 0 });

  const isTransfer = payload.paymentMethod === 'transferencia';
  const expiresAt = isTransfer
    ? new Date(Date.now() + TRANSFER_TTL_HOURS * 3600_000).toISOString()
    : null;

  // --- Insertar orden ---
  const { data: order, error: orderErr } = await admin
    .from('orders')
    .insert({
      customer_id: customer.id,
      status: isTransfer ? 'pending_transfer' : 'pending',
      payment_method: payload.paymentMethod,
      subtotal: totals.subtotal,
      discount: totals.discount,
      tax: totals.tax,
      shipping: totals.shipping,
      total: totals.total,
      shipping_type: payload.shippingType,
      shipping_address:
        payload.shippingType === 'delivery' ? payload.shippingAddress ?? null : null,
      billing_name: payload.contactName,
      billing_rfc: payload.billingRfc || null,
      needs_cfdi: payload.needsCfdi,
      contact_email: customer.email,
      contact_phone: payload.contactPhone,
      notes: payload.notes || null,
      expires_at: expiresAt,
    })
    .select('id, order_number, status')
    .single();

  if (orderErr || !order) {
    throw new CheckoutError('No se pudo crear la orden', 500);
  }

  // --- Insertar items ---
  const { error: itemsErr } = await admin.from('order_items').insert(
    items.map((i) => ({
      order_id: order.id,
      product_id: UUID_RE.test(i.productId) ? i.productId : null,
      sku: i.sku,
      name: i.name,
      unit_type: i.unitType,
      quantity: i.quantity,
      unit_price: i.unitPrice,
      weight_kg: i.weightKg,
      subtotal: i.subtotal,
    }))
  );
  if (itemsErr) {
    // Revertir la orden huérfana.
    await admin.from('orders').delete().eq('id', order.id);
    throw new CheckoutError('No se pudieron guardar los items', 500);
  }

  return {
    id: order.id,
    orderNumber: order.order_number,
    status: order.status,
    totals,
    items: items.map((i) => ({
      productId: i.productId,
      sku: i.sku,
      name: i.name,
      unitType: i.unitType,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      subtotal: i.subtotal,
    })),
    contactEmail: customer.email,
    contactName: payload.contactName,
    expiresAt,
  };
}

/**
 * Descuenta el stock de una orden (al confirmarse el pago).
 * Idempotencia ligera: sólo descuenta líneas con product_id real.
 */
export async function decrementStockForOrder(orderId: string) {
  const admin = createAdminClient();
  const { data: items } = await admin
    .from('order_items')
    .select('product_id, quantity')
    .eq('order_id', orderId);
  for (const it of items ?? []) {
    if (it.product_id) {
      await admin.rpc('adjust_stock', {
        p_product_id: it.product_id,
        p_delta: -Number(it.quantity),
      });
    }
  }
}
