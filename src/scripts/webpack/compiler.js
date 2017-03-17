import webpack from 'webpack';
import minimist from 'minimist';
import { logger } from '../../util';
import getConfig from './config';
import getPaths from './paths';

export default function compiler(getWebpackConfig) {

  const args = minimist(process.argv.slice(2));

  const config = getConfig(args);

  logger.webpack('Loading configuration', JSON.stringify(config, null, 4));

  const paths = getPaths(args);

  const NODE_ENV = process.env.NODE_ENV || config.NODE_ENV || 'development';

  const compiler = webpack(getWebpackConfig({ config, paths, NODE_ENV }));

  compiler.plugin('compile', () => {
    logger.webpack('Start compiling...');
  });

  compiler.plugin('failed', (err) => {
    logger.webpack(err);
  });

  return compiler;
}
