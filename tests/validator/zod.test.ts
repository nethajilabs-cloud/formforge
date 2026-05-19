import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { zodValidator, zodFormValidator } from '../../packages/validator/src/adapters/zod.js'

// ─── zodValidator ─────────────────────────────────────────────────────────────

describe('zodValidator', () => {
  it('returns null when value passes schema', () => {
    const validate = zodValidator(z.string().email())
    expect(validate('test@example.com', {})).toBeNull()
  })

  it('returns error message when value fails schema', () => {
    const validate = zodValidator(z.string().email())
    expect(validate('notanemail', {})).toBeTruthy()
  })

  it('uses the zod error message by default', () => {
    const validate = zodValidator(z.string().min(5))
    const err = validate('ab', {})
    expect(typeof err).toBe('string')
    expect(err!.length).toBeGreaterThan(0)
  })

  it('uses custom message when provided', () => {
    const validate = zodValidator(z.string().email(), 'Please enter a valid email')
    expect(validate('bad', {})).toBe('Please enter a valid email')
  })

  it('works with number schema', () => {
    const validate = zodValidator(z.number().min(18))
    expect(validate(25, {})).toBeNull()
    expect(validate(10, {})).toBeTruthy()
  })

  it('works with enum schema', () => {
    const validate = zodValidator(z.enum(['a', 'b', 'c']))
    expect(validate('a', {})).toBeNull()
    expect(validate('d', {})).toBeTruthy()
  })
})

// ─── zodFormValidator ─────────────────────────────────────────────────────────

describe('zodFormValidator', () => {
  const schema = z.object({
    email: z.string().email(),
    age: z.number().min(18),
    name: z.string().min(1),
  })

  it('returns empty object when all fields pass', async () => {
    const validate = zodFormValidator(schema)
    const errors = await validate({ email: 'a@b.com', age: 25, name: 'Alice' })
    expect(errors).toEqual({})
  })

  it('returns error map keyed by field path', async () => {
    const validate = zodFormValidator(schema)
    const errors = await validate({ email: 'bad', age: 10, name: '' })
    expect(errors.email).toBeTruthy()
    expect(errors.age).toBeTruthy()
    expect(errors.name).toBeTruthy()
  })

  it('only captures the first error per field', async () => {
    const validate = zodFormValidator(schema)
    const errors = await validate({ email: 'bad', age: 10, name: '' })
    // each key should have exactly one string (not an array)
    for (const value of Object.values(errors)) {
      expect(typeof value).toBe('string')
    }
  })

  it('works with nested schema paths', async () => {
    const nestedSchema = z.object({
      address: z.object({
        zip: z.string().regex(/^\d{5}$/, 'Invalid zip'),
      }),
    })
    const validate = zodFormValidator(nestedSchema)
    const errors = await validate({ address: { zip: 'bad' } })
    expect(errors['address.zip']).toBeTruthy()
  })
})
