import * as path from 'path';
import { logger } from '../../util';
import execCommand from '../execCommand';

const cwd = process.cwd();
const cmd = path.resolve(cwd, 'node_modules', 'stylefmt', 'bin', 'cli.js');

const defaultArgs = {
  recursive: 'src/**/*.scss'
};

export default async () => execCommand(cmd, defaultArgs, logger.lintStyle);
