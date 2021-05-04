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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,400;1,500;1,700;1,900&display=swap',
      },
    ],
  },
  css: ['~/assets/css/style.css'],
  plugins: [],
  components: true,
  buildModules: ['@nuxtjs/eslint-module'],
  styleResources: {
    scss: [],
  },
  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios', '@nuxtjs/auth-next'],
  axios: {
    baseURL: process.env.API_URL,
  },
  auth: {
    redirect: {
      login: '/admin-panel/login',
      home: '/admin-panel',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: '/admin/login', method: 'post' },
          logout: { url: '/admin/logout', method: 'post' },
          user: { url: '/admin/loginInfo', method: 'get' },
        },
      },
    },
  },
  build: {},
}
