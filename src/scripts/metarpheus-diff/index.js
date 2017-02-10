import fs from 'fs';
import { diffLines } from 'diff';
import { green, red } from 'chalk';
import metarpheusTcombConfig from '../metarpheus/config';
import runMetarpheusTcomb from '../metarpheus/run';
import { logger } from '../../util';
import download from '../metarpheus/download';

download()
  .then(() => {

    const { model, api } = runMetarpheusTcomb(metarpheusTcombConfig);

    const parseDiffsAcc = {
      output: '\n',
      exitCode: 0
    };

    function getExitCode(part, exitCode) {
      if (part.added || part.removed) {
        return 1;
      }
      return exitCode;
    }

    function buildOutput(part) {
      if (part.added || part.removed) {
        const color = part.added ? green : red;
        return color(part.value);
      }
      return '';
    }

    function parseDiffs({ output, exitCode }, part) {
      return {
        exitCode: getExitCode(part, exitCode),
        output: output + buildOutput(part)
      };
    }

    // API diff
    logger.metarpheusDiff('Diffing api files...');
    const {
      output: apiOutput,
      exitCode: apiExitCode
    } = diffLines(fs.readFileSync(metarpheusTcombConfig.apiOut, 'utf-8'), api)
      .reduce(parseDiffs, parseDiffsAcc);

    process.stdout.write(apiOutput);


    // model diff
    logger.metarpheusDiff('Diffing models files...');
    const {
      output: modelOutput,
      exitCode: modelExitCode
    } = diffLines(fs.readFileSync(metarpheusTcombConfig.modelOut, 'utf-8'), model)
        .reduce(parseDiffs, parseDiffsAcc);

    process.stdout.write(modelOutput);

    // exit with code from diffs
    process.exit(modelExitCode || apiExitCode);
  })
  .catch(logger.metarpheus);
