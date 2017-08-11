import metarpheusTcomb from 'metarpheus-tcomb';
import { getModels } from 'metarpheus-io-ts';
import { logger } from '../../util';
import { run as runMetarpheus } from 'metarpheus';

function getMetarpheusConfig(config, args) {
  const { authRouteTermNames, modelsForciblyInUse, wiro } = config;
  const useWiro = args.indexOf('--wiro') !== -1 || wiro;
  return { authRouteTermNames, modelsForciblyInUse, wiro: useWiro };
}

// RUN METARPHEUS
export function runMetarpheusTcomb(metarpheusTcombConfig, args) {

  const metarpheusConfig = getMetarpheusConfig(metarpheusTcombConfig, args);
  const intermRep = runMetarpheus(metarpheusTcombConfig.apiPaths, metarpheusConfig);

  // METARPHEUS-TCOMB
  logger.metarpheus('Starting metarpheus-tcomb');
  const {
    overrides,
    modelPrelude,
    apiPrelude,
    apiModelPrefix,
    renameModel
  } = metarpheusTcombConfig;
  // use metarpheus-tcomb node api to generate model and api
  const { model, api } = metarpheusTcomb({
    intermRep,
    config: {
      overrides,
      modelPrelude,
      apiPrelude,
      apiModelPrefix,
      renameModel
    }
  });
  logger.metarpheus('Finished metarpheus-tcomb');
  return { model, api };
}

export function runMetarpheusIoTs(metarpheusTsConfig, args) {

  const metarpheusConfig = getMetarpheusConfig(metarpheusTsConfig, args);
  const intermRep = runMetarpheus(metarpheusTsConfig.apiPaths, metarpheusConfig);

  logger.metarpheus('Starting metarpheus-io-ts');
  // TODO(gio): "prelude" should eventually be supported by metarhpeus-io-ts directly
  const model = `
${metarpheusTsConfig.modelPrelude}

${getModels(intermRep.models, metarpheusTsConfig)}
`;
  logger.metarpheus('Finished metarpheus-io-ts');
  // TODO(gio): we are not currently interested in `api`
  return { model, api: '' };
}
