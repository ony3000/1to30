
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    'vuetify/dist/vuetify.min.css',
    '~/assets/styles/application.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vuetify'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  /*
  ** Nuxt PWA configuration
  */
  meta: {
    name: '1부터 30까지!',
    description: '1부터 30까지 빠르게 누르는 게임입니다.',
    lang: 'ko',
    nativeUI: true
  },
  manifest: {
    name: '1부터 30까지!',
    short_name: '1 to 30!',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#fafafa',
    theme_color: '#ffc039',
    lang: 'ko'
  }
}
