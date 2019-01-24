import * as path from "path";
import { runCommands, templateDir } from "./utils";
import * as fs from "fs";
import * as rimraf from "rimraf";

const config = require("./template-app/metarpheus.config.test");

const metarpheusDir = config.apiOut
  .split("/")
  .slice(0, -1)
  .join("/");
const metarpheusOutPath = path.resolve(templateDir, metarpheusDir);

afterAll(() => {
  rimraf.sync(metarpheusOutPath);
});

describe("metarpheus", () => {
  describe("metarpheusConfig option", () => {
    it("should read the correct config file", () => {
      const apiPath = path.resolve(templateDir, config.apiOut);
      const modelsPath = path.resolve(templateDir, config.modelOut);

      return runCommands([`cd ${templateDir}`, "yarn metarpheus"]).then(() => {
        expect(fs.existsSync(apiPath)).toBeTruthy();
        expect(fs.existsSync(modelsPath)).toBeTruthy();

        expect(
          fs.readFileSync(apiPath, { encoding: "utf8" })
        ).toMatchSnapshot();
        expect(
          fs.readFileSync(modelsPath, { encoding: "utf8" })
        ).toMatchSnapshot();
      });
    });
  });
});
