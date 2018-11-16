import * as webpack from 'webpack';
import WebpackBase, { WebpackConfigBuilderInput } from './webpack.base';
import { statsOutputConfiguration } from './util';
import { WebpackConfiguration } from '../../model';

export default (input: WebpackConfigBuilderInput): WebpackConfiguration => {
  const base = WebpackBase(input);
  const { config, paths } = input;

  return {
    ...base,

    mode: 'development',

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
      historyApiFallback: true
    },

    devtool: (config.devTool as any) || 'source-map',

    plugins: [...base.plugins, new webpack.HotModuleReplacementPlugin()],

    module: {
      ...base.module,
      rules: [
        ...base.module.rules,
        // style!css loaders
        {
          test: /\.css?$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        // SASS loaders
        {
          test: /\.scss?$/,
          exclude: paths.VARIABLES_MATCH,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    }
  };
};
