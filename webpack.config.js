const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

// Plugins
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log('starting');

module.exports = {
  target: 'node',
  externals: [ nodeExternals() ],
  context: path.join(__dirname, '/'),
  entry: {
    app: ['./bin/www'],
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader'
        ]
      },
    ],
    // loaders: [
    //   {
    //     test: /\.jsx?$/,
    //     exclude: /node_modules/,
    //     loader: 'babel',
    //   },     
    //   {
    //     test: /\.html$/,
    //     loader: 'file?name=[name].[ext]',
    //   },
    // ],
  },

  // plugins: NODE_ENV === 'development' ? [
  //   new webpack.NoErrorsPlugin(),
  // ] : [
  //   new webpack.NoErrorsPlugin(),
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: { warnings: false },
  //   }),
  //   new ExtractTextPlugin('css/[name][hash].css'),
  //   new HtmlWebpackPlugin({
  //     title: 'ReactJS Routing',
  //     filename: '../index.html',
  //     hash: true,
  //   }),
  //   new CleanWebpackPlugin(['build'], {
  //     root: __dirname,
  //     verbose: true,
  //     dry: false,
  //   }),
  // ],
  devServer: {},
};
