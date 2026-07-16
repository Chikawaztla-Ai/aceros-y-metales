'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Logo oficial del cliente (JLVC — José Luis Vázquez Cruz).
 *
 * Dos versiones del lockup, ya recortadas al contenido:
 *  - horizontal (cubo a la izquierda + texto): para el header.
 *  - vertical (cubo arriba, texto abajo): para el footer.
 *
 * Los archivos NO tienen transparencia (fondo blanco sólido), y el
 * header/footer son azul oscuro, así que el logo va sobre una placa blanca
 * —se ve deliberado y evita el recuadro blanco "accidental"—. Si el cliente
 * entrega una versión en vector/transparente, se puede quitar la placa.
 *
 * Si el archivo falta, cae al nombre en texto (sin ícono roto). No basta
 * onError: la imagen se renderiza en el servidor y puede fallar antes de que
 * React hidrate, así que al montar verificamos el estado real.
 */
export function BrandLogo({ variant = 'horizontal' }: { variant?: 'horizontal' | 'vertical' }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [falló, setFalló] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFalló(true);
  }, []);

  if (falló) {
    // Fallback: nombre en texto
    return (
      <span className="flex flex-col leading-none">
        <span className="font-montserrat font-bold text-lg text-on-primary tracking-tighter uppercase">
          ACEROS Y METALES
        </span>
        <span className="text-[10px] font-bold text-on-tertiary-container tracking-[3px] uppercase">
          URGENTES
        </span>
      </span>
    );
  }

  const src = variant === 'vertical' ? '/images/logo/logo-vertical.png' : '/images/logo/logo-horizontal.png';

  return (
    <span className={`bg-white rounded-md inline-flex items-center justify-center shrink-0 ${variant === 'vertical' ? 'p-3' : 'px-3 py-2'}`}>
      <img
        ref={imgRef}
        src={src}
        alt="Aceros y Metales Urgentes — José Luis Vázquez Cruz"
        className={variant === 'vertical' ? 'h-24 w-auto object-contain' : 'h-9 w-auto object-contain'}
        onError={() => setFalló(true)}
      />
    </span>
  );
}
