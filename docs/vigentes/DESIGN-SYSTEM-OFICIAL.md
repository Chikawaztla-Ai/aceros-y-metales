# DESIGN SYSTEM OFICIAL — acerosymetalesurgentes.com
# Sistema: Industrial Precision (Stitch — aprobado)
# Versión: 3.0 — Consolidado de 10 pantallas generadas y aprobadas
# Pantallas de referencia:
#   - Cotización (code.html original)
#   - Homepage · Catálogo
#   - Producto Individual (stitch2/code.html)
#   - Dashboard Administrativo (stitch3/code.html)
#   - Portal de Clientes (stitch4/code.html)
#   - Checkout (stitch5/code.html)
#   - Carrito de Compras (stitch6/code.html)
#   - Blog Técnico — listado (stitch7/code.html)
#   - Blog Técnico — artículo individual (stitch8/code.html)
#
# ⚠️ IMPORTANTE: Este es el sistema OFICIAL y APROBADO.
# NO usar Bebas Neue, JetBrains Mono, #111827, #C8991A ni #F5C842.
# Esos pertenecen a un diseño alternativo descartado.

---

## 1. PALETA DE COLORES

### Colores primarios del sistema
```
primary:              #162839   ← Steel Blue oscuro — header de nav, footer, sidebar dashboard
primary-container:    #2c3e50   ← Steel Blue medio — header de tablas, panel compra, footer
on-primary:           #ffffff   ← Texto sobre primary
on-primary-container: #96a9be   ← Texto secundario sobre primary-container
```

### Acento (naranja/ámbar — SOLO para CTAs principales y highlights)
```
tertiary-container:       #612f00   ← No usar directo
on-tertiary-container:    #f78b30   ← ⭐ Naranja acento — botón "Cotizar ahora", precios, badges urgentes
```

### Superficies (fondos)
```
background:                #f7f9fb   ← Fondo general de la app
surface:                   #f7f9fb   ← Mismo que background
surface-bright:            #f7f9fb
surface-container-lowest:  #ffffff   ← Cards, paneles blancos
surface-container-low:     #f2f4f6   ← Fila alterna zebra, fondos sutiles
surface-container:         #eceef0   ← Fondo calculadora, hover states
surface-container-high:    #e6e8ea   ← Bordes de galería, hovers
surface-container-highest: #e0e3e5   ← Superficies más elevadas
surface-dim:               #d8dadc   ← Scrollbars
surface-variant:           #e0e3e5
```

### Texto
```
on-surface:         #191c1e   ← Texto principal sobre fondos claros
on-surface-variant: #43474c   ← Texto secundario, labels, descripciones
on-background:      #191c1e   ← Igual a on-surface
```

### Bordes
```
outline:          #74777d   ← Bordes de inputs, divisores
outline-variant:  #c4c6cd   ← Bordes de cards, tablas, separadores suaves
```

### Semánticos
```
error:            #ba1a1a   ← KPI de cotizaciones urgentes, badge cancelado
on-error:         #ffffff
verde stock:      #16A34A   ← Badge "En Stock", KPI clientes, estado entregado (hard-coded)
verde entregado:  bg-green-100 / text-green-800 / border-green-200  (Tailwind)
```

### Colores secundarios
```
secondary:          #4b6076   ← Botones secundarios, avatar placeholder, scrollbar thumb portal
on-secondary:       #ffffff
secondary-container: #cce2fc  ← Nav item activo en portal de clientes (bg-secondary-fixed)
secondary-fixed:    #cfe5ff
secondary-fixed-dim: #b3c9e2
on-secondary-fixed: #051d30
```

### Inversos
```
inverse-surface:    #2d3133
inverse-on-surface: #eff1f3
inverse-primary:    #b5c8df
```

---

## 2. TIPOGRAFÍA

### Familias
```
Headlines / Display:  Montserrat (700, 600)
Cuerpo / UI:          Inter (400, 500, 600, 700)
Datos técnicos / SKU: Inter (mono-data role — 500, 13px)
Íconos:               Material Symbols Outlined (stroke 400, FILL 0)
```

