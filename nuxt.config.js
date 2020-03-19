require('dotenv').config();
const PORT = process.env.PORT || 3000;
module.exports = {
   mode: 'universal',
   /*
    ** Headers of the page
    */
   head: {
      title: process.env.npm_package_name || '',
      meta: [
         { charset: 'utf-8' },
         { name: 'viewport', content: 'width=device-width, initial-scale=1' },
         {
            hid: 'description',
            name: 'description',
            content: process.env.npm_package_description || '',
         },
      ],
      link: [
         { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
         {
            rel: 'stylesheet',
            href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
         },
         {
            rel: 'stylesheet',
            href: ' https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
         },
      ],
      script: [
         {
            src: '//cdn.fusioncharts.com/fusioncharts/3.15.0-sr.1/fusioncharts.js',
            type: 'text/javascript',
         },
         {
            src: '//cdn.fusioncharts.com/fusioncharts/3.15.0-sr.1/themes/fusioncharts.theme.fusion.js',
            type: 'text/javascript',
         },
      ],
   },
   /*
    ** Customize the progress-bar color
    */
   loading: { color: '#fff' },
   /*
    ** Global CSS
    */
   css: ['@/assets/css/main.scss'],
   /*
    ** Plugins to load before mounting the App
    */
   plugins: [],
   /*
    ** Nuxt.js dev-modules
    */
   buildModules: [
      // Doc: https://github.com/nuxt-community/eslint-module
      '@nuxtjs/eslint-module',
   ],
   /*
    ** Nuxt.js modules
    */
   modules: [
      // Doc: https://axios.nuxtjs.org/usage
      '@nuxtjs/axios',
      '@nuxtjs/pwa',
      // Doc: https://github.com/nuxt-community/dotenv-module
      '@nuxtjs/dotenv',
      'bootstrap-vue/nuxt',
   ],

   bootstrapVue: {
      componentPlugins: ['ToastPlugin', 'ModalPlugin'],
   },

   /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
   axios: {
      browserBaseURL: `/api/`,
      baseURL: `http://localhost:${PORT}/api/`,
   },
   /*
    ** Build configuration
    */
   build: {
      /*
       ** You can extend webpack config here
       */
      extend(config, ctx) {},
   },
};
