import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration, ProgressPlugin } from 'webpack';

const configuration = (env, args): Configuration => {
    const isDevelopmentMode = args.mode === 'development';
    const isProductionMode = args.mode === 'production';

    return {
        mode: args.mode,
        entry: path.resolve(__dirname, 'src/index.tsx'),
        output: {
            // assetModuleFilename: isProductionMode
            //     ? 'assets/[name].[contenthash:8][ext][query]'
            //     : 'assets/[name][ext][query]',
            chunkFilename: isProductionMode
                ? '[name].[contenthash:8].chunk.js'
                : '[name].chunk.js',
            filename: isProductionMode
                ? '[name].[contenthash:8].js'
                : '[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        target: 'web',
        devtool: isDevelopmentMode && 'source-map',
        module: {
            rules: [{
                oneOf: [
                    {
                        test: /\.tsx?$/,
                        exclude: /node_modules/,
                        use: [{
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                            }
                        }]
                    }
                    // , {
                    //     test: /\.svg$/,
                    //     type: 'asset/inline'
                    // }, {
                    //     test: /\.(gif|jpe?g|png)$/i,
                    //     type: 'asset/resource'
                    // }
                ]
            }]
        },
        optimization: {
            minimize: isProductionMode,
            minimizer: [new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false
                    }
                }
            })],
            splitChunks: {
                chunks: 'all',
                minChunks: 2
            },
            runtimeChunk: true
        },
        resolve: {
            plugins: [new TsconfigPathsPlugin()],
            alias: {
                '@mui': path.resolve(__dirname, 'node_modules/@mui'),
                'react': path.resolve(__dirname, 'node_modules/react'),
                'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
                'styled-components': path.resolve(__dirname, 'node_modules/styled-components'),
                '@mui/styled-engine': '@mui/styled-engine-sc'
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        plugins: [
            new ProgressPlugin(),
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    enabled: true,
                    files: './src/**/*.{ts,tsx}'
                },
                formatter: 'basic'
            }),
            new CleanWebpackPlugin(),
            // new CopyWebpackPlugin({
            //     patterns: [
            //         {
            //             from: './public/*',
            //             to: '[name].[ext]',
            //             globOptions: {
            //                 ignore: '**/index.html'
            //             }
            //         },
            //         {
            //             from: './public/assets/*',
            //             to: 'assets/[name].[ext]'
            //         }
            //     ]
            // }),
            new HtmlWebpackPlugin({
                template: './public/index.html'
            })
        ],
        devServer: {
            compress: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            },
            historyApiFallback: true,
            host: '127.0.0.1',
            hot: true,
            open: true,
            port: 4000,
            proxy: [{
                context: ['/api'],
                target: 'http://127.0.0.1:5000'
            }],
        }
    };
};

export default configuration;
