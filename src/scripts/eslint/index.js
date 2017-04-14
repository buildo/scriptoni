import path from 'path';
import { logger } from '../../util';
import execCommand from '../execCommand';

const cwd = process.cwd();
const cmd = path.resolve(cwd, 'node_modules', 'eslint', 'bin', 'eslint.js');

const defaultArgs = {
  cache: true,
  _: ['src']
};

execCommand(cmd, defaultArgs, logger.lint);
