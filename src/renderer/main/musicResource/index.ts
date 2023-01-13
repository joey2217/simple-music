export function htmlDecode(value: string) {
  const parser = new DOMParser()
  return parser.parseFromString(value, 'text/html').body.textContent
}
