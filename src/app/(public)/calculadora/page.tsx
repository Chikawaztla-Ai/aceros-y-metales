'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { calcWeight, formatWeight, DENSITIES, type Profile } from '@/lib/weight-calculator';
import { useCountUp } from '@/lib/use-count-up';

const materials = Object.keys(DENSITIES).map((key) => ({
  value: key,
  label: key.charAt(0).toUpperCase() + key.slice(1),
}));

// Referencia aproximada MXN/kg para el estimado de costo — no son precios de catálogo.
const PRECIO_REF: Record<string, number> = {
  acero: 32,
  inox: 68,
  aluminio: 95,
  cobre: 210,
  bronce: 175,
  laton: 160,
  nylamid: 145,
  acetal: 130,
  ptfe: 380,
  hdpe: 55,
};

const shapes: { value: Profile; label: string; icon: string }[] = [
  { value: 'placa', label: 'Placa', icon: 'rectangle' },
  { value: 'redondo', label: 'Redondo', icon: 'circle' },
  { value: 'tubo', label: 'Tubería', icon: 'radio_button_unchecked' },
  { value: 'cuadrado', label: 'Cuadrado', icon: 'crop_square' },
  { value: 'solera', label: 'Solera', icon: 'horizontal_rule' },
  { value: 'hexagonal', label: 'Hexagonal', icon: 'hexagon' },
];

const labelCls = 'block text-xs font-bold uppercase text-secondary mb-2 tracking-wider';
const fieldCls =
  'w-full bg-white border border-outline px-4 py-3 rounded text-sm font-mono focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all';

