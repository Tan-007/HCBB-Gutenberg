const path = require('path')

module.exports = {
    entry: './src/blocks-front.js',
    
    output: {
        filename: 'blocks-front.build.js',
        path: path.resolve(__dirname, 'dist'),
    },
   
    module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						// @remove-on-eject-begin
						babelrc: false,
						presets: [ require.resolve( 'babel-preset-cgb' ) ],
						// @remove-on-eject-end
						// This is a feature of `babel-loader` for webpack (not Babel itself).
						// It enables caching results in ./node_modules/.cache/babel-loader/
						// directory for faster rebuilds.
						cacheDirectory: true,
					},
				},
			},
		],
	}
  };