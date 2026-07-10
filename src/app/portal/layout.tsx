import { Header } from '@/components/shared/header';
import { PortalSidebar } from '@/components/portal/sidebar';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <PortalSidebar />
        <main className="ml-64 p-8">{children}</main>
      </div>
    </>
  );
}
