# Prompts Claude Design — Pantallas Faltantes
# acerosymetalesurgentes.com
# Sistema de diseño: Stitch "Industrial Precision" aprobado
# Referencias: Homepage_v2_dc.html · Catalogo_dc.html · code.html (cotización)

---

# REGLAS DE DISEÑO — OBLIGATORIAS EN TODAS LAS PANTALLAS

## Tipografía
- Display / Títulos grandes: `Bebas Neue` letter-spacing 0.5px
- Cuerpo / Labels / UI: `Inter` 400/500/600/700
- Datos técnicos / SKUs / precios / medidas: `JetBrains Mono`
- Eyebrow labels: JetBrains Mono 11-12px, letter-spacing 1.5-2px, uppercase, color #C8991A o #6B7280

## Colores exactos
- Fondo base: #FFFFFF
- Fondo secciones alternas: #F3F4F6
- Texto principal: #111827
- Texto secundario: #6B7280
- Acento dorado primario: #C8991A (botones, CTAs, hovers, underlines activos)
- Acento dorado brillante: #F5C842 (texto sobre fondos oscuros, highlights)
- Dark blocks (hero, calculadora, B2B, footer): #111827
- Dark surfaces internas: #1F2937, #374151
- Verde stock: #16A34A
- Bordes: #E5E7EB (claro), #374151 (sobre oscuro)

## Componentes
- Botón primario: bg #C8991A, texto blanco, font-size 13px, font-weight 700, letter-spacing 0.5px, uppercase, padding 11-15px 22-32px, border-radius 6px
- Botón secundario: border 2px #111827 o rgba(255,255,255,0.5), bg transparent, mismo texto
- Botón outline dorado (sobre oscuro): border 1.5px #F5C842, color #F5C842
- Cards: bg #FFFFFF, border 1px #E5E7EB, border-radius 8px, hover shadow 0 8px 24px rgba(17,24,39,0.1)
- Inputs: border 1px #E5E7EB, border-radius 6px, padding 11px 12px, font-size 14px
- Inputs oscuros: border 1px #374151, bg #1F2937, color #FFFFFF
- Paginación activa: bg #111827, color #FFFFFF
- Logo: `ACEROS` + `Y` en dorado #C8991A + `METALES` en #111827, `URGENTES` en JetBrains Mono 11px #6B7280
- Footer: bg #111827, border-top 3px #C8991A
- Badges stock: bg #111827 + texto blanco = disponible / bg #F5C842 + texto #111827 = en tránsito

## Header (idéntico en todas las pantallas)
```
bg: #FFFFFF sticky, border-bottom 1px #E5E7EB, height 76px, max-width 1280px padding 0 40px
Logo izquierda | Nav centro (Aceros/Aluminio/No Ferrosos/Maquinaria) | CTAs derecha
Nav activo: font-weight 600, color #111827, border-bottom 2px #C8991A
Nav inactivo: font-weight 500, color #6B7280
CTA: "Cotizar ahora" bg #C8991A
```

## Footer (idéntico en todas las pantallas)
```
bg #111827, border-top 3px #C8991A
Logo blanco con Y dorado + descripción gris
3 columnas de links en #9CA3AF
Métodos de pago: Mercado Pago / OXXO / SPEI / Tarjeta como badges JetBrains Mono
Copyright: JetBrains Mono 12px #6B7280
```

---

# PANTALLA 3 — Producto Individual

## Contexto
Ficha técnica completa de un producto. Ejemplo: Acero 4140 Barra Redonda.
Layout: Breadcrumb + grid 12 col (8 col izquierda + 4 col panel sticky derecha).

## Breadcrumb
```
Inicio / Catálogo / Acero Maquinaria / 4140 Barra Redonda
Texto: 13px Inter, color #6B7280, separador /, ítem activo color #111827 font-weight 600
```

## Columna izquierda (8 col)

### Galería de imágenes
- Imagen principal: width 100%, height 420px, object-fit cover, border 1px #E5E7EB, border-radius 8px
- Badge esquina superior izquierda: "● En Stock" bg #111827, texto blanco, font-size 11px, font-weight 700, uppercase, padding 5px 10px, border-radius 4px
- 3 miniaturas debajo: 100px x 80px, border 1px #E5E7EB, border-radius 6px, thumbnail activa con border 2px #C8991A

