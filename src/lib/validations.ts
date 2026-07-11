import { z } from 'zod';

// ============================================================
// Validación de inputs — acerosymetalesurgentes.com
// ============================================================

// Regex para RFC mexicano
const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;

// Regex para CP mexicano (5 dígitos)
const cpRegex = /^\d{5}$/;

// Regex para teléfono mexicano
const phoneRegex = /^\+?\d{10,15}$/;

// --- Checkout / Crear orden ---
export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        unitType: z.enum(['metro', 'kilo', 'pieza']),
        quantity: z.number().positive().max(10000),
      })
    )
    .min(1, 'El carrito está vacío')
    .max(50),
  paymentMethod: z.enum(['mercadopago', 'transferencia']),
  shippingType: z.enum(['delivery', 'pickup']).default('delivery'),
  shippingAddress: z
    .object({
      street: z.string().min(3).max(200),
      colony: z.string().min(2).max(100),
      city: z.string().min(2).max(100),
      state: z.string().min(2).max(100),
      zip: z.string().regex(cpRegex, 'CP debe ser de 5 dígitos'),
    })
    .optional(),
  billingName: z.string().max(200).optional(),
  billingRfc: z
    .string()
    .regex(rfcRegex, 'RFC inválido')
    .optional()
    .or(z.literal('')),
  needsCfdi: z.boolean().default(false),
  promotionCode: z.string().max(50).optional(),
  notes: z.string().max(500).optional(),
});

// --- Checkout: payload completo desde el carrito ---
// Nota: productId se valida como string (no uuid estricto) para tolerar
// el catálogo mock durante desarrollo. El servidor re-cotiza contra la BD
// cuando el producto existe, así que el precio del cliente nunca es autoritativo.
export const checkoutPayloadSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        sku: z.string().min(1),
        name: z.string().min(1).max(200),
        unitType: z.enum(['metro', 'kilo', 'pieza']),
        qty: z.number().positive().max(100000),
        unitPrice: z.number().nonnegative(),
        weightKg: z.number().nonnegative().default(0),
      })
    )
    .min(1, 'El carrito está vacío')
    .max(50),
  paymentMethod: z.enum(['mercadopago', 'transferencia']),
  shippingType: z.enum(['delivery', 'pickup']).default('delivery'),
  shippingAddress: z
    .object({
      street: z.string().min(3).max(200),
      colony: z.string().min(2).max(100),
      city: z.string().min(2).max(100),
      state: z.string().min(2).max(100),
      zip: z.string().regex(cpRegex, 'CP debe ser de 5 dígitos'),
    })
    .optional(),
  contactName: z.string().min(2).max(200),
  contactPhone: z.string().regex(phoneRegex, 'Teléfono inválido'),
  billingRfc: z
    .string()
    .regex(rfcRegex, 'RFC inválido')
    .optional()
    .or(z.literal('')),
  needsCfdi: z.boolean().default(false),
  notes: z.string().max(500).optional(),
});

export type CheckoutPayload = z.infer<typeof checkoutPayloadSchema>;

// --- Cotización ---
export const createQuoteSchema = z.object({
  contactName: z.string().min(2, 'Nombre requerido').max(100),
  contactEmail: z.string().email('Email inválido'),
  contactPhone: z.string().regex(phoneRegex, 'Teléfono inválido'),
  company: z.string().max(200).optional(),
  rfc: z
    .string()
    .regex(rfcRegex, 'RFC inválido')
    .optional()
    .or(z.literal('')),
  items: z
    .array(
      z.object({
        material: z.string().min(1).max(100),
        grade: z.string().max(50).optional(),
        quantity: z.number().positive(),
        unit: z.string().max(20),
        notes: z.string().max(500).optional(),
      })
    )
    .min(1, 'Agrega al menos un material')
    .max(20),
  notes: z.string().max(1000).optional(),
});

// --- Búsqueda IA ---
export const searchSchema = z.object({
  query: z
    .string()
    .min(2, 'Búsqueda muy corta')
    .max(200)
    .trim(),
});

// --- Registro ---
export const registerSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  phone: z.string().regex(phoneRegex).optional(),
  companyName: z.string().max(200).optional(),
  companyRfc: z
    .string()
    .regex(rfcRegex)
    .optional()
    .or(z.literal('')),
});

// --- Login ---
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

// --- Admin: actualizar producto ---
export const updateProductSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  base_price: z.number().positive().optional(),
  stock_qty: z.number().min(0).optional(),
  stock_min: z.number().min(0).optional(),
  active: z.boolean().optional(),
  specs: z.record(z.string(), z.string()).optional(),
  equivalences: z.record(z.string(), z.string()).optional(),
  applications: z.string().max(1000).optional(),
});

// --- Admin: cambiar tier de cliente ---
export const updateTierSchema = z.object({
  tier: z.enum(['standard', 'silver', 'gold']),
  discount_pct: z.number().min(0).max(100),
});

// --- Promociones ---
export const validatePromoSchema = z.object({
  code: z.string().min(1).max(50),
  cartTotal: z.number().positive(),
  categoryId: z.string().uuid().optional(),
});

// Export types
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CreateQuoteInput = z.infer<typeof createQuoteSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
