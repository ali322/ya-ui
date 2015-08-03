var gulp = require("gulp"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    inject = require("gulp-inject"),
    connect = require("gulp-connect"),
    // mapstream = require("map-stream"),
    path = require("path"),
    fs = require("fs"),
    del = require("del"),
    _ = require("lodash");

var examples = require("./task/example.json");

gulp.task("develop-example", function() {
    _.each(examples, function(obj, name) {
        var injectTarget = obj.html,
            jsFiles = [],
            jsFile = path.join(obj.path, 'build/' + name + '.js');

        jsFiles.push(jsFile);
        console.log(jsFiles)
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
        gulp.src(injectTarget).pipe(inject(sources, {
            relative: true
        })).pipe(gulp.dest(obj.path));
    });
});

gulp.task("run-example",function(){
    connect.server({
        port: 8000
    });
});
