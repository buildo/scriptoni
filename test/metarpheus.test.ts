import * as path from 'path';
import { runCommands, templateDir } from './utils';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

const metarpheusOutPath = path.resolve(__dirname, 'template-app/src/metarpheus');

afterAll(() => {
  rimraf.sync(metarpheusOutPath);
});

describe('metarpheus', () => {
  describe('metarpheusConfig option', () => {
    it('should read the correct config file', () => {
      const apiPath = path.resolve(metarpheusOutPath, 'api.ts');
      const modelsPath = path.resolve(metarpheusOutPath, 'model.ts');

      return runCommands([`cd ${templateDir}`, 'yarn metarpheus']).then(() => {
        expect(fs.existsSync(apiPath)).toBeTruthy();
        expect(fs.existsSync(modelsPath)).toBeTruthy();

        expect(fs.readFileSync(apiPath, { encoding: 'utf8' })).toMatchSnapshot();
        expect(fs.readFileSync(modelsPath, { encoding: 'utf8' })).toMatchSnapshot();
      });
    });
  });
});
