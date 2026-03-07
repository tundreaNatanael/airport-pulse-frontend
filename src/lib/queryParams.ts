export function getOptionalQueryParam(search: string, key: string): string | null {
  const value = new URLSearchParams(search).get(key)

  if (!value) {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}
