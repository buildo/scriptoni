import * as path from 'path';
import { logger, getParsedArgs } from '../../util';
import execCommand from '../execCommand';

const cwd = process.cwd();
const cmd = path.resolve(cwd, 'node_modules', 'stylelint', 'bin', 'stylelint.js');

const defaultArgs = {
  _: ['"src/**/*.scss"']
};

const parsedArgs = getParsedArgs();

const args = {
  ...defaultArgs,
  ...parsedArgs,
  _: parsedArgs._.length > 0 ? parsedArgs._ : defaultArgs._
};

export default async () => execCommand(cmd, args, logger.lintStyle);
