import { resolve } from 'path';
import { exec as _exec } from 'child_process';
import { promisify } from 'util';

const exec = promisify(_exec);

export const templateDir = resolve(__dirname, 'template-app');

export function runCommands(commands: string[]) {
  return exec(commands.join(' && ')).catch(err => {
    console.error(err);
    throw err;
  })
}
