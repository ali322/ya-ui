let path = require('path')
let webpack = require('webpack')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let autoPrefixer = require('autoprefixer')

let nodeModuleDir = path.join(process.cwd(), 'node_modules')
let sourceDir = path.join(process.cwd(), 'src')
let exampleDir = path.join(process.cwd(), 'example')
let buildDir = [sourceDir, exampleDir]

module.exports = (constants) => {
    const { IS_DEV, FONT_OUTPUT, IMAGE_OUTPUT } = constants

    const postcssOptions = {
        plugins: function() {
            let plugins = [
                autoPrefixer()
            ]
            return plugins
        }
    }

    let stylusLoaders = [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'postcss-loader', options: postcssOptions },
        { loader: 'resolve-url-loader' },
        { loader: 'stylus-loader', options: { sourceMap: true } }
    ]

    if (!IS_DEV) {
        stylusLoaders = ExtractTextPlugin.extract({
            loader: stylusLoaders.slice(1),
            fallback: stylusLoaders[0]
        })
    }

    let rules = [{
            test: /\.(js|es6|jsx)/,
            loader: 'babel-loader',
            options: {
                cacheDirectory: true
            },
            include: buildDir
        },
        {
            test: /\.html/,
            loader: 'html-loader',
            include: buildDir
        },
        {
            test: /\.styl/,
            use: stylusLoaders,
            include: buildDir
        },
        {
            test: /\.(jpg|png|bmp)/,
            loader: 'url-loader',
            options: {
                limit: 2500,
                outputPath: IMAGE_OUTPUT,
                publicPath: IMAGE_OUTPUT,
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
                outputPath: FONT_OUTPUT,
                publicPath: FONT_OUTPUT,
                hash: 'sha512',
                digest: 'hex',
                name: '[hash:8].[ext]'
            }
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
            options: {
                outputPath: FONT_OUTPUT,
                publicPath: FONT_OUTPUT,
                hash: 'sha512',
                digest: 'hex',
                name: '[hash:8].[ext]'
            }
        }
    ]

    return IS_DEV ? {
        devtool: "#inline-source-map",
        module: { rules },
        context: process.cwd(),
        watch: true,
        performance: { hints: false },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new FriendlyErrorsPlugin({ clearConsole: false }),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    } : {
        devtool: false,
        module: { rules },
        context: process.cwd(),
        plugins: [
            new webpack.LoaderOptionsPlugin({
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
        ]
    }
}