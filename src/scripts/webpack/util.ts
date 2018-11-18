import { WebpackOptions, Paths } from '../../model';

export function getHtmlPluginConfig(
  NODE_ENV: string | undefined,
  options: WebpackOptions,
  paths: Paths
) {
  return {
    inject: false,
    bundle: NODE_ENV === 'production',
    minify: NODE_ENV === 'production' ? {} : false,
    template: paths.TEMPLATE,
    title: options.title,
    data: options.bundle
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
