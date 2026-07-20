import { Header } from '@/components/shared/header';
import { PortalSidebar, PortalMobileNav } from '@/components/portal/sidebar';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-surface">
        <PortalSidebar />
        <main className="px-4 py-6 md:ml-64 md:px-10 md:py-12">
          <PortalMobileNav />
          {children}
        </main>
      </div>
    </>
  );
}
