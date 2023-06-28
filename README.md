# rollup-plugin-no-op

[![npm version](https://img.shields.io/npm/v/rollup-plugin-no-op)](https://www.npmjs.com/package/rollup-plugin-no-op)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/rollup-plugin-no-op)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/rollup-plugin-no-op)](https://bundlephobia.com/package/rollup-plugin-no-op)
[![dependencies](https://img.shields.io/librariesio/release/npm/rollup-plugin-no-op)](https://github.com/dmnsgn/rollup-plugin-no-op/blob/main/package.json)
[![types](https://img.shields.io/npm/types/rollup-plugin-no-op)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/rollup-plugin-no-op)](https://github.com/dmnsgn/rollup-plugin-no-op/blob/main/LICENSE.md)

Replace imported module with `export default {}` using module IDs. Useful when using [external](https://rollupjs.org/configuration-options/#external) is not enough.

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

## Installation

```bash
npm install rollup-plugin-no-op
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import noOp from "rollup-plugin-no-op";

export default {
  input: "src/index.js",
  output: {
    dir: "output",
  },
  plugins: [
    // ...,
    noOp({ ids: ["inspector"] }), // Replace Node.js built-in "inspector"
  ],
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

## License

MIT. See [license file](https://github.com/dmnsgn/rollup-plugin-no-op/blob/main/LICENSE.md).
