// ============================================================
// Email (Resend) — acerosymetalesurgentes.com
// Envío de correos transaccionales del flujo de compra.
// Si RESEND_API_KEY no está configurado, se registra y no falla
// (un email caído nunca debe tumbar el flujo de pago).
// ============================================================

import { Resend } from 'resend';
import type { BankDetails } from './bank';
import { formatMXN } from './pricing';

const FROM = process.env.EMAIL_FROM || 'Aceros y Metales Urgentes <pedidos@acerosymetalesurgentes.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ventas@acerosymetalesurgentes.com';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://acerosymetalesurgentes.com';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

async function send(to: string | string[], subject: string, html: string) {
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY ausente — email "${subject}" no enviado a ${to}`);
    return;
  }
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
  } catch (err) {
    console.error(`[email] fallo al enviar "${subject}"`, err);
  }
}

// ---------- Datos que comparten las plantillas ----------
export interface OrderEmailData {
  orderNumber: string;
  contactName: string;
  contactEmail: string;
  items: { name: string; quantity: number; unitType: string; subtotal: number }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// ---------- Layout base ----------
function layout(inner: string): string {
  return `
  <div style="background:#f2f4f6;padding:32px 0;font-family:Arial,Helvetica,sans-serif;color:#191c1e;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #c4c6cd;border-radius:8px;overflow:hidden;">
      <div style="background:#2c3e50;padding:20px 28px;">
        <span style="color:#ffffff;font-weight:bold;font-size:16px;">ACEROS <span style="color:#f78b30;">Y</span> METALES</span>
        <span style="color:#96a9be;font-size:10px;letter-spacing:3px;display:block;">URGENTES</span>
      </div>
      <div style="padding:28px;">${inner}</div>
      <div style="background:#f2f4f6;padding:16px 28px;border-top:1px solid #c4c6cd;">
        <a href="${SITE}" style="color:#43474c;font-size:12px;text-decoration:none;">acerosymetalesurgentes.com</a>
      </div>
    </div>
  </div>`;
}

function itemsTable(data: OrderEmailData): string {
  const rows = data.items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #eceef0;font-size:13px;">${i.name}<br><span style="color:#74777d;font-size:11px;">${i.quantity} × ${i.unitType}</span></td>
        <td style="padding:8px 0;border-bottom:1px solid #eceef0;font-size:13px;text-align:right;white-space:nowrap;">${formatMXN(i.subtotal)}</td>
      </tr>`
    )
    .join('');
  return `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <tbody>${rows}</tbody>
      <tfoot>
        <tr><td style="padding-top:12px;font-size:13px;color:#43474c;">Subtotal</td><td style="padding-top:12px;font-size:13px;text-align:right;">${formatMXN(data.subtotal)}</td></tr>
        <tr><td style="font-size:13px;color:#43474c;">IVA (16%)</td><td style="font-size:13px;text-align:right;">${formatMXN(data.tax)}</td></tr>
        <tr><td style="font-size:13px;color:#43474c;">Envío</td><td style="font-size:13px;text-align:right;">${data.shipping > 0 ? formatMXN(data.shipping) : 'Por coordinar'}</td></tr>
        <tr><td style="padding-top:8px;font-size:15px;font-weight:bold;">Total</td><td style="padding-top:8px;font-size:15px;font-weight:bold;text-align:right;color:#2c3e50;">${formatMXN(data.total)}</td></tr>
      </tfoot>
    </table>`;
}

// ---------- 1) Confirmación de pago ----------
export async function sendOrderConfirmation(data: OrderEmailData) {
  const html = layout(`
    <h1 style="font-size:20px;margin:0 0 8px;">¡Pago confirmado! ✅</h1>
    <p style="color:#43474c;font-size:14px;margin:0 0 4px;">Hola ${data.contactName}, recibimos tu pago.</p>
    <p style="color:#43474c;font-size:14px;margin:0 0 16px;">Pedido <strong>${data.orderNumber}</strong> — lo estamos preparando.</p>
    ${itemsTable(data)}
    <a href="${SITE}/portal/pedidos" style="display:inline-block;background:#f78b30;color:#fff;font-weight:bold;font-size:13px;text-decoration:none;padding:12px 24px;border-radius:6px;margin-top:8px;">Ver mi pedido</a>
  `);
  await send(data.contactEmail, `Pago confirmado — Pedido ${data.orderNumber}`, html);
}

