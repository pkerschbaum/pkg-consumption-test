# Contributing Guide

## Prerequisites

- Follow the "Prerequisites" installation guide of [microsoft/vscode/wiki/How-to-Contribute#prerequisites](https://github.com/microsoft/vscode/wiki/How-to-Contribute#prerequisites).
  - You can skip the installation of `yarn`, it is not needed for this repository.
  - For the NodeJS version to use, please refer to the file [.nvmrc](./.nvmrc) of this project. This is the version of NodeJS the project should be developed with.  
    It is recommended to use [nvm](https://github.com/nvm-sh/nvm) and run `nvm use`, this will automatically switch to the NodeJS version mentioned in `.nvmrc`.
- This monorepo ("workspace") uses [`pnpm`](https://pnpm.io/) as package manager.  
  For installation instructions see [pnpm.io/installation](https://pnpm.io/installation); it should boil down to this command:

  ```sh
  npm i -g pnpm
  ```

## Setup

```sh
git clone https://github.com/pkerschbaum/pkg-consumption-test.git
cd pkg-consumption-test
pnpm i
```

## How to run

1. **Run initial build of the workspace:**

   ```sh
   pnpm run w:build
   ```

2. **Run the test (will run `pkg-consumption-test` in the test package [./packages/test-package/](./packages/test-package/)):**

   ```sh
   pnpm run w:test
   ```
