const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
    // './src/PacmanGame/server/index.js'
    // 'webpack-dev-server/client?http://localhost:4000'
  ],
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer: {
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
