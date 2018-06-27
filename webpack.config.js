const { resolve } = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeSiblingChunksPlugin = require('html-webpack-include-sibling-chunks-plugin')
const url = require('url')
const pkgInfo = require('./package.json')
const glob = require('glob')

const dev = Boolean(process.env.WEBPACK_SERVE)

const entries = glob.sync('./src/pages/**/index.js')
const entry = {}
const htmlPlugins = []
for (const path of entries) {
  const template = path.replace('index.js', 'index.html')
  const chunkName = path.slice('./src/pages/'.length, -'/index.js'.length)
  entry[chunkName] = dev ? [path, template] : path
  htmlPlugins.push(new HtmlWebpackPlugin({
    template,
    filename: chunkName + '.html',
    chunksSortMode: 'none',
    chunks: [chunkName]
  }))
}

module.exports = (env = {}, argv) => {
  const dev = argv.mode === 'development'
  const config = require('./config/' + (env.config || 'default'))

  const ret = {
    mode: dev ? 'development' : 'production',
    devtool: dev ? 'cheap-module-eval-source-map' : 'hidden-source-map',

    entry,

    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all'
      },
      minimizer: dev ? [] : [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin()
      ]
    },

    output: {
      path: resolve(__dirname, 'dist'),
      publicPath: config.publicPath,
      filename: dev ? '[name].js' : '[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },

        {
          test: /\.html$/,
          use: [{
            loader: 'underscore-template-loader',
            options: {
              root: resolve(__dirname, 'src'),
              parseDynamicRoutes: true,
              attributes: ['img:src', 'link:href']
            }
          }]
        },

        {
          test: /\.css$/,
          use: [dev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        },

        {
          test: /favicon\.png$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[hash].[ext]'
              }
            }
          ]
        },

        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          exclude: /favicon\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash'
      }),
      new webpack.DefinePlugin({
        DEBUG: dev,
        VERSION: JSON.stringify(pkgInfo.version),
        CONFIG: JSON.stringify(config.runtimeConfig)
      }),

      new webpack.HashedModuleIdsPlugin(),

      new MiniCssExtractPlugin({
        filename: '[contenthash].css',
        chunkFilename: '[contenthash].css'
      }),

      new HtmlWebpackIncludeSiblingChunksPlugin(),

      ...htmlPlugins
    ],

    resolve: {
      alias: {
        '~': resolve(__dirname, 'src')
      }
    },

    performance: {
      hints: dev ? false : 'warning'
    }
  }

  if (dev) {
    ret.devServer = {
      host: '0.0.0.0',
      disableHostCheck: true,
      port: config.devServer.port,
      historyApiFallback: {
        index: url.parse(config.publicPath).pathname,
        disableDotRule: true
      }
    }
  }

  return ret
}