export default function CalculadoraPage() {
  const [material, setMaterial] = useState('acero');
  const [profile, setProfile] = useState<Profile>('placa');
  const [d, setD] = useState<number>(50);
  const [a, setA] = useState<number>(200);
  const [b, setB] = useState<number>(12);
  const [wall, setWall] = useState<number>(4);
  const [length, setLength] = useState<number>(6);
  const [qty, setQty] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const needsD = profile === 'redondo' || profile === 'tubo';
  const needsA = profile === 'cuadrado' || profile === 'solera' || profile === 'placa' || profile === 'hexagonal';
  const needsB = profile === 'solera' || profile === 'placa';
  const needsWall = profile === 'tubo';

  const weight = useMemo(() => {
    const dims = { d, a, b, wall };
    return calcWeight(material, profile, dims, length, qty);
  }, [material, profile, d, a, b, wall, length, qty]);
  const animatedWeight = useCountUp(weight);

  const density = DENSITIES[material];
  const volumen = density > 0 ? weight / density : 0;
  const costoEstimado = weight * (PRECIO_REF[material] ?? 0);

  function handleLead(e: React.FormEvent) {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  }

  return (
    <div className="bg-surface-low min-h-screen">
      {/* Encabezado */}
      <div className="bg-primary text-white">
        <div className="max-w-container mx-auto px-4 md:px-10 py-12 md:py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[4px] text-on-tertiary-container mb-4">
            Herramienta técnica
          </p>
          <h1 className="font-montserrat font-bold text-3xl md:text-4xl mb-3">Calculadora Técnica de Pesos</h1>
          <p className="text-on-primary-container max-w-2xl">
            Configura el material y el perfil para obtener el peso teórico exacto y un costo estimado
            antes de solicitar tu cotización formal.
          </p>
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Columna izquierda: configuración */}
          <section className="lg:col-span-7 bg-white border border-outline-variant rounded-lg p-6 md:p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="font-montserrat font-semibold text-xl text-primary mb-2">Configuración de Material</h2>
              <p className="text-on-surface-variant text-sm">
                Selecciona las especificaciones técnicas para el cálculo de peso teórico.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <label className={labelCls}>Tipo de Material</label>
                <select value={material} onChange={(e) => setMaterial(e.target.value)} className={fieldCls}>
                  {materials.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label} ({DENSITIES[m.value].toLocaleString('es-MX')} kg/m³)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>Geometría del Perfil</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {shapes.map((s) => {
                    const active = profile === s.value;
                    return (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setProfile(s.value)}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                          active
                            ? 'border-primary bg-primary-container/10'
                            : 'border-outline-variant hover:border-primary hover:bg-surface-low'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[28px]! ${
                            active ? 'text-primary' : 'text-on-surface-variant'
                          }`}
                        >
                          {s.icon}
                        </span>
                        <span className={`text-[11px] font-bold uppercase ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <label className={`${labelCls} border-b border-outline-variant pb-2 block`}>
                  Dimensiones Técnicas (mm)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {needsD && (
                    <div className="space-y-2">
                      <span className="text-xs text-on-surface-variant font-medium">Diámetro (mm)</span>
                      <input type="number" value={d} min={1} onChange={(e) => setD(Number(e.target.value))} className={fieldCls} />
                    </div>
                  )}
                  {needsA && (
                    <div className="space-y-2">
                      <span className="text-xs text-on-surface-variant font-medium">
                        {profile === 'hexagonal' ? 'Entre caras (mm)' : 'Ancho (mm)'}
                      </span>
                      <input type="number" value={a} min={1} onChange={(e) => setA(Number(e.target.value))} className={fieldCls} />
                    </div>
                  )}
                  {needsB && (
                    <div className="space-y-2">
                      <span className="text-xs text-on-surface-variant font-medium">Espesor (mm)</span>
                      <input type="number" value={b} min={1} onChange={(e) => setB(Number(e.target.value))} className={fieldCls} />
                    </div>
                  )}
                  {needsWall && (
                    <div className="space-y-2">
                      <span className="text-xs text-on-surface-variant font-medium">Pared (mm)</span>
                      <input type="number" value={wall} min={1} onChange={(e) => setWall(Number(e.target.value))} className={fieldCls} />
                    </div>
                  )}
                  <div className="space-y-2">
                    <span className="text-xs text-on-surface-variant font-medium">Largo (m)</span>
                    <input type="number" value={length} min={0.01} step={0.1} onChange={(e) => setLength(Number(e.target.value))} className={fieldCls} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs text-on-surface-variant font-medium">Cantidad de Piezas</span>
                    <input type="number" value={qty} min={1} onChange={(e) => setQty(Number(e.target.value))} className={fieldCls} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Columna derecha: resultados */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-primary text-white rounded-lg p-6 md:p-8 shadow-md relative overflow-hidden">
              <span className="material-symbols-outlined absolute -top-2 -right-2 text-white/10 text-[120px]!">balance</span>
              <p className="text-xs font-semibold uppercase tracking-widest text-on-primary-container mb-3">
                Peso Teórico Total
              </p>
              <div className="flex items-baseline gap-2 relative">
                <span className="font-montserrat text-5xl md:text-6xl font-bold tabular-nums">
                  {animatedWeight.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xl font-bold">KG</span>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-sm text-on-primary-container">Densidad del Material:</span>
                <span className="font-mono text-sm">{(density / 1000).toFixed(2)} g/cm³</span>
              </div>
            </div>

            <div className="bg-surface-container-high border border-outline-variant rounded-lg p-6 md:p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase text-on-surface-variant mb-3 tracking-wider">
                Costo Estimado del Material
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-montserrat text-3xl md:text-4xl font-bold text-primary">
                  ${costoEstimado.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-lg font-bold text-secondary">MXN</span>
              </div>
              <p className="text-xs text-on-tertiary-fixed-variant mt-2 text-on-surface-variant">
                *Referencia aproximada. Sujeto a cambios según cotización formal y disponibilidad de inventario.
              </p>
            </div>

            <div className="bg-white border border-outline-variant rounded-lg overflow-hidden shadow-sm">
              <div className="bg-secondary px-6 py-3">
                <h3 className="text-white text-sm font-bold uppercase tracking-wide">Desglose Técnico</h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between border-b border-surface-container py-2">
                  <span className="text-on-surface-variant text-sm">Volumen Total</span>
                  <span className="font-mono text-sm text-primary">{volumen.toFixed(4)} m³</span>
                </div>
                <div className="flex justify-between border-b border-surface-container py-2">
                  <span className="text-on-surface-variant text-sm">Peso por Pieza</span>
                  <span className="font-mono text-sm text-primary">{formatWeight(qty > 0 ? weight / qty : 0)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-on-surface-variant text-sm">Piezas Calculadas</span>
                  <span className="font-mono text-sm text-primary">{qty}</span>
                </div>
                <div className="bg-surface-low p-4 rounded mt-2">
                  <p className="text-xs leading-relaxed text-on-surface-variant">
                    Cálculo basado en densidad estándar de {material.charAt(0).toUpperCase() + material.slice(1)} para
                    perfil {shapes.find((s) => s.value === profile)?.label.toLowerCase()}, sin tolerancia de laminación.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Captura de contacto */}
        <section className="mt-10 bg-white border-2 border-primary rounded-xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-grow max-w-xl">
            <h4 className="font-montserrat font-semibold text-xl text-primary mb-2">¿Necesitas una cotización oficial?</h4>
            <p className="text-on-surface-variant text-sm">
              Déjanos tu correo para recibir la ficha técnica detallada y ser contactado por un asesor de ventas.
            </p>
            <form onSubmit={handleLead} className="mt-4 flex items-center bg-surface-low rounded-lg p-1 border border-outline-variant focus-within:border-primary transition-all">
              <span className="material-symbols-outlined px-3 text-on-surface-variant text-[20px]!">mail</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@empresa.com"
                className="bg-transparent border-none focus:ring-0 w-full py-3 text-on-surface outline-none text-sm"
              />
              <button
                type="submit"
                className="shrink-0 bg-on-tertiary-container text-white text-xs font-bold uppercase px-4 py-2 rounded mr-1 hover:brightness-110 transition-all whitespace-nowrap"
              >
                {enviado ? 'Enviado ✓' : 'Enviar'}
              </button>
            </form>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-bold uppercase text-sm rounded-lg hover:bg-primary hover:text-white transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]!">download</span>
              Descargar Ficha
            </button>
            <Link
              href="/cotizacion"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-on-tertiary-container text-white font-bold uppercase text-sm rounded-lg shadow-sm hover:brightness-110 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]!">assignment</span>
              Solicitar Cotización
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
