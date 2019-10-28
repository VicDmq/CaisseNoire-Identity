const Dotenv = require('dotenv-webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const FlowWebpackPlugin = require('flow-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    filename: './src/App.js'
  },
  output: {
    filename: './js/bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /\App.less$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\App.less$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './template/index.html',
      filename: './index.html'
    }),
    new FlowWebpackPlugin(),
    new Dotenv()
  ]
}
