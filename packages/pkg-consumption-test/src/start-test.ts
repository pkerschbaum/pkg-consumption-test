import fs from "node:fs";
import path from "node:path";
import { normalize } from "pathe";
import { $ } from "zx";

import { setup, teardown } from "#pkg/global-setup-teardown.js";
import { fsUtil } from "#pkg/helpers/fs-util.js";

type RunTestOption = {
  packageName: string;
  pathToPackageRoot: string;
  pathToScenariosDirectory: string;
};
export async function startTest(options: RunTestOption) {
  const absolutePathToPackageRoot = normalize(options.pathToPackageRoot);
  const absolutePathToScenariosDirectory = normalize(options.pathToScenariosDirectory);

  await setup({ packageName: options.packageName, absolutePathToPackageRoot });

  try {
    let scenarioDirectories = await fs.promises.readdir(absolutePathToScenariosDirectory, {
      withFileTypes: true,
    });
    scenarioDirectories = scenarioDirectories.filter((dirent) => dirent.isDirectory());

    for (const scenarioDirectory of scenarioDirectories) {
      console.log(`executing scenario: ${scenarioDirectory.name}`);
      const pathToDirectory = path.join(absolutePathToScenariosDirectory, scenarioDirectory.name);
      $.cwd = pathToDirectory;

      // cleanup node_modules of that scenario and install dependencies
      await fsUtil.cleanupDirectory(path.join(pathToDirectory, "node_modules"));
      await $`npm install --package-lock=false`;

      // execute scenario
      await $`npm run execute-scenario`;
    }
  } finally {
    await teardown();
  }
}
