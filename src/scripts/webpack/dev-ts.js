import minimist from 'minimist';
import webpackServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';
import compiler from './compiler';
import getConfig from './config';
import getPaths from './paths';
import { statsOutputConfiguration } from './util';

const getWebpackConfig = (options) => webpackConfig({ ...options, jsLoader: 'typescript' });

const args = minimist(process.argv.slice(2));
const paths = getPaths(args);

const server = new webpackServer(compiler(getWebpackConfig), {
  contentBase: paths.BUILD,
  hot: true,
  stats: statsOutputConfiguration,
  disableHostCheck: true,
  historyApiFallback: { verbose: true }
});

server.listen(getConfig(args).port);
