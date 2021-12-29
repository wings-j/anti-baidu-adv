/**
 * 核心
 */

import Query from './parts/query'

/**
 * 函数
 */
async function core() {
  let elements = await Query()
  console.log(elements)
}

export default core
