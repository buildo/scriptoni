import { resolve } from 'path';
import { spawn } from 'child_process';

export const templateDir = resolve(__dirname, 'template-app');

export function runCommands(commands: string[]) {
  return new Promise((resolve, reject) => {
    try {
      const shell = spawn('bash', ['-c', commands.join(' && ')], { stdio: 'inherit' });
      shell.on('close', code => {
        if (code === 1) {
          reject(1);
        } else {
          resolve(0);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}
