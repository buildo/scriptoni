import * as webpack from 'webpack';
import * as t from 'io-ts';

export const WebpackCLIOptions = t.interface({
  c: t.string,
  paths: t.string,
  webpackConfig: t.union([t.undefined, t.string]),
  bundleAnalyzer: t.union([t.undefined, t.boolean])
});
export type WebpackCLIOptions = t.TypeOf<typeof WebpackCLIOptions>;

export const MetarpheusCLIOptions = t.interface({
  metarpheusConfig: t.string
});
export type MetarpheusCLIOptions = t.TypeOf<typeof MetarpheusCLIOptions>;

export const WebpackConfigurationOptions = t.interface({
  port: t.number,
  title: t.union([t.undefined, t.string]),
  devTool: t.string,
  bundle: t.dictionary(t.string, t.any)
});
export type WebpackConfigurationOptions = t.TypeOf<typeof WebpackConfigurationOptions>;

export type WebpackConfiguration = webpack.Configuration & {
  plugins: webpack.Plugin[];
  module: webpack.Module;
};

const metarpheusConfigProperties = {
  isReadonly: t.boolean,
  runtime: t.boolean,
  apiPaths: t.array(t.string),
  modelOut: t.string,
  apiOut: t.string,
  apiPrelude: t.union([t.string, t.undefined]),
  modelPrelude: t.union([t.string, t.undefined]),
  modelsForciblyInUse: t.array(t.string),
  useLegacyNewtype: t.boolean
};

export const PartialMetarpheusConfig = t.partial(metarpheusConfigProperties);
export type PartialMetarpheusConfig = t.TypeOf<typeof PartialMetarpheusConfig>;

export const MetarpheusConfig = t.interface(metarpheusConfigProperties);
export type MetarpheusConfig = t.TypeOf<typeof MetarpheusConfig>;

export const Paths = t.interface({
  ROOT: t.string,
  SRC: t.string,
  ENTRY: t.string,
  LOCALES: t.string,
  THEME: t.string,
  THEME_FONTS: t.string,
  BUILD: t.string,
  ASSETS: t.string,
  NODE_MODULES: t.string,
  COMPONENTS: t.string,
  BASIC_COMPONENTS: t.string,
  VIRTUAL_CONFIG: t.string,
  TEMPLATE: t.string,
  VARIABLES_MATCH: t.any, // regex
  BABELRC: t.string
});
export type Paths = t.TypeOf<typeof Paths>;
