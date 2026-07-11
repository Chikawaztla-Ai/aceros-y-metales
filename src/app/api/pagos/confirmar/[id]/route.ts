import { NextResponse, type NextRequest } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { decrementStockForOrder } from '@/server/orders';
import { sendOrderConfirmation, type OrderEmailData } from '@/lib/email';

export const runtime = 'nodejs';

// Admin confirma la recepción de una transferencia bancaria.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = user?.user_metadata?.role;
  if (!user || role !== 'admin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const admin = createAdminClient();
  const { data: order } = await admin
    .from('orders')
    .select('id, order_number, status, contact_email, billing_name, subtotal, tax, shipping, total')
    .eq('id', id)
    .maybeSingle();

  if (!order) {
    return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
  }
  if (order.status === 'paid') {
    return NextResponse.json({ ok: true, msg: 'ya pagada' });
  }
  if (order.status !== 'pending_transfer') {
    return NextResponse.json(
      { error: `No se puede confirmar un pedido en estado "${order.status}"` },
      { status: 409 }
    );
  }

  await admin
    .from('orders')
    .update({ status: 'paid', paid_at: new Date().toISOString(), expires_at: null })
    .eq('id', order.id);

  await decrementStockForOrder(order.id);

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

  return NextResponse.json({ ok: true });
}
