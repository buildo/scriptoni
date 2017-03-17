import t from 'tcomb';
import { loadFileFromArgument } from '../../util';

export const Config = t.interface({
  port: t.Number,
  devTool: t.String,
  apiEndpoint: t.String
});

const defaultConfig = {
  port: 8080,
  devTool: 'source-map'
};

export default function getConfig(args) {
  return Config({
    ...defaultConfig,
    ...loadFileFromArgument(args, 'config', './config')
  });
}
