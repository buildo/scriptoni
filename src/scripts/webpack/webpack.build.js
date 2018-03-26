import webpack from 'webpack';
import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpackFailPlugin from 'webpack-fail-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import WebpackBase from './webpack.base';

export default ({ config, paths, NODE_ENV, ...options }) => {
  const base = WebpackBase({ config, paths, NODE_ENV, ...options });

  const plugins = [
    // cause failed production builds to fail faster
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({ filename: 'style.[hash].min.css' }),
    webpackFailPlugin // This is needed for TS builds because of https://github.com/TypeStrong/ts-loader/pull/172
  ];

  if (NODE_ENV === 'production') {
    plugins.unshift(new CompressionPlugin({
      regExp: /\.js$|\.css$/
    }));

    plugins.unshift(new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8,
        output: {
          ecma: 5
        }
      },
      parallel: true,
      cache: true,
      sourceMap: true
    }));
  }

  return {
    ...base,

    bail: true,

    entry: path.resolve(paths.SRC, 'setup/index.js'),

    devtool: 'source-map',

    plugins: [...base.plugins, ...plugins],

    module: {
      ...base.module,
      rules: [
        ...base.module.rules,
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        // SASS
        {
          test: /\.scss$/,
          exclude: paths.VARIABLES_MATCH,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: { sourceMap: true }
            }, {
              loader: 'resolve-url-loader',
              options: { sourceMap: true }
            }, {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }]
          })
        }
      ]
    }
  };
};
