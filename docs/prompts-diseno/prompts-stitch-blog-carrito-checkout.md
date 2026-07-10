# Prompts Claude Design / Stitch — Pantallas Faltantes (Ronda 2)
# acerosymetalesurgentes.com
# Sistema de diseño: Industrial Precision (Steel Blue + Naranja + Montserrat/Inter)
# Referencia obligatoria: DESIGN-SYSTEM-OFICIAL.md
# Pantallas ya aprobadas: Cotización, Homepage, Catálogo, Producto, Dashboard, Portal Cliente

---

# ⚠️ INSTRUCCIÓN PARA STITCH — LEER ANTES DE GENERAR

Usa EXACTAMENTE esta paleta y tipografía. NO uses Bebas Neue, JetBrains Mono, negro #111827 ni dorado #C8991A — ese es un sistema descartado.

```
primary:              #162839   ← Nav, footer, sidebar dashboard
primary-container:    #2c3e50   ← Header tablas, botones secundarios
on-tertiary-container: #f78b30  ← Acento naranja — CTAs, precios, badges
background/surface:    #f7f9fb
surface-container-lowest: #ffffff
surface-container-low: #f2f4f6  ← Zebra striping
outline-variant:       #c4c6cd
on-surface:             #191c1e
on-surface-variant:     #43474c

Headlines: Montserrat 700/600
Cuerpo:    Inter 400/500/600
Datos/SKU: Inter mono-data role
Íconos:    Material Symbols Outlined
Border-radius: 4px (rounded-lg) — sutil, nunca pill en cards
```

Header y Footer deben ser IDÉNTICOS a los de las pantallas ya generadas (Homepage/Catálogo/Producto).

---

# PANTALLA 7 — Blog Técnico (Listado)

## Contexto
Sección de contenido SEO. Artículos técnicos sobre materiales, aplicaciones y guías de compra — pensado para posicionar en Google términos como "acero 4140 para qué sirve" o "diferencia entre acero 1018 y 1045".

## Layout
- Header idéntico al resto del sitio
- Hero de sección simple (no full imagen, más editorial)
- Grid de artículos + sidebar de categorías

## Hero de sección
```
bg-surface-container-low, padding vertical generoso
Eyebrow: font-label-md text-on-tertiary-container uppercase "Centro de Recursos"
Título: font-headline-lg text-primary-container "Blog Técnico"
Subtítulo: font-body-lg text-on-surface-variant "Guías, aplicaciones y comparativas de materiales para tu proyecto"
Buscador de artículos: mismo estilo que buscador de header, pero en versión clara (bg-white border)
```

## Grid principal (2/3 + 1/3)

### Columna izquierda — Artículo destacado + grid
- Artículo destacado (el más reciente o el más leído):
  ```
  Card grande: imagen 16:9 + overlay parcial con categoría
  bg-white border border-outline-variant rounded-lg overflow-hidden
  Badge categoría: bg-on-tertiary-container text-white rounded-full uppercase text-[10px] px-3 py-1
  Título: font-headline-md text-[24px] text-primary-container
  Extracto: font-body-md text-on-surface-variant, 2 líneas máx
  Meta: font-mono-data text-[11px] text-on-surface-variant "5 min de lectura · 12 jun 2026"
  ```
- Grid 2 columnas de artículos regulares (mismo componente que product cards pero con imagen + categoría + título + extracto corto)
- Paginación al fondo (mismo componente del catálogo)

### Sidebar derecho (sticky)
- **Categorías**: lista con contador — "Guías de Compra (8)", "Aplicaciones Industriales (12)", "Comparativas (6)", "Noticias del Sector (4)"
  - Cada categoría: hover text-on-tertiary-container
- **Artículos más leídos**: lista compacta de 4, solo título + fecha en mono-data
- **CTA de cotización** (reutilizar el bloque de la calculadora pero con mensaje): "¿Ya sabes qué material necesitas?" + botón "Solicitar Cotización"

---

# PANTALLA 8 — Blog Técnico (Artículo Individual)

## Contexto
Vista de lectura de un artículo específico. Debe ser cómoda de leer y aprovechar el momento para convertir al lector en cliente.

