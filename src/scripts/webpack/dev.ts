import * as webpackServer from 'webpack-dev-server';
import webpackConfig from './webpack.dev';
import compiler from './compiler';
import getConfig from './config';
import getWebpackConfig from './getWebpackConfig';
import { getScriptoniOptions } from '../../util';

const options = getScriptoniOptions();

const webpackConfigObject = getWebpackConfig(webpackConfig, 'dev', options);

const server = new webpackServer(compiler(webpackConfigObject), webpackConfigObject.devServer);

server.listen(getConfig(options).port);
