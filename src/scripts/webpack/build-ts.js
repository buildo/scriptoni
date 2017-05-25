import webpackBuild from './webpack.build.js';
import compiler from './compiler';
import { logger } from '../../util';
import { statsOutputConfiguration } from './util';

const getBuildConfig = (options) => webpackBuild({ ...options, jsLoader: 'typescript' });

compiler(getBuildConfig).run((err, stats) => {
  if (err) { throw err; }
  logger.webpack(stats.toString(statsOutputConfiguration));
});
