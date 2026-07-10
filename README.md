# acerosymetalesurgentes.com

Plataforma de ventas industrial B2B/B2C — acero, aluminio, metales y plásticos de ingeniería.

## Estructura del repositorio

```
docs/
  vigentes/           ← Documentos actuales del proyecto
    PRD-ejecutivo-v2   → Para presentar al cliente
    PRD-tecnico-v2     → Para el desarrollador
    DESIGN-SYSTEM      → Sistema de diseño oficial (Steel Blue / Montserrat)
    catalogo-aceros    → ~40 productos con equivalencias
    contrato-servicios → Contrato con esquema 40/30/30
    checklist-assets   → Lo que el cliente debe entregar
    plan-marketing     → SEO + Google Ads + redes
    plan-lanzamiento   → Primeros 30 días post go-live
    propuesta-acero    → Esquema de comisiones
    cotizacion-v2      → Cotización $86,000 MXN
    guia-presentacion  → Script para la reunión con el cliente
    roadmap            → Fases de desarrollo
  obsoletos/           ← Versiones anteriores (solo referencia)
  prompts-diseno/      ← Prompts para generar pantallas en Stitch/Claude Design
  patyflow/            ← Proyecto secundario (Patricia — yoga)

pantallas/
  stitch/              ← 10 pantallas de diseño aprobadas (HTML interactivo)
    Homepage, Catálogo, Producto, Cotización,
    Dashboard, Portal Cliente, Carrito, Checkout,
    Blog Listado, Blog Artículo
```

## Stack (MVP)

- **Frontend:** Next.js 15 + TypeScript + Tailwind + shadcn/ui
- **Backend:** Supabase (PostgreSQL + Auth + Storage + Edge Functions)
- **Pagos:** Mercado Pago + Transferencia bancaria
- **Email:** Resend
- **IA:** OpenAI embeddings + pgvector (buscador inteligente)
- **Deploy:** Vercel + Hostinger (dominio) + Cloudflare (CDN)
- **Analytics:** GA4 + Search Console + Meta Pixel + Microsoft Clarity

## Estado

- [x] Diseño — 10 pantallas aprobadas
- [x] PRDs — Ejecutivo + Técnico validados al 100%
- [x] Catálogo de productos
- [x] Cotización, contrato, plan de marketing
- [ ] Presentación al cliente
- [ ] Firma de contrato + primer pago
- [ ] Desarrollo MVP (30-45 días)

## Desarrollador

**Juan Azael Pinales Regis**
azaelecommerce@gmail.com · +52 55 1923 2398
