var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.hot-update.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo:true,
  historyApiFallback: true
}).listen(9527, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('HMR Listening at 9527');
});
