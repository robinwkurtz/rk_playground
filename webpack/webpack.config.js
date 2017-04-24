var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

var rootDir = path.resolve(__dirname, '..');

var regularExpressions = {
	javascript : /\.jsx?$/,
	styles: /\.scss$/
};

var configuration = {
	context: rootDir,
	entry: {
		main: './src/js/app.js'
	},
	output: {
		path: path.resolve(rootDir, 'build/server'),
		// publicPath: '/assets/',
		publicPath: 'http://localhost:4200/build/server/',
		filename: '[name].[hash].js',
		chunkFilename: '[name].[hash].js'
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: regularExpressions.javascript,
				exclude: /node_modules/,
				loaders: ['babel']
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
				loader : 'url?prefix=font/&limit=10000'
			},
			{
				test: /\.(scss|css)$/,
				loaders: [
					'style',
					'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]!postcss!sass?sourceMap'
				]
			},
			{
				test: /\.(jpg|gif|png|ico)$/,
				loaders: ['url?limit=10000&name=[name].[ext]']
			}
		]
	},
	postcss: [precss, autoprefixer],
	progress: true,
	resolve: {
		alias: {
			menu: rootDir + '/src/js/redux/modules/menu.js',
			i18n: rootDir + '/src/js/redux/modules/i18n.js',
			pages: rootDir + '/src/js/redux/modules/pages.js',
			site: rootDir + '/src/js/redux/modules/site.js',
			ssr: rootDir + '/src/js/redux/modules/ssr.js',
			apiClient: rootDir + '/src/js/api-client.js',
			config: rootDir + '/src/js/config.js',
			loading: rootDir + '/src/js/components/Loading.js',
			header: rootDir + '/src/js/components/Header/index.js',
			navigation: rootDir + '/src/js/components/Navigation.js',
			social: rootDir + '/src/js/components/Social/index.js',
			languageSwitcher: rootDir + '/src/js/components/LanguageSwitcher.js',
			gstyles: rootDir + '/src/stylesheets/index.scss'
		},
		extensions: ['', '.json', '.js', '.jsx', '.css', '.scss']
	},
	plugins: [
	],
	regularExpressions: regularExpressions
};

module.exports = configuration;
