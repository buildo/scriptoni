import * as path from 'path';
import { logger, getParsedArgs } from '../../util';
import execCommand from '../execCommand';

const cwd = process.cwd();
const cmd = path.resolve(cwd, 'node_modules', 'stylefmt', 'bin', 'cli.js');

const defaultArgs = {
  recursive: 'src/**/*.scss'
};

const parsedArgs = getParsedArgs();

const args = {
  ...defaultArgs,
  ...parsedArgs
};

export default async () => execCommand(cmd, args, logger.lintStyle);
