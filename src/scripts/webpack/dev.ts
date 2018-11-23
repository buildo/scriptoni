import * as webpackServer from 'webpack-dev-server';
import webpackConfig from './webpack.dev';
import compiler from './compiler';
import getConfig from './config';
import getWebpackConfig from './getWebpackConfig';
import { WebpackCLIOptions } from '../../model';

export default async (cliOptions: WebpackCLIOptions) => {
  const webpackConfigObject = getWebpackConfig(webpackConfig, 'dev', cliOptions);

  const server = new webpackServer(
    compiler(webpackConfigObject),
    webpackConfigObject.devServer || {}
  );

  server.listen(getConfig(cliOptions).port);
};
