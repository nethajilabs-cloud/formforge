import type { FormSchema, FormValues, FieldValidator } from '../schema/types.js'
import type { FormStore } from '../state/store.js'

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

async function runValidators(
  validators: FieldValidator | FieldValidator[],
  value: unknown,
  values: FormValues
): Promise<string | null> {
  const fns = Array.isArray(validators) ? validators : [validators]
  for (const fn of fns) {
    const result = await fn(value, values)
    if (result) return result
  }
  return null
}

function getRequiredError(value: unknown): string | null {
  if (value === null || value === undefined) return 'This field is required'
  if (typeof value === 'string' && value.trim() === '') return 'This field is required'
  if (Array.isArray(value) && value.length === 0) return 'This field is required'
  return null
}

export async function validateField(
  path: string,
  schema: FormSchema,
  values: FormValues,
  store: FormStore
): Promise<string | null> {
  const fieldKey = path.split('.').pop() ?? path
  const fieldSchema = schema[fieldKey]
  if (!fieldSchema) return null

  const value = values[path]

  store.setFieldValidating(path, true)

  let error: string | null = null

  if (fieldSchema.required) {
    error = getRequiredError(value)
  }

  if (!error && fieldSchema.validate) {
    error = await runValidators(fieldSchema.validate, value, values)
  }

  store.setFieldError(path, error)
  return error
}

export async function validateForm(
  schema: FormSchema,
  store: FormStore
): Promise<ValidationResult> {
  const values = store.getValues()
  const errors: Record<string, string> = {}

  await Promise.all(
    Object.keys(schema).map(async key => {
      const error = await validateField(key, schema, values, store)
      if (error) errors[key] = error
    })
  )

  return { valid: Object.keys(errors).length === 0, errors }
}
