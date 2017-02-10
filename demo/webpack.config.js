module.exports = {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
        filename: 'bundle.js'
    },
    devtool: 'eval',
    module: {
        rules: [
            require('./config/babel_rule')
        ]
    }
};
