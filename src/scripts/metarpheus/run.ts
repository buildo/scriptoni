import { getRoutes, getModels } from 'metarpheus-io-ts';
import { logger } from '../../util';
import { run } from 'metarpheus';
import { MetarpheusConfig } from '../../model';
import { Model, Route } from 'metarpheus-io-ts/lib/domain';

type MetarpheusOptions = Pick<MetarpheusConfig, 'modelsForciblyInUse'>;

function runMetarpheus(
  apiPaths: string[],
  options: MetarpheusOptions
): { routes: Route[]; models: Model[] } {
  return run(apiPaths, options);
}

// RUN METARPHEUS
export function runMetarpheusIoTs(metarpheusConfig: MetarpheusConfig) {
  const intermRep = runMetarpheus(metarpheusConfig.apiPaths, {
    modelsForciblyInUse: metarpheusConfig.modelsForciblyInUse
  });

  logger.metarpheus('Starting metarpheus-io-ts');
  const model = getModels(
    intermRep.models,
    { isReadonly: metarpheusConfig.isReadonly, runtime: metarpheusConfig.runtime },
    metarpheusConfig.modelPrelude
  );

  const api = getRoutes(
    intermRep.routes,
    intermRep.models,
    metarpheusConfig,
    metarpheusConfig.apiPrelude
  );

  logger.metarpheus('Finished metarpheus-io-ts');
  return { model, api };
}
