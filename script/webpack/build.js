let path = require('path')
let assign = require('object-assign')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

let constants = {
    IS_DEV: process.env.NODE_ENV !== 'production',
    FONT_OUTPUT: path.join('asset', 'font'),
    IMAGE_OUTPUT: path.join('asset', 'image')
}

let baseConfig = require('./base')(constants)
let entry = [path.join(process.cwd(), 'src', 'index.js'), path.join(process.cwd(), 'src', 'index.styl')]

let buildConfig = assign({}, baseConfig, {
    entry,
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: 'ya-ui.js',
        libraryTarget: 'umd',
        library: 'yaui'
    },
    plugins: baseConfig.plugins.concat([
        new ExtractTextPlugin({ filename: 'ya-ui.css' })
    ])
})

module.exports = buildConfig