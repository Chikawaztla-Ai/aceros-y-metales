-- ============================================================
-- acerosymetalesurgentes.com — Migration inicial
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ============================================================
-- Categories
-- ============================================================
CREATE TABLE categories (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          text NOT NULL,
  slug          text UNIQUE NOT NULL,
  description   text,
  commission_pct numeric DEFAULT 0,
  sort_order    int DEFAULT 0,
  active        boolean DEFAULT true,
  created_at    timestamptz DEFAULT now()
);

INSERT INTO categories (name, slug, commission_pct, sort_order) VALUES
  ('Aceros Comerciales', 'aceros-comerciales', 3, 1),
  ('Aceros Especiales', 'aceros-especiales', 3, 2),
  ('Aluminio', 'aluminio', 2, 3),
  ('Cobre', 'cobre', 2, 4),
  ('Bronce', 'bronce', 2, 5),
  ('Latón', 'laton', 2, 6),
  ('Maquinaria', 'maquinaria', 5, 7),
  ('Herramientas', 'herramientas', 5, 8),
  ('Consumibles', 'consumibles', 5, 9),
  ('Promociones', 'promociones', 0, 10);

-- ============================================================
-- Products
-- ============================================================
CREATE TABLE products (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku           text UNIQUE NOT NULL,
  name          text NOT NULL,
  slug          text UNIQUE NOT NULL,
  category_id   uuid REFERENCES categories(id),
  aisi_grade    text,
  description   text,
  unit_types    text[] DEFAULT '{metro,kilo,pieza}',
  base_price    numeric NOT NULL,
  density       numeric,
  stock_qty     numeric DEFAULT 0,
  stock_min     numeric DEFAULT 10,
  pdf_url       text,
  dwg_url       text,
  images        text[],
  specs         jsonb DEFAULT '{}',
  equivalences  jsonb DEFAULT '{}',
  applications  text,
  featured      boolean DEFAULT false,
  active        boolean DEFAULT true,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_grade ON products(aisi_grade);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(active) WHERE active = true;
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = true;

-- ============================================================
-- Companies & Customers
-- ============================================================
CREATE TABLE companies (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          text NOT NULL,
  rfc           text UNIQUE,
  industry      text,
  tier          text DEFAULT 'standard',
  discount_pct  numeric DEFAULT 0,
  credit_limit  numeric DEFAULT 0,
  credit_used   numeric DEFAULT 0,
  address       jsonb,
  active        boolean DEFAULT true,
  created_at    timestamptz DEFAULT now()
);

CREATE TABLE customers (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       uuid UNIQUE REFERENCES auth.users(id),
  company_id    uuid REFERENCES companies(id),
  full_name     text NOT NULL,
  email         text NOT NULL,
  phone         text,
  created_at    timestamptz DEFAULT now()
);

-- ============================================================
-- Promotions (before orders, because orders reference it)
-- ============================================================
CREATE TABLE promotions (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  code        text UNIQUE,
  name        text NOT NULL,
  type        text NOT NULL,
  value       numeric NOT NULL,
  category_id uuid REFERENCES categories(id),
  min_amount  numeric DEFAULT 0,
  max_uses    int,
  used_count  int DEFAULT 0,
  starts_at   timestamptz,
  ends_at     timestamptz,
  active      boolean DEFAULT true
);

-- ============================================================
-- Orders
-- ============================================================
CREATE SEQUENCE order_number_seq START 8900;

CREATE TABLE orders (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number    text UNIQUE NOT NULL,
  customer_id     uuid REFERENCES customers(id),
  status          text DEFAULT 'pending',
  payment_method  text,
  mp_payment_id   text,
  subtotal        numeric NOT NULL,
  discount        numeric DEFAULT 0,
  tax             numeric NOT NULL,
  shipping        numeric DEFAULT 0,
  total           numeric NOT NULL,
  promotion_id    uuid REFERENCES promotions(id),
  shipping_address jsonb,
  billing_rfc     text,
  billing_name    text,
  needs_cfdi      boolean DEFAULT false,
  notes           text,
  cancelled_reason text,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

CREATE TABLE order_items (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id    uuid REFERENCES products(id),
  sku           text,
  name          text,
  unit_type     text,
  quantity      numeric NOT NULL,
  unit_price    numeric NOT NULL,
  weight_kg     numeric,
  subtotal      numeric NOT NULL,
  cut_specs     jsonb
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- Auto-generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'URG-' || nextval('order_number_seq');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- ============================================================
-- Quotes
-- ============================================================
CREATE TABLE quotes (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_number  text UNIQUE NOT NULL DEFAULT 'COT-' || nextval('order_number_seq'),
  customer_id   uuid REFERENCES customers(id),
  contact_name  text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  company       text,
  status        text DEFAULT 'pending',
  items         jsonb NOT NULL,
  pdf_url       text,
  dwg_url       text,
  notes         text,
  admin_response text,
  created_at    timestamptz DEFAULT now(),
  responded_at  timestamptz
);

-- ============================================================
-- Wishlist, Volume Prices, Embeddings, Email Queue
-- ============================================================
CREATE TABLE wishlist_items (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  product_id  uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(customer_id, product_id)
);

CREATE TABLE volume_prices (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  uuid REFERENCES products(id) ON DELETE CASCADE,
  tier        text,
  min_qty     numeric NOT NULL,
  price       numeric NOT NULL,
  unit_type   text
);

CREATE TABLE product_embeddings (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  uuid UNIQUE REFERENCES products(id) ON DELETE CASCADE,
  embedding   vector(1536) NOT NULL,
  content     text NOT NULL,
  updated_at  timestamptz DEFAULT now()
);

CREATE INDEX idx_embeddings_vector
  ON product_embeddings
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

CREATE TABLE email_queue (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  to_email    text NOT NULL,
  template    text NOT NULL,
  data        jsonb NOT NULL,
  status      text DEFAULT 'pending',
  retry_count int DEFAULT 0,
  error       text,
  created_at  timestamptz DEFAULT now(),
  sent_at     timestamptz
);

-- ============================================================
-- Functions
-- ============================================================

-- Búsqueda semántica
CREATE OR REPLACE FUNCTION match_products(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.3,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  sku text,
  name text,
  slug text,
  aisi_grade text,
  base_price numeric,
  similarity float
) AS $$
  SELECT
    p.id, p.sku, p.name, p.slug, p.aisi_grade, p.base_price,
    1 - (pe.embedding <=> query_embedding) AS similarity
  FROM product_embeddings pe
  JOIN products p ON p.id = pe.product_id
  WHERE p.active = true
    AND 1 - (pe.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$ LANGUAGE sql STABLE;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE volume_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Products: público lectura, admin escritura
CREATE POLICY "products_read" ON products FOR SELECT USING (true);
CREATE POLICY "products_admin" ON products FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- Categories: público lectura
CREATE POLICY "categories_read" ON categories FOR SELECT USING (true);
CREATE POLICY "categories_admin" ON categories FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- Orders: cliente ve los suyos, admin ve todos
CREATE POLICY "orders_customer_read" ON orders FOR SELECT USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  OR auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "orders_customer_insert" ON orders FOR INSERT WITH CHECK (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);
CREATE POLICY "orders_admin_update" ON orders FOR UPDATE USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- Order items: heredan acceso del order
CREATE POLICY "order_items_read" ON order_items FOR SELECT USING (
  order_id IN (
    SELECT id FROM orders WHERE customer_id IN (
      SELECT id FROM customers WHERE user_id = auth.uid()
    )
  )
  OR auth.jwt() ->> 'role' = 'admin'
);

-- Customers: solo el propio + admin
CREATE POLICY "customers_own" ON customers FOR SELECT USING (
  user_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "customers_admin" ON customers FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- Companies: admin only
CREATE POLICY "companies_admin" ON companies FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "companies_read" ON companies FOR SELECT USING (
  id IN (SELECT company_id FROM customers WHERE user_id = auth.uid())
  OR auth.jwt() ->> 'role' = 'admin'
);

-- Quotes: creador + admin
CREATE POLICY "quotes_read" ON quotes FOR SELECT USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  OR contact_email = auth.jwt() ->> 'email'
  OR auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "quotes_insert" ON quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "quotes_admin" ON quotes FOR UPDATE USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- Wishlist: solo el dueño
CREATE POLICY "wishlist_owner" ON wishlist_items FOR ALL USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- Volume prices y promos: lectura pública, escritura admin
CREATE POLICY "volume_read" ON volume_prices FOR SELECT USING (true);
CREATE POLICY "volume_admin" ON volume_prices FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "promo_read" ON promotions FOR SELECT USING (active = true);
CREATE POLICY "promo_admin" ON promotions FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- Embeddings: solo admin escribe, lectura via función
CREATE POLICY "embeddings_admin" ON product_embeddings FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- Email queue: solo admin/service
CREATE POLICY "email_admin" ON email_queue FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);
