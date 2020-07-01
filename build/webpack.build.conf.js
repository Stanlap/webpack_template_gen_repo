const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD settings gonna be here
  mode: 'production',

  plugins: [],
  module:{
      rules:[
        {
test:/\.(jpe?g|png|svg|gif)$/,
use:[
  {
    loader: 'image-webpack-loader',
    options:{
      mozjpeg:{
        progressive:true,
        quality: 70
      },
      pngquant: {
        quality: [0.65, 0.90],
        speed: 4
      }
    }
  }
]
      }
    ]
  }
})

// export buildWebpackConfig
module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})