import { describe, it, expect } from 'vitest'
import { analyzeSchema } from '../../packages/layout-engine/src/analyzer.js'
import type { FormSchema } from '../../packages/core/src/schema/types.js'

describe('analyzeSchema', () => {
  it('returns one hint per field', () => {
    const schema: FormSchema = {
      name: { type: 'text' },
      email: { type: 'email' },
      bio: { type: 'textarea' },
    }
    const hints = analyzeSchema(schema)
    expect(hints).toHaveLength(3)
  })

  it('assigns field key correctly', () => {
    const hints = analyzeSchema({ username: { type: 'text' } })
    expect(hints[0]?.key).toBe('username')
  })

  it('marks textarea as full width', () => {
    const hints = analyzeSchema({ bio: { type: 'textarea' } })
    expect(hints[0]?.colSpan).toBe('full')
  })

  it('marks array fields as full width', () => {
    const hints = analyzeSchema({ users: { type: 'array', items: {} } })
    expect(hints[0]?.colSpan).toBe('full')
  })

  it('marks object fields as full width', () => {
    const hints = analyzeSchema({ address: { type: 'object', fields: {} } })
    expect(hints[0]?.colSpan).toBe('full')
  })

  it('marks checkbox and radio as full width', () => {
    const schema: FormSchema = {
      agree: { type: 'checkbox' },
      role: { type: 'radio', options: [] },
    }
    const hints = analyzeSchema(schema)
    expect(hints[0]?.colSpan).toBe('full')
    expect(hints[1]?.colSpan).toBe('full')
  })

  it('marks text/email/password/select/date as half width', () => {
    const schema: FormSchema = {
      a: { type: 'text' },
      b: { type: 'email' },
      c: { type: 'password' },
      d: { type: 'select', options: [] },
      e: { type: 'date' },
    }
    const hints = analyzeSchema(schema)
    for (const hint of hints) {
      expect(hint.colSpan).toBe('half')
    }
  })

  it('auto-groups address fields', () => {
    const schema: FormSchema = {
      street: { type: 'text' },
      city: { type: 'text' },
    }
    const hints = analyzeSchema(schema)
    expect(hints[0]?.group).toBe('address')
    expect(hints[1]?.group).toBe('address')
  })

  it('auto-groups name fields', () => {
    const schema: FormSchema = {
      firstName: { type: 'text' },
      lastName: { type: 'text' },
    }
    const hints = analyzeSchema(schema)
    expect(hints[0]?.group).toBe('name')
    expect(hints[1]?.group).toBe('name')
  })

  it('respects explicit group from schema', () => {
    const schema: FormSchema = {
      phone: { type: 'text', group: 'contact' },
    }
    const hints = analyzeSchema(schema)
    expect(hints[0]?.group).toBe('contact')
  })

  it('assigns priority based on field order', () => {
    const schema: FormSchema = {
      a: { type: 'text' },
      b: { type: 'text' },
      c: { type: 'text' },
    }
    const hints = analyzeSchema(schema)
    expect(hints[0]?.priority).toBe(0)
    expect(hints[1]?.priority).toBe(1)
    expect(hints[2]?.priority).toBe(2)
  })

  it('returns empty array for empty schema', () => {
    expect(analyzeSchema({})).toEqual([])
  })
})
