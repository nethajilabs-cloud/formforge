export interface ValidationError {
  path: string
  message: string
  type: 'required' | 'format' | 'custom' | 'async'
}

export function formatErrors(
  raw: Record<string, string | null>
): ValidationError[] {
  return Object.entries(raw)
    .filter((entry): entry is [string, string] => entry[1] !== null)
    .map(([path, message]) => ({
      path,
      message,
      type: 'custom' as const,
    }))
}

export function mergeErrors(
  ...sources: Record<string, string | null>[]
): Record<string, string | null> {
  const result: Record<string, string | null> = {}
  for (const source of sources) {
    for (const [path, error] of Object.entries(source)) {
      if (error && !result[path]) {
        result[path] = error
      }
    }
  }
  return result
}
