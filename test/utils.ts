import { resolve } from 'path';

const _runCommands = require('./runCommands');

export const templateDir = resolve(__dirname, 'template-app');

export function runCommands(commands: string[]): Promise<0> {
  return _runCommands(commands);
}
