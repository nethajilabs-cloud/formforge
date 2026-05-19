import { describe, it, expect } from 'vitest'
import {
  parseSchema,
  extractDefaultValues,
  evaluateShowIf,
} from '../../packages/core/src/schema/parser.js'
import type { FormSchema } from '../../packages/core/src/schema/types.js'

// ─── parseSchema ────────────────────────────────────────────────────────────

describe('parseSchema', () => {
  it('returns one entry per top-level field', () => {
    const schema: FormSchema = {
      name: { type: 'text' },
      email: { type: 'email' },
      age: { type: 'number' },
    }
    const fields = parseSchema(schema)
    expect(fields).toHaveLength(3)
  })

  it('preserves field key and sets path equal to key at depth 0', () => {
    const fields = parseSchema({ username: { type: 'text' } })
    expect(fields[0]?.key).toBe('username')
    expect(fields[0]?.path).toBe('username')
    expect(fields[0]?.depth).toBe(0)
  })

  it('attaches the schema object to each entry', () => {
    const fieldDef = { type: 'email' as const, required: true }
    const fields = parseSchema({ email: fieldDef })
    expect(fields[0]?.schema).toBe(fieldDef)
  })

  it('flattens nested object fields and increments depth', () => {
    const schema: FormSchema = {
      address: {
        type: 'object',
        fields: {
          street: { type: 'text' },
          city: { type: 'text' },
        },
      },
    }
    const fields = parseSchema(schema)
    // parent + 2 children
    expect(fields).toHaveLength(3)
    const parent = fields.find(f => f.key === 'address')!
    const street = fields.find(f => f.key === 'street')!
    expect(parent.depth).toBe(0)
    expect(street.depth).toBe(1)
    expect(street.path).toBe('address.street')
  })

  it('handles empty schema', () => {
    expect(parseSchema({})).toEqual([])
  })

  it('handles schema with prefix (for nested use)', () => {
    const fields = parseSchema({ zip: { type: 'text' } }, 'address', 1)
    expect(fields[0]?.path).toBe('address.zip')
    expect(fields[0]?.depth).toBe(1)
  })

  it('does not recurse into array items', () => {
    const schema: FormSchema = {
      users: {
        type: 'array',
        items: { name: { type: 'text' } },
      },
    }
    // array is not an object — should not recurse
    const fields = parseSchema(schema)
    expect(fields).toHaveLength(1)
    expect(fields[0]?.key).toBe('users')
  })
})

// ─── extractDefaultValues ───────────────────────────────────────────────────

describe('extractDefaultValues', () => {
  it('uses explicit defaultValue', () => {
    const values = extractDefaultValues({
      name: { type: 'text', defaultValue: 'Alice' },
    })
    expect(values.name).toBe('Alice')
  })

  it('defaults text/email/password/textarea to empty string', () => {
    const values = extractDefaultValues({
      a: { type: 'text' },
      b: { type: 'email' },
      c: { type: 'password' },
      d: { type: 'textarea' },
    })
    expect(values.a).toBe('')
    expect(values.b).toBe('')
    expect(values.c).toBe('')
    expect(values.d).toBe('')
  })

  it('defaults checkbox to false', () => {
    expect(extractDefaultValues({ agree: { type: 'checkbox' } }).agree).toBe(false)
  })

  it('respects checkbox defaultValue true', () => {
    expect(
      extractDefaultValues({ agree: { type: 'checkbox', defaultValue: true } }).agree
    ).toBe(true)
  })

  it('defaults array to []', () => {
    const values = extractDefaultValues({
      items: { type: 'array', items: {} },
    })
    expect(values.items).toEqual([])
  })

  it('recursively extracts defaults from object fields', () => {
    const values = extractDefaultValues({
      address: {
        type: 'object',
        fields: {
          street: { type: 'text', defaultValue: '123 Main St' },
          city: { type: 'text' },
        },
      },
    })
    const address = values.address as Record<string, unknown>
    expect(address.street).toBe('123 Main St')
    expect(address.city).toBe('')
  })

  it('handles empty schema', () => {
    expect(extractDefaultValues({})).toEqual({})
  })
})

// ─── evaluateShowIf ─────────────────────────────────────────────────────────

describe('evaluateShowIf', () => {
  it('returns true for fields with no showIf', () => {
    const visibility = evaluateShowIf(
      { name: { type: 'text' } },
      {}
    )
    expect(visibility.name).toBe(true)
  })

  it('evaluates showIf function with current values', () => {
    const schema: FormSchema = {
      country: { type: 'select', options: [] },
      state: {
        type: 'text',
        showIf: values => values.country === 'us',
      },
    }

    const hiddenVis = evaluateShowIf(schema, { country: 'gb' })
    expect(hiddenVis.state).toBe(false)

    const visibleVis = evaluateShowIf(schema, { country: 'us' })
    expect(visibleVis.state).toBe(true)
  })

  it('handles multiple conditional fields independently', () => {
    const schema: FormSchema = {
      role: { type: 'text' },
      adminCode: {
        type: 'text',
        showIf: v => v.role === 'admin',
      },
      managerNote: {
        type: 'textarea',
        showIf: v => v.role === 'manager',
      },
    }
    const vis = evaluateShowIf(schema, { role: 'admin' })
    expect(vis.role).toBe(true)
    expect(vis.adminCode).toBe(true)
    expect(vis.managerNote).toBe(false)
  })

  it('passes all current form values to showIf', () => {
    let received: Record<string, unknown> = {}
    const schema: FormSchema = {
      a: { type: 'text' },
      b: {
        type: 'text',
        showIf: values => {
          received = values
          return true
        },
      },
    }
    evaluateShowIf(schema, { a: 'hello', b: 'world' })
    expect(received.a).toBe('hello')
    expect(received.b).toBe('world')
  })
})
