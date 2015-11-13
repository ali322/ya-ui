var webpack = require('webpack'),
    path = require('path'),
    _ = require("lodash");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, '../node_modules');

module.exports = {
    entry: {
        'yaui': './src/index.es6',
        // 'vendor': ['react', 'react/addons', 'reflux', 'lodash']
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
            loader: 'style!css!stylus!autoprefixer'
                // loader: ExtractTextPlugin.extract('style', 'css!sass')
        }, {
            test: /\.css/,
            // exclude: [node_modules_dir],
            loader: 'style!css'
                // loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=8192&mimetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=8192&mimetype=application/font-woff"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=8192&mimetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=8192&mimetype=image/svg+xml"
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
        libraryTarget: "commonjs",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js",
    },
    externals: {
        // "react/addons": "react/addons",
        // "reflux": "reflux",
        // "lodash": "lodash"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // new webpack.optimize.CommonsChunkPlugin('vendor', './vendor.js'),
        // new ExtractTextPlugin("./[name].css")
    ]
}
