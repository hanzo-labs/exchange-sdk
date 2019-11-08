import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import filesize from 'rollup-plugin-filesize'
import visualizer from 'rollup-plugin-visualizer'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

import fs from 'fs'
import nodeEval from 'node-eval'

export function getModuleExports(moduleId) {
    const id = require.resolve(moduleId)
    const moduleOut = nodeEval(fs.readFileSync(id).toString(), id)
    let result = []
    const excludeExports = /^(default|__)/
    if (moduleOut && typeof moduleOut === 'object') {
        result = Object.keys(moduleOut)
            .filter(name => !excludeExports.test(name))
    }

    return result
}

// Helper for getting the names exports automagically
export function getNamedExports(moduleIds) {
    const result = {}
    moduleIds.forEach( id => {
        result[id] = getModuleExports(id)
    })
    return result
}

const plugins = [
  peerDepsExternal(),
  json({
    // All JSON files will be parsed by default,
    // but you can also specifically include/exclude files
    include: 'node_modules/**',

    // for tree-shaking, properties will be declared as
    // variables, using either `var` or `const`
    preferConst: true, // Default: false

    // specify indentation for the generated default export —
    // defaults to '\t'
    indent: '  ',

    // ignores indent and generates the smallest code
    compact: true, // Default: false

    // generate a named export for every property of the JSON object
    namedExports: true // Default: true
  }),
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
  commonjs(),
  filesize(),
  visualizer(),
]

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    plugins,
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.js',
    external: [],
    plugins,
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
  },
]
