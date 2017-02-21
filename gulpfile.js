const gulp = require('gulp');
const jasmineBrowser = require('gulp-jasmine-browser');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

gulp.task('jasmine', () => {
    const webpackConfig = require('./webpack.config');
    return gulp.src(['spec/**/*_spec.js'])
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(jasmineBrowser.specRunner({console: true}))
        .pipe(jasmineBrowser.headless());
});





const webpackMerge = require('webpack-merge');

gulp.task('jasmine-browser', () => {
    const JasminePlugin = require('gulp-jasmine-browser/webpack/jasmine-plugin');
    const plugin = new JasminePlugin();
    const webpackConfig = webpackMerge(require('./webpack.config'), {
        plugins: [plugin]
    });
    return gulp.src(['spec/**/*_spec.js'])
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(jasmineBrowser.specRunner())
        .pipe(jasmineBrowser.server({whenReady: plugin.whenReady}));
});