### Info básica (debajo de galería)
- Eyebrow: "ACERO GRADO MAQUINARIA" JetBrains Mono 11px #C8991A uppercase letter-spacing 2px
- Título: "Acero Cromo-Molibdeno 4140" Bebas Neue 52px #111827
- Subtítulo: "Barra Redonda · Col ROL" Inter 16px #6B7280

### Ficha técnica (tabla)
- Título sección: Bebas Neue 32px "Especificaciones Técnicas"
- Tabla header: bg #111827, texto #FFFFFF, font Inter 13px font-weight 700 uppercase
- Filas zebra: #FFFFFF y #F3F4F6 alternando
- Bordes: solo horizontales 1px #E5E7EB
- Columnas: Propiedad | Valor
- Filas: Grado AISI / Composición / Dureza Brinell / Resistencia a tensión / Límite elástico / Aplicaciones típicas / Norma

### Equivalencias internacionales
- Tabla compacta mismo estilo
- Columnas: País · Norma · Designación
- Filas: México/USA - AISI - 4140 / Alemania - DIN - 42CrMo4 / Europa - EN - 1.7225 / Japón - JIS - SCM440

### Archivos disponibles
- Título: Bebas Neue 28px "Documentación técnica"
- 2 botones outline #111827 lado a lado:
  - ↓ Ficha Técnica PDF
  - ↓ Plano DWG
- Nota: "Formato DWG compatible con AutoCAD 2018+" JetBrains Mono 11px #6B7280

### Productos relacionados
- Título: Bebas Neue 36px "Materiales relacionados"
- Fila horizontal de 3 cards mini (mismo componente de card del catálogo)

## Columna derecha — Panel de compra (sticky top 116px)

### Card panel de compra
- bg #FFFFFF, border 1px #E5E7EB, border-radius 8px, padding 24px
- Clave: JetBrains Mono 13px #C8991A uppercase letter-spacing 1px → "SKU: 4140-RD-025"
- Nombre corto: Inter 18px font-weight 700 #111827
- Divider 1px #E5E7EB

### Selector de unidad
- 3 botones tab en fila: "Por Metro" | "Por Kilo" | "Por Pieza"
- Activo: bg #111827, texto #FFFFFF
- Inactivo: bg #FFFFFF, border 1px #E5E7EB, texto #6B7280
- border-radius 6px, font-size 13px font-weight 600

### Calculadora de peso integrada (dark block)
- bg #111827, border-radius 8px, padding 18px
- Inputs oscuros: border 1px #374151, bg #1F2937, texto #FFFFFF
- Grid 2 columnas: Diámetro (mm) | Largo (m)
- Output: "Peso estimado:" #9CA3AF + valor JetBrains Mono 22px font-weight 700 #F5C842 + "kg"
- Misma lógica de cálculo que Homepage y Catálogo

### Precio y cantidad
- "Precio desde:" Inter 13px #6B7280
- Precio: JetBrains Mono 32px font-weight 700 #C8991A → "$XXX.00"
- "MXN/kg" JetBrains Mono 14px #6B7280
- Nota: "Precio varía según cantidad. Cotiza para precio especial." 12px #6B7280
- Input cantidad: con botones − y + en negro, centered, JetBrains Mono

### CTAs
- Botón primario full-width: bg #C8991A "AGREGAR AL CARRITO" uppercase bold
- Botón secundario full-width outline: "SOLICITAR COTIZACIÓN"
- Botón WhatsApp: bg #16A34A, texto blanco, "CONSULTAR DISPONIBILIDAD" + ícono WhatsApp

### Beneficios compactos (al fondo del panel)
- 3 filas con ícono cuadrado #F3F4F6 + texto:
  - 📦 Entrega el mismo día CDMX
  - ✂️ Cortes a medida disponibles
  - 🧾 Factura CFDI incluida

---

# PANTALLA 4 — Dashboard Administrativo

## Contexto
Panel interno de administración. Solo accesible para el admin.
Layout: Sidebar fijo izquierdo 260px (dark) + contenido principal (claro).

