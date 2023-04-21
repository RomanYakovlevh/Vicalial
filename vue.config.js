const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  publicPath: '/~royako/iti0209/vicalial-vue/dist/',
  ss: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          fiber: require('fibers'),
          indentedSyntax: true // set to true if you are using indented syntax
        }
      }
    }
  }
})
