import webpackBuild from './webpack.build';
import compiler from './compiler';
import { logger, getScriptoniOptions } from '../../util';
import { statsOutputConfiguration } from './util';
import getWebpackConfig from './getWebpackConfig';

export default async () => {
  const webpackBuildObject = getWebpackConfig(webpackBuild, 'build', getScriptoniOptions());

  compiler(webpackBuildObject).run((err, stats) => {
    if (err) {
      throw err;
    }
    logger.webpack(stats.toString(statsOutputConfiguration));
  });
};
