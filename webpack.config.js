var webpack = require('webpack'),
    path = require('path'),
    _ = require("lodash");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, '../node_modules');

module.exports = {
    entry: {
        'vendor': ['react', 'reflux', 'lodash'],
        'yaui': './src/index.js'
    },
    module: {
        loaders: [{
            test: /\.json/,
            exclude: [node_modules_dir],
            loader: 'json'
        }, {
            test: /\.(js|jsx)$/,
            exclude: [node_modules_dir],
            loader: 'babel-loader'
                // loader: 'react-hot!babel-loader'
        }, , {
            test: /\.html/,
            exclude: [node_modules_dir],
            loader: 'html'
        }, {
            test: /\.scss/,
            exclude: [node_modules_dir],
            loader: ExtractTextPlugin.extract('style', 'css!sass')
        }, {
            test: /\.(png|jpg)$/,
            exclude: [node_modules_dir],
            loader: 'url?limit=25000'
        }]
    },
    resolve: {
        extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js", ".json", ".coffee"]
    },
    output: {
        path: "./dist",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js",
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', './vendor.js'),
        new ExtractTextPlugin("./[name].css")
    ]
}
