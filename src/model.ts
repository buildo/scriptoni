import * as webpack from "webpack";
import * as t from "io-ts";

export const Args = t.interface({
  _: t.array(t.string),
  c: t.union([t.undefined, t.string]),
  paths: t.union([t.undefined, t.string]),
  webpackConfig: t.union([t.undefined, t.string]),
  metarpheusConfig: t.union([t.undefined, t.string]),
  bundleAnalyzer: t.union([t.undefined, t.boolean]),
  wiro: t.union([t.undefined, t.boolean])
});
export type Args = t.TypeOf<typeof Args>;

export const Config = t.interface({
  port: t.number,
  title: t.union([t.undefined, t.string]),
  devTool: t.union([t.undefined, t.string]),
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
  newtypes: t.array(t.string),
  optionalType: t.any,
  apiPaths: t.array(t.string),
  modelOut: t.string,
  apiOut: t.string,
  authRouteTermNames: t.array(t.string),
  apiPrelude: t.string,
  modelPrelude: t.string,
  modelsForciblyInUse: t.array(t.string),
  wiro: t.boolean
};

export const PartialMetarpheusConfig = t.partial(metarpheusConfigProperties);
export type PartialMetarpheusConfig = t.TypeOf<typeof PartialMetarpheusConfig>;

export const MetarpheusConfig = t.interface(metarpheusConfigProperties);
export type MetarpheusConfig = t.TypeOf<typeof MetarpheusConfig>;
