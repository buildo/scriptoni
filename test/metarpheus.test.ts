import * as path from 'path';
import { runCommands, testAppDir } from './utils';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

const config = require(path.resolve(testAppDir, 'metarpheus.config.test'));

const metarpheusDir = config.apiOut
  .split('/')
  .slice(0, -1)
  .join('/');
const metarpheusOutPath = path.resolve(testAppDir, metarpheusDir);

afterAll(() => {
  rimraf.sync(metarpheusOutPath);
});

fdescribe('metarpheus', () => {
  describe('metarpheusConfig option', () => {
    it('should read the correct config file', () => {
      const apiPath = path.resolve(testAppDir, config.apiOut);
      const modelsPath = path.resolve(testAppDir, config.modelOut);

      return runCommands([
        `cd ${testAppDir}`,
        './node_modules/.bin/scriptoni metarpheus --metarpheusConfig metarpheus.config.test.js'
      ]).then(() => {
        expect(fs.existsSync(apiPath)).toBeTruthy();
        expect(fs.existsSync(modelsPath)).toBeTruthy();

        expect(fs.readFileSync(apiPath, { encoding: 'utf8' })).toMatchSnapshot();
        expect(fs.readFileSync(modelsPath, { encoding: 'utf8' })).toMatchSnapshot();
      }, err => {
        console.log((err as any).message) return Promise.reject(err)
      });
    });
  });
});
