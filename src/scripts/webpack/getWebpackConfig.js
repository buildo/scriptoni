import minimist from 'minimist';
import getConfig from './config';
import getPaths from './paths';
import path from 'path';
import identity from 'lodash/identity';
import { logger } from '../../util';

const NODE_ENV = process.env.NODE_ENV;

export default function getWebpackConfig(webpackConfigFn, target) {

  const args = minimist(process.argv.slice(2));

  const config = getConfig(args);

  const paths = getPaths(args);

  const bundleAnalyzer = args.bundleAnalizer;

  const customConfig = args.webpackConfig ? path.join(process.cwd(), args.webpackConfig) : undefined;
  const customizeConfigFn = customConfig ? require(customConfig) : identity;

  logger.webpack('platform', process.platform);
  logger.webpack('building with', `NODE_ENV=${NODE_ENV}`);
  logger.webpack('Configuration', JSON.stringify(config, null, 4));

  const configArgs = { config, paths, NODE_ENV, bundleAnalyzer };
  return customizeConfigFn(webpackConfigFn(configArgs), {
    ...configArgs,
    target
  });
}
