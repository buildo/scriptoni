import minimist from 'minimist';
import webpackServer from 'webpack-dev-server';
import webpackConfig from './webpack.dev.js';
import compiler from './compiler';
import getConfig from './config';
import getWebpackConfig from './getWebpackConfig';

const args = minimist(process.argv.slice(2));

const webpackConfigObject = getWebpackConfig(
  options => webpackConfig({ ...options, jsLoader: 'typescript' }),
  'dev-ts'
);

const server = new webpackServer(compiler(webpackConfigObject), webpackConfigObject.devServer);

server.listen(getConfig(args).port);
