import webpackBuild from './webpack.build';
import compiler from './compiler';
import { logger } from '../../util';
import { statsOutputConfiguration } from './util';
import getWebpackConfig from './getWebpackConfig';
import { WebpackCLIOptions } from '../../model';

export default async (cliOptions: WebpackCLIOptions) => {
  const webpackConfiguration = getWebpackConfig(webpackBuild, 'build', cliOptions);

  compiler(webpackConfiguration).run((err, stats) => {
    if (err) {
      throw err;
    }
    logger.webpack(stats.toString(statsOutputConfiguration));
  });
};
