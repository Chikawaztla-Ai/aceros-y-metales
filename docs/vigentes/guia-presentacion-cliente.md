# Guía de Presentación al Cliente — acerosymetalesurgentes.com

## Orden sugerido de la reunión (45-60 min)

### 1. Apertura (5 min)
Contexto: "Les traigo el paquete completo — diseño aprobado, alcance técnico y plan de comisiones."
No mostrar nada técnico todavía. Solo el PRD Ejecutivo.

### 2. PRD Ejecutivo (15-20 min) — documento principal
**Archivo: `PRD-ejecutivo-v2-aceros.html`**
Recorrer en este orden:
1. Objetivo — por qué el canal digital importa
2. Usuarios — quién compra (B2B vs ocasional)
3. Módulos — qué incluye la Fase 1 (marcar claramente qué es MVP vs Fase 2/V3)
4. Diseño — mostrar las 6 pantallas (screen.png de cada Stitch, no el código)
5. Plan de trabajo — 9 semanas, fases con entregables
6. Inversión — tabla de costos, $86,000 MXN total
7. Comisiones — tabla por categoría (3%/2%/5%)
8. Términos — duración 6 meses, esquema de pago 40/30/30

**Tip:** Deja la sección de comisiones para el final de esta parte — es lo más sensible, mejor cuando ya vieron el valor completo.

### 3. Mostrar el diseño en vivo (15-20 min)
**Las 10 pantallas están completas.** Abrir los archivos HTML directamente en el navegador (se ven como el sitio real) en este orden narrativo — el recorrido natural de un cliente:

1. `Homepage_v2_dc.html` — primera impresión
2. `pantalla-blog-listado.html` — contenido SEO (opcional si el tiempo apremia)
3. Catálogo (pantalla Stitch) — búsqueda y filtros
4. Producto Individual (4140 Barra Redonda) — ficha técnica + calculadora
5. `pantalla-carrito.html` — carrito con productos de ejemplo
6. `pantalla-checkout.html` — proceso de pago con Mercado Pago + Transferencia
7. Cotización (`code.html` original) — flujo alterno para B2B
8. Dashboard Administrativo — vista interna (mencionar que esto lo usa el cliente, no sus compradores)
9. Portal de Clientes — nivel Oro, historial, precios especiales

Dejar que el cliente interactúe con la calculadora de peso — es el momento "wow" de la demo.

**Tip:** Si el tiempo es limitado, prioriza Homepage → Producto → Carrito → Checkout → Dashboard. Esas 5 cuentan la historia completa de principio a fin.

### 4. Catálogo de productos (5 min)
**Archivo: `catalogo-aceros.html`**
Mostrar que ya está armado el catálogo base de ~40 productos con equivalencias técnicas — esto reduce la carga de trabajo del cliente para arrancar.

### 5. Preguntas y ajustes (10-15 min)
Ten a la mano el PRD Técnico por si preguntan detalles de implementación, pero no lo muestres a menos que pregunten — es denso para una audiencia no técnica.

### 6. Cierre y siguiente paso
- Pedir aprobación por escrito (email o WhatsApp confirmando)
- Acordar fecha de kickoff (primera reunión de 60 min)
- Confirmar esquema de pago: 40% inicio / 30% diseño aprobado / 30% lanzamiento

---

## Documentos a enviar ANTES de la reunión (para que lleguen con contexto)
1. `PRD-ejecutivo-v2-aceros.html`
2. Las 10 imágenes/pantallas de diseño (screen.png de cada Stitch, o los HTML directamente)

## Documentos a tener a la mano DURANTE la reunión (no enviar de antemano)
- `PRD-tecnico-v2-aceros.html` — solo si preguntan
- `catalogo-aceros.html`
- `propuesta-acero.html` — si quieren detalle extra de comisiones
- `plan-marketing-acero.html` — si preguntan por el plan de lanzamiento
- `pantalla-blog-listado.html` y `pantalla-blog-articulo.html` — si preguntan por la estrategia de contenido SEO

## Documentos que NO se muestran al cliente
- `DESIGN-SYSTEM-OFICIAL.md` (uso interno para consistencia de diseño)
- `roadmap-acero.html` (versión antigua de 9 semanas por módulos — usar solo el roadmap del PRD)
- `cotizacion-sitio-acero.html` y `cotizacion-acero-v2.html` (versiones obsoletas de cotización, ya reemplazadas por el PRD)

---

## Objeciones probables y cómo responder

**"¿Por qué $86,000 si antes hablamos de $75,000?"**
El PRD v2 incorpora módulos que no estaban en la primera cotización: wishlist, promociones, buscador inteligente con IA, Meta Pixel y Clarity, transferencia bancaria. Cada uno se puede mostrar en la tabla de inversión para justificar la diferencia.

**"¿Por qué 6 meses mínimo?"**
El canal digital necesita tiempo de maduración — SEO y campañas pagadas tardan en generar tracción. Los primeros resultados reales se ven entre el mes 3 y 4 (esto ya está en el PRD, sección Términos).

**"¿Podemos empezar sin todos los módulos?"**
Sí — el roadmap MVP/V2/V3/V4 está diseñado exactamente para esto. El MVP (Fase 1) es autosuficiente; los agentes IA y CFDI son V3, no bloquean el lanzamiento.

**"¿Qué pasa si no se vende nada por el canal digital?"**
Las comisiones solo aplican sobre ventas atribuibles al canal digital (primer contacto vía web en los 30 días previos al cierre) — no hay riesgo para el cliente si no hay ventas, no hay comisión que pagar.

---

## Después de la reunión
- Si aprueban: agendar kickoff y solicitar el primer pago (40%)
- Si piden ajustes: anotar qué módulos quieren mover de fase o quitar, y regresamos a actualizar el PRD antes de tocar código
- Si aprueban el diseño pero quieren negociar precio: la tabla de inversión en el PRD ya está desglosada por módulo — se puede quitar/mover cualquier línea a otra fase sin rehacer el documento completo
