import { runCommands, templateDir } from './utils';

jest.setTimeout(10 * 60 * 1000);

describe('metarpheus', () => {
  describe('metarpheusConfig option', () => {
    it('should read the correct config file', () => {
      const destinationDir = `${templateDir}/src/metarpheus/`;
      return runCommands([
        `cd ${templateDir}`,
        // this will fail if the `metarpheusConfig` param is not considered,
        // since the default config file that's used otherwise imports scala from an inexisting folder
        './node_modules/.bin/scriptoni metarpheus --ts --metarpheusConfig ./metarpheus.config.test.js',
        // checking that the directory has been created and then
        // removing it so that it isn't included in the build afterwards
        `if [ -d "${destinationDir}" ]; then rm -Rf ${destinationDir}; else exit 1; fi`
      ]);
    });
  });
});
