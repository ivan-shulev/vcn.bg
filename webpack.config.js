const path = require("path");
const webpack = require("webpack");

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");



module.exports = (env) => {
  return {
    mode: env.production ? "production" : "development",
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({
        Mustache: "mustache",
      }),
    ],
    devtool: env.production ? false : "inline-source-map",
    target: "web",
    entry: {
      main: "./src/index.js",
      vendor: [
        "core-js/es/array/from",
        "core-js/es/array/includes",
        "navigo",
        "mustache",
      ],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "scripts/[name].[chunkhash].js",
      chunkFilename: "scripts/[name].[chunkhash].js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [path.resolve(__dirname, "src")],
          loader: "babel-loader",
        },
        {
          test: /.(scss|css)$/,

          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",

              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",

              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: {
                minimize: true,
              },
            },
          ],
        },
        {
          test: /\.pdf$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "assets/files/[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.ico$/,
          include: [path.resolve(__dirname, "src")],
          use: [
            {
              loader: "file-loader",
              options: {
                name: "/[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.png$|\.jpg$|\.gif$|\.svg|\.webp$/,
          include: /(src)/,
          use: [
            {
              // This plugin replaces image with its base64 representation,
              // if the image is below 50kb
              // if it isn't, file-loader is used
              loader: "url-loader",
              options: {
                limit: "50000",
                name: "assets/images/[name]-[hash:6].[ext]",
              },
            },
          ],
        },
      ],
    },
    devServer: {
      port: 9000,
      contentBase: path.join(__dirname, "dist"), // boolean | string | array, static file location
      compress: true, // enable gzip compression
      historyApiFallback: true, // true for index.html upon 404, object for multiple paths
      hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
      https: false, // true for self-signed, object for cert authority
      noInfo: true, // only errors & warns on hot reload
      // ...
    },
    optimization: {
      minimizer: [new TerserPlugin()],

      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/,
          },
        },

        chunks: "async",
        minChunks: 1,
        minSize: 30000,
      },
    },
  };
};
