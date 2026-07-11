// ============================================================
// Edge Function: cancel-expired-transfers
// acerosymetalesurgentes.com
//
// Cancela órdenes con status 'pending_transfer' cuyo expires_at ya
// pasó (timeout de 48h). Notifica al cliente por correo.
//
// Programar con cron cada hora (Supabase Dashboard → Edge Functions →
// Schedules, o pg_cron):
//   select cron.schedule(
//     'cancel-expired-transfers', '0 * * * *',
//     $$ select net.http_post(
//          url := 'https://<PROJECT>.supabase.co/functions/v1/cancel-expired-transfers',
//          headers := jsonb_build_object('Authorization','Bearer '||'<SERVICE_ROLE_KEY>')
//        ) $$
//   );
// ============================================================

import { createClient } from 'jsr:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const EMAIL_FROM =
  Deno.env.get('EMAIL_FROM') ||
  'Aceros y Metales Urgentes <pedidos@acerosymetalesurgentes.com>';
const SITE_URL = Deno.env.get('SITE_URL') || 'https://acerosymetalesurgentes.com';

interface ExpiredOrder {
  id: string;
  order_number: string;
  contact_email: string | null;
  billing_name: string | null;
}

async function sendCancelEmail(order: ExpiredOrder) {
  if (!RESEND_API_KEY || !order.contact_email) return;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h1 style="font-size:20px;color:#191c1e;">Pedido cancelado</h1>
      <p style="color:#43474c;font-size:14px;">Hola ${order.billing_name ?? 'cliente'}, tu pedido
      <strong>${order.order_number}</strong> se canceló porque no recibimos el pago dentro de
      las 48 horas. Si aún lo necesitas, puedes volver a realizarlo cuando gustes.</p>
      <a href="${SITE_URL}/catalogo" style="display:inline-block;background:#f78b30;color:#fff;
      font-weight:bold;font-size:13px;text-decoration:none;padding:12px 24px;border-radius:6px;">
      Volver al catálogo</a>
    </div>`;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: order.contact_email,
        subject: `Pedido ${order.order_number} cancelado`,
        html,
      }),
    });
  } catch (err) {
    console.error('email error', order.order_number, err);
  }
}

Deno.serve(async () => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const nowIso = new Date().toISOString();

  const { data: expired, error } = await supabase
    .from('orders')
    .select('id, order_number, contact_email, billing_name')
    .eq('status', 'pending_transfer')
    .lt('expires_at', nowIso)
    .returns<ExpiredOrder[]>();

  if (error) {
    console.error('query error', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let cancelled = 0;
  for (const order of expired ?? []) {
    const { error: updErr } = await supabase
      .from('orders')
      .update({
        status: 'cancelled',
        cancelled_reason: 'Transferencia no recibida en 48h',
      })
      .eq('id', order.id)
      .eq('status', 'pending_transfer'); // evita carreras con la confirmación admin
    if (!updErr) {
      cancelled++;
      await sendCancelEmail(order);
    }
  }

  return new Response(JSON.stringify({ cancelled, checked: expired?.length ?? 0 }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
