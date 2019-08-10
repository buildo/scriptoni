import { resolve } from 'path';

const _runCommands = require('./runCommands');

export const testAppDir = resolve(__dirname, 'test-app');

export function runCommands(commands: string[]): Promise<0> {
  return _runCommands(commands);
}
