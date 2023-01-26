const { doSomething } = require("@pkg-consumption-test/test-package");

const result = doSomething();
if (!result === "some-result") {
  throw new Error(`got wrong result`);
}
