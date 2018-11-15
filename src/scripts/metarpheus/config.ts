import * as fs from "fs";
import * as path from "path";
import { undefinedType } from "io-ts-codegen";
import { Args } from "../../model";

export default function(args: Args) {
  // get current working directory
  const cwd = process.cwd();
  // define user javascript config file path
  const ujcFilePath = path.resolve(
    cwd,
    args.metarpheusConfig || "metarpheus-ts-config.js"
  );

  // TODO: fs.existsSync is deprecated
  const ujc = (fs.existsSync(ujcFilePath) && require(ujcFilePath)) || {};

  return {
    isReadonly: false,
    runtime: true,
    newtypes: [],
    optionalType: undefinedType,
    apiPaths: [path.resolve(cwd, "../api/src/main/scala")],
    modelOut: path.resolve(cwd, "src/metarpheus/model.ts"),
    apiOut: path.resolve(cwd, "src/metarpheus/api.ts"),
    authRouteTermNames: ["withRole"],
    ...ujc
  };
}
