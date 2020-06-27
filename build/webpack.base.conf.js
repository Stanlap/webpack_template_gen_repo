const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const PATHS={
  src:path.join(__dirname,'../src'),
  dist:path.join(__dirname,'../dist'),
assets:'assets/'
}
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')


module.exports = {

  externals:{
paths: PATHS
  },
    entry: {
        app: PATHS.src,
        lk: PATHS.src
      },
    
     output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/'
      },
        optimization: {
          splitChunks: {
            cacheGroups: {
              vendor: {
                name: 'vendors',
                test: /node_modules/,
                chunks: 'all',
                enforce: true
              }
            }
          }
        },
  module: {
    rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      }
    }, 
    {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js`}
         }
        }
      ]
    }
]
  },
  plugins: [
    new webpack.ProvidePlugin({
$: 'jquery',
jQuery: 'jquery',
jquery: 'jquery',
Popper: ['popper.js', 'default']
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/img`, to: `${PATHS.assets}/img` },
        { from: `${PATHS.src}/static`, to: '' }
        ]
    }),
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: `${PATHS.src}/views/index.ejs`,
      filename: './index.html',
      // inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'template_1.html',
      template: `${PATHS.src}/views/template_1.ejs`,
      title: 'My firt title template',
      section_1: '<div>Insertion!!!!</div>'
    }),
    new HtmlWebpackPlugin({
      title: 'Home',
      template: `${PATHS.src}/views/index.ejs`,
      filename: 'trial_1.html',
      favicon: "./favicon.ico" 
    }),
    new HtmlWebpackPlugin({
      title: 'About',
      template: './src/views/about.ejs',
      filename: 'trial_2.html',
      favicon: "./favicon.ico"
    }),
    new HtmlWebpackPartialsPlugin({
      path: `${PATHS.src}/views/partials/navigation.html`,
      location: 'navigation',
      template_filename: ['trial_1.html', 'trial_2.html', 'template_1.html']
    })
]

}