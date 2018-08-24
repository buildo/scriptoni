import execCommand from '../execCommand';
import { logger } from '../../util';
import getCommandAndDefaultArgs from './getCommandsAndDefaultArgs';

const { command, defaultArgs } = getCommandAndDefaultArgs('write');

execCommand(command, defaultArgs, logger.prettier);
