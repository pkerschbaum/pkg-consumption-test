# @pkerschbaum/pkg-consumption-test

[![NPM version](https://img.shields.io/npm/v/@pkerschbaum/pkg-consumption-test?color=a1b858&label=)](https://www.npmjs.com/package/@pkerschbaum/pkg-consumption-test)

## Problem

You maintain a package which should be usable in a variety of project setups and JavaScript runtimes.  
Those "scenarios" could be:

- It should run in Node.js CJS modules.
- It should run in Node.js ESM modules.
- It should successfully compile in a TypeScript project.
- It should run in Browsers.
- It should run in Deno.
- ...

You want to test your package in those scenarios, but it is cumbersome to do the testing manually.

## Solution

This tool allows you to run automated tests for such "package consumption scenarios".  
It will

- start a private package registry ([Verdaccio](https://verdaccio.org/))
- publish your package into that registry
- run the "consumption scenarios", one by one
- stop the package registry

This approach - using a package registry - will closely simulate the real-world experience of your package
consumers installing the package from `npmjs.com`.

## Setup

You can see how it was added to `tiny-invariant` in this pull request: [github.com/alexreardon/tiny-invariant#164](https://github.com/alexreardon/tiny-invariant/pull/164).

1. Install the package:

   ```sh
   npm add --save-dev @pkerschbaum/pkg-consumption-test
   ```

1. Add a package.json script to run the package consumption scenarios:

   ```json
   {
     "scripts": {
       "test:pkg-consumption": "pkg-consumption-test --packageName=\"tiny-invariant\" --pathToScenariosDirectory=\"./test-pkg-consumption-scenarios\""
     }
   }
   ```

1. Implement scenarios in the directory `test-pkg-consumption-scenarios`.

For example, imagine you want to create a scenario which imports and runs the package in a Node.js ESM module:

1. Create the directory `test-pkg-consumption-scenarios/run-node-esm`.
1. Add the file `package.json`:

   ```json
   {
     "name": "run-node-esm",
     "dependencies": {
       "tiny-invariant": "*"
     }
   }
   ```

1. Add the file `src/test.mjs`:

   ```js
   import invariant from "tiny-invariant";

   invariant(true);
   ```

1. Finally, you have to implement a `package.json` script called `execute-scenario`.
   This script will be run by `pkg-consumption-test`.  
   You can do there whatever you want - run Node.js, bundle the source with webpack, etc.  
   For the given scenario, we just do this:

   ```json
   {
     // ...
     "scripts": {
       "execute-scenario": "node ./src/test.mjs"
     }
   }
   ```

Now, when you run `npm run test:pkg-consumption` in your package, all scenarios will execute!
