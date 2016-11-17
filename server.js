var webpack           = require('webpack');
var WebpackDevServer  = require('webpack-dev-server');
var config            = require('webpack.config');

new WebpackDevServer(
  publicPath: config.output.publicPath;
  hot: true,
  historyApiFallback: true,
  quiet: true, // suppress errors shown in console
  noInfo: false,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: false,
    chunks: false
    chunkModules: false
  }
).listen(9292, 'localhost', function(error) {
  if (error) {
    console.log(error);
  }

  console.log('Listening at localhost:3000');
});
