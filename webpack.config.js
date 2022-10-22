const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MinicssPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const MinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[contenthash].bundle.js",
	},
	mode: 'production',
	resolve: {
		extensions: [".js", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
					},
				],
			},
			{
				test: /\.(scss|css)$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "index.html",
		}),
		new MinicssPlugin({
			filename: 'assets/[name].[contenthash].css'
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
		  new MinimizerPlugin(),
		  new TerserPlugin(),
		]
	  },
};