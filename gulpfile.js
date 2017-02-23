const gulp = require('gulp');
const jasmineBrowser = require('gulp-jasmine-browser');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackStream = require('webpack-stream');

gulp.task('jasmine', () => {
    const webpackConfig = webpackMerge(require('./webpack.config'), {
        entry: ['babel-polyfill', './spec/framework_zero_spec.js']
    });
    return gulp.src([])
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(jasmineBrowser.specRunner({console: true}))
        .pipe(jasmineBrowser.headless());
});
