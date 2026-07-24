/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:       'rgb(var(--color-bg) / <alpha-value>)',
        surface:  'rgb(var(--color-surface) / <alpha-value>)',
        surface2: 'rgb(var(--color-surface2) / <alpha-value>)',
        border:   'rgb(var(--color-border) / <alpha-value>)',
        text:     'rgb(var(--color-text) / <alpha-value>)',
        muted:    'rgb(var(--color-muted) / <alpha-value>)',
        accent:   'rgb(var(--color-accent) / <alpha-value>)',
        danger:   '#f87171',
        success:  '#22c55e',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
