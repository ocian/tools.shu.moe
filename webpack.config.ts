import * as path from 'path'
import * as webpack from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import WorkboxPlugin from 'workbox-webpack-plugin'

import config from './config'

const pathOrFile = {
  dist: path.resolve(__dirname, 'dist'),
  html: path.resolve(__dirname, 'src/assets/template/index.html'),
  favicon: path.resolve(__dirname, 'src/assets/images/favicon.jpeg'),
}

function compiler(): webpack.Configuration {
  const { ENV } = process.env

  const mode = ENV !== 'production' ? 'development' : 'production'
  const hash = mode !== 'production' ? '' : '.[contenthash:7]'
  const pathinfo = mode !== 'production' ? false : undefined // dev 输出结果不携带路径信息

  const { optimization }: webpack.Configuration = {
    optimization:
      mode !== 'production'
        ? {
            runtimeChunk: true,
            splitChunks: false, // 避免额外优化步骤
            removeAvailableModules: false, // 避免额外优化步骤
            removeEmptyChunks: false, // 避免额外优化步骤
          }
        : {
            minimizer: ['...', new CssMinimizerPlugin()],
            splitChunks: { chunks: 'all' },
            moduleIds: 'deterministic',
          },
  }
  const styleLoader =
    mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
  const plugins =
    mode !== 'production'
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: `css/[name]${hash}.css`,
            chunkFilename: `css/[id]${hash}.css`,
          }),
          // new FaviconsWebpackPlugin({
          //   logo: pathOrFile.favicon,
          //   cache: true,
          //   favicons: config.favicons,
          // }),
          // new WorkboxPlugin.GenerateSW({
          //   clientsClaim: true,
          //   skipWaiting: true,
          // }),
          // new BundleAnalyzerPlugin({ analyzerMode: "static" })
        ]
  const devtool =
    mode !== 'production' ? 'eval-cheap-module-source-map' : 'source-map'

  const entry = config.pages
    .map((page) => ({
      [page.filename]: path.resolve(
        __dirname,
        `./src/pages/${page.filename}.tsx`
      ),
    }))
    .reduce((l, r) => ({ ...l, ...r }), {})
  const htmls = config.pages.map(
    (page) =>
      new HtmlWebpackPlugin({
        template: pathOrFile.html,
        title: page.title,
        chunks: [page.filename],
        scriptLoading: 'module',
        filename:
          page.id === config.homePage
            ? 'index.html'
            : page.filename + '/index.html',
      })
  )

  return {
    entry,
    output: {
      path: pathOrFile.dist,
      filename: `js/[name]${hash}.js`,
      clean: true,
      publicPath: config.publicPath,
      pathinfo,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
        },
        { test: /\.css$/, use: [styleLoader, 'css-loader'] },
        {
          test: /\.s(a|c)ss$/,
          use: [styleLoader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          type: 'asset/resource',
          use: ['image-webpack-loader'],
        },
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new MonacoWebpackPlugin({
        filename: `worker/[name]${hash}.worker.js`,
        publicPath: config.publicPath,
      }),
      ...htmls,
      ...plugins,
    ],
    devServer: { hot: true, port: 'auto' },
    resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
    mode,
    cache: { type: 'filesystem' },
    optimization,
    devtool,
  }
}

export default compiler
