/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#00f5ff',
        'secondary-accent': '#a3e635',
        'background-dark': '#0a0a0a',
        'surface-dark': '#121212',
        'border-stealth': '#27272a',
        'text-secondary': '#a1a1aa',
        'text-cyan': '#00f5ff',
      },
      fontFamily: {
        'display': ['Geist', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        'full': '9999px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