## Sidebar
- bg #111827, width 260px, height 100vh, position fixed, border-right 1px #1F2937
- Logo arriba: mismo formato pero todo en blanco/dorado
- Nav con secciones:
  ```
  ● Dashboard          (ícono: cuadrícula)   ← ACTIVO: bg #1F2937, border-left 3px #C8991A
  ○ Pedidos            (ícono: bolsa)
  ○ Inventario         (ícono: caja)
  ○ Cotizaciones       (ícono: documento)
  ○ Clientes           (ícono: personas)
  ○ Reportes           (ícono: gráfica)
  ○ Blog / SEO         (ícono: pluma)
  ○ Configuración      (ícono: engranaje)
  ```
- Nav items: padding 12px 20px, font-size 14px font-weight 500
- Activo: bg #1F2937, border-left 3px #C8991A, texto #FFFFFF
- Inactivo: texto #9CA3AF, hover bg rgba(255,255,255,0.04)
- Labels eyebrow de sección en JetBrains Mono 10px #6B7280 uppercase
- Avatar usuario abajo: foto + nombre + "Administrador" + logout

## Contenido principal (bg #F3F4F6, padding 32px)

### Topbar
- bg #FFFFFF, border-bottom 1px #E5E7EB, height 64px
- Título: Bebas Neue 32px "Dashboard"
- Derecha: fecha + hora en JetBrains Mono + botón "Nuevo pedido" bg #C8991A

### KPIs — fila de 4 cards
- bg #FFFFFF, border 1px #E5E7EB, border-radius 8px, padding 20px 24px
- Cada card:
  - Eyebrow: JetBrains Mono 11px uppercase #6B7280
  - Número grande: Bebas Neue 48px → color según tipo
  - Variación vs ayer: "↑ 12% vs ayer" Inter 12px verde o rojo
- Los 4 KPIs:
  1. "VENTAS HOY" → $XXX,XXX — color #C8991A
  2. "PEDIDOS PENDIENTES" → XX — color #111827
  3. "COTIZACIONES SIN RESPONDER" → XX — color rojo si >5
  4. "CLIENTES NUEVOS (mes)" → XX — color #16A34A

### Grid principal: 2 columnas (2/3 + 1/3)

#### Pedidos recientes (2/3)
- Card bg #FFFFFF, border 1px #E5E7EB, border-radius 8px, padding 24px
- Header: "Pedidos Recientes" Bebas Neue 28px + link "Ver todos →" #C8991A 13px
- Tabla:
  - Header: bg #111827, texto #FFFFFF (mismo estilo de todas las tablas del sistema)
  - Columnas: # Pedido · Cliente · Material · Total · Estado · Acción
  - Filas zebra #FFFFFF / #F3F4F6
  - # Pedido: JetBrains Mono #C8991A
  - Total: JetBrains Mono font-weight 700 #111827
  - Estado badges:
    - "Pendiente" bg #FEF3C7 texto #92400E border 1px #FDE68A
    - "En proceso" bg #DBEAFE texto #1E40AF border 1px #BFDBFE
    - "Entregado" bg #DCFCE7 texto #166534 border 1px #BBF7D0
    - "Cancelado" bg #FEE2E2 texto #991B1B border 1px #FECACA
  - Acción: botón outline mini "Ver" border 1px #E5E7EB border-radius 6px

#### Panel lateral derecho (1/3) — dos cards

**Inventario crítico**
- bg #FFFFFF, border 1px #E5E7EB, border-left 3px #C8991A, border-radius 8px, padding 20px
- Título: "Stock Bajo" Inter 14px font-weight 700 #111827
- Sub: "Requiere atención" JetBrains Mono 11px #6B7280
- Lista de 4-5 materiales:
  - Nombre: Inter 13px font-weight 600
  - Cantidad: JetBrains Mono 12px #6B7280
  - Barra de progreso: bg #F3F4F6, fill rojo o amarillo según stock
- Botón abajo: "Ver inventario completo" outline #111827

