export function pathExtension(path) {
  const array = path.split('/')
  return array[array.length - 1]
}
