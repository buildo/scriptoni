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
      runtime: true,
      newtypes: [],
      optionalType: undefinedType,
      apiPaths: [path.resolve(cwd, '../api/src/main/scala')],
      modelOut: path.resolve(cwd, 'src/metarpheus/model.ts'),
      apiOut: path.resolve(cwd, 'src/metarpheus/api.ts'),
      authRouteTermNames: ['withRole'],
      ...ujc
    };
  } else {
    // default module prelude
    const modelPrelude = `// DO NOT EDIT MANUALLY - metarpheus-generated
/* eslint-disable */
import t from 'tcomb';
`;

    return {
      apiPaths: [path.resolve(cwd, '../api/src/main/scala')],
      modelPrelude,
      apiPrelude: `${modelPrelude}
import * as m from './model';
`,
      apiModelPrefix: 'm.',
      modelOut: path.resolve(cwd, 'src/metarpheus/model.js'),
      apiOut: path.resolve(cwd, 'src/metarpheus/api.js'),
      authRouteTermNames: ['withRole'],
      ...ujc
    };
  }
}
