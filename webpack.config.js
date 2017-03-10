let webpack = require('webpack')
let path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

let entry = [path.join(__dirname, 'src', 'index.js'), path.join(__dirname, 'src', 'index.styl')]
let dist = path.join(__dirname, 'dist')

let ASSET_FONT_OUTPUT = path.join('.', 'asset', 'font', path.sep)
let ASSET_IMAGE_OUTPUT = path.join('.', 'asset', 'image', path.sep)

module.exports = {
    entry,
    module: {
        rules: [{
                test: /\.(js|es6|jsx)/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.styl/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'resolve-url-loader' },
                        { loader: 'stylus-loader', options: { sourceMap: true } }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    outputPath: ASSET_IMAGE_OUTPUT,
                    publicPath: ASSET_IMAGE_OUTPUT,
                    hash: 'sha512',
                    digest: 'hex',
                    name: '[hash:8].[ext]'
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff",
                    outputPath: ASSET_FONT_OUTPUT,
                    publicPath: ASSET_FONT_OUTPUT,
                    hash: 'sha512',
                    digest: 'hex',
                    name: '[hash:8].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    outputPath: ASSET_FONT_OUTPUT,
                    publicPath: ASSET_FONT_OUTPUT,
                    hash: 'sha512',
                    digest: 'hex',
                    name: '[hash:8].[ext]'
                }
            }
        ]
    },
    devtool: false,
    output: {
        path: dist,
        library: "yaui",
        libraryTarget: "umd",
        filename: "ya-ui.js"
    },
    performance: {
        hints: false
    },
    stats: {
        chunks: false,
        version: false,
        colors: true
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom",
            root: "ReactDOM"
        }
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: false,
            minimize: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            sourceMap: false,
            output: {
                comments: false
            }
        }),
        new ExtractTextPlugin('ya-ui.css')
    ]
}