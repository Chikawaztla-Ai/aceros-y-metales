# Homepage — acerosymetalesurgentes.com

## Proyecto
Plataforma de ventas industrial B2B para distribuidora de acero, aluminio, metales y plásticos de ingeniería en México. Clientes principales: talleres de maquinado, constructoras, ferreterías y manufactura.

## Estética
Limpio y profesional. Fondo blanco (#FFFFFF), grises estructurales (#F3F4F6, #E5E7EB, #6B7280), acento dorado/ámbar (#C8991A) para CTAs y elementos destacados. Tipografía fuerte — display en Bebas Neue o similar condensada, cuerpo en Inter. Sin efectos oscuros ni neon. Sensación de empresa seria, confiable y moderna.

## Paleta
- Blanco: #FFFFFF
- Gris fondo: #F3F4F6
- Gris borde: #E5E7EB
- Gris texto: #6B7280
- Negro texto: #111827
- Dorado acento: #C8991A
- Dorado claro: #F5C842
- Verde confirmación: #16A34A

## Tipografía
- Display / Títulos: Bebas Neue (bold, condensado)
- Cuerpo: Inter (400, 500, 600)
- Datos / SKUs / códigos: JetBrains Mono

## Secciones del Homepage (en orden)

### 1. Hero
- Headline fuerte: "Acero, Aluminio y Metales — Entrega Urgente"
- Subheadline: "Catálogo industrial con más de 500 materiales. Compra por metro, kilo o pieza. Cotiza en línea en 2 minutos."
- CTA principal (dorado): "Ver Catálogo"
- CTA secundario (outline): "Solicitar Cotización"
- Imagen de fondo o elemento visual: barras de acero apiladas, ambiente industrial limpio
- Barra de búsqueda rápida de productos debajo del CTA

### 2. Barra de confianza
- Fila de íconos con textos cortos:
  - 📦 Entrega el mismo día
  - 🔩 +500 materiales en stock
  - 📐 Cortes a medida
  - 🧾 Factura CFDI
  - 💬 Asesor en WhatsApp

### 3. Categorías principales
- Grid 3x2 o 2x3 con tarjetas grandes
- Categorías: Acero Herramienta · Acero Maquinaria · Inoxidable · Aluminio · No Ferrosos · Plásticos de Ingeniería
- Cada tarjeta: foto o ícono, nombre de categoría, número de SKUs disponibles, botón "Ver productos"

### 4. Calculadora de peso (módulo destacado)
- Sección con fondo gris claro o acento muy suave
- Título: "¿Cuánto pesa tu material?"
- Inputs: Material / Perfil (redondo, solera, placa...) / Medida / Cantidad
- Output en tiempo real: peso total en kg
- CTA: "Agregar al carrito" o "Cotizar este material"

### 5. Productos más solicitados
- Carrusel o grid de 6–8 tarjetas de producto
- Cada tarjeta: imagen, clave AISI, nombre, precio desde (MXN/kg o MXN/m), botón "Ver producto"
- Badge "Más vendido" en amarillo dorado en algunos

### 6. ¿Cómo funciona?
- 3 pasos simples horizontal:
  1. Busca tu material por clave o nombre
  2. Elige cantidad en metro, kilo o pieza
  3. Paga en línea o solicita cotización
- Diseño limpio con números grandes y descripción breve

### 7. Clientes empresariales (B2B highlight)
- Sección oscura (gris muy oscuro #111827) con texto blanco — único bloque oscuro de la página
- Título: "¿Compras en volumen?"
- Beneficios: Precios especiales por volumen · Portal de empresa · Crédito disponible · Facturas automáticas
- CTA: "Registrar mi empresa"

### 8. Blog / Recursos
- 3 artículos recientes en tarjetas
- Temas: guías técnicas, equivalencias de acero, cómo elegir el material correcto
- Diseño editorial limpio

### 9. Footer
- Logo + descripción breve
- Links: Catálogo / Cotización / Blog / Contacto / Aviso de privacidad
- Datos de contacto: WhatsApp, email, teléfono
- Métodos de pago: Mercado Pago, OXXO, SPEI, Tarjeta
- Leyenda: "Aceros y Metales Urgentes · acerosymetalesurgentes.com"

## Componentes UI
- Framework: Next.js + Tailwind CSS + shadcn/ui
- Componentes shadcn sugeridos: Button, Card, Badge, Input, Select, Separator, Sheet (menú móvil)
- Bordes redondeados suaves (rounded-lg, no pill)
- Sombras sutiles (shadow-sm, shadow-md) — sin sombras dramáticas
- Sin gradientes degradados — solo sólidos

## Navegación (Header)
- Logo izquierda
- Centro: Catálogo / Cotización / Blog / Nosotros
- Derecha: Buscar · WhatsApp · Mi cuenta · Carrito (con badge de cantidad)
- Sticky con fondo blanco y borde inferior sutil al hacer scroll

## Responsive
- Mobile first
- En móvil: menú hamburguesa (Sheet de shadcn), calculadora en una columna, categorías en scroll horizontal

## Tono general
Seria, confiable, rápida. No es una tienda de consumidor final — es una plataforma para profesionales que saben lo que buscan. El diseño debe comunicar eficiencia y expertise técnico, no creatividad decorativa.
