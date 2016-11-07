import fs from 'fs';
import { logger } from '../../util';
import runMetarpheusTcomb from './run';
import metarpheusTcombConfig from './config';

const { model, api } = runMetarpheusTcomb(metarpheusTcombConfig);

// write api in api output file
logger.metarpheus(`Writing ${metarpheusTcombConfig.apiOut}`);
fs.writeFileSync(metarpheusTcombConfig.apiOut, api);
logger.metarpheus('Finished!');

// write model in model output file
logger.metarpheus(`Writing ${metarpheusTcombConfig.modelOut}`);
fs.writeFileSync(metarpheusTcombConfig.modelOut, model);
logger.metarpheus('Finished!');
