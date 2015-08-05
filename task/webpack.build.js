var webpack = require('webpack'),
    path = require('path'),
    _ = require("lodash");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, '../node_modules');

module.exports = {
    entry: {
        'yaui': './src/index.js',
        // 'vendor': ['react', 'react/addons', 'reflux', 'lodash']
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
            loader: 'style!css!sass!autoprefixer'
            // loader: ExtractTextPlugin.extract('style', 'css!sass')
        }, {
            test: /\.css/,
            // exclude: [node_modules_dir],
            loader: 'style!css'
                // loader: ExtractTextPlugin.extract('style', 'css')
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
        "react/addons": "react/addons",
        "reflux": "reflux",
        "lodash": "lodash"
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
