import path from 'path';
import t from 'tcomb';
import { loadFileFromArgument } from '../../util';

const Paths = t.interface({
  ROOT: t.String,
  SRC: t.String,
  ENTRY: t.String,
  LOCALES: t.String,
  THEME: t.String,
  THEME_FONTS: t.String,
  BUILD: t.String,
  ASSETS: t.String,
  NODE_MODULES: t.String,
  COMPONENTS: t.String,
  BASIC_COMPONENTS: t.String,
  VIRTUAL_CONFIG: t.String,
  TEMPLATE: t.String,
  VARIABLES_MATCH: t.Object, // regex
  BABELRC: t.String
});

export default function getPaths(args) {
  const userPaths = loadFileFromArgument(args, 'paths', './paths.js') || {};
  const ROOT = userPaths.ROOT || process.cwd();

  return Paths({
    // defaultPaths
    ROOT,
    SRC: path.resolve(ROOT, 'src'),
    ENTRY: path.resolve(ROOT, 'src/setup/index.js'),
    LOCALES: path.resolve(ROOT, 'src/locales'),
    THEME: path.resolve(ROOT, 'src/theme'),
    THEME_FONTS: path.resolve(ROOT, 'src/theme/fonts'),
    BUILD: path.resolve(ROOT, 'build'),
    ASSETS: path.resolve(ROOT, 'assets'),
    NODE_MODULES: path.resolve(ROOT, 'node_modules'),
    COMPONENTS: path.resolve(ROOT, 'src/components'),
    BASIC_COMPONENTS: path.resolve(ROOT, 'src/components/Basic'),
    VIRTUAL_CONFIG: 'src/config.json',
    TEMPLATE: path.resolve(ROOT, 'src/index.html'),
    TSCONFIG: path.resolve(ROOT, 'tsconfig.json'),
    VARIABLES_MATCH: /(v|V)ariables\.scss$/,
    BABELRC: path.resolve(ROOT, '.babelrc'),
    // give priority to user custom paths
    ...userPaths
  });

}
