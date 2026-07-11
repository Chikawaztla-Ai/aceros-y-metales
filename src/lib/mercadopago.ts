// ============================================================
// Mercado Pago — acerosymetalesurgentes.com
// Integración vía REST (Checkout Pro) sin SDK, para mantener
// el bundle liviano y el flujo transparente.
// Docs: https://www.mercadopago.com.mx/developers
// ============================================================

import crypto from 'crypto';

const MP_API = 'https://api.mercadopago.com';

function accessToken(): string {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) throw new Error('MP_ACCESS_TOKEN no configurado');
  return token;
}

export interface MpPreferenceItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id?: string;
}

export interface CreatePreferenceParams {
  orderId: string;
  orderNumber: string;
  items: MpPreferenceItem[];
  payer?: { name?: string; email?: string };
  backUrls: { success: string; failure: string; pending: string };
  notificationUrl: string;
}

export interface MpPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

/**
 * Crea una preferencia de Checkout Pro. El total de MP se arma con los
 * items (unit_price ya incluye el prorrateo de IVA/envío; ver crearPreferenceItems).
 */
export async function createPreference(
  params: CreatePreferenceParams
): Promise<MpPreference> {
  const body = {
    items: params.items.map((i) => ({
      ...i,
      currency_id: i.currency_id ?? 'MXN',
    })),
    payer: params.payer,
    external_reference: params.orderId,
    back_urls: params.backUrls,
    auto_return: 'approved',
    notification_url: params.notificationUrl,
    statement_descriptor: 'ACEROSURGENTES',
    metadata: { order_number: params.orderNumber },
  };

  const res = await fetch(`${MP_API}/checkout/preferences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken()}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`MP preference error ${res.status}: ${detail}`);
  }
  return res.json();
}

/** Consulta un pago por id (usado por el webhook para conocer su estado). */
export async function getPayment(paymentId: string): Promise<{
  id: number;
  status: string;
  external_reference: string | null;
  transaction_amount: number;
}> {
  const res = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken()}` },
  });
  if (!res.ok) {
    throw new Error(`MP getPayment error ${res.status}`);
  }
  return res.json();
}

/**
 * Verifica la firma HMAC del webhook de Mercado Pago.
 * Header x-signature: "ts=<ts>,v1=<hash>"; header x-request-id.
 * Manifest: id:<dataId>;request-id:<xRequestId>;ts:<ts>;
 */
export function verifyWebhookSignature(opts: {
  xSignature: string | null;
  xRequestId: string | null;
  dataId: string | null;
}): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) {
    // Sin secret configurado no podemos validar → rechazar por seguridad.
    console.error('[MP webhook] MP_WEBHOOK_SECRET no configurado');
    return false;
  }
  if (!opts.xSignature || !opts.dataId) return false;

  const parts = Object.fromEntries(
    opts.xSignature.split(',').map((kv) => {
      const [k, v] = kv.split('=');
      return [k?.trim(), v?.trim()];
    })
  );
  const ts = parts['ts'];
  const v1 = parts['v1'];
  if (!ts || !v1) return false;

  const manifest = `id:${opts.dataId};request-id:${opts.xRequestId ?? ''};ts:${ts};`;
  const computed = crypto
    .createHmac('sha256', secret)
    .update(manifest)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(computed, 'hex'),
      Buffer.from(v1, 'hex')
    );
  } catch {
    return false;
  }
}
