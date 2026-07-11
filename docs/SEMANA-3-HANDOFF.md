# Semana 3 — Carrito, Checkout y Pagos · Handoff

Estado al cierre de esta sesión (para continuar en otra PC).

## ✅ Construido y verificado (build de producción pasa)

- **Carrito** `/carrito` — lista, ajuste de cantidad (escala peso proporcional), IVA 16%, total.
- **Checkout** `/checkout` — formulario 3 secciones (facturación / entrega / pago) con validación Zod + react-hook-form. Protegido por middleware (requiere login).
- **Confirmación** `/confirmacion?order=URG-xxxx` — maneja pagado / pendiente MP / transferencia (muestra CLABE + referencia + aviso 48h).
- **Login** `/login` — login/registro mínimo con Supabase Auth (necesario porque el checkout requiere sesión).
- **API de pagos**:
  - `POST /api/pagos/crear` — orden `pending` + preferencia Mercado Pago (Checkout Pro).
  - `POST /api/pagos/webhook` — verifica firma HMAC, marca `paid`, descuenta stock, envía emails.
  - `POST /api/pagos/transferencia` — orden `pending_transfer` + email con datos bancarios.
  - `POST /api/pagos/confirmar/[id]` — confirmación admin (marca pagado, descuenta stock).
- **Edge Function** `supabase/functions/cancel-expired-transfers` — cron 1h, cancela transferencias > 48h.
- **Migración** `supabase/migrations/00002_orders_checkout.sql` — columnas de contacto/expiración + función atómica `adjust_stock`.
- **Libs**: `pricing.ts` (IVA 16%, formatMXN), `mercadopago.ts`, `email.ts` (4 plantillas Resend), `bank.ts`, `server/orders.ts`.
- **Fix global de estilos**: Tailwind v4 no cargaba `tailwind.config.ts`. Corregido en `globals.css` con `@import 'tailwindcss'` + `@config`. Ahora el design system aplica en todas las pantallas.

## Decisiones de negocio (confirmadas por el cliente)

- Precios del catálogo **SIN IVA**; se suma **16%** en checkout.
- **Login requerido** antes de pagar (no guest checkout).
- Stock se descuenta al **confirmarse el pago** (webhook MP `approved` o admin confirma transferencia), no al crear la orden.

## ⏳ Pendiente para probar pagos reales (config, no código)

1. Crear `.env.local` copiando `.env.example` y llenar: Supabase, `MP_ACCESS_TOKEN`/`MP_WEBHOOK_SECRET`, `RESEND_API_KEY`, `BANK_*`.
2. Correr la migración `00002_orders_checkout.sql` en Supabase (SQL Editor o `supabase db push`).
3. Desplegar y programar la Edge Function `cancel-expired-transfers` (cron cada hora).
4. El **webhook de MP no llega a localhost** → usar ngrok o el deploy de Vercel para la prueba con tarjeta de test.
5. **Catálogo/producto siguen en datos mock** (ids '1'..'9', no uuid). El servidor re-cotiza contra la BD cuando el producto existe, pero con mock usa el precio del cliente. Cablear el catálogo a Supabase (tarea de Semana 2) cierra ese puente.
6. El botón admin para confirmar transferencia es de Semana 5; la API `/api/pagos/confirmar/[id]` ya existe.

## Cómo correr

```bash
npm install
cp .env.example .env.local   # y llenar valores
npm run dev                  # http://localhost:3000
```
