var webpack = require('webpack'),
    path = require('path'),
    del = require("del"),
    _ = require("lodash");

// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, '../node_modules');


var entries = {},
    examples = require("./example.json");
_.each(examples, function(obj, name) {
    var entry = {};
    var entryCSS = obj.path + obj.entryCSS;
    var entryJS = obj.path + obj.entryJS;
    entry[name] = [
        entryCSS,
        entryJS        
    ];
    del.sync(obj.path + "dist/*.*");
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
            // loader: 'style!css!stylus!autoprefixer'
            loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!stylus')
        }, {
            test: /\.css/,
            // exclude: [node_modules_dir],
            // loader: 'style!css'
            loader: ExtractTextPlugin.extract('style', 'css')
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
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ vendorChunkName, /* filename= */ vendorFile),
        new ExtractTextPlugin("example/[name]/dist/[name]-[hash].css")
    ]
}
