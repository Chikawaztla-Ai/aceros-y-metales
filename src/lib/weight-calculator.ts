// ============================================================
// Calculadora de Peso — acerosymetalesurgentes.com
// Lógica compartida entre homepage, catálogo, producto y carrito
// ============================================================

export const DENSITIES: Record<string, number> = {
  acero: 7850,
  inox: 7900,
  aluminio: 2700,
  cobre: 8960,
  bronce: 8800,
  laton: 8500,
  nylamid: 1150,
  acetal: 1410,
  ptfe: 2200,
  hdpe: 970,
};

export type Profile =
  | 'redondo'
  | 'cuadrado'
  | 'solera'
  | 'placa'
  | 'hexagonal'
  | 'tubo';

export interface CalcDimensions {
  d?: number; // diámetro en mm (redondo, tubo)
  a?: number; // ancho en mm (cuadrado, solera, placa)
  b?: number; // espesor/alto en mm (solera, placa)
  wall?: number; // espesor de pared en mm (tubo)
}

/**
 * Calcula el peso teórico de un material
 * @param material - clave del material (acero, aluminio, etc)
 * @param profile - perfil del material (redondo, placa, etc)
 * @param dims - dimensiones en mm
 * @param length - longitud en metros
 * @param qty - cantidad de piezas
 * @returns peso en kg (redondeado a 2 decimales)
 */
export function calcWeight(
  material: string,
  profile: Profile,
  dims: CalcDimensions,
  length: number,
  qty: number = 1
): number {
  const density = DENSITIES[material.toLowerCase()];
  if (!density) return 0;

  let weight = 0;

  switch (profile) {
    case 'redondo': {
      // π × (d/2000)² × L × ρ × qty
      const r = (dims.d ?? 0) / 2000;
      weight = Math.PI * r * r * length * density * qty;
      break;
    }
    case 'cuadrado': {
      // (a/1000)² × L × ρ × qty
      const side = (dims.a ?? 0) / 1000;
      weight = side * side * length * density * qty;
      break;
    }
    case 'solera':
    case 'placa': {
      // (a/1000) × (b/1000) × L × ρ × qty
      const w = (dims.a ?? 0) / 1000;
      const h = (dims.b ?? 0) / 1000;
      weight = w * h * length * density * qty;
      break;
    }
    case 'hexagonal': {
      // (√3/2) × (a/1000)² × L × ρ × qty
      const s = (dims.a ?? 0) / 1000;
      weight = (Math.sqrt(3) / 2) * s * s * length * density * qty;
      break;
    }
    case 'tubo': {
      // π × ((D/2000)² - ((D-2t)/2000)²) × L × ρ × qty
      const R = (dims.d ?? 0) / 2000;
      const inner = ((dims.d ?? 0) - 2 * (dims.wall ?? 0)) / 2000;
      weight = Math.PI * (R * R - inner * inner) * length * density * qty;
      break;
    }
  }

  return Math.round(weight * 100) / 100;
}

/**
 * Formatea un peso en kg para display
 */
export function formatWeight(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(2)} ton`;
  }
  return `${kg.toFixed(2)} kg`;
}
