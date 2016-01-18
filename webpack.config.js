// const _ = require('lodash');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ENV = process.env.ENV;

const srcFolder = path.resolve(__dirname, 'src');
const testFolder = path.resolve(__dirname, 'test');
const projectFolders = [srcFolder, testFolder];

module.exports = {

    context: path.resolve(__dirname, 'src'),

    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.[id].js',
        path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
        contentBase: 'dist/',
        host: '0.0.0.0',
        publicPath: '/',
        port: 8000,
    },

    entry: {
        main: 'js/main',
        // test: '../test/index.js'
    },

    stats: {
        colors: true,
        reasons: true,
    },

    resolve: {
        root: srcFolder,
        extensions: ['', '.js', '.less'],
    },

    module: {
        // preLoaders: [{
        //     test: /\.js$/,
        //     include: projectFolders,
        //     loader: 'eslint-loader'
        // }],
        loaders: [{
            loader: 'url-loader?limit=8192&name=[path][name].[ext]',
            test: /\.(mp3|ogg|jpg|png|svg)$/,
            include: projectFolders,
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: projectFolders,
        }, {
            test: /\.less$/,
            loader: 'style!css!autoprefixer?browsers=last 2 versions!less',
            include: srcFolder,
        }],
    },

    externals: {
        TweenLite: 'TweenLite',
        TweenMax: 'TweenMax',
        TimelineMax: 'TimelineMax',
        TimelineLite: 'TimelineLite',
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(srcFolder, 'index.html'),
        }),
        new HtmlWebpackPlugin({
            filename: 'cave.html',
            template: path.join(srcFolder, 'cave.html'),
            inject: 'body',
        }),
    ],
};
