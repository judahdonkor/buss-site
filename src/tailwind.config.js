const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  important: true,
  future: {},
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'src/components/**/*.{js,ts,vue,tsx,jsx}',
      'src/layouts/**/*.{js,ts,vue,tsx,jsx}',
      'src/pages/**/*.{js,ts,vue,tsx,jsx}',
      'src/plugins/**/*.{js,ts}',
      'nuxt.config.js',
      'node_modules/vue-tailwind/dist/*.js',
    ],
  },
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.5rem',
      },
      colors: {
        'cornflower-blue': '#6495ED',
        // monochromatic
        'royal-blue': '#3676E8',
        // complementary
        porsche: '#EDBC64',
        // analogous
        'medium-slate-blue': '#7864ED',
        'turquoise-blue': '#64DAED',
        // triadic
        froly: '#ED6495',
        sulu: '#95ED64',
        // tetradic
        'lavender-magenta': '#ED64DA',
        'pastel-green': '#64ED78',
        light: {
          surface: '#F8FAFC',
          onSurfacePrimary: '#2F495E',
          onSurfaceSecondary: '#606F7B',
          elevatedSurface: defaultTheme.colors.white,
          border: defaultTheme.colors.gray['300'],
        },
        dark: {
          surface: '#2C3E50',
          onSurfacePrimary: '#F5F7FA',
          onSurfaceSecondary: '#B8C2CC',
          elevatedSurface: '#2F495E',
          border: defaultTheme.colors.gray['600'],
        },
      },
      fontFamily: {
        sans: ['Be Vietnam', ...defaultTheme.fontFamily.sans],
        serif: ['Libre\\ Baskerville', ...defaultTheme.fontFamily.serif],
        mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
        display: ['Averia\\ Serif\\ Libre'],
        script: ['Dancing\\ Script'],
      },
      backgroundSize: {
        0: '0px',
        '65%': '65%',
        16: '4rem',
      },
    },
  },
  variants: {
    extend: {
      container: [],
      textColor: ['responsive', 'group-hover', 'hover', 'focus'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
    require('@tailwindcss/forms'),
  ],
}
