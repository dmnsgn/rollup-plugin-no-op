import test from "node:test";
import assert from "node:assert";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

import { rollup } from "rollup";

import noOp from "../index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

test("should return empty object from no-oped imported file", async (t) => {
  const fileId = "./a.js";
  const bundle = await rollup({
    input: join(__dirname, "fixtures-import-no-op.js"),
    plugins: [noOp({ ids: [fileId] })],
  });

  const result = await bundle.generate({
    exports: "auto",
  });

  assert.strictEqual(result.output[0].modules[fileId].code, "var a = {};");
});
