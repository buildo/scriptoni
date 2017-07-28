import path from 'path';

export function getHtmlPluginConfig(NODE_ENV, config) {
  return {
    inject: false,
    bundle: NODE_ENV === 'production',
    minify: NODE_ENV === 'production' ? {} : false,
    template: path.resolve(process.cwd(), './src/app/index.html'),
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
