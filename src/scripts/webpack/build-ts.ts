import webpackBuild from "./webpack.build";
import compiler from "./compiler";
import { logger, getArgs } from "../../util";
import { statsOutputConfiguration } from "./util";
import getWebpackConfig from "./getWebpackConfig";

const webpackBuildObject = getWebpackConfig(
  webpackBuild,
  "build-ts",
  getArgs()
);

compiler(webpackBuildObject).run((err, stats) => {
  if (err) {
    throw err;
  }
  logger.webpack(stats.toString(statsOutputConfiguration));
});
