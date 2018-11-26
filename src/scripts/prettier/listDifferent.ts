import execCommand from '../execCommand';
import { logger, getParsedArgs } from '../../util';
import getDefaultArgs from './getDefaultArgs';

export default async () => {
  const defaultArgs = getDefaultArgs('list-different');

  const args = {
    ...defaultArgs,
    ...getParsedArgs()
  };
  return execCommand('prettier', args, logger.prettier);
};
