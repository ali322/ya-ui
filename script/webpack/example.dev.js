let path = require('path')
let assign = require('object-assign')
let HtmlPlugin = require('html-webpack-plugin')
let buildConfig = require('./example.build')

let devConfig = assign({},buildConfig,{
    entry: buildConfig.entry.concat([
        "webpack-hot-middleware/client"
    ]),
    output: {
        path: buildConfig.output.path,
        publicPath: '/hmr/'
    }
    plugins: buildConfig.plugins.slice(0,-2).concat([
        new HtmlPlugin({
            template: path.join('example','src','index.html'),
            filename:  path.join('example','dist','index.html')
        })
    ])
})

module.exports = devConfig