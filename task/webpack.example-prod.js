var webpack = require('webpack'),
    path = require('path'),
    del = require("del"),
    _ = require("lodash");

// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, '../node_modules');


var entries = {},
    examples = require("./example.json");
_.each(examples, function(obj, name) {
    var entry = {};
    entry[name] = [
        // 'webpack-dev-server/client?http://localhost:9527',
        // 'webpack/hot/only-dev-server',
        obj.entyJs
    ];
    del.sync(obj.path + "dist/*.js");
    _.extend(entries, entry);
});


module.exports = {
    entry: entries,
    module: {
        loaders: [{
            test: /\.json/,
            exclude: [node_modules_dir],
            loader: 'json'
        }, {
            test: /\.(es6|jsx)$/,
            exclude: [node_modules_dir],
            loader: 'babel'
        }, , {
            test: /\.html/,
            exclude: [node_modules_dir],
            loader: 'html'
        }, {
            test: /\.styl/,
            exclude: [node_modules_dir],
            loader: 'style!css!stylus!autoprefixer'
                // loader: ExtractTextPlugin.extract('style', 'css!sass!autoprefixer')
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
        // path: path.join(__dirname, "../"),
        path: "./",
        filename: "example/[name]/dist/[name]-[hash].js",
        chunkFilename: "example/[name]/dist/[id]-[hash].chunk.js",
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ vendorChunkName, /* filename= */ vendorFile),
        // new ExtractTextPlugin("modules/[name]/build/[name].css")
    ]
}
