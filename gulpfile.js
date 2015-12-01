var gulp = require("gulp"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    inject = require("gulp-inject"),
    connect = require("gulp-connect"),
    browserSync = require("browser-sync"),
    path = require("path"),
    fs = require("fs"),
    del = require("del"),
    _ = require("lodash"),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./task/webpack.hot-update.js');

var bundler = webpack(config);
var examples = require("./task/example.json");
var examplePort = 5000;

gulp.task("clean-dist",function(){
    del.sync("./dist/minified");
})

gulp.task("develop-example", function() {
    _.each(examples, function(obj, name) {
        var injectTarget = obj.html,
            jsFiles = [],
            jsFile = path.join(obj.path, 'build/' + name + '.js');

        jsFiles.push(jsFile);
        // console.log(jsFiles)
        var sources = gulp.src(jsFiles, {
            read: false
        });
        gulp.src(injectTarget).pipe(inject(sources, {
            relative: true,
            transform: function(filepath) {
                if (/^build\/\w+.js/.test(filepath) === true) {
                    filepath = filepath.replace('build', '/public');
                }
                return inject.transform.apply(inject.transform, arguments);
            }

        })).pipe(gulp.dest(obj.path));
    });
});
gulp.task("deploy-example", function() {
    _.each(examples, function(obj, name) {
        var injectTarget = obj.html,
            jsFiles = [],
            jsFile = path.join(obj.path, 'dist/*.js');
        jsFiles.push(jsFile);
        var sources = gulp.src(jsFiles, {
            read: false
        });
        // console.log(jsFiles)
        gulp.src(injectTarget).pipe(inject(sources, {
            relative: true
        })).pipe(gulp.dest(obj.path));
    });
});

gulp.task("run-example", function() {
    browserSync({
        port: examplePort,
        server: {
            baseDir: "./",
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: config.output.publicPath,
                    stats: {
                        colors: true
                    },
                    hot: true,
                    noInfo: true
                }),
                webpackHotMiddleware(bundler)
            ],
        },
        files: [
            // "example/**/*.es6",
            // "example/**/*.scss",
            "example/**/*.html"
        ],
        online: true,
        open: false,
        watchOptions: {
            debounceDelay: 1000
        },
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        // logConnections: true,
        logLevel: "info"
    },function(){
        console.log('🌎 example listening at %d!',examplePort);
    })
});
