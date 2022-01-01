import cjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import path from 'node:path'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'
import { brotliCompressSync } from 'node:zlib'
import analyze from 'rollup-plugin-analyzer'
import replace from '@rollup/plugin-replace'

const wrapOutput = () => ({
  name: 'wrap-output',
  generateBundle(options, bundle, isWrite) {
    const bundles = Object.keys(bundle)
    if (bundles.length !== 1) throw new Error(`Expected only one bundle, got ${bundles.length}`)

    const outputBundle = bundle[bundles[0]]

    outputBundle.code = `let hook;\n\nmodule.exports.getContent = () => {\n  if (typeof hook === \`undefined\`)\n    hook = require('zlib').brotliDecompressSync(Buffer.from('${brotliCompressSync(
      outputBundle.code.replace(/\r\n/g, '\n')
    ).toString('base64')}', 'base64')).toString();\n\n  return hook;\n};\n`
  },
})

export default [
  {
    external: ['pnpapi'],
    input: './src/schematics.worker.source.ts',
    output: {
      file: './src/schematics.worker.content.js',
      format: 'cjs',
      strict: false,
      preferConst: true,
    },
    plugins: [
      analyze(),
      resolve({
        extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
        rootDir: path.join(__dirname, '../../'),
        jail: path.join(__dirname, '../../'),
        preferBuiltins: true,
      }),
      replace({
        delimiters: ['', ''],
        values: {
          "require('readable-stream/transform')": "require('stream').Transform",
          'require("readable-stream/transform")': 'require("stream").Transform',
          'readable-stream': 'stream',
        },
      }),
      esbuild({ tsconfig: false, target: 'node12' }),
      cjs({
        transformMixedEsModules: true,
        extensions: ['.js', '.ts'],
        ignoreDynamicRequires: true,
      }),
      json(),
      wrapOutput(),
    ],
  },
]