// ---------- 2) Instrucciones de transferencia (cliente) ----------
export async function sendTransferInstructions(
  data: OrderEmailData,
  bank: BankDetails
) {
  const html = layout(`
    <h1 style="font-size:20px;margin:0 0 8px;">Pedido registrado 🧾</h1>
    <p style="color:#43474c;font-size:14px;margin:0 0 16px;">Hola ${data.contactName}, tu pedido <strong>${data.orderNumber}</strong> quedó registrado. Realiza la transferencia dentro de las próximas <strong>48 horas</strong> para confirmarlo.</p>
    <div style="background:#f2f4f6;border:1px solid #c4c6cd;border-radius:8px;padding:16px 20px;margin-bottom:16px;">
      <p style="margin:0 0 6px;font-size:13px;"><span style="color:#74777d;">Banco:</span> <strong>${bank.bank}</strong></p>
      <p style="margin:0 0 6px;font-size:13px;"><span style="color:#74777d;">Beneficiario:</span> <strong>${bank.beneficiary}</strong></p>
      <p style="margin:0 0 6px;font-size:13px;"><span style="color:#74777d;">CLABE:</span> <strong>${bank.clabe}</strong></p>
      <p style="margin:0 0 6px;font-size:13px;"><span style="color:#74777d;">Cuenta:</span> <strong>${bank.account}</strong></p>
      <p style="margin:0;font-size:13px;"><span style="color:#74777d;">Referencia:</span> <strong>${data.orderNumber}</strong></p>
    </div>
    ${itemsTable(data)}
    <p style="color:#74777d;font-size:12px;">Envía tu comprobante por WhatsApp para agilizar la confirmación. Tu pedido se cancela automáticamente si no recibimos el pago en 48 horas.</p>
  `);
  await send(data.contactEmail, `Datos para transferencia — Pedido ${data.orderNumber}`, html);
}

// ---------- 3) Aviso al admin de pedido nuevo ----------
export async function sendAdminNewOrder(
  data: OrderEmailData,
  method: 'mercadopago' | 'transferencia'
) {
  const label = method === 'transferencia' ? 'PENDIENTE DE TRANSFERENCIA' : 'PAGADO (Mercado Pago)';
  const html = layout(`
    <h1 style="font-size:18px;margin:0 0 8px;">Nuevo pedido — ${data.orderNumber}</h1>
    <p style="color:#43474c;font-size:14px;margin:0 0 4px;">Estado: <strong>${label}</strong></p>
    <p style="color:#43474c;font-size:14px;margin:0 0 16px;">Cliente: ${data.contactName} · ${data.contactEmail}</p>
    ${itemsTable(data)}
    <a href="${SITE}/admin/pedidos" style="display:inline-block;background:#2c3e50;color:#fff;font-weight:bold;font-size:13px;text-decoration:none;padding:12px 24px;border-radius:6px;margin-top:8px;">Ir al panel</a>
  `);
  await send(ADMIN_EMAIL, `Nuevo pedido ${data.orderNumber} — ${label}`, html);
}

// ---------- 4) Pedido cancelado por falta de pago ----------
export async function sendOrderCancelled(data: {
  orderNumber: string;
  contactName: string;
  contactEmail: string;
}) {
  const html = layout(`
    <h1 style="font-size:20px;margin:0 0 8px;">Pedido cancelado</h1>
    <p style="color:#43474c;font-size:14px;margin:0 0 16px;">Hola ${data.contactName}, tu pedido <strong>${data.orderNumber}</strong> se canceló porque no recibimos el pago dentro de las 48 horas. Si aún lo necesitas, puedes volver a realizarlo cuando gustes.</p>
    <a href="${SITE}/catalogo" style="display:inline-block;background:#f78b30;color:#fff;font-weight:bold;font-size:13px;text-decoration:none;padding:12px 24px;border-radius:6px;">Volver al catálogo</a>
  `);
  await send(data.contactEmail, `Pedido ${data.orderNumber} cancelado`, html);
}
