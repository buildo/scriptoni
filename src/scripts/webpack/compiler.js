import webpack from 'webpack';
import { logger } from '../../util';

export default function compiler(webpackConfig) {
  const compiler = webpack(webpackConfig);

  compiler.plugin('compile', () => {
    logger.webpack('Start compiling...');
  });

  compiler.plugin('failed', (err) => {
    logger.webpack(err);
  });

  return compiler;
}
