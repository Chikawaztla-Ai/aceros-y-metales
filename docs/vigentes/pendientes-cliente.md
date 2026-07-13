# Pendientes del Cliente — acerosymetalesurgentes.com

> **Estado del proyecto:** el sitio completo está construido y navegable (30+ pantallas: tienda pública, cotización, blog, panel administrativo y portal de clientes). Todo funciona con **datos de ejemplo**. Para pasar a producción necesitamos de tu lado la siguiente información y decisiones.

Marca cada punto conforme lo entregues. Lo que está ✅ ya lo resolvemos nosotros; lo que está ⬜ **depende de ti**.

---

## 1. Identidad y contenido de marca

| | Pendiente | Detalle |
|---|---|---|
| ⬜ | **Logo en vector** | El logo actual (JLVC / José Luis Vázquez Cruz) solo lo tenemos como foto escaneada de baja calidad. Necesitamos el original en **.AI, .SVG o .EPS** (o .PDF vectorial). Si no existe, cotizamos su reconstrucción. |
| ⬜ | **Fotos reales de producto** | Hoy usamos imágenes genéricas. Idealmente fotos de tu inventario real (barras, placas, perfiles) sobre fondo neutro. |
| ⬜ | **Fotos de instalaciones** | Almacén, flota, maquinaria, equipo de trabajo — para las secciones "Nosotros" y hero. |
| ⬜ | **Textos definitivos** | Confirmar/ajustar: descripción de la empresa, años de experiencia reales, número de SKUs, cobertura geográfica, historia. |
| ⬜ | **Datos de contacto** | Dirección física, teléfono, WhatsApp oficial, correo de ventas, horario. |
| ⬜ | **Certificaciones reales** | ¿Cuentan con ISO 9001 / ASTM / otras? Para mostrarlas o quitarlas. |

---

## 2. Catálogo de productos

| | Pendiente | Detalle |
|---|---|---|
| ⬜ | **Lista real de materiales** | SKU, nombre, grado/norma, categoría, unidad de venta (metro/kilo/pieza), precio. Ideal en Excel/CSV. Hoy hay 9 productos de ejemplo. |
| ⬜ | **Precios y si llevan IVA** | Confirmado en el PRD: precios SIN IVA y se suma 16% en checkout. Validar que siga vigente. |
| ⬜ | **Niveles de cliente / descuentos** | El portal muestra niveles Oro/Plata/Bronce con % de descuento. Definir si aplican y sus reglas. |
| ⬜ | **Existencias / stock** | ¿Cómo se actualizará el inventario? (manual en el panel, o integración con su sistema actual). |

---

## 3. Pagos (backend — requiere cuentas del cliente)

| | Pendiente | Detalle |
|---|---|---|
| ⬜ | **Mercado Pago** | Crear/entregar acceso a la cuenta y generar credenciales productivas: `Access Token`, `Public Key` y `Webhook Secret`. |
| ⬜ | **Datos bancarios (transferencia SPEI)** | Banco, beneficiario, **CLABE** y número de cuenta reales para el método de transferencia. |
| ⬜ | **Política de confirmación** | Confirmado en el PRD: el stock se descuenta al confirmarse el pago; transferencias expiran a las 48 h. Validar. |
| ⬜ | **¿OXXO / otros métodos?** | Definir si se habilitan métodos adicionales. |

---

## 4. Correos transaccionales

| | Pendiente | Detalle |
|---|---|---|
| ⬜ | **Dominio verificado para correo** | Para enviar desde `pedidos@acerosymetalesurgentes.com` necesitamos configurar registros DNS (SPF/DKIM) con el proveedor Resend. |
| ⬜ | **Correo del administrador** | A dónde llegan las cotizaciones y avisos de pedidos nuevos. |

---

## 5. Base de datos y hosting (lo montamos nosotros, requiere tu OK)

| | Pendiente | Detalle |
|---|---|---|
| ✅ | Estructura de base de datos | Migraciones ya escritas (Supabase / PostgreSQL). |
| ⬜ | **Cuenta de Supabase** | Crear el proyecto productivo (nosotros lo configuramos) o autorizar que lo creemos. |
| ⬜ | **Dominio** | Confirmar que `acerosymetalesurgentes.com` está registrado y a quién pertenece el acceso (para apuntar DNS a Vercel). |
| ⬜ | **Hosting/deploy** | Aprobar el despliegue en Vercel. |

---

## 6. Analítica y marketing (opcional para el lanzamiento)

| | Pendiente | Detalle |
|---|---|---|
| ⬜ | Google Analytics 4 | ID de medición. |
| ⬜ | Meta Pixel | ID (si harán campañas en Facebook/Instagram). |
| ⬜ | Google Search Console | Verificación del dominio. |
| ⬜ | Contenido del blog | Artículos técnicos reales (hoy hay ejemplos). |

---

## Resumen: lo mínimo para salir a producción

Si el objetivo es lanzar lo antes posible, el **camino crítico** es:

1. **Logo vectorial** + fotos y datos de contacto.
2. **Catálogo real** (Excel con productos y precios).
3. **Mercado Pago** (credenciales) + **datos bancarios**.
4. **Correo** (dominio verificado + correo admin).
5. **Supabase + dominio + deploy** (nosotros lo montamos con tu OK).

Los puntos de **analítica y blog** pueden quedar para después del lanzamiento sin bloquear la venta en línea.

---

*Documento generado como parte del handoff técnico. Cualquier duda sobre un punto, la aclaramos antes de que lo consigas para no perder tiempo.*
