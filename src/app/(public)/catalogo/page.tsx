'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WeightCalculator } from '@/components/calculadora/weight-calculator';

const allCategories = [
  'Aceros Comerciales', 'Aceros Especiales', 'Aluminio',
  'Cobre', 'Bronce', 'Latón', 'Maquinaria', 'Herramientas',
];

const allGrades = [
  '1018', '1045', '4140', '4340', '8620',
  'D2', 'O1', 'A2', 'H13', 'S7', 'P20', 'M2',
  '304', '316', '410', '420',
  '6061', '7075', '2024',
];

// Mock products — en producción viene de Supabase
const products = [
  { id: '1', sku: '4140-RD', name: 'Acero Cromo-Molibdeno 4140', grade: '4140', category: 'Aceros Especiales', price: 185, unit: 'kg', slug: 'acero-4140-barra-redonda', inStock: true },
  { id: '2', sku: 'D2-RD', name: 'Acero al Cromo D2', grade: 'D2', category: 'Aceros Especiales', price: 320, unit: 'kg', slug: 'acero-d2-barra-redonda', inStock: true },
  { id: '3', sku: '6061-PL', name: 'Aluminio 6061-T6', grade: '6061', category: 'Aluminio', price: 210, unit: 'kg', slug: 'aluminio-6061-placa', inStock: true },
  { id: '4', sku: '304-RD', name: 'Inoxidable 304', grade: '304', category: 'Aceros Especiales', price: 145, unit: 'kg', slug: 'inoxidable-304-barra-redonda', inStock: true },
  { id: '5', sku: '1018-RD', name: 'Acero 1018 (Col ROL)', grade: '1018', category: 'Aceros Comerciales', price: 42, unit: 'kg', slug: 'acero-1018-barra-redonda', inStock: true },
  { id: '6', sku: 'O1-RD', name: 'Acero al Aceite O1 (SW55)', grade: 'O1', category: 'Aceros Especiales', price: 290, unit: 'kg', slug: 'acero-o1-barra-redonda', inStock: false },
  { id: '7', sku: 'H13-RD', name: 'Acero H13 para Trabajo en Caliente', grade: 'H13', category: 'Aceros Especiales', price: 380, unit: 'kg', slug: 'acero-h13-barra-redonda', inStock: true },
  { id: '8', sku: '7075-PL', name: 'Aluminio 7075-T6 Aeronáutico', grade: '7075', category: 'Aluminio', price: 420, unit: 'kg', slug: 'aluminio-7075-placa', inStock: true },
  { id: '9', sku: 'BRZ-660', name: 'Bronce SAE 660', grade: 'SAE 660', category: 'Bronce', price: 280, unit: 'kg', slug: 'bronce-sae660-barra', inStock: true },
];

export default function CatalogoPage() {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const toggleCat = (cat: string) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtered = products
    .filter((p) => {
      if (selectedCats.length > 0 && !selectedCats.includes(p.category)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.grade.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="max-w-container mx-auto px-10 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-montserrat font-bold text-3xl text-primary-container uppercase tracking-tight">
            Catálogo
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Mostrando {filtered.length} de {products.length} productos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-outline-variant rounded-md py-2 px-3 text-sm text-on-surface focus:ring-1 focus:ring-primary-container outline-none"
          >
            <option value="name">Nombre A-Z</option>
            <option value="price-asc">Precio menor</option>
            <option value="price-desc">Precio mayor</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_300px] gap-8">
        {/* SIDEBAR FILTROS */}
        <aside className="space-y-6">
          <div>
            <h3 className="font-montserrat font-bold text-sm text-primary-container uppercase tracking-wide mb-3">
              Categoría
            </h3>
            <div className="space-y-2">
              {allCategories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCats.includes(cat)}
                    onChange={() => toggleCat(cat)}
                    className="w-4 h-4 rounded border-outline-variant text-primary-container focus:ring-primary-container"
                  />
                  <span className="text-sm text-on-surface-variant group-hover:text-primary-container transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-montserrat font-bold text-sm text-primary-container uppercase tracking-wide mb-3">
              Buscar por grado
            </h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ej: 4140, D2, 6061..."
              className="w-full bg-white border border-outline-variant rounded-md py-2 px-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-primary-container outline-none"
            />
          </div>

          {selectedCats.length > 0 && (
            <button
              onClick={() => setSelectedCats([])}
              className="text-sm text-on-tertiary-container hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </aside>

        {/* GRID DE PRODUCTOS */}
        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-bold text-primary-container mb-2">Sin resultados</p>
              <p className="text-sm text-on-surface-variant mb-4">
                No encontramos materiales para &ldquo;{searchQuery}&rdquo;
              </p>
              <Link href="/cotizacion" className="text-sm text-on-tertiary-container hover:underline">
                Solicitar cotización personalizada →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  href={`/catalogo/${product.slug}`}
                  className="group bg-white border border-outline-variant rounded-lg p-4 hover:shadow-card-hover transition-all"
                >
                  <div className="relative h-36 bg-surface-low rounded-md mb-3 overflow-hidden flex items-center justify-center group-hover:bg-surface-container transition-colors">
                    <span className="text-3xl text-on-surface-variant/15">⬡</span>
                    <span className={`absolute top-2 left-2 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      product.inStock ? 'bg-on-surface text-white' : 'bg-error/10 text-error'
                    }`}>
                      {product.inStock ? '● En Stock' : 'Agotado'}
                    </span>
                  </div>
                  <p className="text-[9px] font-semibold uppercase tracking-[2px] text-on-surface-variant mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-montserrat font-bold text-primary-container leading-tight mb-2 group-hover:text-on-tertiary-container transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline justify-between">
                    <span className="text-on-tertiary-container font-bold">
                      ${product.price}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">MXN/{product.unit}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* SIDEBAR DERECHO — Calculadora */}
        <aside className="hidden lg:block space-y-6">
          <WeightCalculator />
        </aside>
      </div>
    </div>
  );
}
