import webpack from 'webpack';
import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { getHtmlPluginConfig } from './util';
import WebpackBase from './webpack.base';

export default ({ config, paths, NODE_ENV }) => {
  const base = WebpackBase({ config, paths, NODE_ENV });

  const plugins = [
    // cause failed production builds to fail faster
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin(getHtmlPluginConfig(NODE_ENV)),
    new ExtractTextPlugin('style', 'style.[hash].min.css')
  ];

  if (NODE_ENV === 'production') {
    plugins.unshift(new CompressionPlugin({
      regExp: /\.js$|\.css$/
    }));

    plugins.unshift(
      // Minimize all JavaScript output of chunks. Loaders are switched into minimizing mode.
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false, screw_ie8: true }
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
      loaders: [
        ...base.module.loaders,
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css')
        },
        // SASS
        {
          test: /\.scss$/,
          exclude: paths.VARIABLES_MATCH,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url?sourceMap!sass?sourceMap') // eslint-disable-line max-len
        }
      ]
    },
    eslint: {
      ...base.eslint,
      failOnError: true
    }
  };
};
