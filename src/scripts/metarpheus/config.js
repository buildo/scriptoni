import fs from 'fs';
import path from 'path';
import { undefinedType } from 'io-ts-codegen';

export default function(ts) {
  // get current working directory
  const cwd = process.cwd();
  // define user javascript config file path
  const ujcFilePath = path.resolve(cwd, ts ? 'metarpheus-ts-config.js' : 'metarpheus-config.js');

  // TODO: fs.existsSync is deprecated
  const ujc = fs.existsSync(ujcFilePath) && require(ujcFilePath) || {};

  if (ts) {
    return {
      isReadonly: false,
      runtime: false,
      newtypes: [],
      optionalType: undefinedType,
      apiPath: path.resolve(cwd, '../api/src/main/scala'),
      modelOut: path.resolve(cwd, 'src/app/metarpheus/model.ts'),
      apiOut: path.resolve(cwd, 'src/app/metarpheus/api.ts'),
      intermRepIn: path.resolve(__dirname, 'metarpheus-interm-rep.json'),
      ...ujc
    };
  } else {
    // default module prelude
    const modelPrelude = `// DO NOT EDIT MANUALLY - metarpheus-generated
    /* eslint-disable */
    import t from 'tcomb';
    `;

    return {
      apiPath: path.resolve(cwd, '../api/src/main/scala'),
      modelPrelude,
      apiPrelude: `${modelPrelude}
    import * as m from './model';
    `,
      apiModelPrefix: 'm.',
      modelOut: path.resolve(cwd, 'src/app/metarpheus/model.js'),
      apiOut: path.resolve(cwd, 'src/app/metarpheus/api.js'),
      intermRepIn: path.resolve(__dirname, 'metarpheus-interm-rep.json'),
      ...ujc
    };
  }
}
