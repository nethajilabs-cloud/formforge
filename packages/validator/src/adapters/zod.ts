import type { ZodTypeAny } from 'zod'
import type { FieldValidator } from '@formforges/core'

export function zodValidator(schema: ZodTypeAny, message?: string): FieldValidator {
  return value => {
    const result = schema.safeParse(value)
    if (result.success) return null
    return message ?? result.error.errors[0]?.message ?? 'Invalid value'
  }
}

export function zodFormValidator(schema: ZodTypeAny) {
  return async (values: Record<string, unknown>): Promise<Record<string, string>> => {
    const result = await schema.safeParseAsync(values)
    if (result.success) return {}

    const errors: Record<string, string> = {}
    for (const issue of result.error.errors) {
      const path = issue.path.join('.')
      if (path && !errors[path]) {
        errors[path] = issue.message
      }
    }
    return errors
  }
}
