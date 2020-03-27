const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: {
    filename: './src/index.js',
  },
  output: {
    filename: './js/bundle.js',
    publicPath: '/',
  },
  resolve: {
    mainFiles: ['index'],
    alias: {
      '@HOC': path.resolve(__dirname, 'src/hoc'),
      '@Providers': path.resolve(__dirname, 'src/providers'),
      '@Pages': path.resolve(__dirname, 'src/pages'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  rules: (isProd) => ({
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: isProd },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /app.less$/,
        loader: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: ['./src/styles/variables.less'],
            },
          },
        ],
      },
      {
        test: /app.less$/,
        loader: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  }),
  plugins: [
    new HtmlWebPackPlugin({
      template: './template/index.html',
      filename: './index.html',
    }),
  ],
};
