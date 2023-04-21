const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  publicPath: '/~royako/iti0209/vicalial-vue/dist/',
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          indentedSyntax: false // set to true if you are using indented syntax
        }
      }
    }
  }
})
