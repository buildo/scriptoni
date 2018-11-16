import { getModels, getRoutes } from 'metarpheus-io-ts';
import { logger } from '../../util';
import { run as runMetarpheus } from 'metarpheus';
import { Args, MetarpheusConfig } from '../../model';

function getMetarpheusConfig(config: MetarpheusConfig, args: Args) {
  const { authRouteTermNames, modelsForciblyInUse, wiro } = config;
  const useWiro = args.wiro || wiro;
  return { authRouteTermNames, modelsForciblyInUse, wiro: useWiro };
}

// RUN METARPHEUS
export function runMetarpheusIoTs(metarpheusConfig: MetarpheusConfig, args: Args) {
  const _metarpheusConfig = getMetarpheusConfig(metarpheusConfig, args);
  const intermRep = runMetarpheus(metarpheusConfig.apiPaths, metarpheusConfig);

  logger.metarpheus('Starting metarpheus-io-ts');
  const model = getModels(
    intermRep.models,
    _metarpheusConfig as any,
    metarpheusConfig.modelPrelude
  );

  const api = `${metarpheusConfig.apiPrelude}

${getRoutes(intermRep.routes, intermRep.models, metarpheusConfig)}
`;

  logger.metarpheus('Finished metarpheus-io-ts');
  return { model, api };
}
