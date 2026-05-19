import { describe, it, expect } from 'vitest'
import { formatErrors, mergeErrors } from '../../packages/validator/src/error-engine/index.js'

// ─── formatErrors ────────────────────────────────────────────────────────────

describe('formatErrors', () => {
  it('converts non-null errors to ValidationError array', () => {
    const result = formatErrors({ email: 'Invalid email', name: null })
    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({ path: 'email', message: 'Invalid email', type: 'custom' })
  })

  it('excludes null errors', () => {
    const result = formatErrors({ name: null, age: null })
    expect(result).toHaveLength(0)
  })

  it('returns empty array for empty input', () => {
    expect(formatErrors({})).toEqual([])
  })

  it('handles multiple errors', () => {
    const result = formatErrors({
      a: 'Error A',
      b: null,
      c: 'Error C',
    })
    expect(result).toHaveLength(2)
    const paths = result.map(r => r.path)
    expect(paths).toContain('a')
    expect(paths).toContain('c')
  })
})

// ─── mergeErrors ─────────────────────────────────────────────────────────────

describe('mergeErrors', () => {
  it('merges errors from multiple sources', () => {
    const merged = mergeErrors(
      { name: 'Required', email: null },
      { email: 'Invalid email', age: 'Too low' }
    )
    expect(merged.name).toBe('Required')
    expect(merged.email).toBe('Invalid email')
    expect(merged.age).toBe('Too low')
  })

  it('first source wins on conflict (first error takes priority)', () => {
    const merged = mergeErrors(
      { name: 'First error' },
      { name: 'Second error' }
    )
    expect(merged.name).toBe('First error')
  })

  it('ignores null values from earlier sources', () => {
    const merged = mergeErrors({ name: null }, { name: 'From second source' })
    expect(merged.name).toBe('From second source')
  })

  it('returns empty object when called with no sources', () => {
    expect(mergeErrors()).toEqual({})
  })

  it('handles single source', () => {
    const merged = mergeErrors({ x: 'Error' })
    expect(merged.x).toBe('Error')
  })
})
