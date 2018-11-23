import * as path from 'path';
import { logger } from '../../util';
import execCommand from '../execCommand';

const cwd = process.cwd();
const cmd = path.resolve(cwd, 'node_modules', 'stylelint', 'bin', 'stylelint.js');

const defaultArgs = {
  _: ['"src/**/*.scss"']
};

export default async () => execCommand(cmd, defaultArgs, logger.lintStyle);
