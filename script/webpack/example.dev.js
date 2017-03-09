let path = require('path')
let assign = require('object-assign')
let HtmlPlugin = require('html-webpack-plugin')
let HtmlWriteHarddiskPlugin = require('html-webpack-harddisk-plugin')
let buildConfig = require('./example.build')

let hmrPath = '/hmr/'

let devConfig = assign({}, buildConfig, {
    output: {
        path: buildConfig.output.path,
        publicPath: hmrPath
    },
    devServer: {
        publicPath: hmrPath,
        contentBase: path.join(process.cwd(), 'example', 'dist'),
        historyApiFallback: true,
        hot: true,
        hotOnly: true,
        noInfo: true,
        watchOptions: {
            poll: true,
            aggregateTimeout: 300
        },
        port: 7000
    },
    plugins: buildConfig.plugins.slice(0, -2).concat([
        new HtmlPlugin({
            template: path.join('example', 'src', 'index.html'),
            filename: 'index.html',
            alwaysWriteToDisk: true
        }),
        new HtmlWriteHarddiskPlugin({
            outputPath: path.join('example', 'dist')
        })
    ])
})

module.exports = devConfig