import getConfig from "./config";
import getPaths from "./paths";
import * as path from "path";
import identity = require("lodash/identity");
import { logger } from "../../util";
import { Args, WebpackConfiguration } from "../../model";
import { WebpackConfigBuilderInput } from "./webpack.base";

const NODE_ENV = process.env.NODE_ENV;

export default function getWebpackConfig(
  webpackConfigFn: (input: WebpackConfigBuilderInput) => WebpackConfiguration,
  target: "dev-ts" | "build-ts",
  args: Args
) {
  const config = getConfig(args);

  const paths = getPaths(args);

  const bundleAnalyzer = args.bundleAnalyzer;

  const customConfig = args.webpackConfig
    ? path.join(process.cwd(), args.webpackConfig)
    : undefined;
  const customizeConfigFn = customConfig ? require(customConfig) : identity;

  logger.webpack("platform", process.platform);
  logger.webpack("building with", `NODE_ENV=${NODE_ENV}`);
  logger.webpack("Configuration", JSON.stringify(config, null, 4));

  const configArgs = { config, paths, NODE_ENV, bundleAnalyzer };
  return customizeConfigFn(webpackConfigFn(configArgs), {
    ...configArgs,
    target
  });
}