### Escala tipográfica
```
display-lg:     Montserrat 700, 48px, line-height 56px, letter-spacing -0.02em
headline-lg:    Montserrat 700, 32px, line-height 40px
headline-md:    Montserrat 600, 24px, line-height 32px
body-lg:        Inter 400, 18px, line-height 28px
body-md:        Inter 400, 16px, line-height 24px
label-md:       Inter 600, 14px, line-height 20px, letter-spacing 0.05em
mono-data:      Inter 500, 13px, line-height 18px
```

### Uso por contexto
```
Títulos de sección grandes:   font-headline-lg text-primary-container uppercase
Subtítulos de sección:        font-headline-md text-primary-container uppercase
Eyebrow labels (categoría):   font-label-md text-[10px] text-on-tertiary-container uppercase
SKUs / precios / medidas:     font-mono-data text-on-tertiary-container (o text-primary)
Texto cuerpo:                 font-body-md text-on-surface-variant
Labels de inputs:             font-label-md text-[11px] text-on-surface-variant uppercase
```

---

## 3. ESPACIADO Y LAYOUT

```
container-max:    1280px   ← max-w-container-max
gutter:           24px     ← gap-gutter entre columnas/cards
margin-desktop:   40px     ← px-margin-desktop (padding horizontal)
margin-mobile:    16px
unit:             8px      ← base del sistema de espaciado
```

### Grids usados
```
Homepage / Cotización:   12 col, 2/3 + 1/3 o 7 + 5
Producto Individual:     12 col, 8 + 4 (contenido + panel sticky)
Catálogo:                3 columnas: filtros(fixed) + resultados + calculadora(sticky)
Dashboard:               sidebar fijo 260px + contenido flex-1, luego grid 2/3+1/3 interior
Portal de Clientes:      sidebar fijo 256px + contenido 12 col interior (9+3)
```

---

## 4. BORDER RADIUS

```
Componentes (botones, inputs, chips): rounded-lg = 0.25rem (4px)
Cards y paneles:                      rounded-lg = 0.25rem (4px) — mismo token
Botones pill (solo nav principal):    rounded-full
Avatares:                             rounded-full
Miniaturas de galería:                rounded-md
Badge de stock:                       rounded-full (pill pequeño)
```
⚠️ El sistema usa radios muy sutiles. No usar rounded-xl ni rounded-2xl.

---

## 5. SOMBRAS

```
Cards hover:     hover:shadow-lg transition-all
Cards default:   shadow-sm
Panel sticky:    shadow-sm overflow-hidden
Barra de búsqueda hero (si aplica): shadow-xl
Sin sombras dramáticas ni blur.
```

---

## 6. COMPONENTES

### Header / Nav principal
```
bg: bg-primary-container (#2c3e50)    ← Fondo azul oscuro
border-bottom: border-outline-variant
height: 76px (py-4)
Logo: "ACEROS Y METALES" font-headline-md bold text-on-primary
      "URGENTES" debajo/lado en text-on-tertiary-container
Nav links: text-on-primary-container opacity-80, hover text-on-tertiary-container
Búsqueda: bg-primary/20 border-none rounded-full text-on-primary
CTA principal: bg-on-tertiary-container text-white rounded-full uppercase font-label-md
Íconos derecha: calculate, account_circle en text-on-primary-container opacity-80
```

### Botones
```
Primario (naranja):    bg-on-tertiary-container text-white px-6 py-2-4
                       font-label-md uppercase rounded-lg
                       hover:brightness-110 active:scale-95 transition-all

Secundario (Steel):    bg-primary-container text-white py-3
                       font-label-md uppercase rounded-lg hover:brightness-110

Outline azul:          border-2 border-primary-container text-primary-container
                       hover:bg-primary-container hover:text-white

Outline gris:          border-2 border-outline text-on-surface-variant
                       hover:border-primary-container hover:text-primary-container

WhatsApp:              bg-green-600 text-white rounded-lg flex items-center gap-2

Sidebar portal:        bg-primary text-on-primary py-3 rounded-lg uppercase
```

### Cards de producto
```
bg-white border border-outline-variant rounded-lg p-4
hover:shadow-lg transition-all group cursor-pointer
Imagen: h-40 rounded-md mb-4 overflow-hidden group-hover:scale-105 transition-transform
Eyebrow: font-label-md text-[9px] text-on-surface-variant uppercase
Título: font-headline-md text-[18px] text-primary-container mb-2
Precio: font-mono-data text-on-tertiary-container font-bold
Ícono carrito: material-symbols-outlined text-on-surface-variant group-hover:text-on-tertiary-container
```

