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

test("should resolve named imports from no-oped files", async () => {
  const bundle = await rollup({
    input: join(__dirname, "fixtures-import-named-no-op.js"),
    plugins: [noOp({ ids: [join(__dirname, "a.js")] })],
  });

  const { output } = await bundle.generate({ exports: "auto" });

  assert.match(output[0].code, /\.named/);
});

const load = (id, options) => noOp({ ids: [id], ...options }).load(id);

test("should ignore queries", () => {
  const plugin = noOp({ ids: ["/a.js"] });

  assert.strictEqual(plugin.resolveId("/a.js?query"), "/a.js?query");
  assert.strictEqual(plugin.load("/a.js?query").code, "export default {}");
  assert.strictEqual(plugin.load("/b.js?query"), undefined);
});

test("should replace with valid code by file type", () => {
  assert.strictEqual(load("a.json"), "{}");
  assert.strictEqual(load("a.cjs"), "");
  assert.strictEqual(load("a.cts"), "");
  assert.strictEqual(load("a.css").code, "export default {}");
  assert.strictEqual(load("a.css").moduleType, "js");
});

test("should allow a catch-all replacement", () => {
  const replacements = [
    { find: /\.json$/, replacement: "[]" },
    { find: /.*/, replacement: "" },
  ];

  assert.strictEqual(load("a.json", { replacements }), "[]");
  assert.strictEqual(load("a.js", { replacements }), "");
});

test("should replace ids matching no replacement", () => {
  const replacements = [{ find: /\.json$/, replacement: "[]" }];

  assert.strictEqual(load("a.js", { replacements }).code, "export default {}");
});

test("should use the first matching replacement", () => {
  const replacements = [
    { find: "a.js", replacement: "1" },
    { find: /\.js$/, replacement: "2" },
    { find: /\.js$/, replacement: "3" },
  ];

  assert.strictEqual(load("a.js", { replacements }), "1");
  assert.strictEqual(load("b.js", { replacements }), "2");
});

test("should allow disabling replacements", () => {
  assert.strictEqual(
    load("a.json", { replacements: [] }).code,
    "export default {}",
  );
});
