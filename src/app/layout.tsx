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
      <head>
        {/* Material Symbols Outlined — íconos del design system oficial */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0&display=block"
        />
      </head>
      <body className="font-sans bg-[#f7f9fb] text-[#191c1e] antialiased">
        {children}
      </body>
    </html>
  );
}
