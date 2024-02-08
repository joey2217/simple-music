export function JSONParse(str: string) {
  try {
    return JSON.parse(str)
  } catch (error) {
    console.error('JSONParse error:', str, error)
    return str
  }
}
