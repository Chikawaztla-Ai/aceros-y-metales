import Link from 'next/link';
import { AdminModuleHeader, AdminStat, AdminExportButton } from '@/components/admin/module-header';

const stats = [
  { label: 'Clientes Activos', value: '124' },
  { label: 'Nuevos (mes)', value: '15', accent: true },
  { label: 'Crédito Otorgado (MXN)', value: '$4.2M' },
];

const clients = [
  { id: 'CLI-0012', company: 'Construcciones Alpha S.A.', contact: 'Ing. Roberto Garza', projects: 8, credit: '$500,000', status: 'Oro' },
  { id: 'CLI-0034', company: 'Industrial Monterrey Q.', contact: 'Lic. María Elena Sosa', projects: 3, credit: '$250,000', status: 'Plata' },
  { id: 'CLI-0058', company: 'Logística Global S.C.', contact: 'Ing. Juan Delgado', projects: 5, credit: '$350,000', status: 'Oro' },
  { id: 'CLI-0071', company: 'Aceros del Bajío', contact: 'C. Pedro Ramírez', projects: 1, credit: '$80,000', status: 'Bronce' },
  { id: 'CLI-0090', company: 'Metalúrgica del Norte', contact: 'Ing. Ana Torres', projects: 6, credit: '$420,000', status: 'Oro' },
];

function tierBadge(tier: string) {
  switch (tier) {
    case 'Oro': return 'bg-on-tertiary-container/10 text-on-tertiary-container';
    case 'Plata': return 'bg-surface-container-high text-on-surface-variant';
    case 'Bronce': return 'bg-amber-100 text-amber-800';
    default: return 'bg-surface-container text-on-surface-variant';
  }
}

export default function AdminClientes() {
  return (
    <div className="p-10">
      <AdminModuleHeader
        title="Clientes Corporativos"
        subtitle="Cartera de clientes, líneas de crédito y proyectos activos."
        searchPlaceholder="Buscar empresa o contacto..."
        actions={<AdminExportButton />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <AdminStat key={s.label} {...s} />
        ))}
      </div>

      <div className="bg-white border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-primary text-white">
                {['Client ID', 'Empresa', 'Contacto', 'Proyectos Activos', 'Límite de Crédito', 'Nivel', 'Acciones'].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((c, i) => (
                <tr key={c.id} className={`border-b border-outline-variant ${i % 2 === 1 ? 'bg-surface-low' : ''} hover:bg-surface-container transition-colors`}>
                  <td className="px-6 py-4 text-sm font-medium text-primary">{c.id}</td>
                  <td className="px-6 py-4 text-sm font-bold">{c.company}</td>
                  <td className="px-6 py-4 text-sm">{c.contact}</td>
                  <td className="px-6 py-4 text-sm text-center font-medium">{c.projects}</td>
                  <td className="px-6 py-4 text-sm font-medium">{c.credit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 font-bold rounded text-xs uppercase ${tierBadge(c.status)}`}>{c.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href="/admin/clientes" className="p-2 inline-flex hover:bg-surface-container text-primary transition-colors" title="Ver perfil">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
