import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif']
      },
      colors: {
        parchment: {
          50: '#faf7f0',
          100: '#f3ecd9',
          200: '#e6d7ad',
          500: '#9a7b3f',
          900: '#3f2e14'
        }
      }
    }
  },
  plugins: [typography]
};
