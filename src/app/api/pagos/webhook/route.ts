import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { getPayment, verifyWebhookSignature } from '@/lib/mercadopago';
import { decrementStockForOrder } from '@/server/orders';
import { sendOrderConfirmation, sendAdminNewOrder, type OrderEmailData } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const url = req.nextUrl;
  // data.id llega por query (?data.id=) o en el body { data: { id } }
  const dataIdQuery = url.searchParams.get('data.id') || url.searchParams.get('id');

  let body: { type?: string; action?: string; data?: { id?: string } } = {};
  try {
    body = await req.json();
  } catch {
    /* MP a veces manda body vacío en pings */
  }
  const dataId = dataIdQuery || body?.data?.id || null;
  const type = body?.type || url.searchParams.get('type') || url.searchParams.get('topic');

  // 1) Verificar firma
  const valid = verifyWebhookSignature({
    xSignature: req.headers.get('x-signature'),
    xRequestId: req.headers.get('x-request-id'),
    dataId,
  });
  if (!valid) {
    console.warn('[MP webhook] firma inválida', { dataId });
    return NextResponse.json({ error: 'firma inválida' }, { status: 401 });
  }

  // Sólo procesamos notificaciones de pago
  if (type && type !== 'payment') {
    return NextResponse.json({ ok: true, ignored: type });
  }
  if (!dataId) return NextResponse.json({ ok: true });

  try {
    const payment = await getPayment(dataId);
    if (payment.status !== 'approved' || !payment.external_reference) {
      return NextResponse.json({ ok: true, status: payment.status });
    }

    const admin = createAdminClient();
    const { data: order } = await admin
      .from('orders')
      .select('id, order_number, status, contact_email, billing_name, subtotal, tax, shipping, total')
      .eq('id', payment.external_reference)
      .maybeSingle();

    if (!order) return NextResponse.json({ ok: true, msg: 'orden no encontrada' });

    // Idempotencia: si ya está pagada, no repetir stock/emails.
    if (order.status === 'paid') {
      return NextResponse.json({ ok: true, msg: 'ya pagada' });
    }

    await admin
      .from('orders')
      .update({
        status: 'paid',
        paid_at: new Date().toISOString(),
        mp_payment_id: String(payment.id),
      })
      .eq('id', order.id);

    await decrementStockForOrder(order.id);

    // Email de confirmación + aviso admin
    const { data: items } = await admin
      .from('order_items')
      .select('name, quantity, unit_type, subtotal')
      .eq('order_id', order.id);

    const emailData: OrderEmailData = {
      orderNumber: order.order_number,
      contactName: order.billing_name || 'Cliente',
      contactEmail: order.contact_email || '',
      items: (items ?? []).map((i) => ({
        name: i.name,
        quantity: Number(i.quantity),
        unitType: i.unit_type,
        subtotal: Number(i.subtotal),
      })),
      subtotal: Number(order.subtotal),
      tax: Number(order.tax),
      shipping: Number(order.shipping),
      total: Number(order.total),
    };
    if (emailData.contactEmail) await sendOrderConfirmation(emailData);
    await sendAdminNewOrder(emailData, 'mercadopago');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[MP webhook]', err);
    // 200 para evitar reintentos infinitos ante errores no recuperables,
    // pero registramos para reconciliación manual.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
