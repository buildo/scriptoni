import execCommand from '../execCommand';
import { logger } from '../../util';
import getCommandAndDefaultArgs from './getCommandsAndDefaultArgs';

const { command, defaultArgs } = getCommandAndDefaultArgs('list-different');

execCommand(command, defaultArgs, logger.prettier);
