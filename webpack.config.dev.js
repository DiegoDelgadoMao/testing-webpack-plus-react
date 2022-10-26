const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MinicssPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[contenthash].js",
		assetModuleFilename: 'assets/images/[hash][ext][query]'
	},
	mode: 'development',
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
					filename: 'assets/fonts/[name][ext][query]'
				}
			},
			{
				test: /\.(scss|css)$/,
				use:[MinicssPlugin.loader,
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
			filename:'[name].css'
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin()
		]
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
			watch: true
		},
		watchFiles: path.join(__dirname, "./**"),
		compress: true,
		historyApiFallback: true,
		port: 3006,
		open: true,
	}
};