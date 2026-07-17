import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { BottomNav } from '@/components/shared/bottom-nav';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      {/* pb-20 en móvil: deja espacio para la barra inferior fija (h-20). */}
      <div className="pb-20 md:pb-0">
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}
