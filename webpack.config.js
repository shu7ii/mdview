const path = require('path');

/** @typedef {import('webpack').Configuration} Configuration */
/** @type Configuration */
module.exports = {
  name: 'modern',
  mode: 'development',
  entry: {
    main: path.resolve('src', 'ts', 'entry_points', 'main.tsx'),
    '../../sw': path.resolve('src', 'ts', 'entry_points', 'sw.ts'),
  },
  output: {
    path: path.resolve('public', 'common', 'js'),
    filename: '[name].js',
    publicPath: path.join('/', 'common/', 'js/'),
  },
  optimization: {
    splitChunks: {
      name: path.join('shared', 'main'),
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.worker\.(js|ts)$/i,
        use: [
          {
            loader: 'comlink-loader',
            options: {
              singleton: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
};
