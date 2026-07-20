import { AdminSidebar } from '@/components/admin/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-low">
      <AdminSidebar />
      <main className="md:ml-[260px] flex flex-col min-h-screen">{children}</main>
    </div>
  );
}
