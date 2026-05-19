import type { FieldSchema, FormSchema, FormValues } from './types.js'

export interface ParsedField {
  key: string
  path: string
  schema: FieldSchema
  depth: number
}

export function parseSchema(
  schema: FormSchema,
  prefix = '',
  depth = 0
): ParsedField[] {
  const fields: ParsedField[] = []

  for (const [key, fieldSchema] of Object.entries(schema)) {
    const path = prefix ? `${prefix}.${key}` : key
    fields.push({ key, path, schema: fieldSchema, depth })

    if (fieldSchema.type === 'object') {
      fields.push(...parseSchema(fieldSchema.fields, path, depth + 1))
    }
  }

  return fields
}

export function extractDefaultValues(schema: FormSchema): FormValues {
  const values: FormValues = {}

  for (const [key, field] of Object.entries(schema)) {
    if (field.defaultValue !== undefined) {
      values[key] = field.defaultValue
    } else if (field.type === 'checkbox') {
      values[key] = false
    } else if (field.type === 'array') {
      values[key] = []
    } else if (field.type === 'object') {
      values[key] = extractDefaultValues(field.fields)
    } else {
      values[key] = ''
    }
  }

  return values
}

export function evaluateShowIf(
  schema: FormSchema,
  values: FormValues
): Record<string, boolean> {
  const visibility: Record<string, boolean> = {}

  for (const [key, field] of Object.entries(schema)) {
    visibility[key] = field.showIf ? field.showIf(values) : true
  }

  return visibility
}
