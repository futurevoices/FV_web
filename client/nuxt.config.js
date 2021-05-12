export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'FutureVoices',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/global.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/components.js' },
    { src: '@/plugins/plugins.js' },
    { src: '~/plugins/vue-tags-input', ssr: false },
    { src: '~/plugins/vue-dragscroll', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // Simple usage
    '@nuxtjs/router-extras'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/router-extras',
    [
      'nuxt-matomo',
      {
        matomoUrl: 'https://stats.vinzenzaubry.com/',
        siteId: 5,
        cookies: false,
        trackerUrl: 'https://stats.vinzenzaubry.com/vinni.php?',
        scriptUrl: 'https://stats.vinzenzaubry.com/vinni.js'
        // debug: true,
        // verbose: true,
      }
    ]
  ],

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  styleResources: {
    scss: ['~/assets/scss/variables.scss']
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)

  // for online and real database: https://zukunftsmusik.radio/
  // (used to be https://zukunftsmusik.radio:8093/ when node was only accesible via port and not rerouted via nginx)
  // for local testing: http://localhost:1312/

  axios: {
    baseURL: '/'
  },

  publicRuntimeConfig: {
    baseURL: '/'
  },
  privateRuntimeConfig: {
    // apiSecret: process.env.API_SECRET,
    baseURL: '/'
  },

  server: {
    port: 8096, // default: 3000
    host: '127.0.0.1' // default: localhost 0.0.0.0 for sharing // 127.0.0.1 for online
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: ['@johmun/vue-tags-input'],
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|mp4|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      });
    },
    transpile: ['three']
  }
};
