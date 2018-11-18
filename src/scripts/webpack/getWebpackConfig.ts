import getConfig from './config';
import getPaths from './paths';
import * as path from 'path';
import identity = require('lodash/identity');
import { logger } from '../../util';
import { WebpackConfiguration, ScriptoniOptions } from '../../model';
import { WebpackConfigBuilderInput } from './webpack.base';

const NODE_ENV = process.env.NODE_ENV;

export default function getWebpackConfig(
  webpackConfigFn: (input: WebpackConfigBuilderInput) => WebpackConfiguration,
  target: 'dev' | 'build',
  options: ScriptoniOptions
) {
  const config = getConfig(options);

  const paths = getPaths(options);

  const bundleAnalyzer = options.bundleAnalyzer;

  const customConfig = options.webpackConfig
    ? path.join(process.cwd(), options.webpackConfig)
    : undefined;
  const customizeConfigFn = customConfig ? require(customConfig) : identity;

  logger.webpack('platform', process.platform);
  logger.webpack('building with', `NODE_ENV=${NODE_ENV}`);
  logger.webpack('Configuration', JSON.stringify(config, null, 4));

  const webpackConfigBuilderInput = { config, paths, NODE_ENV, bundleAnalyzer };
  return customizeConfigFn(webpackConfigFn(webpackConfigBuilderInput), {
    ...webpackConfigBuilderInput,
    target
  });
}
