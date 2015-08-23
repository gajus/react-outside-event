var webpack = require('webpack'),
    path = require('path'),
    devServer;

devServer = {
    contentBase: __dirname + '/examples',
    colors: true,
    quiet: false,
    noInfo: false,
    publicPath: '/',
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 8000,
    hot: true
};

module.exports = {
    devtool: 'source-map',
    debug: false,
    devServer: devServer,
    context: __dirname + '/src',
    entry: {
        example: [
            './examples/'
        ]
    },
    output: {
        path: __dirname + '/examples',
        filename: '[name].js',
        publicPath: devServer.publicPath
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.OldWatchingPlugin(),
        // new webpack.NewWatchingPlugin(),
        // https://github.com/webpack/docs/wiki/optimization#deduplication
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, './src'),
                loader: 'babel'
            }
        ]
    },
    resolve: {
        extensions: [
            '',
            '.js'
        ]
    }
};
