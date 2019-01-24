import * as webpack from "webpack";
import * as t from "io-ts";

export const Script = t.union([
  t.literal("metarpheus"),
  t.literal("metarpheus-diff"),
  t.literal("web-dev"),
  t.literal("web-build"),
  t.literal("prettier-check"),
  t.literal("prettier-write")
]);
export type Script = t.TypeOf<typeof Script>;

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

const DevTool = t.union([
  t.literal('eval'),
  t.literal('inline-source-map'),
  t.literal('cheap-eval-source-map'),
  t.literal('cheap-source-map'),
  t.literal('cheap-module-eval-source-map'),
  t.literal('cheap-module'),
  t.literal('inline-source-map'),
  t.literal('cheap-eval-source-map'),
  t.literal('cheap-source-map'),
  t.literal('cheap-module-eval-source-map'),
  t.literal('cheap-module-source-map'),
  t.literal('eval-source-map'),
  t.literal('source-map'),
  t.literal('nosources-source-map'),
  t.literal('hidden-source-map'),
  t.literal('nosources-source-map'),
  t.literal('inline-cheap-source-map'),
  t.literal('inline-cheap-module-source-map')
]);

export const WebpackConfigurationOptions = t.interface({
  port: t.number,
  title: t.union([t.undefined, t.string]),
  devTool: t.union([t.undefined, DevTool]),
  bundle: t.dictionary(t.string, t.any)
});
export type WebpackConfigurationOptions = t.TypeOf<
  typeof WebpackConfigurationOptions
>;

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

export type MetarpheusOptions = Pick<MetarpheusConfig, "modelsForciblyInUse">;

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

export type WebpackConfigBuilderInput = {
  config: WebpackConfigurationOptions;
  paths: Paths;
  NODE_ENV: string | undefined;
  bundleAnalyzer: WebpackCLIOptions["bundleAnalyzer"];
};

export type CustomizeFunction = (
  defaultConfiguration: WebpackConfiguration,
  options: WebpackConfigBuilderInput & { target: "dev" | "build" }
) => WebpackConfiguration;
