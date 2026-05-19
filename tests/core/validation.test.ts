import { describe, it, expect, vi } from 'vitest'
import { validateField, validateForm } from '../../packages/core/src/validation/index.js'
import { FormStore } from '../../packages/core/src/state/store.js'
import type { FormSchema } from '../../packages/core/src/schema/types.js'

function makeStore(schema: FormSchema, values: Record<string, unknown> = {}) {
  const store = new FormStore()
  for (const key of Object.keys(schema)) {
    store.getOrCreate(key, values[key] ?? '')
  }
  for (const [k, v] of Object.entries(values)) {
    store.setFieldValue(k, v)
  }
  return store
}

// ─── validateField ──────────────────────────────────────────────────────────

describe('validateField', () => {
  it('returns null when field has no required or validate', async () => {
    const schema: FormSchema = { name: { type: 'text' } }
    const store = makeStore(schema, { name: '' })
    const err = await validateField('name', schema, store.getValues(), store)
    expect(err).toBeNull()
  })

  it('returns error when required field is empty string', async () => {
    const schema: FormSchema = { email: { type: 'email', required: true } }
    const store = makeStore(schema, { email: '' })
    const err = await validateField('email', schema, store.getValues(), store)
    expect(err).toBeTruthy()
    expect(store.getFieldState('email')?.error).toBeTruthy()
  })

  it('returns null when required field has a value', async () => {
    const schema: FormSchema = { email: { type: 'email', required: true } }
    const store = makeStore(schema, { email: 'a@b.com' })
    const err = await validateField('email', schema, store.getValues(), store)
    expect(err).toBeNull()
  })

  it('runs custom validator and stores error', async () => {
    const schema: FormSchema = {
      age: {
        type: 'number',
        validate: v => (Number(v) < 18 ? 'Must be 18+' : null),
      },
    }
    const store = makeStore(schema, { age: 10 })
    const err = await validateField('age', schema, store.getValues(), store)
    expect(err).toBe('Must be 18+')
    expect(store.getFieldState('age')?.error).toBe('Must be 18+')
  })

  it('runs async validator', async () => {
    const schema: FormSchema = {
      username: {
        type: 'text',
        validate: async v =>
          v === 'taken' ? 'Username already taken' : null,
      },
    }
    const store = makeStore(schema, { username: 'taken' })
    const err = await validateField('username', schema, store.getValues(), store)
    expect(err).toBe('Username already taken')
  })

  it('stops at first error when multiple validators given', async () => {
    let secondCalled = false
    const schema: FormSchema = {
      pwd: {
        type: 'password',
        validate: [
          v => (String(v).length < 8 ? 'Too short' : null),
          _v => {
            secondCalled = true
            return null
          },
        ],
      },
    }
    const store = makeStore(schema, { pwd: '123' })
    const err = await validateField('pwd', schema, store.getValues(), store)
    expect(err).toBe('Too short')
    expect(secondCalled).toBe(false)
  })

  it('passes all form values to custom validator', async () => {
    let capturedValues: Record<string, unknown> = {}
    const schema: FormSchema = {
      confirm: {
        type: 'password',
        validate: (_v, values) => {
          capturedValues = values
          return null
        },
      },
    }
    const store = makeStore(schema, { confirm: 'pass' })
    await validateField('confirm', schema, { confirm: 'pass', extra: 'yes' }, store)
    expect(capturedValues.extra).toBe('yes')
  })

  it('sets validating: false after completion', async () => {
    const schema: FormSchema = { x: { type: 'text', required: true } }
    const store = makeStore(schema, { x: '' })
    await validateField('x', schema, store.getValues(), store)
    expect(store.getFieldState('x')?.validating).toBe(false)
  })

  it('returns null for unknown field key', async () => {
    const schema: FormSchema = { name: { type: 'text' } }
    const store = makeStore(schema)
    const err = await validateField('ghost', schema, {}, store)
    expect(err).toBeNull()
  })
})

// ─── validateForm ───────────────────────────────────────────────────────────

describe('validateForm', () => {
  it('returns valid: true when all fields pass', async () => {
    const schema: FormSchema = {
      name: { type: 'text', required: true },
      email: { type: 'email', required: true },
    }
    const store = makeStore(schema, { name: 'Alice', email: 'a@b.com' })
    const result = await validateForm(schema, store)
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('returns valid: false with errors map when fields fail', async () => {
    const schema: FormSchema = {
      name: { type: 'text', required: true },
      email: { type: 'email', required: true },
    }
    const store = makeStore(schema, { name: '', email: '' })
    const result = await validateForm(schema, store)
    expect(result.valid).toBe(false)
    expect(result.errors.name).toBeTruthy()
    expect(result.errors.email).toBeTruthy()
  })

  it('validates all fields in parallel', async () => {
    const calls: string[] = []
    const schema: FormSchema = {
      a: { type: 'text', validate: async v => { calls.push('a'); return null } },
      b: { type: 'text', validate: async v => { calls.push('b'); return null } },
      c: { type: 'text', validate: async v => { calls.push('c'); return null } },
    }
    const store = makeStore(schema, { a: '1', b: '2', c: '3' })
    await validateForm(schema, store)
    expect(calls.sort()).toEqual(['a', 'b', 'c'])
  })

  it('returns empty errors object for empty schema', async () => {
    const store = new FormStore()
    const result = await validateForm({}, store)
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual({})
  })
})
