/** @type {import('tailwindcss').Config} */

// Returns a Tailwind color function that preserves the CSS variable reference at runtime
function cssVar(variable) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variable}) / ${opacityValue})`
    }
    return `rgb(var(${variable}))`
  }
}

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:       cssVar('--color-bg'),
        surface:  cssVar('--color-surface'),
        surface2: cssVar('--color-surface2'),
        border:   cssVar('--color-border'),
        text:     cssVar('--color-text'),
        muted:    cssVar('--color-muted'),
        accent:   cssVar('--color-accent'),
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
