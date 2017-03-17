import webpackBuild from './webpack.build.js';
import compiler from './compiler';
import { statsHandler } from './util';

compiler(webpackBuild).run(statsHandler);
