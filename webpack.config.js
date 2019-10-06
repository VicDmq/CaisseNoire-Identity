const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./template/index.html",
  filename: "./index.html"
});

const cleanPlugin = new CleanWebpackPlugin({});

module.exports = {
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
      }
    ]
  },
  plugins: [htmlPlugin, cleanPlugin]
};
