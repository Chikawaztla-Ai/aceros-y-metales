import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ACEROS Y METALES URGENTES | Distribución Industrial',
    template: '%s | ACEROS Y METALES URGENTES',
  },
  description:
    'Distribución de acero, aluminio, cobre, bronce y metales industriales. Compra por metro, kilo o pieza. Cotiza en 2 minutos. Entrega inmediata.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://acerosymetalesurgentes.com'
  ),
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'ACEROS Y METALES URGENTES',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-sans bg-[#f7f9fb] text-[#191c1e] antialiased">
        {children}
      </body>
    </html>
  );
}