## Layout
- Header idéntico
- Breadcrumb: Inicio / Blog / [Categoría] / [Título del artículo]
- Grid 8 + 4 (contenido + sidebar sticky), igual que producto individual

## Columna izquierda — Contenido del artículo

### Encabezado del artículo
```
Badge categoría: bg-on-tertiary-container/10 text-on-tertiary-container uppercase text-[11px]
Título: font-headline-lg text-[40px] text-primary-container, line-height ajustado
Meta autor: avatar + nombre + fecha + tiempo de lectura, font-mono-data text-[12px]
Imagen destacada: full-width, rounded-lg, ratio 16:9
```

### Cuerpo del artículo
```
Tipografía de lectura: font-body-lg (18px), line-height generoso 1.8
Subtítulos h2: font-headline-md text-primary-container uppercase, margen superior amplio
Blockquotes / datos destacados: bg-surface-container-low border-l-4 border-on-tertiary-container padding
Tablas técnicas dentro del artículo: MISMO componente que las tablas de specs del resto del sitio
Imágenes inline: rounded-md con caption en font-mono-data text-[12px] text-on-surface-variant
```

### Al final del artículo
- Tags relacionados: chips con bg-surface-container-low, hover bg-primary-container hover:text-white
- CTA de conversión: bloque bg-primary-container texto blanco "¿Necesitas este material?" + botón naranja "Ver en catálogo"
- Artículos relacionados: 3 cards en fila (mismo componente que blog listado)

## Columna derecha (sticky)

### Tabla de contenidos
```
bg-surface-container-lowest border border-outline-variant rounded-lg p-5
Título: font-label-md uppercase text-[11px] text-on-surface-variant "En este artículo"
Lista de links a subtítulos (scroll spy — el activo se resalta en text-on-tertiary-container)
```

### Calculadora de peso embebida
- Mismo componente exacto de otras pantallas — útil si el artículo habla de un material específico

### Compartir
- Íconos de compartir (WhatsApp, LinkedIn, copiar link) en fila, estilo outline circular

---

# PANTALLA 9 — Carrito de Compras

## Contexto
Vista del carrito antes de pasar a checkout. Debe mostrar claramente el desglose por peso/unidad y permitir ajustes rápidos.

## Layout
- Header idéntico (con contador de carrito visible en el ícono)
- Breadcrumb simple: Inicio / Carrito
- Grid 8 + 4 (lista de items + resumen sticky)

## Columna izquierda — Lista de items

### Header de tabla
```
Título: font-headline-lg text-primary-container "Tu Carrito"
Subtítulo: font-body-md text-on-surface-variant "3 productos · 45.2 kg totales"
```

### Item de carrito (repetible)
```
Card: bg-white border border-outline-variant rounded-lg p-5, flex layout
Imagen miniatura: 80x80 rounded-md
Info: SKU en font-mono-data text-on-tertiary-container, nombre en font-body-md font-weight-600
Unidad seleccionada: badge "Por Kilo" bg-surface-container-low
Selector de cantidad: mismo componente +/- de producto individual
Peso calculado: font-mono-data text-[13px] text-on-surface-variant "≈ 12.5 kg"
Precio unitario y subtotal: font-mono-data, subtotal en font-weight-700 text-primary-container
Botón eliminar: ícono "delete" outline, hover text-error
```

### Debajo de la lista
- Campo de código de descuento: input + botón "Aplicar" outline
- Link "Continuar comprando" con ícono flecha izquierda, text-primary-container

## Columna derecha — Resumen (sticky)

```
Card: bg-surface-container-lowest border border-outline-variant rounded-lg p-6
Título: font-headline-md "Resumen del Pedido"

Líneas de resumen (font-body-md, valores en font-mono-data):
  Subtotal              $X,XXX.XX
  Descuento aplicado    -$XXX.XX  (si aplica, en color verde)
  Envío                 Calculado en checkout
  IVA (16%)             $XXX.XX

Divider

Total: font-headline-md text-[24px] text-on-tertiary-container "$X,XXX.XX"

CTA primario full-width: bg-on-tertiary-container "PROCEDER AL PAGO"
CTA secundario: outline "Solicitar cotización de este pedido" (convierte el carrito en cotización formal)

Nota de confianza: 3 íconos pequeños — "Pago seguro" / "Factura CFDI" / "Entrega rastreable"
```

