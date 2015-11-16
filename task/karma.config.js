var webpackConfig = require("./webpack.build.js");

module.exports = function(config) {
    config.set({
        basePath: "../src/",
        frameworks: ['mocha'],
        files: [
            '__tests__/*.es6'
        ],
        preprocessors: {
            '__tests__/*.es6': ['webpack', 'sourcemap'],
            'component/**/*.jsx': ['webpack', 'coverage', 'sourcemap'],
        },
        webpack: {
            resolve: webpackConfig.resolve,
            module: webpackConfig.module
        },
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'lcov',
            dir: '__coverage__/'
        },
        port: 7000,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['jsdom'],
        singleRun: true
    });
};
