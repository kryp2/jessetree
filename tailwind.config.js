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
        // Legacy aliases — keep working, now theme-switchable via CSS vars.
        parchment: {
          50: 'rgb(var(--color-bg) / <alpha-value>)',
          100: 'rgb(var(--color-bg-elevated) / <alpha-value>)',
          200: 'rgb(var(--color-border) / <alpha-value>)',
          500: 'rgb(var(--color-ink-muted) / <alpha-value>)',
          900: 'rgb(var(--color-ink) / <alpha-value>)'
        },
        // Semantic names.
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        'bg-elevated': 'rgb(var(--color-bg-elevated) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          strong: 'rgb(var(--color-ink-strong) / <alpha-value>)',
          muted: 'rgb(var(--color-ink-muted) / <alpha-value>)'
        },
        accent: 'rgb(var(--color-accent) / <alpha-value>)'
      }
    }
  },
  plugins: [typography]
};
