# Prompts Claude Design — acerosymetalesurgentes.com
# Basado en el sistema de diseño "Industrial Precision" generado por Stitch

---

# PANTALLA 2 — Homepage

## Contexto
Homepage principal de acerosymetalesurgentes.com. Plataforma B2B de distribución de acero, aluminio, metales y plásticos de ingeniería en México. Clientes: talleres de maquinado, constructoras, ferreterías, manufactura.

## Sistema de diseño (respetar exactamente)
- Primary (Steel Blue): #162839
- Vivid Orange (solo CTAs): #E67E22
- Background: #f7f9fb
- Surface: #ffffff
- on-surface-variant: #43474c
- outline-variant: #c4c6cd
- primary-container: #2c3e50
- Tipografía headlines: Montserrat 700
- Tipografía cuerpo: Inter 400/500/600
- Tipografía datos/SKU: Inter mono-data
- Border radius: 4px componentes, 8px cards
- Grid decorativo de puntos: radial-gradient(#162839 0.5px, transparent 0.5px) opacity 0.05
- Sombras: crisp "0px 4px 12px rgba(44, 62, 80, 0.08)"
- Icons: Material Symbols Outlined 2px stroke

## Header (igual al de la pantalla de cotización)
- Logo izquierda
- Nav centro: Catálogo / Cotización / Blog / Nosotros
- Derecha: WhatsApp CTA (naranja) + carrito + cuenta
- Sticky, fondo blanco, borde inferior outline-variant

## Secciones en orden

### Hero
- Headline Montserrat 700 48px: "Acero y Metales — Disponibilidad Inmediata"
- Subheadline Inter: "Más de 500 materiales en stock. Compra por metro, kilo o pieza. Cotiza en 2 minutos."
- CTA principal naranja (#E67E22): "Ver Catálogo"
- CTA secundario outline Steel Blue: "Solicitar Cotización"
- Barra de búsqueda rápida debajo (placeholder: "Busca por clave, grado o material... Ej: 4140, D2, 6061")
- Fondo: grid de puntos Industrial igual al de la pantalla de cotización

### Barra de confianza (fondo surface-container-low)
- 5 íconos Material Symbols con texto corto en fila:
  - local_shipping → Entrega el mismo día
  - inventory_2 → +500 SKUs en stock
  - content_cut → Cortes a medida
  - receipt_long → Factura CFDI
  - support_agent → Asesor WhatsApp

### Categorías principales
- Grid 3 columnas desktop / 2 columnas tablet / 1 columna mobile
- 6 tarjetas: Acero Herramienta · Acero Maquinaria · Inoxidable · Aluminio · No Ferrosos · Plásticos de Ingeniería
- Cada tarjeta: ícono grande Material Symbols, nombre categoría Montserrat bold, cantidad de SKUs en mono-data, hover con border-primary
- Borde 1px outline-variant, bg blanco, rounded-lg

### Calculadora de peso (fondo surface-container-low)
- Bloque destacado con borde izquierdo 4px naranja
- Título: "Calculadora de Peso"
- 4 inputs en fila: Material / Perfil / Medida / Cantidad
- Output en tiempo real: "Peso estimado: — kg"
- CTA naranja: "Agregar al carrito"
- Nota pequeña: "El peso es aproximado. Varía según aleación y tolerancia."

### Productos más solicitados
- Título Montserrat: "Más Solicitados"
- Grid 4 columnas de tarjetas de producto
- Cada tarjeta: imagen o placeholder gris, badge "Más vendido" naranja, clave AISI en mono-data, nombre en Montserrat, precio desde en Inter, botón "Ver producto" outline
- Quick Spec al fondo de cada tarjeta (fondo surface-container-low): Presentación / Unidad

### Tabla de especificaciones rápidas
- Exactamente igual al componente de la pantalla de cotización (Steel Blue header, zebra striping)
- Título: "Especificaciones Técnicas Comunes"
- Columnas: Material / Grado / Dureza HB / Aplicación / Resistencia PSI

### Clientes empresariales (fondo primary #162839, texto blanco)
- Único bloque oscuro de la página
- Título blanco Montserrat: "¿Compras en Volumen?"
- 4 beneficios en grid: Precios por volumen / Portal empresarial / Crédito 30-60-90 días / Facturas automáticas
- Íconos en primary-fixed (azul claro)
- CTA naranja: "Registrar mi empresa"

### Footer
- Exactamente igual al de la pantalla de cotización:
  - Fondo primary #162839
  - Logo + descripción
  - 3 columnas de links
  - Copyright centrado

---

# PANTALLA 3 — Página de Producto Individual

## Contexto
Ficha técnica de un producto específico. Ejemplo: Acero 4140 Barra Redonda. Debe mostrar toda la información técnica, opciones de compra por metro/kilo/pieza y calculadora de peso integrada.

## Sistema de diseño
Mismo que pantalla 2 (Industrial Precision).

## Layout
- Breadcrumb: Inicio / Catálogo / Acero Maquinaria / 4140 Barra Redonda
- Grid 12 columnas: 7 col contenido izquierda + 5 col panel de compra derecha (sticky)

## Panel izquierdo

### Galería
- Imagen principal grande con borde outline-variant
- 3 miniaturas debajo
- Badge "En Stock" verde en esquina superior

### Ficha técnica (tabla)
- Título Montserrat: "Especificaciones Técnicas"
- Tabla con header Steel Blue exactamente igual al componente existente
- Filas: Grado AISI / Composición / Dureza / Resistencia a la tensión / Aplicaciones / Norma

### Equivalencias internacionales
- Tabla secundaria más compacta
- Columnas: País / Norma / Designación
- Ejemplo: México/USA - AISI - 4140 / Alemania - DIN - 42CrMo4 / Europa - EN - 1.7225

### Archivos disponibles
- Sección con 2 botones outline:
  - download → Ficha Técnica PDF
  - description → Plano DWG
- Íconos Material Symbols

## Panel derecho (sticky)

### Info del producto
- Clave: 4140 en mono-data grande y naranja
- Nombre: Acero Cromo-Molibdeno 4140 en Montserrat bold
- Presentación: Barra Redonda

### Selector de unidad de compra
- 3 tabs/botones: Por Metro / Por Kilo / Por Pieza
- Al seleccionar cambia el input y la calculadora

### Calculadora de peso integrada
- Input: Diámetro (mm) / Longitud (m)
- Output en tiempo real: Peso por pieza / Peso total
- Fondo surface-container-low, borde izquierdo naranja

### Precio
- Precio desde: $XXX MXN/kg en Montserrat bold grande
- Nota: "Precio sujeto a cantidad. Cotiza para precio especial."

### Cantidad y CTA
- Input de cantidad con + y -
- CTA primario naranja grande: "Agregar al Carrito"
- CTA secundario outline: "Solicitar Cotización"
- Botón WhatsApp verde con ícono: "Consultar disponibilidad"

### Beneficios compactos
- 3 íconos pequeños: Entrega inmediata / Cortes disponibles / Factura CFDI

---

# PANTALLA 4 — Catálogo con Filtros

## Contexto
Listado completo de productos con filtros laterales. Preparado para miles de SKUs.

## Sistema de diseño
Mismo Industrial Precision.

## Layout
- Sidebar izquierdo 3 col (filtros) + Grid derecho 9 col (productos)

## Sidebar de filtros
- Título: "Filtrar Productos" Montserrat bold
- Acordeones (colapsables):
  - Categoría (checkboxes): Herramienta / Maquinaria / Inoxidable / Aluminio / No Ferrosos / Plásticos
  - Unidad de venta (radio): Por metro / Por kilo / Por pieza / Cualquiera
  - Grado/Aleación (checkboxes con búsqueda)
  - Presentación (checkboxes): Barra redonda / Solera / Placa / Hexagonal / Tubo
  - Rango de precio (slider dual)
- Botón: "Aplicar filtros" naranja / "Limpiar" outline

## Área de productos
- Barra superior: "Mostrando 48 de 512 productos" + ordenar por (precio / más vendido / nombre) + vista grid/lista
- Grid 3 columnas de tarjetas de producto (mismo componente que homepage)
- Paginación al fondo: anterior / 1 2 3 ... 11 / siguiente en Steel Blue

## Barra de búsqueda activa
- Si hay filtros aplicados, mostrar chips/tags eliminables: "4140 ✕" "Barra Redonda ✕" etc.

---

# PANTALLA 5 — Dashboard Administrativo

## Contexto
Panel interno para el administrador. Gestión de pedidos, inventario, clientes y cotizaciones.

## Sistema de diseño
- Mismo Industrial Precision PERO sidebar de navegación oscuro (primary #162839)
- Contenido en background claro #f7f9fb
- Accent naranja para métricas positivas y CTAs

## Layout
- Sidebar fijo izquierdo 260px (fondo primary #162839)
- Contenido principal resto del ancho

## Sidebar
- Logo blanco arriba
- Navegación con íconos Material Symbols:
  - dashboard → Dashboard
  - shopping_bag → Pedidos
  - inventory_2 → Inventario
  - request_quote → Cotizaciones
  - groups → Clientes
  - bar_chart → Reportes
  - settings → Configuración
- Ítem activo: fondo primary-container, texto blanco
- Ítem hover: fondo rgba blanco 0.05

## Dashboard principal

### KPIs (fila de 4 cards)
- Ventas hoy: $XXX,XXX MXN (verde si sube)
- Pedidos pendientes: XX (naranja)
- Cotizaciones sin responder: XX (rojo)
- Clientes nuevos este mes: XX
- Cada card: borde 1px, fondo blanco, ícono Steel Blue, número Montserrat bold grande

### Pedidos recientes (tabla)
- Header Steel Blue exactamente igual al componente existente
- Columnas: # Pedido / Cliente / Material / Total / Estado / Acciones
- Estado como badges de color: Pendiente (amarillo) / En proceso (azul) / Entregado (verde) / Cancelado (rojo)
- Zebra striping igual al componente

### Inventario crítico (alerta)
- Bloque con borde izquierdo naranja
- Título: "Stock Bajo — Requiere Atención"
- Lista de 3-5 materiales con barra de progreso de stock

### Cotizaciones recientes
- Lista compacta con: cliente / material / fecha / botón "Responder" naranja

---

# NOTAS GENERALES PARA TODAS LAS PANTALLAS

## Consistencia obligatoria
- Header SIEMPRE igual al de la pantalla de cotización (código de referencia ya generado)
- Footer SIEMPRE igual al de la pantalla de cotización
- Grid de puntos industriales como decoración de fondo en secciones hero
- Botones primarios SIEMPRE naranja #E67E22 uppercase bold
- Tablas SIEMPRE con header Steel Blue y zebra striping
- Íconos SIEMPRE Material Symbols Outlined 2px stroke

## Lo que NO hacer
- No usar gradientes decorativos
- No usar sombras grandes o dramáticas
- No cambiar los colores del sistema
- No usar border radius mayor a 8px
- No usar fuentes distintas a Montserrat e Inter
- No poner más de un bloque oscuro por pantalla
