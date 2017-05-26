import webpack from 'webpack';
import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { getHtmlPluginConfig } from './util';
import WebpackBase from './webpack.base';

export default ({ config, paths, NODE_ENV, ...options }) => {
  const base = WebpackBase({ config, paths, NODE_ENV, ...options });

  const plugins = [
    // cause failed production builds to fail faster
    new webpack.NoErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({ // TODO: remove once eslint loader is updated?
      options: {
        eslint: {
          ...base.eslint,
          failOnError: true
        }
      }
    }),
    new HtmlWebpackPlugin(getHtmlPluginConfig(NODE_ENV, config.title)),
    new ExtractTextPlugin({ filename: 'style.[hash].min.css' })
  ];

  if (NODE_ENV === 'production') {
    plugins.unshift(new CompressionPlugin({
      regExp: /\.js$|\.css$/
    }));

    plugins.unshift(
      // Minimize all JavaScript output of chunks. Loaders are switched into minimizing mode.
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false, screw_ie8: true, sourceMap: true }
      })
    );
  }

  return {
    ...base,

    bail: true,

    entry: path.resolve(paths.SRC, 'client/index.js'),

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
