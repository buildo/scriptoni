import execCommand from '../execCommand';
import { logger } from '../../util';
import getDefaultArgs from './getDefaultArgs';

const defaultArgs = getDefaultArgs('list-different');

execCommand('prettier', defaultArgs, logger.prettier);
