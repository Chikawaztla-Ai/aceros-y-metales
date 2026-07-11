// Datos mock del blog técnico. En producción vendrá de Supabase/CMS.
export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string; // formato display
  minutes: number;
  excerpt: string;
  image: string;
  featured?: boolean;
  /** Cuerpo en secciones para el artículo individual (mock). */
  body?: { heading: string; paragraphs: string[] }[];
}

export const categories = [
  { name: 'Guías de Compra', count: 8 },
  { name: 'Aplicaciones Industriales', count: 12 },
  { name: 'Comparativa de Metales', count: 15 },
  { name: 'Normas y Calidad', count: 6 },
  { name: 'Casos de Éxito', count: 4 },
];

export const topArticles = [
  { slug: 'tornilleria-g8', title: 'Resistencia a la tracción en Tornillería G8', minutes: 5, image: '/images/blog/top-tornilleria.jpg' },
  { slug: 'laton-360', title: 'Propiedades del Latón 360 Maquinable', minutes: 4, image: '/images/blog/top-laton.jpg' },
  { slug: 'inoxidable-304-vs-316', title: 'Inoxidable 304 vs 316: Cuál elegir', minutes: 10, image: '/images/blog/top-inox.jpg' },
];

export const articles: Article[] = [
  {
    slug: 'acero-1018-vs-1045',
    title: 'Diferencias clave entre Acero 1018 y 1045',
    category: 'Comparativa de Metales',
    date: '12 OCT 2024',
    minutes: 8,
    excerpt:
      'Entender la composición química y las propiedades mecánicas de estos dos grados de acero al carbono es fundamental para la selección correcta en aplicaciones de maquinado y construcción estructural. Analizamos dureza, soldabilidad y resistencia.',
    image: '/images/blog/featured.jpg',
    featured: true,
    body: [
      {
        heading: 'Composición química',
        paragraphs: [
          'El acero 1018 es un acero al bajo carbono (0.18% C aprox.) conocido por su excelente soldabilidad y acabado superficial. El 1045, con ~0.45% de carbono, ofrece mayor resistencia y dureza a cambio de una soldabilidad más delicada.',
          'Esta diferencia de carbono es la que define la mayoría de sus comportamientos mecánicos y determina en qué aplicaciones brilla cada uno.',
        ],
      },
      {
        heading: 'Propiedades mecánicas',
        paragraphs: [
          'El 1045 alcanza resistencias a la tensión notablemente superiores y responde bien al tratamiento térmico por temple y revenido, lo que lo hace ideal para ejes, engranajes y componentes sometidos a esfuerzo.',
          'El 1018, más dúctil, es la opción preferida para piezas maquinadas, pernos, bujes y aplicaciones donde la soldadura es crítica.',
        ],
      },
      {
        heading: '¿Cuál elegir?',
        paragraphs: [
          'Si necesitas soldar y buscar buen acabado sin tratamientos, el 1018 es tu material. Si el componente trabajará bajo carga y desgaste, el 1045 justifica su costo con creces.',
        ],
      },
    ],
  },
  {
    slug: 'guia-aluminio-6061-t6',
    title: 'Guía de selección de Aluminio 6061-T6',
    category: 'Guías de Compra',
    date: '15 MAR 2024',
    minutes: 6,
    excerpt: 'Todo lo que necesitas saber sobre la aleación más versátil de la industria.',
    image: '/images/blog/art-aluminio.jpg',
  },
  {
    slug: 'bronce-bujes-alta-carga',
    title: 'Uso de Bronce en bujes de alta carga',
    category: 'Aplicaciones Industriales',
    date: '28 FEB 2024',
    minutes: 5,
    excerpt: 'Por qué el bronce SAE 64 sigue siendo el estándar en aplicaciones antifricción.',
    image: '/images/blog/art-bronce.jpg',
  },
  {
    slug: 'normas-astm-aisi',
    title: 'Interpretación de normas ASTM y AISI',
    category: 'Normas y Calidad',
    date: '10 FEB 2024',
    minutes: 7,
    excerpt: 'Desmitificando los códigos de materiales para una compra sin errores.',
    image: '/images/blog/art-normas.jpg',
  },
  {
    slug: 'certificados-molino',
    title: 'Certificados de Molino: Qué revisar',
    category: 'Normas y Calidad',
    date: '22 ENE 2024',
    minutes: 6,
    excerpt: 'La importancia de la trazabilidad en materiales críticos para la industria.',
    image: '/images/blog/art-certificados.jpg',
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
