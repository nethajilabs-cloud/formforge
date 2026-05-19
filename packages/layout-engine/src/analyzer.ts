import type { FormSchema, FieldSchema } from '@formforges/core'

export type FieldDensity = 'full' | 'half' | 'third' | 'auto'

export interface FieldLayoutHint {
  key: string
  colSpan: FieldDensity
  group: string | undefined
  priority: number
}

const FULL_WIDTH_TYPES = new Set(['textarea', 'array', 'object'])
const HALF_WIDTH_TYPES = new Set(['text', 'email', 'password', 'select', 'date'])

const ADDRESS_KEYS = new Set([
  'street', 'address', 'city', 'state', 'zip', 'postal', 'country', 'region',
])

const NAME_KEYS = new Set(['firstName', 'lastName', 'first_name', 'last_name'])

function detectColSpan(_key: string, schema: FieldSchema): FieldDensity {
  if (FULL_WIDTH_TYPES.has(schema.type)) return 'full'
  if (schema.type === 'checkbox' || schema.type === 'radio') return 'full'
  if (HALF_WIDTH_TYPES.has(schema.type)) return 'half'
  return 'auto'
}

function detectGroup(key: string, _schema: FieldSchema): string | undefined {
  const lower = key.toLowerCase()
  if (ADDRESS_KEYS.has(lower)) return 'address'
  if (NAME_KEYS.has(lower)) return 'name'
  return undefined
}

export function analyzeSchema(schema: FormSchema): FieldLayoutHint[] {
  return Object.entries(schema).map(([key, field], index) => ({
    key,
    colSpan: detectColSpan(key, field),
    group: field.group ?? detectGroup(key, field),
    priority: index,
  }))
}