### Tablas (componente clave del sistema)
```
Container: border border-outline-variant rounded-lg overflow-hidden shadow-sm
thead: bg-surface-container-high text-on-surface font-label-md text-label-md uppercase
       (En dashboard: bg-surface-container-low text-on-surface-variant text-[11px])
       (En portal cliente: bg-primary-container text-on-primary)
th: px-6 py-4 border-b border-outline-variant
Filas zebra: bg-white / bg-surface-container-low alternando
td: px-6 py-4 font-body-md
ID/SKU en td: font-mono-data text-on-background (o text-primary para links)
Hover fila: hover:bg-surface-container-low transition-colors
Bordes: divide-y divide-outline-variant (solo horizontales)
```

### Badges de estado
```
En proceso:  bg-on-tertiary-container/10 text-on-tertiary-container text-[10px] font-bold px-2 py-1 rounded uppercase
Entregado:   bg-green-100 text-green-800 border border-green-200 rounded font-label-md text-[11px] uppercase
Pendiente:   bg-red-100 text-red-800 rounded font-label-md text-[11px] uppercase
En Stock:    bg-on-surface text-white px-3 py-1 rounded-full font-mono-data text-[11px] uppercase (con punto verde animado)
En Tránsito: bg-yellow/amber — definir en implementación
```

### Inputs
```
Default claro:
  border border-outline-variant rounded-md (o rounded-lg)
  text-on-surface py-2 px-3 font-mono-data text-sm
  focus:ring-1 focus:ring-primary-container outline-none

Sobre fondo oscuro (calculadora):
  bg-white border border-outline-variant (mismo pero en dark container)

Buscador en header:
  bg-primary/20 border-none rounded-full py-2 pl-10 pr-4
  text-on-primary placeholder:text-on-primary-container/50
  focus:ring-1 focus:ring-on-tertiary-container
```

### Calculadora de peso
```
Container: bg-surface-container p-5 rounded-lg space-y-4 border border-outline-variant
Label eyebrow: font-label-md text-primary-container uppercase text-[10px]
Selects/inputs: bg-white border border-outline-variant rounded-md font-mono-data text-sm
Resultado: "Peso Estimado:" text-on-surface-variant body-sm
           Valor: font-headline-md text-[20px] text-on-tertiary-container "~X.XX Kg"
CTA: border-2 border-primary-container text-primary-container hover:bg-primary-container hover:text-white
```

### Sidebar Dashboard (admin)
```
bg-primary (#162839) width 260px fixed inset-y-0
Logo: font-headline-md text-[20px] text-surface-bright uppercase + label mono text-on-tertiary-container
Nav item activo: text-on-tertiary-container bg-white/10 border-l-4 border-on-tertiary-container rounded
Nav item hover: hover:bg-white/5 transition-colors group, íconos hover:text-on-tertiary-container
Avatar footer: border-t border-white/10, avatar con border border-on-tertiary-container/30
Scrollbar: thumb color #4e6073
```

### Sidebar Portal Cliente
```
bg-surface (#f7f9fb) width 256px border-r border-outline-variant fixed
Title: font-headline-sm text-primary "Industrial Portal"
Nav item activo: bg-secondary-fixed text-on-secondary-fixed font-bold rounded-lg
Nav item hover: hover:bg-surface-container-high rounded-lg
Avatar: bg-secondary text-on-secondary iniciales en círculo
CTA abajo: bg-primary text-on-primary py-3 rounded-lg uppercase
```

### Card "Cliente Preferente" / Nivel
```
bg-surface-container-lowest rounded-lg border border-outline-variant p-6 shadow-sm
Ícono verified: text-on-tertiary-container text-[32px]
Badge nivel: bg-on-tertiary-container text-on-tertiary px-3 py-1 rounded uppercase text-[10px]
Título: font-headline-md text-primary "TU NIVEL: ORO"
Descuento box: bg-surface-container p-4 rounded border border-outline-variant
  Label: font-label-md text-xs text-on-surface-variant uppercase
  Valor: font-headline-md text-on-tertiary-container "12%"
Barra crédito: bg-surface-container rounded-full h-2, fill bg-on-tertiary-container
```

