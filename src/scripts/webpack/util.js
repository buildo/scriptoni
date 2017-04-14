import path from 'path';
import { logger } from '../../util';

export function getHtmlPluginConfig(NODE_ENV) {
  return {
    inject: false,
    bundle: NODE_ENV === 'production',
    minify: NODE_ENV === 'production' ? {} : false,
    template: path.resolve(process.cwd(), './src/app/index.html'),
    gzip: NODE_ENV === 'production' ? '.gz' : ''
  };
}

export function statsHandler(err, stats) {
  if (err) { throw err; }
  logger.webpack(stats.toString(({
    assets: false,
    children: false,
    chunkModules: false,
    chunkOrigins: false,
    chunks: false,
    timings: true,
    colors: true
  }, 'verbose')));
}
