import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/server';
import { getBankDetails } from '@/lib/bank';
import { formatMXN } from '@/lib/pricing';

export const dynamic = 'force-dynamic';

interface OrderRow {
  id: string;
  order_number: string;
  status: string;
  payment_method: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  billing_name: string | null;
  expires_at: string | null;
}

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderNumber } = await searchParams;

  if (!orderNumber) {
    return <Fallback />;
  }

  const admin = createAdminClient();
  const { data: order } = await admin
    .from('orders')
    .select(
      'id, order_number, status, payment_method, subtotal, tax, shipping, total, billing_name, expires_at'
    )
    .eq('order_number', orderNumber)
    .maybeSingle<OrderRow>();

  if (!order) return <Fallback />;

  const { data: items } = await admin
    .from('order_items')
    .select('name, quantity, unit_type, subtotal')
    .eq('order_id', order.id);

  const isTransfer = order.payment_method === 'transferencia';
  const isPaid = order.status === 'paid';
  const isPendingTransfer = order.status === 'pending_transfer';
  const bank = getBankDetails();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Encabezado según estado */}
      {isPaid ? (
        <Hero icon="✅" title="¡Pago confirmado!" subtitle={`Pedido ${order.order_number}`} />
      ) : isPendingTransfer ? (
        <Hero
          icon="🧾"
          title="Pedido registrado"
          subtitle={`Realiza tu transferencia para confirmar el pedido ${order.order_number}`}
        />
      ) : (
        <Hero
          icon="⏳"
          title="Estamos confirmando tu pago"
          subtitle={`Pedido ${order.order_number}. Te avisaremos por correo en cuanto se acredite.`}
        />
      )}

      {/* Datos bancarios (transferencia pendiente) */}
      {isTransfer && isPendingTransfer && (
        <div className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm mt-8">
          <h2 className="font-montserrat font-bold text-lg text-primary-container mb-4">
            Datos para tu transferencia
          </h2>
          <dl className="space-y-2.5 text-sm">
            <Row k="Banco" v={bank.bank} />
            <Row k="Beneficiario" v={bank.beneficiary} />
            <Row k="CLABE" v={bank.clabe} mono />
            <Row k="Cuenta" v={bank.account} mono />
            <Row k="Referencia" v={order.order_number} mono />
            <Row k="Monto exacto" v={formatMXN(order.total)} strong />
          </dl>
          <div className="mt-4 bg-[rgba(227,179,65,0.08)] border border-[rgba(227,179,65,0.3)] rounded-md p-3">
            <p className="text-xs text-on-surface-variant">
              ⏱️ Tienes <strong>48 horas</strong> para realizar el pago. Envía tu comprobante
              por WhatsApp para agilizar la confirmación. Si no recibimos el pago, el pedido
              se cancela automáticamente.
            </p>
          </div>
        </div>
      )}

      {/* Resumen del pedido */}
      <div className="bg-white border border-outline-variant rounded-lg p-6 shadow-sm mt-6">
        <h2 className="font-montserrat font-bold text-lg text-primary-container mb-4">
          Resumen del pedido
        </h2>
        <div className="space-y-2">
          {(items ?? []).map((i, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-on-surface-variant">
                {Number(i.quantity)} × {i.name}{' '}
                <span className="text-on-surface-variant/60">({i.unit_type})</span>
              </span>
              <span className="font-semibold text-on-surface whitespace-nowrap">
                {formatMXN(Number(i.subtotal))}
              </span>
            </div>
          ))}
        </div>
        <hr className="border-outline-variant my-4" />
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Subtotal</span>
            <span>{formatMXN(Number(order.subtotal))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">IVA (16%)</span>
            <span>{formatMXN(Number(order.tax))}</span>
          </div>
          <div className="flex justify-between items-baseline pt-2">
            <span className="font-bold text-on-surface">Total</span>
            <span className="font-montserrat font-bold text-xl text-primary-container">
              {formatMXN(Number(order.total))}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <Link
          href="/portal/pedidos"
          className="flex-1 text-center bg-on-tertiary-container text-white text-sm font-bold uppercase tracking-wide py-3 rounded-lg hover:brightness-110 transition-all"
        >
          Ver mi pedido
        </Link>
        <Link
          href="/catalogo"
          className="flex-1 text-center border-2 border-primary-container text-primary-container text-sm font-bold uppercase tracking-wide py-3 rounded-lg hover:bg-primary-container hover:text-white transition-all"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}

function Hero({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <p className="text-5xl mb-3">{icon}</p>
      <h1 className="font-montserrat font-bold text-2xl text-primary-container">{title}</h1>
      <p className="text-on-surface-variant mt-1">{subtitle}</p>
    </div>
  );
}

function Row({ k, v, mono, strong }: { k: string; v: string; mono?: boolean; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-on-surface-variant">{k}</dt>
      <dd
        className={`text-on-surface text-right ${mono ? 'font-mono' : ''} ${
          strong ? 'font-bold text-primary-container' : 'font-medium'
        }`}
      >
        {v}
      </dd>
    </div>
  );
}

function Fallback() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <p className="text-4xl mb-4">🔍</p>
      <h1 className="font-montserrat font-bold text-xl text-primary-container mb-2">
        No encontramos ese pedido
      </h1>
      <p className="text-on-surface-variant mb-6">
        Verifica el enlace o revisa tus pedidos en el portal.
      </p>
      <Link href="/catalogo" className="text-on-tertiary-container hover:underline">
        Volver al catálogo →
      </Link>
    </div>
  );
}
