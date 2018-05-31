import { runCommands, templateDir } from './utils';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

jest.setTimeout(10 * 60 * 1000);

describe('metarpheus', () => {
  describe('metarpheusConfig option', () => {
    it('should read the correct config file', () => {
      const destinationDir = `${templateDir}/src/metarpheus/`;
      return runCommands([
        `cd ${templateDir}`,
        // this will fail if the `metarpheusConfig` param is not considered,
        // since the default config file that's used otherwise imports scala from an inexisting folder
        './node_modules/.bin/scriptoni metarpheus --ts --metarpheusConfig ./metarpheus.config.test.js'
      ]).then(() => {
        // checking that the directory has been created and then
        // removing it so that it isn't included in the build afterwards
        if (fs.existsSync(destinationDir)) {
          rimraf.sync(destinationDir);
        } else {
          throw new Error(`${destinationDir} does not exist!`);
        }
      });
    });
  });
});
