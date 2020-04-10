const Dotenv = require('dotenv-webpack');

const { entry, output, resolve, plugins, rules } = require('./webpack.config.common.js');

module.exports = {
  mode: 'development',
  entry,
  output,
  resolve,
  module: rules(false),
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [...plugins, new Dotenv()],
};
