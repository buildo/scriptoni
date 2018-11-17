import * as webpack from 'webpack';
import * as t from 'io-ts';

export const Args = t.interface({
  _: t.array(t.string),
  c: t.string,
  paths: t.string,
  webpackConfig: t.union([t.undefined, t.string]),
  metarpheusConfig: t.string,
  bundleAnalyzer: t.union([t.undefined, t.boolean])
});
export type Args = t.TypeOf<typeof Args>;

export const Config = t.interface({
  port: t.number,
  title: t.union([t.undefined, t.string]),
  devTool: t.string,
  bundle: t.dictionary(t.string, t.any)
});
export type Config = t.TypeOf<typeof Config>;

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
  apiPrelude: t.string,
  modelPrelude: t.string,
  modelsForciblyInUse: t.array(t.string)
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
