import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkoutPayloadSchema } from '@/lib/validations';
import { buildOrder, CheckoutError, type CustomerContext } from '@/server/orders';
import { getBankDetails } from '@/lib/bank';
import {
  sendTransferInstructions,
  sendAdminNewOrder,
  type OrderEmailData,
} from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Debes iniciar sesión' }, { status: 401 });
  }

  let payload;
  try {
    payload = checkoutPayloadSchema.parse(await req.json());
  } catch (err) {
    return NextResponse.json(
      { error: 'Datos inválidos', detail: (err as Error).message },
      { status: 422 }
    );
  }
  payload.paymentMethod = 'transferencia';

  const ctx: CustomerContext = {
    userId: user.id,
    email: user.email ?? '',
    fullName: (user.user_metadata?.full_name as string) || payload.contactName,
  };

  try {
    const order = await buildOrder(payload, ctx);

    const emailData: OrderEmailData = {
      orderNumber: order.orderNumber,
      contactName: order.contactName,
      contactEmail: order.contactEmail,
      items: order.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        unitType: i.unitType,
        subtotal: i.subtotal,
      })),
      subtotal: order.totals.subtotal,
      tax: order.totals.tax,
      shipping: order.totals.shipping,
      total: order.totals.total,
    };

    if (emailData.contactEmail) {
      await sendTransferInstructions(emailData, getBankDetails());
    }
    await sendAdminNewOrder(emailData, 'transferencia');

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
  } catch (err) {
    if (err instanceof CheckoutError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error('[pagos/transferencia]', err);
    return NextResponse.json({ error: 'Error al registrar el pedido' }, { status: 500 });
  }
}
