const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MinicssPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		assetModuleFilename: 'assets/images/[hash][ext][query]'
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
				test: /\.(woff|woff2)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[hash][ext][query]'
				}
			},
			{
				test: /\.(scss|css)$/,
				use:[MinicssPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
			{
			test:/\.png$/,
			type: 'asset/resourse'
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "index.html",
		}),
		new MinicssPlugin({
			filename:'[name].scss'
		}),
		new CopyPlugin({
			patterns:[
				{
					from: path.resolve(__dirname, "src",
					'assets/images'),
					to : "assets/images"
				}
			]
		}),
	],
};