const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FlowWebpackPlugin = require("flow-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    filename: "./src/App.js"
  },
  output: {
    filename: "./js/bundle.[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\app.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\app.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./template/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "./css/style.[hash].css"
    }),
    new CleanWebpackPlugin({}),
    new FlowWebpackPlugin(),
    new Dotenv()
  ]
};
