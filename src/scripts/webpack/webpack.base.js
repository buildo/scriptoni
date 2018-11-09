import webpack from 'webpack';
import HTMLPlugin from 'html-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import VirtualModulePlugin from 'virtual-module-webpack-plugin';
import getSupportedLocales from './supportedLocales';
import { getHtmlPluginConfig } from './util';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import fs from 'fs';

export default ({ config, paths, NODE_ENV, bundleAnalyzer }) => {

  const BabelLoader = {
    loader: 'babel-loader',
    options: JSON.parse(fs.readFileSync(paths.BABELRC, { encoding: 'utf8' }))
  };

  return {
    resolve: {
      modules: [
        paths.SRC, paths.COMPONENTS, paths.BASIC_COMPONENTS, paths.NODE_MODULES
      ],
      extensions: ['.js', '.ts', '.tsx', '.json']
    },

    stats: {
      children: false
    },

    output: {
      library: 'webclient',
      libraryTarget: 'var',
      path: paths.BUILD,
      filename: '[name].bundle.[hash].js',
      publicPath: '/'
    },

    plugins: [
      new VirtualModulePlugin({
        moduleName: paths.VIRTUAL_CONFIG,
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
      }),
      new HTMLPlugin(getHtmlPluginConfig(NODE_ENV, config, paths))
    ].concat(
      bundleAnalyzer ? [new BundleAnalyzerPlugin()] : []
    ),

    module: {
      rules: [
        // linting with eslint
        {
          enforce: 'pre',
          test: /\.jsx?$/, // test for both js and jsx
          use: [{
            loader: 'eslint-loader',
            options: {
              failOnError: NODE_ENV === 'production',
              failOnWarning: NODE_ENV === 'production'
            }
          }],
          include: paths.SRC,
          exclude: paths.ASSETS
        },

        // TypeScript transpiler
        {
          test: /\.tsx?$/,
          use: [BabelLoader, {
            loader: 'ts-loader'
          }],
          exclude: [paths.ASSETS],
          include: [paths.SRC]
        }, {
          test: /\.jsx?$/,
          use: [BabelLoader],
          exclude: [paths.ASSETS],
          include: [paths.SRC]
        },

        // copy theme fonts
        {
          test: paths.THEME_FONTS,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: paths.THEME
            }
          }]
        },
        // copy png and jpg images
        {
          test: /\.(png|jpg)$/,
          exclude: [paths.ASSETS],
          use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }]
        },
        // copy svg images
        {
          test: /\.svg$/,
          use: [{
            ...BabelLoader,
            options: {
              ...BabelLoader.options,
              presets: ['react']
            }
          }, {
            loader: 'svg-react-loader'
          }]
        },
        // import sass variables in JS
        {
          test: paths.VARIABLES_MATCH,
          use: [{
            loader: 'sass-variables-loader'
          }]
        },
        // copy generic assets, if any
        {
          include: [paths.ASSETS],
          use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: paths.ASSETS
            }
          }]
        }
      ]
    },

    node: {
      constants: false
    },

    optimization: {
      splitChunks: {
        // splitting all vendor modules outside the main chunk
        chunks: 'all',
        minSize: 0
      }
    }
  };
};
