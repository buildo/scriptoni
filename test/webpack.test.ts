import * as rimraf  from 'rimraf';
import { resolve } from 'path';
import { promisify } from 'util';
import { readdir as _readdir, statSync, mkdirSync } from 'fs';
import sortBy = require('lodash/sortBy');
import { runCommands, templateDir } from './utils';

const readdir = promisify(_readdir);

const stripHash = (fileName: string) => fileName.replace(/\.[\da-z]{20,}\./, '.');

jest.setTimeout(10 * 60 * 1000);

describe('webpack', () => {
  describe('build-ts', () => {
    beforeAll(() => {
      rimraf.sync(resolve(templateDir, 'build'));
      mkdirSync(resolve(templateDir, 'build'));
      return runCommands([
        `cd ${templateDir}`,
        'yarn build'
      ]);
    });

    it('built files should stay the same', async () => {
      const fileNames = await readdir(resolve(templateDir, 'build'));
      expect(fileNames.map(stripHash)).toMatchSnapshot();
    });

    it('built files should not change size', async () => {
      const fileNames = await readdir(resolve(templateDir, 'build'));
      const fileSizes = fileNames.map(name => ({
        name: stripHash(name),
        size: Math.floor(statSync(resolve(templateDir, 'build', name)).size / 1000) * 1000
      }));
      expect(sortBy(fileSizes, 'name')).toMatchSnapshot();
    });
  });
});
