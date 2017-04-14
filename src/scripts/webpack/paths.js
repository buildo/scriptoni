import path from 'path';
import t from 'tcomb';
import { loadFileFromArgument } from '../../util';

const Paths = t.interface({
  SRC: t.String,
  APP: t.String,
  LOCALES: t.String,
  THEME: t.String,
  THEME_FONTS: t.String,
  BUILD: t.String,
  ASSETS: t.String,
  NODE_MODULES: t.String,
  COMPONENTS: t.String,
  BASIC_COMPONENTS: t.String,
  ROUTES: t.String,
  VARIABLES_MATCH: t.Object // regex
});

const defaultPaths = {
  SRC: path.resolve(process.cwd(), 'src'),
  APP: path.resolve(process.cwd(), 'src/app'),
  LOCALES: path.resolve(process.cwd(), 'src/app/locales'),
  THEME: path.resolve(process.cwd(), 'src/app/theme'),
  THEME_FONTS: path.resolve(process.cwd(), 'src/app/theme/fonts'),
  BUILD: path.resolve(process.cwd(), 'build'),
  ASSETS: path.resolve(process.cwd(), 'assets'),
  NODE_MODULES: path.resolve(process.cwd(), 'node_modules'),
  COMPONENTS: path.resolve(process.cwd(), 'src/app/components'),
  BASIC_COMPONENTS: path.resolve(process.cwd(), 'src/app/components/Basic'),
  ROUTES: path.resolve(process.cwd(), 'src/app/routes'),
  VARIABLES_MATCH: /(v|V)ariables\.scss$/
};

export default function getPaths(args) {
  return Paths({
    ...defaultPaths,
    ...loadFileFromArgument(args, 'paths', './paths.js')
  });

}
