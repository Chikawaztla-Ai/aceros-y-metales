-- ============================================================
-- acerosymetalesurgentes.com — Migration 00002
-- Checkout / Pagos (Semana 3)
--   · Columnas de contacto + control de transferencia en orders
--   · Función atómica para ajustar stock
-- Ejecutar en Supabase SQL Editor (o supabase db push)
-- ============================================================

-- --- Orders: datos de contacto (para el email) y control de flujo ---
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS contact_email  text,
  ADD COLUMN IF NOT EXISTS contact_phone  text,
  ADD COLUMN IF NOT EXISTS shipping_type  text DEFAULT 'delivery',
  ADD COLUMN IF NOT EXISTS paid_at        timestamptz,
  ADD COLUMN IF NOT EXISTS expires_at     timestamptz;

-- Índice para el cron de transferencias vencidas
CREATE INDEX IF NOT EXISTS idx_orders_transfer_expiry
  ON orders (expires_at)
  WHERE status = 'pending_transfer';

-- --- Ajuste atómico de stock (delta negativo descuenta, positivo restaura) ---
-- SECURITY DEFINER para que el service role la ejecute sin depender de RLS.
CREATE OR REPLACE FUNCTION adjust_stock(p_product_id uuid, p_delta numeric)
RETURNS numeric
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_qty numeric;
BEGIN
  UPDATE products
     SET stock_qty = GREATEST(0, stock_qty + p_delta)
   WHERE id = p_product_id
  RETURNING stock_qty INTO new_qty;
  RETURN new_qty;
END;
$$;
