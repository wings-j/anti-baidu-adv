import Path from 'path'
import RollupPluginBabel from '@rollup/plugin-babel'
import RollupPluginNodeResolve from '@rollup/plugin-node-resolve'
import RollupPluginCommonjs from '@rollup/plugin-commonjs'
import RollupPluginTypescript from '@rollup/plugin-typescript'
import RollupPluginJson from '@rollup/plugin-json'
import RollupPluginDelete from 'rollup-plugin-delete'
import PackageJson from './package.json'

export default {
  input: 'src/index.ts',
  external: Object.keys(PackageJson.dependencies || {}),
  plugins: [
    RollupPluginDelete({
      targets: Path.resolve(__dirname, 'dist/*'),
      watch: true
    }),
    RollupPluginJson(),
    RollupPluginTypescript(),
    RollupPluginNodeResolve(),
    RollupPluginCommonjs(),
    RollupPluginBabel({
      babelHelpers: 'bundled'
    })
  ],
  output: {
    file: PackageJson.main,
    format: 'iife'
  }
}
