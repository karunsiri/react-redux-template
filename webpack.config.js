'use strict';

var path              = require('path');
var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:9292',
    'webpack/hot/only-dev-server',
    'react-hot-reload/patch',
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  resolve: {
    // tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
    extensions: ['', '.js', '.jsx'],

    // search in node_modules and vendor/assets/components
    modulesDirectories: ['node_modules', 'vendor/assets/components/'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'react', 'stage-0'] },
        plugins: ['react-hot-loader/babel']
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss/,
        loader: 'style|css|sass?module&localIdentName=[name]---[local]---[hash:base64:5]'
      }
    ]
  }
}
