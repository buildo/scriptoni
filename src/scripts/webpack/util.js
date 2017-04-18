import path from 'path';

export function getHtmlPluginConfig(NODE_ENV, title) {
  return {
    inject: false,
    bundle: NODE_ENV === 'production',
    minify: NODE_ENV === 'production' ? {} : false,
    template: path.resolve(process.cwd(), './src/app/index.html'),
    title
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
