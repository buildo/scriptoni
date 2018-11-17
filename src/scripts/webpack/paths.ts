import * as path from 'path';
import * as t from 'io-ts';
import { Args, Paths } from '../../model';
import { valueOrThrow } from './util';
import * as fs from 'fs';

export default function getPaths(args: Args): Paths {
  const pathsConfigPath = path.resolve(process.cwd(), args.paths);
  const userPaths = fs.existsSync(pathsConfigPath)
    ? valueOrThrow(t.partial(Paths.props), require(pathsConfigPath))
    : {};

  const ROOT = userPaths.ROOT || process.cwd();

  return {
    // defaultPaths
    ROOT,
    SRC: path.resolve(ROOT, 'src'),
    ENTRY: path.resolve(ROOT, 'src/setup'),
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
    VARIABLES_MATCH: /(v|V)ariables\.scss$/,
    BABELRC: path.resolve(ROOT, '.babelrc'),
    // give priority to user custom paths
    ...userPaths
  };
}
