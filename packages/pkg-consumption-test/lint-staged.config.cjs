module.exports = {
  "**/*.{ts,tsx}": [`pnpm --dir "${__dirname}" exec eslint --max-warnings 0`],
};