### KPI Cards (dashboard)
```
Default: bg-surface-container-lowest p-6 rounded border border-outline-variant hover:shadow-md
Destacado (pedidos urgentes): bg-primary-container text-white
Con alerta: border-l-4 border-l-error (cotizaciones) o border-l-[#16A34A] (clientes)
Label: font-label-md text-[11px] uppercase mb-2
Número: font-headline-md text-primary (o text-error, text-[#16A34A])
Delta: text-[#16A34A] text-xs font-bold
Nota: font-mono-data text-on-surface-variant con material-symbols-outlined
```

### Equivalencias internacionales (ficha técnica)
```
Grid 4 columnas: grid grid-cols-4 gap-4
Card: p-4 bg-white border border-outline-variant rounded-lg shadow-sm
País/Norma eyebrow: font-label-md text-[10px] text-on-tertiary-container uppercase mb-1
Valor: font-mono-data text-on-surface
```

### Footer
```
bg-primary-container (#2c3e50)
text-on-primary
border-top: border-t-4 border-on-tertiary-container  ← borde naranja de 4px arriba
Grid 4 columnas: grid-cols-4 gap-gutter px-margin-desktop py-12
Logo: font-headline-md text-on-primary uppercase, descripción text-on-primary-container opacity-70
Column headers: font-label-md text-label-md text-on-tertiary-container uppercase mb-6
Links: font-body-md text-on-primary-container opacity-70 hover:underline decoration-on-tertiary-container
Íconos de contacto: text-on-tertiary-container text-[20px]
Copyright bar: border-t border-on-primary-container/10 py-6
  Texto: font-mono-data text-[12px] text-on-primary-container opacity-50
```

### Breadcrumb
```
flex items-center gap-2 font-label-md text-on-surface-variant text-[13px]
Links: hover:text-primary-container transition-colors
Separador: material-symbols-outlined text-[14px] "chevron_right"
Activo (último): font-bold text-on-surface (no link)
```

### Paginación
```
Botón activo: bg-primary (#162839) text-on-primary font-label-md
Botón normal: border border-outline-variant bg-white hover:bg-surface-container
Tamaño: w-8 h-8 (pequeño) o w-10 h-10 (en footer de tabla)
Flechas: chevron_left / chevron_right material-symbols-outlined text-[18px]
```

### Selector de unidad (Metro/Kilo/Pieza)
```
Container: flex bg-surface-container-low p-1 rounded-lg
Botón activo: border-bottom 2px solid #2c3e50, color #2c3e50, bg-white rounded-md shadow-sm
Botón inactivo: text-on-surface-variant hover:text-primary-container
JS: toggle de clases .active-tab
```

### Header simplificado (Checkout)
```
bg-surface h-20 border-b border-outline-variant sticky top-0
Sin nav de navegación — solo logo centrado + indicador de confianza
Derecha: ícono "lock" text-primary + "PAGO 100% SEGURO" font-label-md text-secondary
Objetivo: reducir distracciones y abandono de checkout
```

### Formulario de checkout (secciones numeradas)
```
Section: bg-surface-container-lowest border border-outline-variant p-8 relative
Barra lateral izquierda: absolute top-0 left-0 w-1 h-full bg-primary
Número de paso: bg-primary text-white w-8 h-8 flex items-center justify-center font-headline-md text-sm
Título: font-headline-md uppercase tracking-wide junto al número

⚠️ Inputs de checkout usan rounded-none (esquinas cuadradas) — distinto al resto del sitio:
  h-12 border border-outline px-4 rounded-none bg-surface
Checkbox: w-5 h-5 border-2 border-outline rounded-none
Radio de opciones (envío/pago): input hidden peer + div con
  peer-checked:border-primary peer-checked:bg-surface-container-low
```

### Cards de método de pago (checkout)
```
Card: border border-outline-variant p-6 flex items-center justify-between
       peer-checked:border-primary peer-checked:bg-surface-container-low
Logo del método: w-12 h-12 bg-white border border-outline-variant rounded
Nombre: font-headline-md text-primary text-sm uppercase
Descripción: font-body-md text-on-surface-variant text-sm
Radio custom: w-6 h-6 rounded-full border-2, punto interno bg-primary si está checked
Al seleccionar transferencia: despliega inline datos bancarios en
  bg-surface-container-low border border-outline-variant, font-mono-data
```

