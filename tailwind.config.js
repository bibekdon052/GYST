/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0f1117',
        surface: '#1a1d27',
        surface2: '#22263a',
        border: '#2e3247',
        text: '#e2e5f0',
        muted: '#6b7280',
        accent: '#4f8ef7',
        danger: '#f87171',
        success: '#22c55e',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
