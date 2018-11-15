import * as webpack from "webpack";
import * as t from "io-ts";
import { GetRoutesOptions } from "metarpheus-io-ts";

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

export type MetarpheusConfig = GetRoutesOptions & {
  apiPrelude: string;
  modelPrelude: string;
  authRouteTermNames: string[];
  modelsForciblyInUse: string[];
  apiPaths: string[];
  wiro: boolean;
};
