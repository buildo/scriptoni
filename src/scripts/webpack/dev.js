import minimist from 'minimist';
import webpackServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';
import compiler from './compiler';
import getConfig from './config';
import getWebpackConfig from './getWebpackConfig';

const args = minimist(process.argv.slice(2));

const webpackConfigObject = getWebpackConfig(webpackConfig, 'dev');

const server = new webpackServer(compiler(webpackConfigObject), webpackConfigObject.devServer);

server.listen(getConfig(args).port);
