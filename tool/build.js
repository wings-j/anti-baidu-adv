/**
 * 构建
 */

const { exec } = require('child_process')
const { promises: Fs } = require('fs')
const Path = require('path')
const Package = require('../package.json')

/**
 * 输出
 */
async function emit() {
  return new Promise(resolve => {
    exec('tsc', (er, stdout, stderror) => {
      if (er) {
        console.error(er)
        console.log(stdout)

        reject(er)
      } else {
        resolve()
      }
    })
  })
}

/**
 * 制作Tampermonkey
 */
async function makeTampermonkey() {
  let [source, template] = await Promise.all([
    Fs.readFile(Path.resolve(__dirname, '../dist/index.js'), 'utf-8'),
    Fs.readFile(Path.resolve(__dirname, '../src/shell/tampermonkey/template.js'), 'utf-8')
  ])

  let target = template.replace('/* ${code} */', source).replace('${version}', Package.version)
  await Fs.mkdir(Path.resolve(__dirname, '../dist/tampermonkey'), { recursive: true })
  await Fs.writeFile(Path.resolve(__dirname, '../dist/tampermonkey/index.js'), target)
}

emit().then(makeTampermonkey)
