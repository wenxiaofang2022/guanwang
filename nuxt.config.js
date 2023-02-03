const autoprefixer = require("autoprefixer");
export default {
  ssr: false,
  target:'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '欢迎进入给油所，请自取灵感能量',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script:[
      {
        src:'/js/flexible.js',ssr:false
      }
    ]
  },
  // devServer:{
  //   host:'localhost'
  // },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/static/sass/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // {src: '~/plugins/vue3dloader.js'},
    {src: '~/plugins/vuelazyload.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],
  layoutTransition: 'layout',
  // styleResources:{
  //   scss:[
  //     "./sass/main.scss"
  //   ]
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS:false,
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: ["last 15 versions"]
        }),
        require('postcss-plugin-px2rem')({
          rootValue:75,
          minPixelValue:2,
          exclude: /(node_module|static)/
        })
      ],
      extend(config, { isDev }) {
        if (!isDev) {
          config.output.publicPath = './static/'
        }
      },
      // router:{
      //   mode: 'hash',
      //   base:"/" //此为根目录，如果有具体目录需求按实际情况写
      // }
    },
    transpile: ["three"]
  },
  router: {
    mode: 'hash',
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     name: 'page-not-found',
    //     path: '*',
    //     component: resolve(__dirname, 'pages/404.vue')
    //   })
    // }
  },
  axios:{
    baseURL:''
  },
  // email: {
  //   //邮件配置        
  //   service: '邮箱地址',
  //   user: '你的邮箱',
  //   pass: '你的密码'
  // }
}
