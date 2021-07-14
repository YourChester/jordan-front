export default {
  server: {
    port: process.env.HOST_PORT,
    host: process.env.HOST_URL,
  },
  head: {
    title: process.env.HOST_NAME,
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,400;1,500;1,700;1,900&display=swap',
      },
    ],
  },
  css: ['~/assets/css/style.css', '~/assets/scss/catalog.scss'],
  plugins: ['~/plugins/axios'],
  components: true,
  buildModules: ['@nuxtjs/eslint-module'],
  styleResources: {
    scss: [],
  },
  env: process.env,
  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios', '@nuxtjs/auth-next'],
  axios: {
    baseURL: process.env.API_URL,
  },
  auth: {
    redirect: {
      login: '/admin-panel/login',
      home: '/admin-panel/products',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
        },
        user: {
          property: 'seller',
        },
        endpoints: {
          login: { url: '/admin/auth/login', method: 'post' },
          logout: { url: '/admin/auth/logout', method: 'post' },
          user: { url: '/admin/auth/user-info', method: 'get' },
        },
      },
    },
  },
  build: {
    babelrc: false,
    cacheDirectory: undefined,
    babel: {
      presets: [
        ['@nuxt/babel-preset-app'],
        [
          '@babel/preset-env',
          {
            targets: {
              chrome: '50',
            },
          },
        ],
      ],
    },
  },
}
