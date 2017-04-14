import webpack from 'webpack';
import minimist from 'minimist';
import mapKeys from 'lodash/mapKeys';
import { logger } from '../../util';
import getConfig from './config';
import getPaths from './paths';
import { bundleConfigWhitelist } from './webpack.base';

export default function compiler(getWebpackConfig) {

  const args = minimist(process.argv.slice(2));

  const config = getConfig(args);

  const paths = getPaths(args);

  const NODE_ENV = process.env.NODE_ENV || config.NODE_ENV || 'development';
  logger.webpack('building with', `NODE_ENV=${NODE_ENV}`);
  logger.webpack('Configuration', JSON.stringify(
    mapKeys(config, (_, k) =>
      bundleConfigWhitelist.indexOf(k) !== -1 ? `(bundled) ${k}` : k
    ), null, 4));

  const compiler = webpack(getWebpackConfig({ config, paths, NODE_ENV }));

  compiler.plugin('compile', () => {
    logger.webpack('Start compiling...');
  });

  compiler.plugin('failed', (err) => {
    logger.webpack(err);
  });

  return compiler;
}
