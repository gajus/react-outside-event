var webpack = require('webpack'),
    path = require('path'),
    devServer;

devServer = {
    contentBase: __dirname + '/dist/examples',
    colors: true,
    quiet: false,
    noInfo: false,
    publicPath: '/',
    historyApiFallback: false,
    host: '127.0.0.1',
    port: 8000,
    hot: false,
    lazy: true
};

module.exports = {
    devtool: 'source-map',
    debug: true,
    devServer: devServer,
    context: __dirname,
    entry: {
        example: [
            './dist/examples/example.js'
        ]
    },
    output: {
        path: __dirname + '/dist/examples',
        filename: '[name].js',
        publicPath: devServer.publicPath
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
