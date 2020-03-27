const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { entry, output, resolve, plugins, rules } = require('./webpack.config.common.js');

module.exports = {
  mode: 'production',
  entry,
  output,
  resolve,
  module: rules(true),
  plugins: [
    ...plugins,
    new MiniCssExtractPlugin({
      filename: './css/style.[hash].css',
    }),
    new CleanWebpackPlugin({}),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL),
      },
    }),
  ],
};
