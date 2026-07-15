import Link from 'next/link';

export const metadata = {
  title: 'Índice de Pantallas · Demo',
  description: 'Recorrido por todas las pantallas del sitio para revisión del cliente.',
};

interface Screen {
  href: string;
  label: string;
  desc: string;
  icon: string;
}

const publico: Screen[] = [
  { href: '/', label: 'Inicio', desc: 'Home con hero, categorías, productos y calculadora.', icon: 'home' },
  { href: '/catalogo', label: 'Catálogo', desc: 'Listado de materiales con filtros y calculadora.', icon: 'inventory_2' },
  { href: '/catalogo/acero-4140-barra-redonda', label: 'Detalle de Producto', desc: 'Ficha técnica, galería y panel de compra.', icon: 'article' },
  { href: '/cotizacion', label: 'Cotización', desc: 'Formulario B2B para solicitar precios.', icon: 'request_quote' },
  { href: '/carrito', label: 'Carrito', desc: 'Resumen de compra con IVA y totales.', icon: 'shopping_cart' },
  { href: '/checkout', label: 'Checkout', desc: 'Pago (facturación, envío, Mercado Pago / transferencia).', icon: 'payments' },
  { href: '/nosotros', label: 'Nosotros', desc: 'Historia, valores, infraestructura y certificaciones.', icon: 'domain' },
  { href: '/blog', label: 'Blog Técnico', desc: 'Listado de artículos y recursos.', icon: 'menu_book' },
  { href: '/blog/acero-1018-vs-1045', label: 'Artículo de Blog', desc: 'Artículo individual con tabla de contenidos.', icon: 'description' },
  { href: '/login', label: 'Login / Registro', desc: 'Acceso e inicio de sesión de clientes.', icon: 'login' },
];

const admin: Screen[] = [
  { href: '/admin', label: 'Dashboard', desc: 'KPIs, pedidos recientes, stock bajo y cotizaciones.', icon: 'dashboard' },
  { href: '/admin/pedidos', label: 'Pedidos', desc: 'Gestión de pedidos con estatus y facturación.', icon: 'receipt_long' },
  { href: '/admin/inventario', label: 'Inventario', desc: 'SKUs, niveles de stock y ubicaciones.', icon: 'inventory' },
  { href: '/admin/cotizaciones', label: 'Cotizaciones', desc: 'Bandeja de solicitudes por responder.', icon: 'request_quote' },
  { href: '/admin/crm', label: 'CRM / Ventas', desc: 'Pipeline, interacciones y top agentes.', icon: 'insights' },
  { href: '/admin/clientes', label: 'Clientes', desc: 'Cartera con niveles y crédito.', icon: 'group' },
  { href: '/admin/clientes/CLI-0012', label: 'Perfil de Cliente', desc: 'Detalle: finanzas, actividad y documentos.', icon: 'badge' },
  { href: '/admin/logistica', label: 'Logística / Flota', desc: 'Monitoreo de unidades en vivo y alertas.', icon: 'local_shipping' },
  { href: '/admin/maquinaria', label: 'Maquinaria', desc: 'Control de flota y mantenimiento.', icon: 'precision_manufacturing' },
  { href: '/admin/config', label: 'Ajustes', desc: 'Tasas, seguridad y tarifario por zona.', icon: 'settings' },
];

const portal: Screen[] = [
  { href: '/portal', label: 'Mis Pedidos', desc: 'Historial de compras con estatus.', icon: 'inventory_2' },
  { href: '/portal/cotizaciones', label: 'Mis Cotizaciones', desc: 'Solicitudes y su conversión a pedido.', icon: 'request_quote' },
  { href: '/portal/precios', label: 'Lista de Precios', desc: 'Precios preferenciales por nivel.', icon: 'list_alt' },
  { href: '/portal/facturas', label: 'Facturas', desc: 'Comprobantes CFDI (PDF / XML).', icon: 'receipt_long' },
  { href: '/portal/direcciones', label: 'Mis Direcciones', desc: 'Puntos de entrega con mapa.', icon: 'location_on' },
  { href: '/portal/cuenta', label: 'Mi Perfil', desc: 'Datos de la cuenta y seguridad.', icon: 'manage_accounts' },
];

function Grid({ items }: { items: Screen[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="group bg-white border border-outline-variant rounded-lg p-5 flex items-start gap-4 hover:shadow-lg hover:border-primary-container transition-all"
        >
          <div className="w-11 h-11 rounded-lg bg-primary-container/10 flex items-center justify-center shrink-0 group-hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-primary-container group-hover:text-white text-[24px]">
              {s.icon}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-montserrat font-semibold text-primary-container group-hover:text-on-tertiary-container transition-colors">
              {s.label}
            </h3>
            <p className="text-sm text-on-surface-variant mt-0.5">{s.desc}</p>
            <span className="text-[11px] font-medium text-on-surface-variant/60">{s.href}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="material-symbols-outlined text-on-tertiary-container text-[28px]">{icon}</span>
      <div>
        <h2 className="font-montserrat font-bold text-2xl text-primary-container uppercase tracking-tight leading-none">
          {title}
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

export default function DemoIndexPage() {
  return (
    <div className="bg-surface-low min-h-screen">
      {/* Encabezado */}
      <div className="bg-primary text-white">
        <div className="max-w-container mx-auto px-10 py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[4px] text-on-tertiary-container mb-4">
            Recorrido para revisión
          </p>
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">Índice de Pantallas</h1>
          <p className="text-on-primary-container max-w-2xl">
            Todas las pantallas del sitio en un solo lugar. Haz clic en cualquiera para verla.
            Incluye la tienda pública, el panel administrativo y el portal de clientes.
          </p>
        </div>
      </div>

      <div className="max-w-container mx-auto px-10 py-16 space-y-16">
        <section>
          <SectionTitle icon="public" title="Sitio Público" subtitle="Lo que ve cualquier visitante y comprador." />
          <Grid items={publico} />
        </section>

        <section>
          <SectionTitle icon="admin_panel_settings" title="Panel Administrativo" subtitle="Gestión interna: pedidos, inventario, CRM, logística." />
          <Grid items={admin} />
        </section>

        <section>
          <SectionTitle icon="account_circle" title="Portal de Clientes" subtitle="Área privada del cliente B2B tras iniciar sesión." />
          <Grid items={portal} />
        </section>

        <p className="text-xs text-on-surface-variant border-t border-outline-variant pt-6">
          Nota: las pantallas de panel y portal normalmente requieren inicio de sesión. En este entorno de
          demostración están abiertas para facilitar la revisión. Los datos mostrados son de ejemplo.
        </p>
      </div>
    </div>
  );
}