**Cotizaciones pendientes**
- bg #111827, border-radius 8px, padding 20px
- Título: "Cotizaciones" Bebas Neue 24px #FFFFFF + span #F5C842
- Lista de 3-4 cotizaciones:
  - Cliente: Inter 13px font-weight 600 #FFFFFF
  - Material: JetBrains Mono 12px #9CA3AF
  - Hace: "hace 2h" 11px #6B7280
  - Botón: "Responder" outline dorado #F5C842 mini
- CTA fondo: "Ver todas las cotizaciones →" #F5C842 13px

### Gráfica de ventas (ancho completo)
- Card bg #FFFFFF, border 1px #E5E7EB, border-radius 8px, padding 24px
- Título: Bebas Neue 28px "Ventas del mes"
- Gráfica de barras simple: barras color #C8991A, fondo #F3F4F6, ejes en #E5E7EB
- Eje X: días del mes en JetBrains Mono 11px #6B7280
- Eje Y: $ MXN en JetBrains Mono 11px #6B7280

---

# PANTALLA 5 — Portal de Clientes (Mi Cuenta)

## Contexto
Área privada del cliente empresarial. Historial, cotizaciones, precios especiales.
Layout: Sidebar izquierdo 240px (claro) + contenido principal.

## Sidebar del cliente
- bg #FFFFFF, border-right 1px #E5E7EB, width 240px
- Avatar/logo empresa arriba con nombre de empresa en Inter 14px font-weight 700
- "Cliente empresarial" badge: bg #F3F4F6, border 1px #E5E7EB, font 11px #6B7280
- Nav:
  ```
  ● Mis pedidos
  ○ Mis cotizaciones
  ○ Lista de precios
  ○ Mis facturas
  ○ Datos de empresa
  ○ Cerrar sesión
  ```
- Activo: border-left 3px #C8991A, texto #111827 font-weight 600
- Inactivo: texto #6B7280

## Contenido — Mis Pedidos (vista por defecto)

### Header
- Título: Bebas Neue 46px "Mis Pedidos"
- Sub: Inter 15px #6B7280 "Historial completo de compras"
- Filtros rápidos en fila: "Todos" | "Pendientes" | "En tránsito" | "Entregados"
  - Activo: bg #111827, texto #FFFFFF, border-radius 6px
  - Inactivo: bg #FFFFFF, border 1px #E5E7EB, texto #6B7280

### Tabla de pedidos
- Mismo estilo de todas las tablas: header #111827 blanco, zebra, bordes horizontales
- Columnas: # Pedido · Fecha · Materiales · Total · Estado · Acciones
- # Pedido: JetBrains Mono #C8991A link
- Fecha: JetBrains Mono #6B7280
- Total: JetBrains Mono font-weight 700 #111827
- Acciones: "Ver detalle" outline mini + "Repetir pedido" outline dorado mini

### Card de resumen lateral (sticky)
- bg #F3F4F6, border 1px #E5E7EB, border-radius 8px, padding 20px
- "Tu nivel:" + badge "Cliente Preferente" bg #C8991A texto blanco
- Descuento activo: "12% en todo el catálogo" Inter 14px font-weight 700 #111827
- Total comprado (mes): JetBrains Mono 28px font-weight 700 #C8991A
- Botón: "Solicitar nueva cotización" bg #C8991A full-width

---

# NOTAS FINALES — LO QUE NUNCA DEBE CAMBIAR

1. El logo siempre: `ACEROS` negro + `Y` dorado + `METALES` negro + `URGENTES` JetBrains Mono gris
2. Los botones primarios SIEMPRE: bg #C8991A uppercase font-weight 700
3. Las tablas SIEMPRE: header #111827 blanco, zebra striping, bordes solo horizontales
4. Los dark blocks SIEMPRE: bg #111827 (nunca azul oscuro ni navy)
5. La calculadora SIEMPRE aparece en dark block #111827 con resultado en #F5C842
6. Los eyebrow labels SIEMPRE: JetBrains Mono 11-12px uppercase letter-spacing 1.5-2px
7. El footer SIEMPRE: bg #111827 border-top 3px #C8991A
8. NUNCA usar el Steel Blue (#162839) de Stitch — ese diseño fue descartado
9. NUNCA usar E67E22 naranja — el dorado correcto es #C8991A / #F5C842
10. NUNCA cambiar Bebas Neue / Inter / JetBrains Mono por otras fuentes
