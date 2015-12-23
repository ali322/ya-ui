var gulp = require("gulp"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    inject = require("gulp-inject"),
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

gulp.task("clean-dist", function() {
    del.sync("./dist/minified");
})

gulp.task("develop-example", function() {
    _.each(examples, function(obj, name) {
        var injectTarget = obj.path + obj.html,
            destPath = name === "index" ? obj.path + "../" : obj.path,
            injectFiles = [],
            jsFile = path.join(obj.path, 'build/' + name + '.js');

        injectFiles.push(jsFile);
        // console.log(injectFiles)
        var sources = gulp.src(injectFiles, {
            read: false
        });
        gulp.src(injectTarget).pipe(inject(sources, {
            relative: true,
            empty:true,
            transform: function(filepath) {
                // console.log('filepath',filepath)
                if (/build\/\w+.js/.test(filepath) === true) {
                    filepath = filepath.replace(/(\w+\/)*build/g, '/public');
                }
                return inject.transform.apply(inject.transform, arguments);
            }

        })).pipe(gulp.dest(destPath));
    });
});
gulp.task("release-example", function() {
    _.each(examples, function(obj, name) {
        var injectTarget = obj.path + obj.html,
            destPath = name === "index" ? obj.path + "../" : obj.path,
            injectFiles = [],
            cssFile = path.join(obj.path, 'dist/*.css'),
            jsFile = path.join(obj.path, 'dist/*.js');
        injectFiles.push(jsFile);
        injectFiles.push(cssFile);
        var sources = gulp.src(injectFiles, {
            read: false
        });
        // console.log(jsFiles,injectTarget)
        gulp.src(injectTarget).pipe(inject(sources, {
            relative: true,
            empty:true
        })).pipe(gulp.dest(destPath));
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
        notify:false,
        // logConnections: true,
        logLevel: "info"
    }, function() {
        console.log('🌎 example listening at %d!', examplePort);
    })
});
