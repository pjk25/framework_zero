const gulp = require('gulp');
const jasmineBrowser = require('gulp-jasmine-browser');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackStream = require('webpack-stream');

gulp.task('jasmine', () => {
    const webpackConfig = webpackMerge(require('./webpack.config'), {
        entry: './spec/framework_zero_spec.js'
    });
    return gulp.src([])
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(jasmineBrowser.specRunner({console: true}))
        .pipe(jasmineBrowser.headless());
});






gulp.task('jasmine-browser', () => {
    const JasminePlugin = require('gulp-jasmine-browser/webpack/jasmine-plugin');
    const plugin = new JasminePlugin();
    const webpackConfig = webpackMerge(require('./webpack.config'), {
        entry: './spec/framework_zero_spec.js',
        plugins: [plugin]
    });
    return gulp.src([])
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(jasmineBrowser.specRunner())
        .pipe(jasmineBrowser.server({whenReady: plugin.whenReady}));
});
