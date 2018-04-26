export function pathExtension(path) {
  const array = path.split('/')
  return array[array.length - 1]
}

/**
 * convert HTTP header to JSON object
 * @param header {String}
 * @return {Object}
 */
export function headersToJSON(header) {
  const result = {}
  if (header) {
    const parts = header.split('\n')
    parts.forEach(looper => {
      const array = looper.split(':')
      result[array[0]] = array[1]
    })
  }
  return result
}
