/**
 * 构建
 */

import { exec } from 'child_process'
import { promises as Fs } from 'fs'

const packageJson = JSON.parse(await Fs.readFile('./package.json'))

await new Promise(resolve => {
  exec('rollup -c', (er, stdout, stderror) => {
    if (er) {
      console.error(er)
      console.log(stdout)
      console.log(stderror)

      reject(er)
    } else {
      resolve()
    }
  })
})

let source = await Fs.readFile('./dist/index.js', 'utf-8')

let tampermonkeyTemplate = await Fs.readFile('./src/shell/tampermonkey/template.js', 'utf-8')
let tampermonkeyTarget = tampermonkeyTemplate.replace('/* ${code} */', source).replace('${version}', packageJson.version)
await Fs.mkdir('./dist/tampermonkey', { recursive: true })
await Fs.writeFile('./dist/tampermonkey/index.js', tampermonkeyTarget)
