let path = require('path')
let assign = require('object-assign')
let HtmlPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

let constants = {
    IS_DEV: process.env.NODE_ENV !== 'production',
    FONT_OUTPUT: path.join('asset', 'font'),
    IMAGE_OUTPUT: path.join('asset', 'image')
}

let baseConfig = require('./base')(constants)
let entry = [path.join(process.cwd(), 'example', 'src', 'index.js'), path.join(process.cwd(), 'example', 'src', 'index.styl')]

let buildConfig = assign({}, baseConfig, {
    entry,
    output: {
        path: path.join(process.cwd(), 'example', 'dist'),
        filename: 'example-[hash:8].js'
    },
    plugins: baseConfig.plugins.concat([
        new ExtractTextPlugin({ filename: 'example-[hash:8].css' }),
        new HtmlPlugin({
            template: path.join('example', 'src', 'index.html'),
            filename: 'index.html',
            // minify: true
        })
    ])
})

module.exports = buildConfig