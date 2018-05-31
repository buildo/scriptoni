import { resolve } from 'path';
import { spawn } from 'child_process';

const _runCommands = require('./runCommands');

export const templateDir = resolve(__dirname, 'template-app');

export function runCommands(commands: string[]): Promise<any> {
  return _runCommands(commands)
}
