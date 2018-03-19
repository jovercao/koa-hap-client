const webpack = require("webpack");
const path = require("path");

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    hap: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    //sourceMapFilename: 'hap.map',
    library: "hap",
    libraryTarget: "umd"
  },
  //devtool: 'source-map',
  node: {
    process: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "env",
              {
                targets: {
                  browsers: ["last 2 versions", "safari >= 7"]
                }
              }
            ]
          ]
        }
      }
    ]
  },

  plugins: [new UglifyJSPlugin()]
};
