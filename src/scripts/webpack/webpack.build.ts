import * as webpack from 'webpack';
import * as CompressionPlugin from 'compression-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpackFailPlugin = require('webpack-fail-plugin');
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import WebpackBase, { WebpackConfigBuilderInput } from './webpack.base';
import { WebpackConfiguration } from '../../model';

export default (input: WebpackConfigBuilderInput): WebpackConfiguration => {
  const base = WebpackBase(input);
  const { paths, NODE_ENV } = input;

  const plugins = [
    // cause failed production builds to fail faster
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].style.[hash].min.css' }),
    webpackFailPlugin // This is needed for TS builds because of https://github.com/TypeStrong/ts-loader/pull/172
  ];

  if (NODE_ENV === 'production') {
    plugins.unshift(
      new CompressionPlugin({
        test: /\.js$|\.css$/
      })
    );

    plugins.unshift(
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 8,
          output: {
            ecma: 5
          }
        },
        parallel: true,
        cache: true,
        sourceMap: true
      })
    );
  }

  return {
    ...base,

    bail: true,

    mode: 'production',

    entry: paths.ENTRY,

    devtool: 'source-map',

    plugins: [...base.plugins, ...plugins],

    module: {
      ...base.module,
      rules: [
        ...base.module.rules,
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            }
          ]
        } as webpack.Rule,
        // SASS
        {
          test: /\.scss$/,
          exclude: paths.VARIABLES_MATCH,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { sourceMap: true }
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        } as webpack.Rule
      ]
    }
  };
};
