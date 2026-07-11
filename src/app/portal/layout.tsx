import { Header } from '@/components/shared/header';
import { PortalSidebar } from '@/components/portal/sidebar';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-surface">
        <PortalSidebar />
        <main className="ml-64 px-10 py-12">{children}</main>
      </div>
    </>
  );
}