### Resumen de pedido (checkout — bloque oscuro)
```
bg-primary text-white p-8 sticky
Título: font-headline-md border-b border-white/20 pb-4 uppercase tracking-tighter
Contraste intencional: única sección oscura de todo el checkout, para destacar el total a pagar
CTA final: bg-on-tertiary-container full-width
```

### Item de carrito
```
Card: bg-white border border-outline-variant, flex layout con imagen 80x80 rounded-md
Nombre: font-body-lg text-primary font-bold (nota: usa body-lg, no headline, para jerarquía más suave)
SKU/specs: font-mono-data text-on-tertiary-container
Selector de cantidad: mismo componente +/- del producto individual
Peso calculado: font-mono-data text-on-surface-variant
Botón eliminar: ícono outline, hover text-error
```

### Panel resumen de carrito (sticky)
```
lg:col-span-4 lg:sticky lg:top-24
bg-surface-container-lowest border border-outline-variant p-6
Título: font-headline-md border-b border-outline-variant pb-4
Líneas de totales en font-body-md + valores font-mono-data
CTA primario: bg-on-tertiary-container "PROCEDER AL PAGO"
CTA secundario: outline "Solicitar cotización de este pedido"
```

### Hero de Blog (editorial, no full-image)
```
bg-surface-container-low, padding vertical generoso
Título: font-display-lg (48px) text-primary — única pantalla que usa display-lg fuera de homepage
Buscador de artículos: mismo estilo que buscador de header, versión clara
```

### Card de artículo de blog
```
bg-white border border-outline-variant rounded-lg overflow-hidden
Imagen 16:9 + badge de categoría: bg-on-tertiary-container text-white rounded-full uppercase text-[10px]
Título: font-headline-md text-primary leading-tight
Meta: font-mono-data text-[11px] text-on-surface-variant "X min de lectura · fecha"
```

### Artículo individual — tabla de contenidos (sidebar sticky)
```
bg-surface-container-lowest border border-outline-variant rounded-lg p-5
Título: font-label-md uppercase text-on-surface-variant "En este artículo"
Lista de links a subtítulos con scroll spy
```

### CTA de conversión en artículo
```
bg-primary-container text-white p-6
Título: font-headline-md "¿Necesita [material] para su proyecto?"
Botón naranja: bg-on-tertiary-container "Ver en catálogo"
Aparece al final del contenido del artículo — momento de mayor intención de compra
```

---

## 7. ÍCONOS

```
Familia: Material Symbols Outlined
Peso: font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24
Tamaño default: text-[20px] a text-[24px]
Tamaño grande: text-[32px] (card preferente)
Tamaño small: text-[18px] (dentro de botones), text-[14px] (breadcrumb)
Color default: heredado del contenedor
Color acento: text-on-tertiary-container (#f78b30)
Color primario: text-primary-container (#2c3e50)
```

### Íconos por función
```
shopping_cart     ← agregar carrito
calculate         ← calculadora
account_circle    ← perfil
search            ← búsqueda
download          ← descargar PDF
architecture      ← plano DWG
local_shipping    ← entrega
verified          ← certificación / nivel cliente
cut               ← corte a medida
dashboard         ← dashboard (FILL 1 cuando activo)
receipt_long      ← pedidos
inventory_2       ← inventario
request_quote     ← cotizaciones
group / groups    ← clientes
settings          ← configuración
more_vert         ← menú adicional
add_circle        ← nuevo pedido
visibility        ← ver detalle
replay            ← repetir pedido
trending_up       ← ventas positivas
schedule          ← tiempo de entrega
pending_actions   ← cotizaciones pendientes
person_add        ← nuevos clientes
support_agent     ← asesor/soporte
share / mail      ← redes/email footer
location_on       ← dirección footer
phone             ← teléfono footer
```

---

## 8. EFECTOS Y MICRO-INTERACCIONES

