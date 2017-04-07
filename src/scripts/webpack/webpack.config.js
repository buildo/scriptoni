import path from 'path';
import webpack from 'webpack';
import WebpackBase from './webpack.base';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { getHtmlPluginConfig } from './util';

export default ({ config, paths, NODE_ENV }) => {

  const base = WebpackBase({ config, paths, NODE_ENV });
  return {
    ...base,
    entry: [
      'webpack/hot/dev-server',
      path.resolve(paths.SRC, 'client/index.js')
    ],

    devtool: config.devTool || 'source-map',

    devServer: {
      contentBase: paths.BUILD,
      hot: true,
      inline: true,
      port: config.port,
      host: '0.0.0.0'
    },

    plugins: [
      ...base.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin(getHtmlPluginConfig(NODE_ENV, config.html))
    ],

    module: {
      ...base.module,
      loaders: [
        ...base.module.loaders,
        // style!css loaders
        {
          test: /\.css?$/,
          loaders: ['style', 'css']
        },
        // SASS loaders
        {
          test: /\.scss?$/,
          exclude: paths.VARIABLES_MATCH,
          loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
        }
      ]
    }
  };
};
