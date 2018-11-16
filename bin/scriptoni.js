#!/usr/bin/env node

var fs = require("fs");
var rimraf = require("rimraf");
var spawn = require("cross-spawn");
var script = process.argv[2];
var args = process.argv.slice(3);
var logger = require("../lib/util").logger;

function spawnScript(script, moreArgs) {
  const cmd = [require.resolve("../lib/scripts/" + script)]
    .concat(args)
    .concat(moreArgs || []);
  return spawn.sync("node", cmd, { stdio: "inherit" });
}

function exit(result) {
  process.exit(result.status);
}

function cleanBuildFolder() {
  logger.bin("clean /build folder");
  rimraf.sync("build");
  fs.mkdirSync("build");
}

// default NODE_ENV for webpack scripts
if (script === "web-build") {
  process.env.NODE_ENV = process.env.NODE_ENV || "production";
} else if (script === "web-dev") {
  process.env.NODE_ENV = process.env.NODE_ENV || "development";
}

switch (script) {
  case "metarpheus":
    exit(spawnScript("metarpheus"));
    break;
  case "metarpheus-diff":
    exit(spawnScript("metarpheus-diff"));
    break;
  case "lint-style":
    exit(spawnScript("stylelint"));
    break;
  case "stylefmt":
    exit(spawnScript("stylelint/stylefmt"));
    break;
  case "web-dev":
    cleanBuildFolder();
    exit(spawnScript("webpack/dev"));
    break;
  case "web-build":
    cleanBuildFolder();
    exit(spawnScript("webpack/build"));
    break;
  case "prettier-write":
    exit(spawnScript("prettier/write"));
    break;
  case "prettier-check":
    exit(spawnScript("prettier/listDifferent"));
    break;
  default:
    console.log('Unknown script "' + script + '".');
    break;
}
