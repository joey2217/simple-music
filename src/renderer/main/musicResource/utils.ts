export function getParameterByName(paramName: string, url: string) {
  const params = new URL(url).searchParams
  return params.get(paramName)
}
