import * as path from "path";
import { logger } from "../../util";
import execCommand from "../execCommand";

const cwd = process.cwd();
const cmd = path.resolve(cwd, "node_modules", "stylefmt", "bin", "cli.js");

const defaultArgs: any = {
  recursive: "src/**/*.scss"
};

execCommand(cmd, defaultArgs, logger.lintStyle);
