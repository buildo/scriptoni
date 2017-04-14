import webpackBuild from './webpack.build.js';
import compiler from './compiler';
import { logger } from '../../util';
import { statsOutputConfiguration } from './util';

compiler(webpackBuild).run((err, stats) => {
  if (err) { throw err; }
  logger.webpack(stats.toString(statsOutputConfiguration));
});