### Carrito vacío (estado alternativo)
- Ilustración simple con ícono grande "shopping_cart" en surface-container-low
- Texto: "Tu carrito está vacío"
- CTA: "Explorar catálogo"

---

# PANTALLA 10 — Checkout

## Contexto
Proceso de pago en un solo paso (no wizard multi-página) para reducir abandono. Incluye selección de método de pago (Mercado Pago o transferencia).

## Layout
- Header simplificado: solo logo centrado + ícono de "compra segura", SIN nav de navegación (para no distraer del checkout)
- Grid 7 + 5 (formulario + resumen sticky)

## Columna izquierda — Formulario

### Sección 1 — Datos de facturación
```
Título de sección: font-headline-md text-primary-container uppercase "Datos de Facturación"
Grid 2 columnas de inputs: Nombre/Razón social, RFC, Email, Teléfono
Checkbox: "Requiero factura CFDI" — si se marca, despliega campos de uso de CFDI y régimen fiscal
```

### Sección 2 — Dirección de entrega
```
Grid de inputs: Calle y número, Colonia, Ciudad, Estado, CP
Radio buttons: "Entrega a domicilio" / "Recoger en sucursal"
Si es domicilio: nota de costo de envío calculado según CP
```

### Sección 3 — Método de pago
```
Título: font-headline-md "Método de Pago"
2 opciones tipo card seleccionable (radio grande):

Card 1 — Mercado Pago:
  Ícono/logo MP + "Tarjeta, OXXO o SPEI"
  Al seleccionar: redirige a Checkout Pro (nota: "Serás redirigido a Mercado Pago para completar tu pago de forma segura")

Card 2 — Transferencia Bancaria:
  Ícono banco + "Transferencia o depósito"
  Al seleccionar: despliega inline los datos bancarios (CLABE, banco, beneficiario) en un bloque
  bg-surface-container-low border border-outline-variant, todo en font-mono-data
  Nota: "Tu pedido se confirmará una vez recibamos el comprobante. Válido por 48 horas."

Card seleccionada: border-2 border-primary-container, resto border-outline-variant
```

## Columna derecha — Resumen (sticky, igual que en carrito pero compacto)

```
Card: bg-surface-container-lowest border rounded-lg p-6
Título: "Resumen" + link "Editar carrito" en text-on-tertiary-container text-[12px]

Lista compacta de items (imagen mini + nombre + cantidad + subtotal), máximo mostrar 3 y luego "+2 productos más"

Divider

Totales (mismo formato que carrito)

CTA final: bg-on-tertiary-container full-width grande "CONFIRMAR PEDIDO — $X,XXX.XX"
  disabled state hasta llenar campos obligatorios

Debajo del botón: íconos de confianza + "Al confirmar aceptas nuestros Términos y Condiciones"
```

## Estado de confirmación (pantalla posterior, mismo archivo o nota aparte)
```
bg-white centrado, max-width 600px
Ícono grande: "check_circle" en verde con círculo bg-verde/10
Título: font-headline-lg "¡Pedido Confirmado!"
Número de pedido: font-mono-data text-[20px] text-on-tertiary-container "URG-8903"
Mensaje: "Te enviamos un correo con los detalles. Nuestro equipo se pondrá en contacto para coordinar la entrega."
Botones: "Ver mi pedido" (outline) + "Seguir comprando" (naranja)
```

---

# CHECKLIST FINAL — Antes de enviar a Stitch/Claude Design

- [ ] Confirmar que cada prompt se manda POR SEPARADO (una pantalla a la vez)
- [ ] Adjuntar o referenciar el `DESIGN-SYSTEM-OFICIAL.md` si la herramienta lo permite
- [ ] Verificar que el resultado use Steel Blue #162839, NO negro #111827
- [ ] Verificar que el acento sea naranja #f78b30, NO dorado #C8991A
- [ ] Verificar tipografía Montserrat + Inter, NO Bebas Neue ni JetBrains Mono
- [ ] Revisar que el Header y Footer sean coherentes con las 6 pantallas ya aprobadas
