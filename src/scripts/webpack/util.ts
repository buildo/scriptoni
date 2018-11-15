import { Paths } from "./paths";
import { Config } from "../../model";

export function getHtmlPluginConfig(
  NODE_ENV: string | undefined,
  config: Config,
  paths: Paths
) {
  return {
    inject: false,
    bundle: NODE_ENV === "production",
    minify: NODE_ENV === "production" ? {} : false,
    template: paths.TEMPLATE,
    title: config.title,
    data: config.bundle
  };
}

export const statsOutputConfiguration = {
  assets: false,
  children: false,
  chunkModules: false,
  chunkOrigins: false,
  chunks: false,
  timings: true,
  colors: true
};
