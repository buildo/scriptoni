import webpack from 'webpack';
import WebpackBase from './webpack.base';
import { statsOutputConfiguration } from './util';

export default ({ config, paths, NODE_ENV, ...options }) => {

  const base = WebpackBase({ config, paths, NODE_ENV, ...options });
  return {
    ...base,
    entry: [
      `webpack-dev-server/client?http://0.0.0.0:${config.port}/`,
      'webpack/hot/dev-server',
      paths.ENTRY
    ],

    devServer: {
      contentBase: paths.BUILD,
      hot: true,
      stats: statsOutputConfiguration,
      disableHostCheck: true,
      historyApiFallback: { verbose: true }
    },

    devtool: config.devTool || 'source-map',

    plugins: [
      ...base.plugins,
      new webpack.HotModuleReplacementPlugin()
    ],

    module: {
      ...base.module,
      rules: [
        ...base.module.rules,
        // style!css loaders
        {
          test: /\.css?$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }]
        },
        // SASS loaders
        {
          test: /\.scss?$/,
          exclude: paths.VARIABLES_MATCH,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'resolve-url-loader'
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }]
        }
      ]
    }
  };
};
