'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Logo de la marca: imagotipo del cliente (JLVC) en un recuadro blanco
 * —para que el logo negro contraste sobre el header/footer azul— junto al
 * nombre "ACEROS Y METALES / URGENTES".
 *
 * Si /images/logo/imagotipo.png todavía no existe, la imagen se oculta y
 * queda solo el texto (sin ícono roto). En cuanto se coloque el archivo,
 * aparece automáticamente.
 *
 * OJO: no basta con onError. La imagen se renderiza en el servidor y puede
 * fallar ANTES de que React hidrate, en cuyo caso el handler nunca se
 * dispara y queda el ícono roto. Por eso al montar revisamos el estado real
 * (complete && naturalWidth === 0 = falló) además de escuchar onError.
 */
export function BrandLogo() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [falló, setFalló] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFalló(true);
  }, []);

  return (
    <>
      {!falló && (
        <img
          ref={imgRef}
          src="/images/logo/imagotipo.png"
          alt="Aceros y Metales Urgentes"
          className="h-11 w-11 object-contain bg-white rounded-md p-1 shrink-0"
          onError={() => setFalló(true)}
        />
      )}
      <span className="flex flex-col leading-none">
        <span className="font-montserrat font-bold text-lg text-on-primary tracking-tighter uppercase">
          ACEROS Y METALES
        </span>
        <span className="text-[10px] font-bold text-on-tertiary-container tracking-[3px] uppercase">
          URGENTES
        </span>
      </span>
    </>
  );
}
