const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  // mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: ["babel-loader"]
      },
      {
        test: /\.(css)$/,
        include: path.resolve(__dirname, 'src'),
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(less)$/,
        include: path.resolve(__dirname, 'src'),
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(pdf)$/,
        include: path.resolve(__dirname, 'src'),
        type: 'asset'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.join(__dirname, 'src', 'index.html')}),
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    },
    fallback: {
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      buffer: require.resolve('buffer'),
      assert: require.resolve('assert'),
      util: require.resolve('util'),
    }
  }
};
