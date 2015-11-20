var webpackConfig = require("./webpack.build.js");

module.exports = function(config) {
    config.set({
        basePath: "../src/",
        frameworks: ['mocha',"phantomjs-shim"],
        files: [
            '__tests__/*.es6',
            'index.es6'
        ],
        preprocessors: {
            '__tests__/*.es6': ['webpack', 'sourcemap'],
            'index.es6': ['webpack',"coverage"],
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
            dir: '__coverage__/',
            // subdir:"."
            subdir:function(browser){
                return browser.toLowerCase().split(/[ /-]/)[0]
            }
        },
        port: 7000,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
