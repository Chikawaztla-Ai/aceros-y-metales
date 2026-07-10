import { AdminSidebar } from '@/components/admin/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-low">
      <AdminSidebar />
      <main className="ml-[260px] p-8">{children}</main>
    </div>
  );
}
