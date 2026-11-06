const NO_OP = {
  code: "export default {}",
  // An explicit type: `export` is not valid in CSS or other non JS file types
  moduleType: "js",
  // Named imports read from the default export. Not supported by rolldown.
  syntheticNamedExports: true,
};

const stripQuery = (id) => id.split("?", 1)[0];

const isMatch = (find, id) =>
  find instanceof RegExp ? find.test(id) : find === id;

/**
 * @typedef {object} NoOpReplacement
 * @property {string | RegExp} find Module ID to match.
 * @property {string | object} replacement Code or `load` hook result.
 */

/**
 * @typedef {object} NoOpOptions
 * @property {string[]} [ids=[]] Module IDs to replace.
 * @property {NoOpReplacement[]} [replacements] Replacements by module ID, first
 *   match wins. Defaults to `{}` for JSON and an empty string for CommonJS.
 *   Other IDs are replaced by `export default {}`.
 */

/**
 * Replace modules by a no-op.
 *
 * @param {NoOpOptions} [options]
 * @returns {import("rollup").Plugin}
 */
export default ({
  ids = [],
  replacements = [
    { find: /\.json$/, replacement: "{}" },
    // `export` is a syntax error in files parsed as scripts
    { find: /\.c[jt]s$/, replacement: "" },
  ],
} = {}) => ({
  name: "no-op",
  resolveId(id) {
    if (ids.includes(stripQuery(id))) return id;
  },
  load(id) {
    const file = stripQuery(id);
    if (!ids.includes(file)) return;
    return (
      replacements.find(({ find }) => isMatch(find, file))?.replacement ?? NO_OP
    );
  },
});
