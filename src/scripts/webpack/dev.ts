import * as webpackServer from "webpack-dev-server";
import webpackConfig from "./webpack.dev";
import compiler from "./compiler";
import getConfig from "./config";
import getWebpackConfig from "./getWebpackConfig";
import { getArgs } from "../../util";

const args = getArgs();

const webpackConfigObject = getWebpackConfig(webpackConfig, "dev", args);

const server = new webpackServer(
  compiler(webpackConfigObject),
  webpackConfigObject.devServer
);

server.listen(getConfig(args).port);
