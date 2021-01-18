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
    '@nuxtjs/style-resources'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  styleResources: {
    scss: ['~/assets/scss/variables.scss']
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)

  // for online and real database: https://zukunftsmusik.radio:8093/
  // for local testing: http://localhost:1312/

  axios: {
    baseURL: 'https://zukunftsmusik.radio:8093/'
  },

  publicRuntimeConfig: {
    baseURL: 'https://zukunftsmusik.radio:8093/'
  },
  privateRuntimeConfig: {
    // apiSecret: process.env.API_SECRET,
    baseURL: 'https://zukunftsmusik.radio:8093/'
  },

  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost 0.0.0.0 for sharing
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
