/**
 * 查询
 */

/**
 * 函数
 * @return 广告元素
 */
async function query() {
  let result = []

  let content = document.querySelector('#content_left')
  if (content) {
    let iterator = document.evaluate('//a//span[text()="广告"]', content)

    let node = iterator.iterateNext()
    while (node) {
      result.push(node)

      node = iterator.iterateNext()
    }
  }

  return result
}

export default query
