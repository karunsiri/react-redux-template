'use strict';

var path              = require('path');
var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-plugin');
var StatsPlugin       = require('stats-webpack-plugin');

var config            = require('./webpack.config.js');

config.entry = [
  path.join(__dirname, 'app/index.js')
];

config.output.filename = '[name]-[hash].min.js';
config.plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new HtmlWebpackPlugin({
    template: 'app/index.tpl.html',
    inject: 'body',
    filename: 'index.html'
  }),
  // Extracts the css from the js's and puts them on a separate .css file.
  // This is for performance and is used in prod environment. Styles load faster
  // on their own becaus they don't have to wait for the .js's to load
  new ExtractTextPlugin('[name]-[hash].min.css'),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
      screw_ie8: true
    }
  }),
  new StatsPlugin('webpack.stats.json', {
    source: false,
    modules: false
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
];

config.eslint = {
  configFile: '.eslintrc',
  failOnWarning: false,
  failOnError: true
};

config.module = {
  preLoaders: [
    {
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'eslint'
    }
  ],
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
      loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
    }
  ]
};

config.postcss = [require('autoprefixer')];

delete config['devtool'];

module.exports = config;
