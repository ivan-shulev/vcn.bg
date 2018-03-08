const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //installed via npm
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
    entry: {
        main: './src/index.js',
        vendor: ['core-js/fn/array/from', 'core-js/fn/array/includes', 'navigo', 'mustache']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].[chunkhash].js',
        chunkFilename: 'scripts/[name].[chunkhash].js',
        publicPath: process.env.NODE_ENV === 'production' ? '/' : '/vcn/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'env', {
                                    'targets': {
                                        'browsers': ['last 2 versions']
                                    }
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } },
                    ]
                })
            },
            {
                test: /\.woff2?$|\.(t|o)tf$|\.eot$|\.svg$/,
                include: [
                    path.resolve(__dirname, 'src/assets/fonts'),
                    path.resolve(__dirname, 'node_modules')
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.ico$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.png$|\.jpg$|\.gif$|\.svg$/,
                include: /(src)/,
                use: [{
                    // This plugin replaces image with its base64 representation,
                    // if the image is below 50kb
                    // if it isn't, file-loader is used
                    loader: 'url-loader',
                    query: {
                        limit: '50000',
                        name: 'assets/images/[name]-[hash:6].[ext]'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        overlay: true,
        inline: true,
        historyApiFallback: true
    },
    plugins: [
        // Not needed, this is ran automatically with webpack -p
        // see https://webpack.js.org/guides/production/
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 8, // Must be greater than or equal to one
            minChunkSize: 1000
        }),
        new ExtractTextPlugin({ filename: 'styles/styles.css', allChunks: true }),
        // This is needed, so the bootstrap-sass can load its dependency
        // For some reason, the order I specify in the vendor array, does not include
        // jQuery before bootstrap and an error is thrown.
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // })
        new webpack.ProvidePlugin({
            Mustache: 'mustache'
        }),
        new ImageminPlugin({
            test: /\.png$|\.jpg$|\.gif$|\.svg$/,
            include: /(src)/
        }),
        new SWPrecacheWebpackPlugin({
            staticFileGlobsIgnorePatterns: [/\.map$/]
        })
    ]
};

module.exports = config;