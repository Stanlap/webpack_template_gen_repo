const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',

  devServer: {
    port: 8081,
    contentBase: baseWebpackConfig.externals.paths.dist,
    overlay: {
      warnings: true,
      errors: true
    }
  }

})
module.exports = new Promise((resolve, reject) => {
 resolve(devWebpackConfig)
})