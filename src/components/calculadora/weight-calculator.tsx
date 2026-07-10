'use client';

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
    <div className="bg-surface-container border border-outline-variant rounded-lg p-6 space-y-4">
      {/* Material y perfil */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-[2px] text-primary-container mb-2">
            Material
          </label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full bg-white border border-outline-variant rounded-md py-2.5 px-3 text-sm text-on-surface focus:ring-1 focus:ring-primary-container outline-none"
          >
            {materials.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label} ({DENSITIES[m.value]} kg/m³)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-[2px] text-primary-container mb-2">
            Perfil
          </label>
          <select
            value={profile}
            onChange={(e) => setProfile(e.target.value as Profile)}
            className="w-full bg-white border border-outline-variant rounded-md py-2.5 px-3 text-sm text-on-surface focus:ring-1 focus:ring-primary-container outline-none"
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
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[2px] text-primary-container mb-2">
              Diámetro (mm)
            </label>
            <input
              type="number"
              value={d}
              onChange={(e) => setD(Number(e.target.value))}
              min={1}
              className="w-full bg-white border border-outline-variant rounded-md py-2.5 px-3 text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary-container outline-none"
            />
          </div>
        )}
        {needsA && (
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[2px] text-primary-container mb-2">
              {profile === 'hexagonal' ? 'Distancia entre caras (mm)' : 'Ancho (mm)'}
            </label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              min={1}
              className="w-full bg-white border border-outline-variant rounded-md py-2.5 px-3 text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary-container outline-none"
            />
          </div>
        )}
        {needsB && (
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[2px] text-primary-container mb-2">
              Espesor (mm)
            </label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              min={1}
              className="w-full bg-white border border-outline-variant rounded-md py-2.5 px-3 text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary-container outline-none"
            />
          </div>
        )}
        {needsWall && (
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[2px] text-primary-container mb-2">
              Pared (mm)
            </label>
            <input
              type="number"
              value={wall}
              onChange={(e) => setWall(Number(e.target.value))}
              min={1}
              className="w-full bg-white border border-outline-variant rounded-md py-2.5 px-3 text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary-container outline-none"
            />
          </div>
        )}
      </div>

      {/* Largo y cantidad */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-[2px] text-primary-container mb-2">
            Largo (m)
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min={0.01}
            step={0.1}
            className="w-full bg-white border border-outline-variant rounded-md py-2.5 px-3 text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary-container outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-[2px] text-primary-container mb-2">
            Cantidad
          </label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            min={1}
            className="w-full bg-white border border-outline-variant rounded-md py-2.5 px-3 text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary-container outline-none"
          />
        </div>
      </div>

      {/* Resultado */}
      <div className="bg-white border border-outline-variant rounded-md p-4 flex items-baseline justify-between">
        <span className="text-sm text-on-surface-variant">Peso estimado:</span>
        <span className="font-montserrat font-bold text-xl text-on-tertiary-container">
          ~{formatWeight(weight)}
        </span>
      </div>

      {/* CTA */}
      <button className="w-full border-2 border-primary-container text-primary-container text-sm font-bold uppercase tracking-wide py-3 rounded-lg hover:bg-primary-container hover:text-white transition-all">
        Agregar al carrito
      </button>
    </div>
  );
}
