import webpack from 'webpack';
import minimist from 'minimist';
import { logger } from '../../util';
import getConfig from './config';
import getPaths from './paths';
import path from 'path';
import identity from 'lodash/identity';

export default function compiler(getWebpackConfig, target) {

  const args = minimist(process.argv.slice(2));

  const config = getConfig(args);

  const paths = getPaths(args);

  const customConfig = args.webpackConfig ? path.join(process.cwd(), args.webpackConfig) : undefined;
  const customizeConfigFn = customConfig ? require(customConfig) : identity;

  logger.webpack('platform', process.platform);
  const NODE_ENV = process.env.NODE_ENV || config.NODE_ENV || 'development';
  logger.webpack('building with', `NODE_ENV=${NODE_ENV}`);
  logger.webpack('Configuration', JSON.stringify(config, null, 4));

  const configArgs = { config, paths, NODE_ENV };
  const webpackConfig = customizeConfigFn(getWebpackConfig(configArgs), { ...configArgs, target });
  const compiler = webpack(webpackConfig);

  compiler.plugin('compile', () => {
    logger.webpack('Start compiling...');
  });

  compiler.plugin('failed', (err) => {
    logger.webpack(err);
  });

  return compiler;
}
