import { cac } from "cac";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import { startTest } from "#pkg/start-test.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const packageJson = JSON.parse(
  await fs.promises.readFile(path.join(__dirname, "..", "package.json"), { encoding: "utf8" })
);

const cli = cac("pkg-consumption-test");

cli
  .version(packageJson.version)
  .option(
    "--packageName <name>",
    "Name of the package to publish (into Verdaccio) and run the scenarios for"
  )
  .option(
    "--pathToPackageRoot <path>",
    'Absolute or relative path to the package; "npm publish" will be invoked there (default: ".")\'',
    { default: "." }
  )
  .option(
    "--pathToScenariosDirectory <path>",
    "Absolute or relative path to the directory containing the consumption test scenarios'"
  )
  .help();

const parsed = cli.parse();

await startTest({
  packageName: parsed.options["packageName"],
  pathToPackageRoot: parsed.options["pathToPackageRoot"],
  pathToScenariosDirectory: parsed.options["pathToScenariosDirectory"],
});
