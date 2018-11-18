import execCommand from '../execCommand';
import { logger } from '../../util';
import getDefaultArgs from './getDefaultArgs';

const defaultArgs = getDefaultArgs('write');

execCommand('prettier', defaultArgs, logger.prettier);
