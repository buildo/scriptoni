import webpackBuild from './webpack.build.js';
import compiler from './compiler';
import { logger } from '../../util';
import { statsOutputConfiguration } from './util';
import getWebpackConfig from './getWebpackConfig';

const webpackBuildObject = getWebpackConfig(webpackBuild, 'build-ts');

compiler(webpackBuildObject).run((err, stats) => {
  if (err) { throw err; }
  logger.webpack(stats.toString(statsOutputConfiguration));
});
