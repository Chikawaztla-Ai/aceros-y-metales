'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { calcWeight, formatWeight, DENSITIES, type Profile } from '@/lib/weight-calculator';

const materials = Object.keys(DENSITIES).map((key) => ({
  value: key,
  label: key.charAt(0).toUpperCase() + key.slice(1),
}));

const profiles: { value: Profile; label: string }[] = [
  { value: 'redondo', label: 'Redondo' },
  { value: 'cuadrado', label: 'Cuadrado' },
  { value: 'solera', label: 'Solera' },
  { value: 'placa', label: 'Placa' },
  { value: 'hexagonal', label: 'Hexagonal' },
  { value: 'tubo', label: 'Tubo' },
];

const labelCls = 'block text-xs font-bold uppercase text-secondary mb-2';
const fieldCls =
  'w-full bg-white border border-outline-variant rounded py-2.5 px-3 text-sm text-on-surface focus:border-primary focus:ring-0 outline-none';

export function WeightCalculator() {
  const [material, setMaterial] = useState('acero');
  const [profile, setProfile] = useState<Profile>('redondo');
  const [d, setD] = useState<number>(25);
  const [a, setA] = useState<number>(50);
  const [b, setB] = useState<number>(10);
  const [wall, setWall] = useState<number>(3);
  const [length, setLength] = useState<number>(1);
  const [qty, setQty] = useState<number>(1);

  const weight = useMemo(() => {
    const dims = { d, a, b, wall };
    return calcWeight(material, profile, dims, length, qty);
  }, [material, profile, d, a, b, wall, length, qty]);

  const needsD = profile === 'redondo' || profile === 'tubo';
  const needsA = profile === 'cuadrado' || profile === 'solera' || profile === 'placa' || profile === 'hexagonal';
  const needsB = profile === 'solera' || profile === 'placa';
  const needsWall = profile === 'tubo';

  return (
    <div className="bg-surface-container border border-outline-variant p-8 shadow-inner relative">
      {/* Tag Beta — estilo stitch */}
      <div className="absolute -top-4 -right-4 bg-on-tertiary-container text-white px-4 py-2 font-bold text-xs uppercase">
        Beta v2.0
      </div>

      <div className="space-y-6">
        {/* Material y perfil */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelCls}>Material</label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className={fieldCls}
            >
              {materials.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label} ({DENSITIES[m.value]} kg/m³)
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className={labelCls}>Forma</label>
            <select
              value={profile}
              onChange={(e) => setProfile(e.target.value as Profile)}
              className={fieldCls}
            >
              {profiles.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dimensiones dinámicas */}
        <div className="grid grid-cols-2 gap-4">
          {needsD && (
            <div className="space-y-2">
              <label className={labelCls}>Diámetro (mm)</label>
              <input type="number" value={d} onChange={(e) => setD(Number(e.target.value))} min={1} className={fieldCls} />
            </div>
          )}
          {needsA && (
            <div className="space-y-2">
              <label className={labelCls}>
                {profile === 'hexagonal' ? 'Entre caras (mm)' : 'Ancho (mm)'}
              </label>
              <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} min={1} className={fieldCls} />
            </div>
          )}
          {needsB && (
            <div className="space-y-2">
              <label className={labelCls}>Espesor (mm)</label>
              <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} min={1} className={fieldCls} />
            </div>
          )}
          {needsWall && (
            <div className="space-y-2">
              <label className={labelCls}>Pared (mm)</label>
              <input type="number" value={wall} onChange={(e) => setWall(Number(e.target.value))} min={1} className={fieldCls} />
            </div>
          )}
        </div>

        {/* Largo y cantidad */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelCls}>Largo (m)</label>
            <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} min={0.01} step={0.1} className={fieldCls} />
          </div>
          <div className="space-y-2">
            <label className={labelCls}>Cantidad</label>
            <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} min={1} className={fieldCls} />
          </div>
        </div>

        {/* Resultado — barra oscura estilo stitch */}
        <div className="bg-primary p-6 flex items-center justify-between">
          <span className="text-white/70 text-sm font-medium">Peso Estimado:</span>
          <span className="font-montserrat text-white text-xl font-bold">
            {formatWeight(weight)}
          </span>
        </div>

        <Link
          href="/catalogo"
          className="block w-full border-2 border-primary text-primary text-center font-bold uppercase py-4 text-sm hover:bg-primary hover:text-white transition-all"
        >
          Usar Calculadora Completa
        </Link>
      </div>
    </div>
  );
}
