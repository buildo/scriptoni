import * as fs from "fs";
import * as path from "path";
import * as debug from "debug";
import * as minimist from "minimist";
import { Args } from "./model";
import { valueOrThrow } from "./scripts/webpack/util";

debug.enable("scriptoni:*");

type Key = Exclude<keyof Args, "_" | "wiro" | "bundleAnalyzer">;

export function loadFileFromArgument(
  args: Pick<Args, Key>,
  key: Key,
  defaultPath: string
) {
  const filePath = path.join(process.cwd(), args[key] || defaultPath);
  return fs.existsSync(filePath) && require(filePath);
}

export const logger = {
  bin: debug("scriptoni:bin"),
  metarpheus: debug("scriptoni:metarpheus"),
  metarpheusDiff: debug("scriptoni:metarpheus-diff"),
  lint: debug("scriptoni:lint"),
  lintStyle: debug("scriptoni:lint-style"),
  webpack: debug("scriptoni:webpack"),
  prettier: debug("scriptoni:prettier")
};

export const getArgs = (): Args => {
  return valueOrThrow(Args, minimist(process.argv.slice(2)) as any);
};
