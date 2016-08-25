const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let env = process.env['NODE_ENV'];
let isProduction = env && env.match(/production/);

let config = {
    context: path.join(__dirname, 'src'),
    entry: {
        main: 'main',
        vendor: [
            'react',
            'react-dom',
            'react-motion',
            'react-redux',
            'react-router',
            'redux',
            'redux-thunk'
        ]
    },
    output: {
        path: path.join(__dirname, 'assets'),
        filename: '[name].min.js'
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js'],
        modules: [
            path.resolve('./src'),
            'node_modules'
        ]
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }, {
            test: /\.s?css$/,
            loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!postcss-loader' })
        }]
    },

    postcss: [
        precss()
    ],
    plugins: [
        new ExtractTextPlugin('main.min.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.min.js'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: isProduction,
            debug: !isProduction
        })
    ]
};



if (isProduction) {
    // Production Mode
    config = Object.assign(
        {},
        config,
        {
            plugins: [
                ...config.plugins,
                new webpack.optimize.UglifyJsPlugin(),
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('production')
                    }
                })],
            postcss: [
                ...config.postcss,
                autoprefixer()
            ]
        });

}

module.exports = config;
