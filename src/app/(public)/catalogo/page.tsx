'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { clsx } from 'clsx';

const allCategories = [
  'Aceros Comerciales', 'Aceros Especiales', 'Aluminio',
  'Cobre', 'Bronce', 'Latón', 'Maquinaria', 'Herramientas',
];

// Mapeo de slugs de categoría (links del home) → categorías reales
const catSlugMap: Record<string, string[]> = {
  'aceros-comerciales': ['Aceros Comerciales'],
  'aceros-especiales': ['Aceros Especiales'],
  'aluminio': ['Aluminio'],
  'no-ferrosos': ['Cobre', 'Bronce', 'Latón'],
  'maquinaria': ['Maquinaria'],
  'herramientas': ['Herramientas'],
};

const allGrades = [
  '1018', '4140', 'D2', 'O1', 'H13', '304', '6061', '7075', 'SAE 660',
];

const shapes = [
  { value: 'redondo', label: 'Redondo', icon: 'radio_button_unchecked' },
  { value: 'placa', label: 'Placa', icon: 'rectangle' },
  { value: 'solera', label: 'Solera', icon: 'straighten' },
  { value: 'tubo', label: 'Tubo', icon: 'view_column' },
];

// Mock products — en producción viene de Supabase
const products = [
  { id: '1', sku: '4140-RD', name: 'Acero Cromo-Molibdeno 4140', grade: '4140', category: 'Aceros Especiales', price: 185, unit: 'kg', slug: 'acero-4140-barra-redonda', inStock: true, shape: 'redondo', spec1: { label: 'Grado', value: 'AISI 4140' }, spec2: { label: 'Dureza', value: '28-32 HRC' }, image: '/images/home/prod-viga-ipr.jpg' },
  { id: '2', sku: 'D2-RD', name: 'Acero al Cromo D2', grade: 'D2', category: 'Aceros Especiales', price: 320, unit: 'kg', slug: 'acero-d2-barra-redonda', inStock: true, shape: 'redondo', spec1: { label: 'Grado', value: 'AISI D2' }, spec2: { label: 'Uso', value: 'Troqueles' }, image: '/images/home/prod-ptr.jpg' },
  { id: '3', sku: '6061-PL', name: 'Aluminio 6061-T6', grade: '6061', category: 'Aluminio', price: 210, unit: 'kg', slug: 'aluminio-6061-placa', inStock: true, shape: 'placa', spec1: { label: 'Temple', value: 'T6' }, spec2: { label: 'Formato', value: 'Placa' }, image: '/images/home/prod-placa-aluminio.jpg' },
  { id: '4', sku: '304-RD', name: 'Inoxidable 304', grade: '304', category: 'Aceros Especiales', price: 145, unit: 'kg', slug: 'inoxidable-304-barra-redonda', inStock: true, shape: 'redondo', spec1: { label: 'Grado', value: 'AISI 304' }, spec2: { label: 'Acabado', value: 'Natural' }, image: null },
  { id: '5', sku: '1018-RD', name: 'Acero 1018 (Col ROL)', grade: '1018', category: 'Aceros Comerciales', price: 42, unit: 'kg', slug: 'acero-1018-barra-redonda', inStock: true, shape: 'redondo', spec1: { label: 'Grado', value: 'AISI 1018' }, spec2: { label: 'Proceso', value: 'Col ROL' }, image: null },
  { id: '6', sku: 'O1-RD', name: 'Acero al Aceite O1 (SW55)', grade: 'O1', category: 'Aceros Especiales', price: 290, unit: 'kg', slug: 'acero-o1-barra-redonda', inStock: false, shape: 'redondo', spec1: { label: 'Grado', value: 'AISI O1' }, spec2: { label: 'Temple', value: 'Aceite' }, image: null },
  { id: '7', sku: 'H13-RD', name: 'Acero H13 para Trabajo en Caliente', grade: 'H13', category: 'Aceros Especiales', price: 380, unit: 'kg', slug: 'acero-h13-barra-redonda', inStock: true, shape: 'redondo', spec1: { label: 'Grado', value: 'AISI H13' }, spec2: { label: 'Uso', value: 'Moldes' }, image: null },
  { id: '8', sku: '7075-PL', name: 'Aluminio 7075-T6 Aeronáutico', grade: '7075', category: 'Aluminio', price: 420, unit: 'kg', slug: 'aluminio-7075-placa', inStock: true, shape: 'placa', spec1: { label: 'Temple', value: 'T6' }, spec2: { label: 'Uso', value: 'Aeronáutico' }, image: null },
  { id: '9', sku: 'BRZ-660', name: 'Bronce SAE 660', grade: 'SAE 660', category: 'Bronce', price: 280, unit: 'kg', slug: 'bronce-sae660-barra', inStock: true, shape: 'redondo', spec1: { label: 'Norma', value: 'SAE 660' }, spec2: { label: 'Uso', value: 'Bujes' }, image: '/images/home/prod-barra-cobre.jpg' },
];

