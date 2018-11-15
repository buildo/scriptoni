import * as path from "path";
import * as t from "io-ts";
import { ThrowReporter } from "io-ts/lib/ThrowReporter";
import { loadFileFromArgument } from "../../util";
import { Args } from "../../model";

const Paths = t.interface({
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

export default function getPaths(args: Args): Paths {
  const userPaths = loadFileFromArgument(args, "paths", "./paths.js") || {};
  const ROOT = userPaths.ROOT || process.cwd();

  const paths = {
    // defaultPaths
    ROOT,
    SRC: path.resolve(ROOT, "src"),
    ENTRY: path.resolve(ROOT, "src/setup"),
    LOCALES: path.resolve(ROOT, "src/locales"),
    THEME: path.resolve(ROOT, "src/theme"),
    THEME_FONTS: path.resolve(ROOT, "src/theme/fonts"),
    BUILD: path.resolve(ROOT, "build"),
    ASSETS: path.resolve(ROOT, "assets"),
    NODE_MODULES: path.resolve(ROOT, "node_modules"),
    COMPONENTS: path.resolve(ROOT, "src/components"),
    BASIC_COMPONENTS: path.resolve(ROOT, "src/components/Basic"),
    VIRTUAL_CONFIG: "src/config.json",
    TEMPLATE: path.resolve(ROOT, "src/index.html"),
    VARIABLES_MATCH: /(v|V)ariables\.scss$/,
    BABELRC: path.resolve(ROOT, ".babelrc"),
    // give priority to user custom paths
    ...userPaths
  };

  const validatedPaths = Paths.decode(paths);

  if (validatedPaths.isLeft()) {
    throw ThrowReporter.report(Paths.decode(validatedPaths));
  }

  return paths;
}
