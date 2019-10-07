const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FlowWebpackPlugin = require("flow-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./template/index.html",
  filename: "./index.html"
});

const cssExtractPlugin = new MiniCssExtractPlugin({
  filename: "./css/[name].[hash].css",
  chunkFilename: "[id].[hash].css"
});

const cleanPlugin = new CleanWebpackPlugin({});

const flowPlugin = new FlowWebpackPlugin();

module.exports = {
  entry: {
    filename: "./index.js"
  },
  output: {
    filename: "./js/bundle.js"
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
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDev
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\app.scss$/,
        loader: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin, cleanPlugin, cssExtractPlugin, flowPlugin]
};