```
Hover cards:          hover:shadow-lg transition-all
Hover imágenes:       group-hover:scale-105 transition-transform duration-700
Hover botones:        hover:brightness-110
Click botones:        active:scale-95 transition-all
Hover nav links:      hover:text-on-tertiary-container transition-colors
Animación precio:     count-up de 0 a target en 50 pasos (1s aprox) — JS vanilla
Badge En Stock:       punto verde con animate-pulse
Tabs unidades:        toggle de .active-tab con border-bottom y bg-white
Scrollbar custom:     webkit-scrollbar 4-6px, thumb #4e6073 o #d8dadc
Textura de fondo:     fixed inset-0 pointer-events-none opacity-[0.02] carbon-fibre.png
```

---

## 9. PATRONES DE LAYOUT POR PANTALLA

### Cotización (code.html)
```
Header sticky
Hero section con h1 display-lg + grid 12 col (7 form + 5 benefits)
Tabla de specs técnicas ancho completo
Footer
```

### Producto Individual (stitch2)
```
Header sticky
Breadcrumb
Grid 12 col: col-span-8 (galería + tabs + tabla + equivalencias) + col-span-4 sticky (panel compra)
Sección "Materiales relacionados" 4 columnas ancho completo
Footer
```

### Catálogo (Catalogo_dc.html)
```
Header sticky (con input de búsqueda integrado)
Grid 3 col: aside filtros(260px sticky) + main resultados(flex) + aside calculadora+widgets(300px sticky)
Footer
```

### Dashboard (stitch3)
```
aside fijo 260px (bg-primary) + main flex-1 ml-[260px]
  Topbar sticky 76px
  KPIs 4 columnas
  Grid 2/3 + 1/3: tabla pedidos + (inventario crítico + cotizaciones)
  Gráfica ancho completo
```

### Portal Cliente (stitch4)
```
Header nav (bg-primary sticky)
flex: aside 256px (bg-surface) + main flex-1 ml-64
  Header sección con título + búsqueda + exportar
  Grid 12: col-span-9 (tabs + tabla + paginación) + col-span-3 sticky (card nivel + stats + asesor)
Footer
```

### Carrito de Compras (stitch6)
```
Header sticky estándar (con contador de carrito)
Grid 12: col-span-8 (lista de items) + col-span-4 sticky (resumen)
Sin footer decorativo — footer estándar del sitio
```

### Checkout (stitch5)
```
Header SIMPLIFICADO (sin nav, solo logo + indicador de seguridad)
Grid 12: col-span-7 (3 secciones numeradas: facturación/envío/pago) + col-span-5 sticky (resumen oscuro)
Fondo decorativo: structural-grid (mismo patrón de puntos que otras pantallas, opacity 0.05)
Sin footer — pantalla de conversión, minimizar distracciones
```

### Blog Técnico — Listado (stitch7)
```
Header sticky estándar
Hero editorial bg-surface-container-low con buscador
Grid 12: col-span-8 (artículo destacado + grid 2 col de artículos) + col-span-4 sticky (categorías + más leídos + CTA cotización)
Footer estándar
```

### Blog Técnico — Artículo (stitch8)
```
Header sticky estándar
Breadcrumb
Grid 12: col-span-8 (contenido de lectura) + col-span-4 sticky (tabla de contenidos + calculadora + compartir)
CTA de conversión al final del artículo + artículos relacionados
Footer estándar
```

---

## 10. LO QUE NUNCA DEBE CAMBIAR

1. El primario es Steel Blue (#162839 / #2c3e50) — nunca negro #111827
2. El acento es naranja (#f78b30 / on-tertiary-container) — nunca dorado #C8991A
3. Las fuentes son Montserrat + Inter + Material Symbols — nunca Bebas Neue ni JetBrains Mono
4. Los botones CTA principales son SIEMPRE bg-on-tertiary-container (naranja)
5. El footer SIEMPRE bg-primary-container con border-top naranja de 4px
6. Las tablas SIEMPRE con header de superficie (no negro sólido), zebra striping, solo bordes horizontales
7. El sidebar del dashboard SIEMPRE bg-primary (#162839)
8. El sidebar del portal SIEMPRE bg-surface (claro)
9. Los íconos SIEMPRE Material Symbols Outlined — nunca Heroicons ni Lucide
10. Los border-radius SIEMPRE sutiles (4px / rounded-lg) — nunca pill ni rounded-2xl en cards
