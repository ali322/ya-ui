var webpackConfig = require("./webpack.build.js");

module.exports = function(config) {
    config.set({
        basePath: "../src/",
        frameworks: ['mocha'],
        files: [
            '../node_modules/phantomjs-polyfill/bind-polyfill.js',
            // '../node_modules/**/*.js',
            // 'component/*.jsx',
            // '__tests__/*.js'
            '__tests__/*.js'
        ],
        preprocessors: {
            'action/*.js': ['webpack', 'sourcemap'],
            'store/*.js': ['webpack', 'sourcemap'],
            '__tests__/*.js': ['webpack', 'sourcemap'],
            'component/*.jsx': ['webpack', 'coverage', 'sourcemap'],
        },
        webpack: {
            resolve: webpackConfig.resolve,
            module: webpackConfig.module
        },
        webpackServer: {
            noInfo: true
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'lcov',
            dir: '__coverage__/'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