function CatalogoContent() {
  const searchParams = useSearchParams();
  const initialCats = catSlugMap[searchParams.get('cat') ?? ''] ?? [];
  const initialQuery = searchParams.get('q') ?? '';

  const [selectedCats, setSelectedCats] = useState<string[]>(initialCats);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedShape, setSelectedShape] = useState('');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [view, setView] = useState<'list' | 'grid'>('list');
  // Panel de filtros en móvil: cerrado por defecto para no tapar los productos.
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const toggleCat = (cat: string) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCats([]);
    setSelectedGrade('');
    setSelectedShape('');
    setSearchQuery('');
  };

  const hasFilters = selectedCats.length > 0 || selectedGrade || selectedShape || searchQuery;

  const filtered = products.filter((p) => {
    if (selectedCats.length > 0 && !selectedCats.includes(p.category)) return false;
    if (selectedGrade && p.grade !== selectedGrade) return false;
    if (selectedShape && p.shape !== selectedShape) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.grade.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-container mx-auto px-4 md:px-10 py-4 md:py-8">
      {/* BARRA DE FILTROS MÓVIL (stitch mobile): sticky bajo el header, con los
          filtros COLAPSADOS para que los productos se vean de inmediato.
          En escritorio manda el sidebar de la izquierda. */}
      <div className="lg:hidden sticky top-[60px] z-30 -mx-4 px-4 py-3 bg-surface-low border-b border-outline-variant shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]!">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar material o SKU..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg text-sm focus:border-primary outline-none transition-all"
            />
          </div>
          <button
            onClick={() => setFiltrosAbiertos((v) => !v)}
            className="flex items-center justify-between w-full px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]!">filter_list</span>
              Filtros de Catálogo
            </span>
            <span
              className={clsx(
                'material-symbols-outlined text-[20px]! transition-transform duration-300',
                filtrosAbiertos && 'rotate-180'
              )}
            >
              expand_more
            </span>
          </button>
        </div>

        {filtrosAbiertos && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase px-1">Categoría</label>
                <select
                  value={selectedCats[0] ?? ''}
                  onChange={(e) => setSelectedCats(e.target.value ? [e.target.value] : [])}
                  className="bg-white border border-outline-variant rounded-lg text-sm py-2 px-2"
                >
                  <option value="">Todas</option>
                  {allCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase px-1">Grado</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="bg-white border border-outline-variant rounded-lg text-sm py-2 px-2"
                >
                  <option value="">Todos</option>
                  {allGrades.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase px-1">Forma / Perfil</label>
              <select
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)}
                className="bg-white border border-outline-variant rounded-lg text-sm py-2 px-2"
              >
                <option value="">Todas</option>
                {shapes.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-on-tertiary-container underline self-start"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 mt-4">
        {/* SIDEBAR FILTROS — solo escritorio (en móvil manda la barra de arriba) */}
        <aside className="hidden lg:block bg-surface-low h-fit rounded-lg border border-outline-variant/40 lg:sticky lg:top-24">
          <div className="flex flex-col p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-[24px]!" style={{ fontVariationSettings: "'FILL' 1" }}>
                  filter_list
                </span>
                <h2 className="font-montserrat font-semibold text-xl text-primary">Filtros</h2>
              </div>
              <p className="text-sm text-on-surface-variant">Refina tu búsqueda</p>
            </div>

            <div className="space-y-6">
              {/* Categorías — filas con ícono (stitch) */}
              <div>
                <span className="text-sm font-semibold text-primary uppercase block mb-3">Material</span>
                <div className="space-y-2">
                  {allCategories.map((cat) => {
                    const active = selectedCats.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleCat(cat)}
                        className={clsx(
                          'w-full flex items-center gap-3 px-4 py-3 transition-all cursor-pointer text-left text-sm',
                          active
                            ? 'bg-primary-container text-white font-bold rounded-xl translate-x-1'
                            : 'text-on-surface-variant hover:bg-surface-high'
                        )}
                      >
                        <span className="material-symbols-outlined text-[20px]!">category</span>
                        <span>{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grado */}
              <div>
                <span className="text-sm font-semibold text-primary uppercase block mb-3">Grado</span>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full bg-white border border-outline-variant p-3 rounded text-sm outline-none focus:border-primary"
                >
                  <option value="">Todos los grados</option>
                  {allGrades.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Forma / Perfil — botones con ícono (stitch) */}
              <div>
                <span className="text-sm font-semibold text-primary uppercase block mb-3">Forma / Perfil</span>
                <div className="grid grid-cols-2 gap-2">
                  {shapes.map((shape) => {
                    const active = selectedShape === shape.value;
                    return (
                      <button
                        key={shape.value}
                        onClick={() => setSelectedShape(active ? '' : shape.value)}
                        className={clsx(
                          'p-3 border transition-all flex flex-col items-center gap-1 text-xs font-medium',
                          active
                            ? 'border-primary-container bg-primary-container text-white'
                            : 'border-outline-variant/40 text-on-surface-variant hover:bg-surface-high'
                        )}
                      >
                        <span className="material-symbols-outlined text-[24px]!">{shape.icon}</span>
                        <span>{shape.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Buscar */}
              <div>
                <span className="text-sm font-semibold text-primary uppercase block mb-3">Buscar</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ej: 4140, D2, 6061..."
                  className="w-full bg-white border border-outline-variant p-3 rounded text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:border-primary"
                />
              </div>

              <button
                onClick={clearFilters}
                disabled={!hasFilters}
                className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-sm hover:opacity-90 active:scale-95 transition-all mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </aside>

        {/* RESULTADOS (stitch) */}
        <section className="flex flex-col gap-6">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h1 className="font-montserrat font-bold text-4xl md:text-[48px] md:leading-[56px] tracking-[-0.02em] text-primary">
                Catálogo de Materiales
              </h1>
              <p className="text-lg text-on-surface-variant mt-2">
                Mostrando <span className="font-bold text-primary">{filtered.length}</span> de {products.length} materiales
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('grid')}
                aria-label="Vista de cuadrícula"
                className={clsx(
                  'p-2 border transition-colors',
                  view === 'grid' ? 'border-primary bg-primary text-white' : 'border-outline-variant bg-white text-primary'
                )}
              >
                <span className="material-symbols-outlined text-[24px]!">grid_view</span>
              </button>
              <button
                onClick={() => setView('list')}
                aria-label="Vista de lista"
                className={clsx(
                  'p-2 border transition-colors',
                  view === 'list' ? 'border-primary bg-primary text-white' : 'border-outline-variant bg-white text-primary'
                )}
              >
                <span className="material-symbols-outlined text-[24px]!">list</span>
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white border border-outline-variant/40">
              <span className="material-symbols-outlined text-on-surface-variant/30 mb-4" style={{ fontSize: 48 }}>search_off</span>
              <p className="text-lg font-bold text-primary mb-2">Sin resultados</p>
              <p className="text-sm text-on-surface-variant mb-4">
                No encontramos materiales con esos filtros.
              </p>
              <Link href="/cotizacion" className="text-sm text-on-tertiary-container font-bold hover:underline">
                Solicitar cotización personalizada →
              </Link>
            </div>
          ) : view === 'list' ? (
            /* VISTA LISTA (stitch) */
            <div className="space-y-4">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-outline-variant/40 p-6 flex flex-col md:flex-row gap-6 hover:shadow-card transition-all group"
                >
                  <Link
                    href={`/catalogo/${product.slug}`}
                    className="w-full md:w-48 h-32 bg-surface-container overflow-hidden shrink-0 flex items-center justify-center"
                  >
                    {product.image ? (
                      <div
                        className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
                        style={{ backgroundImage: `url('${product.image}')` }}
                      />
                    ) : (
                      <span className="text-4xl text-on-surface-variant/20">⬡</span>
                    )}
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link href={`/catalogo/${product.slug}`}>
                          <h3 className="font-montserrat font-semibold text-xl text-primary mb-1 hover:text-on-tertiary-container transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <span className="text-xs font-medium bg-surface-high px-2 py-0.5 rounded text-secondary">
                          SKU: {product.sku}
                        </span>
                      </div>
                      <div className="text-right">
                        {product.inStock ? (
                          <span className="text-sm font-semibold text-green-700 flex items-center justify-end gap-1">
                            <span className="material-symbols-outlined text-[18px]!" style={{ fontVariationSettings: "'FILL' 1" }}>
                              check_circle
                            </span>
                            En Stock
                          </span>
                        ) : (
                          <span className="text-sm font-semibold text-error flex items-center justify-end gap-1">
                            <span className="material-symbols-outlined text-[18px]!">schedule</span>
                            Bajo pedido
                          </span>
                        )}
                        <p className="font-montserrat text-xl font-bold text-primary mt-1">
                          ${product.price}{' '}
                          <span className="text-sm font-normal text-on-surface-variant">MXN/{product.unit}</span>
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 py-3 border-t border-outline-variant items-center">
                      <div>
                        <span className="text-[11px] font-semibold text-outline block uppercase">{product.spec1.label}</span>
                        <span className="text-sm font-bold text-on-surface">{product.spec1.value}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-outline block uppercase">{product.spec2.label}</span>
                        <span className="text-sm font-bold text-on-surface">{product.spec2.value}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-outline block uppercase">Categoría</span>
                        <span className="text-sm font-bold text-on-surface">{product.category}</span>
                      </div>
                      <div>
                        <Link
                          href={`/catalogo/${product.slug}`}
                          className="block bg-on-tertiary-container text-white px-4 py-2 font-bold text-sm uppercase w-full text-center hover:brightness-110 transition-all"
                        >
                          Ver Material
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* VISTA GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  href={`/catalogo/${product.slug}`}
                  className="group bg-white border border-outline-variant/40 p-4 hover:shadow-card-hover transition-all"
                >
                  <div className="relative h-36 bg-surface-container mb-3 overflow-hidden flex items-center justify-center">
                    {product.image ? (
                      <div
                        className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
                        style={{ backgroundImage: `url('${product.image}')` }}
                      />
                    ) : (
                      <span className="text-3xl text-on-surface-variant/15">⬡</span>
                    )}
                    <span
                      className={clsx(
                        'absolute top-2 left-2 text-[9px] font-bold uppercase px-2 py-1 tracking-tighter',
                        product.inStock ? 'bg-primary text-white' : 'bg-error/10 text-error'
                      )}
                    >
                      {product.inStock ? 'Disponible' : 'Bajo pedido'}
                    </span>
                  </div>
                  <p className="text-[9px] font-semibold uppercase tracking-[2px] text-on-surface-variant mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-montserrat font-semibold text-primary leading-tight mb-2 group-hover:text-on-tertiary-container transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline justify-between">
                    <span className="text-on-tertiary-container font-bold">${product.price}</span>
                    <span className="text-[11px] text-on-surface-variant">MXN/{product.unit}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Paginación (stitch) */}
          {filtered.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                aria-label="Página anterior"
                className="p-2 border border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-40"
                disabled
              >
                <span className="material-symbols-outlined text-[24px]!">chevron_left</span>
              </button>
              <button className="w-10 h-10 border border-primary bg-primary text-white font-bold">1</button>
              <button
                aria-label="Página siguiente"
                className="p-2 border border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-40"
                disabled
              >
                <span className="material-symbols-outlined text-[24px]!">chevron_right</span>
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="max-w-container mx-auto px-4 md:px-10 py-20 text-on-surface-variant">Cargando catálogo…</div>}>
      <CatalogoContent />
    </Suspense>
  );
}
