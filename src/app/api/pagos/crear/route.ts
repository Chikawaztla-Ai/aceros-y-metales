import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkoutPayloadSchema } from '@/lib/validations';
import { buildOrder, CheckoutError, type CustomerContext } from '@/server/orders';
import { createPreference, type MpPreferenceItem } from '@/lib/mercadopago';

export const runtime = 'nodejs';

function baseUrl(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
}

export async function POST(req: NextRequest) {
  // 1) Requiere sesión
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Debes iniciar sesión' }, { status: 401 });
  }

  // 2) Validar payload
  let payload;
  try {
    payload = checkoutPayloadSchema.parse(await req.json());
  } catch (err) {
    return NextResponse.json(
      { error: 'Datos inválidos', detail: (err as Error).message },
      { status: 422 }
    );
  }
  payload.paymentMethod = 'mercadopago';

  const ctx: CustomerContext = {
    userId: user.id,
    email: user.email ?? '',
    fullName: (user.user_metadata?.full_name as string) || payload.contactName,
  };

  // 3) Crear orden (pending) + 4) preferencia MP
  try {
    const order = await buildOrder(payload, ctx);

    const mpItems: MpPreferenceItem[] = order.items.map((i) => ({
      id: i.sku,
      title: `${i.name} (${i.unitType})`,
      quantity: i.quantity,
      unit_price: i.unitPrice,
    }));
    // Línea de IVA para que el total en MP coincida con la orden.
    if (order.totals.tax > 0) {
      mpItems.push({ id: 'IVA', title: 'IVA (16%)', quantity: 1, unit_price: order.totals.tax });
    }
    if (order.totals.shipping > 0) {
      mpItems.push({ id: 'ENVIO', title: 'Envío', quantity: 1, unit_price: order.totals.shipping });
    }

    const base = baseUrl(req);
    const pref = await createPreference({
      orderId: order.id,
      orderNumber: order.orderNumber,
      items: mpItems,
      payer: { name: order.contactName, email: order.contactEmail },
      backUrls: {
        success: `${base}/confirmacion?order=${order.orderNumber}`,
        pending: `${base}/confirmacion?order=${order.orderNumber}`,
        failure: `${base}/checkout?error=pago`,
      },
      notificationUrl: `${base}/api/pagos/webhook`,
    });

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.orderNumber,
      init_point: pref.init_point || pref.sandbox_init_point,
    });
  } catch (err) {
    if (err instanceof CheckoutError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error('[pagos/crear]', err);
    return NextResponse.json({ error: 'Error al procesar el pago' }, { status: 500 });
  }
}
