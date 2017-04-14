import path from 'path';
import { logger } from '../../util';
import execCommand from '../execCommand';

const cwd = process.cwd();
const cmd = path.resolve(cwd, 'node_modules', 'stylefmt', 'bin', 'cli.js');

const defaultArgs = {
  recursive: true,
  _: ['src/**/*.scss']
};

execCommand(cmd, defaultArgs, logger.lintStyle);

