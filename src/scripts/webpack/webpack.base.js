import path from 'path';
import webpack from 'webpack';
import pick from 'lodash/pick';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import VirtualModulePlugin from 'virtual-module-webpack-plugin';
import getSupportedLocales from './supportedLocales';

export default ({ config, paths, NODE_ENV }) => {

  const preLoaders = NODE_ENV === 'development' ? [
    // linting with eslint
    {
      test: /\.jsx?$/, // test for both js and jsx
      loader: 'eslint',
      include: paths.SRC,
      exclude: paths.ASSETS
    }
  ] : [];

  return {
    resolve: {
      root: [
        paths.APP, paths.COMPONENTS, paths.BASIC_COMPONENTS,
        paths.ROUTES, paths.NODE_MODULES
      ]
    },

    stats: {
      children: false
    },

    output: {
      library: 'webclient',
      libraryTarget: 'var',
      path: paths.BUILD,
      filename: 'bundle.[hash].js'
    },

    plugins: [
      new VirtualModulePlugin({
        moduleName: path.resolve(process.cwd(), 'src/app/config.json'),
        contents: JSON.stringify(config.bundle)
      }),
      new ProgressBarPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.__supportedLocales__': JSON.stringify(getSupportedLocales(paths.LOCALES))
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new StyleLintPlugin({
        files: '**/*.scss',
        syntax: 'scss'
      })
    ],

    module: {
      preLoaders,
      loaders: [
        // babel transpiler
        {
          test: /\.jsx?$/, // test for both js and jsx
          loaders: ['babel'], // babel config stays in .babelrc
          exclude: [paths.ASSETS],
          include: [paths.SRC]
        },
        // require .json
        {
          test: /\.json$/,
          exclude: [paths.ASSETS],
          loader: 'json'
        },
        // copy theme fonts
        {
          test: paths.THEME_FONTS,
          loader: `file?name=[path][name].[ext]&context=${paths.THEME}`
        },
        // copy png images
        {
          test: /\.png$/,
          exclude: [paths.ASSETS],
          loader: 'file?name=[path][name].[ext]'
        },
        // import sass variables in JS
        {
          test: paths.VARIABLES_MATCH,
          loader: 'sass-variables'
        },
        // copy generic assets, if any
        {
          include: [paths.ASSETS],
          loader: `file?name=[path][name].[ext]&context=${paths.ASSETS}`
        }
      ]
    }
  };
};
