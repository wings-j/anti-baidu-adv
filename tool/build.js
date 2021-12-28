/**
 * 构建
 */

const { exec } = require('child_process')
const Config = require('../tsconfig.json')

exec('tsc', (er, stdout, stderror) => {
  if (er) {
    console.error(er)
    console.log(stdout)
  } else {
  }
})
