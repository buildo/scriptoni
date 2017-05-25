export default (config) => {
  config.module.loaders = config.module.loaders.map(loader => {
    if (loader.loader === 'babel' || (loader.loaders && loader.loaders.indexOf('babel') !== -1)) {
      return { // TypeScript transpiler
        test: /\.tsx?$|\.jsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: loader.exclude,
        include: loader.include
      };
    } else {
      return loader;
    }
  });
  config.resolve.extensions = ['', '.js', '.ts', '.tsx', '.json'];
  return config;
};
