const Dotenv = require('dotenv-webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const FlowWebpackPlugin = require('flow-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    filename: './src/App.js'
  },
  output: {
    filename: './js/bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Text': path.resolve(__dirname, 'src/text')
    }
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
        exclude: /\app.less$/,
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
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: ['./src/styles/variables.less']
            }
          }
        ]
      },
      {
        test: /\app.less$/,
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
