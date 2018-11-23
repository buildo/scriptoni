import execCommand from '../execCommand';
import { logger } from '../../util';
import getDefaultArgs from './getDefaultArgs';

export default async () => {
  const defaultArgs = getDefaultArgs('list-different');
  return execCommand('prettier', defaultArgs, logger.prettier);
};
