'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Bebas_Neue, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

// Tipografías exclusivas de la pantalla 404 (diseño Stitch aprobado):
// Bebas Neue para el headline y JetBrains Mono para los callouts técnicos.
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'] });
const jetbrains = JetBrains_Mono({ subsets: ['latin'] });

// Paleta propia de esta pantalla (Stitch 404 — dorado industrial).
const GOLD = '#c8991a';
const GOLD_DARK = '#785a00';
const INK = '#151c27';
const INK_SOFT = '#4e4635';
const BEIGE = '#d2c5af';
const OUTLINE = '#807662';

export default function NotFound() {
  const pathname = usePathname();
  const sparkContainerRef = useRef<HTMLDivElement>(null);

  // Chispas doradas (stitch 404): brotan periódicamente del centro del
  // engrane y en ráfaga al pasar el mouse.
  useEffect(() => {
    const container = sparkContainerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function createSpark() {
      if (!container) return;
      const spark = document.createElement('div');
      spark.className = 'spark';
      const rect = container.getBoundingClientRect();
      spark.style.left = `${rect.width / 2}px`;
      spark.style.top = `${rect.height / 2}px`;
      const tx = (Math.random() - 0.5) * 200;
      const ty = (Math.random() - 0.5) * 200;
      spark.style.setProperty('--spark-x', `${tx}px`);
      spark.style.setProperty('--spark-y', `${ty}px`);
      spark.style.animation = `spark-fly ${0.5 + Math.random()}s cubic-bezier(0, 0.9, 0.57, 1) forwards`;
      container.appendChild(spark);
      setTimeout(() => spark.remove(), 1500);
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        for (let i = 0; i < 3; i++) createSpark();
      }
    }, 800);

    const burst = () => {
      for (let i = 0; i < 10; i++) setTimeout(createSpark, i * 50);
    };
    container.parentElement?.addEventListener('mouseenter', burst);

    return () => {
      clearInterval(interval);
      container.parentElement?.removeEventListener('mouseenter', burst);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="relative flex-grow flex items-center justify-center overflow-hidden bg-[#f9f9ff] px-4 md:px-10 py-24">
        {/* Rejilla estructural de fondo */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-12 h-full w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={i < 11 ? 'h-full border-r border-[#807662]' : 'h-full'} />
            ))}
          </div>
        </div>

        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          {/* Engrane roto */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative animate-tremor">
                  <span
                    className="material-symbols-outlined select-none"
                    style={{
                      fontSize: 'clamp(180px, 20vw, 240px)',
                      color: BEIGE,
                      fontVariationSettings: "'FILL' 0, 'wght' 100",
                    }}
                  >
                    settings
                  </span>
                  {/* La pieza faltante */}
                  <div className="absolute top-1/4 right-0 w-24 h-24 bg-[#f9f9ff] rounded-full" />
                  <span
                    className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ fontSize: 60, color: GOLD, fontVariationSettings: "'FILL' 1" }}
                  >
                    error
                  </span>
                </div>
              </div>
              {/* Capa de chispas */}
              <div ref={sparkContainerRef} className="absolute inset-0 pointer-events-none overflow-visible" />

              {/* Callouts técnicos */}
              <div
                className="absolute top-0 right-0 p-2 bg-[#f9f9ff] shadow-sm border"
                style={{ borderColor: GOLD }}
              >
                <p
                  className={`${jetbrains.className} uppercase`}
                  style={{ fontSize: 12, lineHeight: '16px', color: GOLD_DARK }}
                >
                  Err_Code: 404
                </p>
              </div>
              <div
                className="absolute bottom-10 left-0 p-2 bg-[#f9f9ff] shadow-sm border"
                style={{ borderColor: OUTLINE }}
              >
                <p
                  className={`${jetbrains.className} uppercase`}
                  style={{ fontSize: 12, lineHeight: '16px', color: INK_SOFT }}
                >
                  Status: Structural_Failure
                </p>
              </div>
            </div>
          </div>

          {/* Mensaje y CTAs */}
          <div className="flex flex-col text-center md:text-left gap-8">
            <div>
              <p
                className={`${jetbrains.className} uppercase mb-3 font-bold`}
                style={{ fontSize: 11, letterSpacing: '1.5px', color: GOLD_DARK }}
              >
                Sistemas Interrumpidos
              </p>
              <h1
                className={`${bebas.className} uppercase mb-5`}
                style={{ fontSize: 'clamp(48px, 6vw, 64px)', lineHeight: 1.1, letterSpacing: '0.5px', color: INK }}
              >
                Material No Encontrado
              </h1>
              <p className="text-lg leading-7 max-w-md mx-auto md:mx-0" style={{ color: INK_SOFT }}>
                La ruta solicitada se encuentra fuera de servicio o el material ha sido removido
                de nuestro inventario activo. Verifique las especificaciones e intente de nuevo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center md:justify-start">
              <Link
                href="/catalogo"
                className="text-white transition-all px-8 py-4 rounded-[6px] text-[13px] font-bold uppercase flex items-center justify-center gap-2 active:scale-95 hover:brightness-95"
                style={{ backgroundColor: GOLD }}
              >
                <span className="material-symbols-outlined text-[20px]!">inventory_2</span>
                Volver al Catálogo
              </Link>
              <Link
                href="/"
                className="border-2 transition-all px-8 py-4 rounded-[6px] text-[13px] font-bold uppercase flex items-center justify-center gap-2 active:scale-95 hover:bg-[#151c27] hover:text-white"
                style={{ borderColor: INK, color: INK }}
              >
                <span className="material-symbols-outlined text-[20px]!">home</span>
                Ir al Inicio
              </Link>
            </div>

            {/* Footer técnico */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: BEIGE }}>
              <div className="grid grid-cols-2 gap-8 text-left">
                <div>
                  <p className={`${jetbrains.className} uppercase`} style={{ fontSize: 12, color: '#6B7280' }}>
                    Ubicación Actual
                  </p>
                  <p
                    className={`${jetbrains.className} break-all`}
                    style={{ fontSize: 14, fontWeight: 500, color: INK }}
                  >
                    {pathname || '/error-404'}
                  </p>
                </div>
                <div>
                  <p className={`${jetbrains.className} uppercase`} style={{ fontSize: 12, color: '#6B7280' }}>
                    Reporte Técnico
                  </p>
                  <p className={`${jetbrains.className}`} style={{ fontSize: 14, fontWeight: 500, color: INK }}>
                    Enlace Roto Detectado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
