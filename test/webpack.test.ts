import * as rimraf from 'rimraf';
import { resolve } from 'path';
import { promisify } from 'util';
import { readdir as _readdir, statSync, mkdirSync } from 'fs';
import sortBy = require('lodash/sortBy');
import { runCommands, testAppDir } from './utils';

const readdir = promisify(_readdir);

const stripHash = (fileName: string) => fileName.replace(/\.[\da-z]{20,}\./, '.');

jest.setTimeout(10 * 60 * 1000);

describe('webpack', () => {
  describe('build', () => {
    beforeAll(() => {
      rimraf.sync(resolve(testAppDir, 'build'));
      mkdirSync(resolve(testAppDir, 'build'));
      return runCommands([`cd ${testAppDir}`, 'yarn build']);
    });

    it('built files should stay the same', async () => {
      const fileNames = await readdir(resolve(testAppDir, 'build'));
      expect(fileNames.map(stripHash)).toMatchSnapshot();
    });

    it('built files should not change size', async () => {
      const fileNames = await readdir(resolve(testAppDir, 'build'));
      const fileSizes = fileNames.map(name => ({
        name: stripHash(name),
        size: Math.floor(statSync(resolve(testAppDir, 'build', name)).size / 1000) * 1000
      }));
      expect(sortBy(fileSizes, 'name')).toMatchSnapshot();
    });
  });
});
