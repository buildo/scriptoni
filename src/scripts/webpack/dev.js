import minimist from 'minimist';
import webpackServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';
import compiler from './compiler';
import getConfig from './config';
import { statsOutputConfiguration } from './util';

const args = minimist(process.argv.slice(2));

const server = new webpackServer(compiler(webpackConfig), {
  stats: statsOutputConfiguration,
  hot: true
});

server.listen(getConfig(args).port);
