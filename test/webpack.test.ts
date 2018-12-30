import * as rimraf from 'rimraf';
import { resolve } from 'path';
import { promisify } from 'util';
import { readdir as _readdir, statSync, mkdirSync, readFileSync } from 'fs';
import sortBy = require('lodash/sortBy');
import { runCommands, templateDir } from './utils';

const readdir = promisify(_readdir);

const stripHash = (fileName: string) => fileName.replace(/\.[\da-z]{20,}\./, '.');

jest.setTimeout(10 * 60 * 1000);

describe('webpack', () => {
  describe('build', () => {
    beforeAll(() => {
      rimraf.sync(resolve(templateDir, 'build'));
      mkdirSync(resolve(templateDir, 'build'));
      return runCommands([`cd ${templateDir}`, 'yarn build']);
    });

    it('built files should stay the same', async () => {
      const fileNames = await readdir(resolve(templateDir, 'build'));
      expect(fileNames.map(stripHash)).toMatchSnapshot();
    });

    it('index.html should import CSS and JS files', async () => {
      const htmlFile = readFileSync(resolve(templateDir, 'build', 'index.html'), {
        encoding: 'utf8'
      });

      expect(
        /<link rel="stylesheet" href="\/vendors~main\.style\..+\.min\.css" media="all">/.test(
          htmlFile
        )
      ).toBe(true);
      expect(
        /<link rel="stylesheet" href="\/main\.style\..+\.min\.css" media="all">/.test(htmlFile)
      ).toBe(true);
      expect(
        /<script type="text\/javascript" src="\/vendors~main\.bundle\..+\.js">/.test(htmlFile)
      ).toBe(true);
      expect(/<script type="text\/javascript" src="\/main\.bundle\..+\.js">/.test(htmlFile)).toBe(
        true
      );
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
