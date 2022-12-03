/**
 * In this file lies the definition of the complete frontend building.
 * Powered by webpack, babel, dart-sass, tons of loaders and some
 * useful plugins.
 *
 * Please keep in mind that some config, like for postcss or babel,
 * exist outside of this file.
 *
 * If you want to contribute, please, discuss first your idea with the
 * core maintainer or others which understand what is happening here.
 */

// REQUIREMENTS
require('dotenv').config();
const path = require('path');
const WebpackBar = require('webpackbar');
const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Chunks2JsonPlugin = require('./webpack/Chunks2JsonPlugin');
const generateEntriesList = require('./webpack/helper').generateEntriesList;
const createVendorName = require('./webpack/helper').createVendorName;

// CONSTANTS
// Context
const CONTEXT = {
    MODE: ['dev', 'dev-srcmap', 'dev-debug'],
    SRCMAP_HEAVY: ['dev-debug', 'prod-debug'],
    SRCMAP_EASY: ['dev-srcmap', 'dev-debug', 'prod-debug'],
    MIN: ['prod', 'prod-debug-min'],
    DEBUG: ['dev-debug', 'prod-debug', 'prod-debug-min'],
};
// path to the source files
const sourcePath = './source';
// path to the js entry files
const jsEntryPath = '/js/entries';
// path to the scss entry files
const scssEntryPath = '/scss/entries';
// path where the compiled files should be saved
const resourcePath = '../Resources/Public';
// path to the Public folder, relative from web root
const publicPath = '/var/www/html/Packages/Resources/Public';
// path where the JSON should be saved
const jsonOutputDir = '../Configuration/Assets';

// WEBPACK CONFIG
module.exports = [
    {
        name: 'scripts',
        mode: CONTEXT.MODE.includes(process.env.ENV) ? 'development' : 'production',
        entry: generateEntriesList('js', `${sourcePath}${jsEntryPath}`),
        output: {
            chunkFilename: '[name].js',
            path: path.resolve(__dirname, `${resourcePath}/JavaScript/`),
            publicPath: `${publicPath}/JavaScript/`,
        },
        devtool: CONTEXT.SRCMAP_HEAVY.includes(process.env.ENV)
            ? 'source-map'
            : (CONTEXT.SRCMAP_EASY.includes(process.env.ENV)
                ? 'eval-source-map'
                : false),
        cache: true,
        optimization: {
            noEmitOnErrors: true,
            runtimeChunk: {
                name: 'webpack--runtime',
            },
            minimize: CONTEXT.MIN.includes(process.env.ENV),
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /([\\/]node_modules[\\/])((?!webpack[\\/]+))/,
                        enforce: true,
                        chunks: 'all',
                        name: (module) => createVendorName(module),
                    },
                    internals: {
                        test: /([\\/]Build[\\/]source[\\/]js[\\/])((?!entries[\\/]+))/,
                        enforce: true,
                        chunks: 'all',
                        name: 'bn-internal-functions',
                    },
                },
            },
        },
        resolve: {
            alias: {
                'bn-source-root': path.resolve(__dirname, sourcePath),
            },
        },
        stats: {
            entrypoints: false,
            children: false,
            modules: false,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, `${sourcePath}/js/`)],
                    loader: 'babel-loader?cacheDirectory=true',
                },
                {
                    test: /\.hbs$|\.handlebars$/,
                    include: [path.resolve(__dirname, `${sourcePath}/hbs/`)],
                    loader: 'handlebars-loader',
                    options: {
                        precompileOptions: {
                            knownHelpersOnly: false,
                        },
                    },
                },
            ],
        },
        plugins: [
            new WebpackBar({
                name: 'Scripts',
                reporters: ['fancy'],
            }),
            new WebpackNotifierPlugin({
                title: 'JAVASCRIPT',
                alwaysNotify: true,
                excludeWarnings: true,
            }),
            new Chunks2JsonPlugin({
                type: 'scripts',
                removePath: path.resolve(__dirname, `${sourcePath}${jsEntryPath}/`),
                filename: 'scripts.json',
                outputDir: jsonOutputDir,
            }),
            CONTEXT.DEBUG.includes(process.env.ENV) && new BundleAnalyzerPlugin(),
        ].filter(Boolean),
    },
    {
        name: 'styles',
        mode: CONTEXT.MODE.includes(process.env.ENV) ? 'development' : 'production',
        entry: generateEntriesList('scss', `${sourcePath}${scssEntryPath}`),
        output: {
            path: path.resolve(__dirname, `${resourcePath}/Css/Frontend/`),
            publicPath: `${publicPath}/Css/Frontend/`,
        },
        devtool: CONTEXT.SRCMAP_EASY.includes(process.env.ENV) ? 'source-map' : false,
        stats: {
            entrypoints: false,
            children: false,
            modules: false,
        },
        resolve: {
            alias: {
                'bn-source-root': path.resolve(__dirname, sourcePath),
            },
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: [path.resolve(__dirname, `${sourcePath}/scss/`)],
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: CONTEXT.SRCMAP_EASY.includes(process.env.ENV),
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: CONTEXT.SRCMAP_EASY.includes(process.env.ENV) },
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: CONTEXT.SRCMAP_EASY.includes(process.env.ENV) },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new WebpackBar({
                color: 'blue',
                name: 'Styles',
                reporters: ['fancy'],
            }),
            new FixStyleOnlyEntriesPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            new WebpackNotifierPlugin({
                title: 'SCSS',
                alwaysNotify: true,
                excludeWarnings: true,
            }),
            new Chunks2JsonPlugin({
                type: 'styles',
                removePath: path.resolve(__dirname, `${sourcePath}${scssEntryPath}/`),
                filename: 'styles.json',
                outputDir: jsonOutputDir,
            }),
        ],
    },
];
