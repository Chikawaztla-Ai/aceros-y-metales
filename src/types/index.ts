// ============================================================
// Tipos globales — acerosymetalesurgentes.com
// ============================================================

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category_id: string;
  aisi_grade: string | null;
  description: string | null;
  unit_types: string[];
  base_price: number;
  density: number | null;
  stock_qty: number;
  stock_min: number;
  pdf_url: string | null;
  dwg_url: string | null;
  images: string[];
  specs: Record<string, string>;
  equivalences: Record<string, string>;
  applications: string | null;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  commission_pct: number;
  sort_order: number;
  active: boolean;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  status: OrderStatus;
  payment_method: 'mercadopago' | 'transferencia';
  mp_payment_id: string | null;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  promotion_id: string | null;
  shipping_address: Address | null;
  billing_rfc: string | null;
  billing_name: string | null;
  needs_cfdi: boolean;
  notes: string | null;
  cancelled_reason: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  customer?: Customer;
}

export type OrderStatus =
  | 'pending'
  | 'pending_transfer'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  sku: string;
  name: string;
  unit_type: 'metro' | 'kilo' | 'pieza';
  quantity: number;
  unit_price: number;
  weight_kg: number | null;
  subtotal: number;
  cut_specs: CutSpec | null;
}

export interface CutSpec {
  length_mm: number;
  tolerance_mm: number;
  quantity: number;
  notes: string;
}

export interface Customer {
  id: string;
  user_id: string;
  company_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  created_at: string;
  company?: Company;
}

export interface Company {
  id: string;
  name: string;
  rfc: string | null;
  industry: string | null;
  tier: 'standard' | 'silver' | 'gold';
  discount_pct: number;
  credit_limit: number;
  credit_used: number;
  address: Address | null;
  active: boolean;
}

export interface Address {
  street: string;
  colony: string;
  city: string;
  state: string;
  zip: string;
}

export interface Quote {
  id: string;
  quote_number: string;
  customer_id: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  company: string | null;
  status: 'pending' | 'responded' | 'closed' | 'converted';
  items: QuoteItem[];
  pdf_url: string | null;
  dwg_url: string | null;
  notes: string | null;
  admin_response: string | null;
  created_at: string;
  responded_at: string | null;
}

export interface QuoteItem {
  material: string;
  grade: string;
  quantity: number;
  unit: string;
  notes: string | null;
}

export interface Promotion {
  id: string;
  code: string | null;
  name: string;
  type: 'pct' | 'fixed' | 'free_shipping';
  value: number;
  category_id: string | null;
  min_amount: number;
  max_uses: number | null;
  used_count: number;
  starts_at: string | null;
  ends_at: string | null;
  active: boolean;
}

export interface VolumePrice {
  id: string;
  product_id: string;
  tier: string | null;
  min_qty: number;
  price: number;
  unit_type: string | null;
}
