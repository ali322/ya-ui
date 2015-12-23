var webpack = require('webpack'),
    path = require('path'),
    _ = require("lodash");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, '../node_modules');

module.exports = {
    entry: {
        'yaui': ['./src/index.es6']
    },
    module: {
        loaders: [{
            test: /\.json/,
            exclude: [node_modules_dir],
            loader: 'json'
        }, {
            test: /\.(es6|jsx)$/,
            exclude: [node_modules_dir],
            loader: 'babel'
                // loader: 'react-hot!babel-loader'
        }, , {
            test: /\.html/,
            exclude: [node_modules_dir],
            loader: 'html'
        }, {
            test: /\.styl/,
            exclude: [node_modules_dir],
            // loader: 'style!css!stylus!autoprefixer'
            loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!stylus')
        }, {
            test: /\.css/,
            // exclude: [node_modules_dir],
            loader: 'style!css'
                // loader: ExtractTextPlugin.extract('style', 'css')
        }]
    },
    resolve: {
        extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js", ".json", ".coffee"]
    },
    output: {
        path: "./dist/minified",
        libraryTarget: "commonjs2",
        filename: "[name]-[hash].js",
        chunkFilename: "[id]-[hash].chunk.js",
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.NoErrorsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin('vendor', './vendor.js'),
        new ExtractTextPlugin("[name]-[hash].css")
    ]
}
