const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const PATHS={
  src:path.resolve(__dirname,'../src'),
  dist:path.resolve(__dirname,'../dist'),
assets:'assets/'
}


module.exports = {

  externals:{
paths: PATHS
  },
    entry: {
        app: PATHS.src,
        lk: PATHS.src
      },
    
     output: {
        filename: `${PATHS.assets}js/[name].[contenthash].bundle.js`,
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
//         resolve:{
// extensions: ['.js','.json', '.png'],
// alias: {
//   @....: ...path...,
// }
//         },
  module: {
    rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath:PATHS.dist,
        useRelativePath: true
            }
    }, 
    {
      test: /\.css$/,
    use: [ {
      loader:MiniCssExtractPlugin.loader,
      options:{
        hmr: true,
        reloadAll: true
      }
    },
      'css-loader']
  }
    // {
    //   test: /\.css$/,
    //   use: [
    //     'style-loader',
    //     MiniCssExtractPlugin.loader,
    //     {
    //       loader: 'css-loader',
    //       options: { sourceMap: true }
    //     }, 
    //     {
    //       loader: 'postcss-loader',
    //       options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js`}
    //      }
    //     }
    //   ]
    // }
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
      filename: `${PATHS.assets}css/[name].[contenthash].css`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'favicon.ico', to: `${PATHS.dist}/` },
        { from: `${PATHS.src}/img`, to: `${PATHS.assets}/img` }
        ]
    }),
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      title: 'First page',
      files: '/favicon.ico',
      template: `${PATHS.src}/views/index.ejs`,
      filename: './index.html',
      minify: {
collapseWhitespace: true
      }
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