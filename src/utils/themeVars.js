// Theme variable definitions — applied as CSS custom properties via JS
// (not defined in CSS so Tailwind preserves var() references in compiled classes)

export const THEME_VARS = {
  dark: {
    '--color-bg':       '15 17 23',
    '--color-surface':  '26 29 39',
    '--color-surface2': '34 38 58',
    '--color-border':   '46 50 71',
    '--color-text':     '226 229 240',
    '--color-muted':    '107 114 128',
  },
  slate: {
    '--color-bg':       '12 12 15',
    '--color-surface':  '24 24 27',
    '--color-surface2': '36 36 42',
    '--color-border':   '63 63 70',
    '--color-text':     '244 244 245',
    '--color-muted':    '113 113 122',
  },
  ocean: {
    '--color-bg':       '6 18 34',
    '--color-surface':  '10 28 52',
    '--color-surface2': '14 40 70',
    '--color-border':   '24 60 100',
    '--color-text':     '200 225 248',
    '--color-muted':    '100 150 200',
  },
  bush: {
    '--color-bg':       '28 22 10',
    '--color-surface':  '40 32 16',
    '--color-surface2': '56 44 22',
    '--color-border':   '82 66 34',
    '--color-text':     '240 224 188',
    '--color-muted':    '160 140 100',
  },
  rose: {
    '--color-bg':       '17 10 16',
    '--color-surface':  '28 16 32',
    '--color-surface2': '42 22 48',
    '--color-border':   '70 34 80',
    '--color-text':     '248 224 240',
    '--color-muted':    '180 120 160',
  },
  light: {
    '--color-bg':       '247 248 252',
    '--color-surface':  '255 255 255',
    '--color-surface2': '241 243 249',
    '--color-border':   '210 214 230',
    '--color-text':     '15 17 23',
    '--color-muted':    '107 114 128',
  },
  paper: {
    '--color-bg':       '253 248 235',
    '--color-surface':  '255 253 245',
    '--color-surface2': '247 239 218',
    '--color-border':   '214 195 156',
    '--color-text':     '45 30 12',
    '--color-muted':    '140 118 85',
  },
}

export function applyThemeVars(themeId) {
  const vars = THEME_VARS[themeId] || THEME_VARS.dark
  const root = document.documentElement
  Object.entries(vars).forEach(([key, val]) => root.style.setProperty(key, val))
}

export function hexToRgbVars(hex) {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null
  return `${r} ${g} ${b}`
}
