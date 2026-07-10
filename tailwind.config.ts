import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#162839',
          container: '#2c3e50',
        },
        accent: {
          DEFAULT: '#f78b30',
          dark: '#612f00',
        },
        surface: {
          DEFAULT: '#f7f9fb',
          low: '#f2f4f6',
          container: '#eceef0',
          high: '#e6e8ea',
          highest: '#e0e3e5',
          white: '#ffffff',
        },
        on: {
          surface: '#191c1e',
          'surface-variant': '#43474c',
          primary: '#ffffff',
          'primary-container': '#96a9be',
          'tertiary-container': '#f78b30',
        },
        outline: {
          DEFAULT: '#74777d',
          variant: '#c4c6cd',
        },
        secondary: {
          DEFAULT: '#4b6076',
          container: '#cce2fc',
          fixed: '#cfe5ff',
        },
        success: '#16a34a',
        error: '#ba1a1a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      maxWidth: {
        'container': '1280px',
      },
      spacing: {
        'gutter': '24px',
      },
      borderRadius: {
        'component': '4px',
      },
      boxShadow: {
        'card': '0px 4px 12px rgba(44, 62, 80, 0.08)',
        'card-hover': '0px 8px 24px rgba(17, 24, 39, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
