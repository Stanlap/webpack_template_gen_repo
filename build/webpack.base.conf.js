const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// const TerserWebpackPlugin = require('terser-webpack-plugin')
const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: 'assets/'
}


module.exports = {

  externals: {
    paths: PATHS
  },

  entry: {
    main: `${PATHS.src}/index.js`,
  },

  output: {
    filename: '[name].bundle.js',
    path: `${PATHS.dist}/public`,
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
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: PATHS.dist,
          useRelativePath: true
        }
      },
      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          'css-loader'
        ]
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
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'favicon.ico',
          to: `${PATHS.dist}/public`
        },
        {
          from: `${PATHS.src}/assets/css`,
          to: `${PATHS.dist}/public/assets/css`
        },
        {
          from: `${PATHS.src}/assets/img`,
          to: `${PATHS.dist}/public/assets/img`
        },
        {
          from: `${PATHS.src}/public/back/smint_backend`,
          to: `${PATHS.dist}/`
        },
        {
          from: `${PATHS.src}/public/back/vte_brain.js`,
          to: `${PATHS.dist}/public`
        },
        {
          from: './node_modules/bootstrap/dist/css/bootstrap.min.css',
          to: `${PATHS.dist}/public/ext_libr`
        },
        {
          from: './node_modules/bootstrap/dist/js/bootstrap.min.js',
          to: `${PATHS.dist}/public/ext_libr`
        },
        {
          from: './node_modules/jquery/dist/jquery.min.js',
          to: `${PATHS.dist}/public/ext_libr`
        },
        {
          from: './node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css',
          to: `${PATHS.dist}/public/ext_libr`
        },
        {
          from: './node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js',
          to: `${PATHS.dist}/public/ext_libr`
        },
        {
          from: './node_modules/@fortawesome/fontawesome-free/js/solid.min.js',
          to: `${PATHS.dist}/public/ext_libr`
        },
        {from: `${PATHS.src}/public/front/views/main.ejs`, to: `${PATHS.dist}/public/views`}

      ]
    }),

    new HtmlWebpackPlugin({
      template: `${PATHS.src}/public/front/views/partials/header_1.ejs`,
      filename: 'views/partials/header_1.ejs',
      minify: {
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/public/front/views/partials/footer.ejs`,
      filename: 'views/partials/footer.ejs',
      minify: {
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/public/front/views/partials/head.ejs`,
      filename: 'views/partials/head.ejs',
      minify: {
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/public/front/views/partials/scripts.ejs`,
      filename: 'views/partials/scripts.ejs',
      minify: {
        collapseWhitespace: true
      }
    })
  ]

}