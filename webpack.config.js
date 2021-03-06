const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: devMode ? 'development' : 'production',
  output: {
    filename: '[name]/bundle.js'
  },
  entry: {
    home: './src/pages/home/app.js',
    todolist: './src/pages/todolist/app.js'
  },
  devtool: devMode ? 'inline-source-map' : 'source-map',
  devServer: {
    contentBase: './dist'
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        sourceMap: true
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/pages/home/index.html',
      filename: './index.html',
      favicon: "./src/images/favicon.png",
      chunks: ['home']
    }),
    /*
    new HtmlWebpackPlugin({
      favicon: "./src/images/favicon.png",
      template: './src/pages/env-vars/index.html',
      filename: './env-vars/index.html',
      chunks: ['env-vars']
    }),
    */
    new HtmlWebpackPlugin({
      template: './src/pages/todolist/index.html',
      filename: './todolist.html',
      favicon: "./src/images/favicon.png",
      chunks: ['todolist']
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/bundle.css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
          options: {
            importLoaders: 2,
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader', // run postcss actions
          options: {
            sourceMap: true,
            plugins: function () { // postcss plugins, can be exported to postcss.config.js
              return [
                require('autoprefixer'),
                require('cssnano') ({
                  preset: 'default'
                })
              ];
            }
          }
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
          options: {
            sourceMap: true
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]?[hash:8]',
            outputPath: './assets/images/',
            publicPath: '/assets/images/',
            esModule: false
          }
        }]
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]?[hash:8]',
            outputPath: './assets/fonts/',
            publicPath: '/assets/fonts/',
            esModule: false
          }
        }]
      }
    ]
  }
}