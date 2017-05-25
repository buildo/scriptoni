import webpackBuild from './webpack.build.js';
import compiler from './compiler';
import { logger } from '../../util';
import { statsOutputConfiguration } from './util';
import replaceBabelWithTypescript from './replaceBabelWithTypescript';

const getBuildConfig = (...args) => replaceBabelWithTypescript(
  webpackBuild(...args)
);

compiler(getBuildConfig).run((err, stats) => {
  if (err) { throw err; }
  logger.webpack(stats.toString(statsOutputConfiguration));
});
