export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // source directory
  srcDir: './src',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: process.env.BUSS_LOCALE,
      dir: ['fa', 'ar', 'he'].includes(process.env.NUXT_LOCALE) ? 'rtl' : 'ltr',
    },
    title: 'buss-site',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/ico.svg' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
      },
    ],
    bodyAttrs: {
      class: [
        `${process.env.NODE_ENV !== 'production' ? 'debug-screens' : ''
        } tw-font-sans tw-text-base tw-font-normal tw-bg-light-surface tw-text-light-onSurfacePrimary tw-transition-colors tw-duration-200 tw-ease-in-out`,
      ],
    },
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/main.scss', '~/assets/scss/main'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/axios.ts',
    '~plugins/chassis.ts',
    '~/plugins/i18n',
    '~/plugins/v-click-outside',
    '~/plugins/vue-scrollactive',
    '~/plugins/content-components',
    { src: '~/plugins/vee-validate', mode: 'client' },
    '~/plugins/buefy',
    '~/plugins/global-mixins',
  ],

  // RuntimeConfig properties
  publicRuntimeConfig: {
    bussLocale: process.env.BUSS_LOCALE || 'en',
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/google-fonts-module
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Be Vietnam': true,
          Inconsolata: true,
          'Averia Serif Libre': true,
          'Dancing Script': true,
          Lato: true,
          'Libre Baskerville': true,
        },
      },
    ],
    'nuxt-typed-vuex',
    // https://github.com/Developmint/nuxt-svg-loader/
    // 'nuxt-svg-loader',
    '@nuxtjs/svg',
  ],

  // Modules for dev and build (recommended) cfg
  // tailwindcss: {
  //   purgeCSSInDev: true,
  //   exposeConfig: true
  // },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'cookie-universal-nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-webfontloader',
    // https://i18n.nuxtjs.org/
    'nuxt-i18n',
  ],

  // Module cfg
  webfontloader: {
    google: {
      families: ['Lato:400,700'], // Loads Lato font with weights 400 and 700
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    prefix: '/rs',
    proxy: true,
  },

  proxy: {
    '/rs/': {
      target: process.env.PROXY_TARGET,
      pathRewrite: { '^/rs/': '' },
    },
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },
  generate: {
    fallback: false,
    routes: ['/', '404'],
  },
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
        name: 'English',
        domain: 'https://nuxtjs.org',
      },
    ],
    vueI18n: {
      fallbackLocale: 'en',
    },
    defaultLocale: 'en',
    parsePages: false,
    detectBrowserLanguage: false,
    seo: false,
    lazy: true,
    langDir: 'i18n/',
  },
}
