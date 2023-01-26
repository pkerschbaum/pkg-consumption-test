// @ts-check
const baseEslintConfig = require("../eslint-template.cjs");
const { removeTypeInfoRules } = require("@pkerschbaum/typescript-eslint-rules-requiring-type-info");

const applyHeavyRules = process.env.APPLY_HEAVY_RULES === "true";
console.log("process.env.APPLY_HEAVY_RULES set to " + process.env.APPLY_HEAVY_RULES);

/**
 * @type {any}
 */
const eslintConfig = {
  ...baseEslintConfig,
  parserOptions: {
    ...baseEslintConfig.parserOptions,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [...(baseEslintConfig.ignorePatterns ?? []), "test/**/*"],
};

module.exports = applyHeavyRules ? eslintConfig : removeTypeInfoRules(eslintConfig);
