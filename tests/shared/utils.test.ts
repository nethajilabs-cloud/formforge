import { describe, it, expect, vi } from 'vitest'
import {
  isNullish,
  getNestedValue,
  setNestedValue,
  omit,
  debounce,
} from '../../packages/shared/src/index.js'

// ─── isNullish ────────────────────────────────────────────────────────────────

describe('isNullish', () => {
  it('returns true for null', () => expect(isNullish(null)).toBe(true))
  it('returns true for undefined', () => expect(isNullish(undefined)).toBe(true))
  it('returns false for 0', () => expect(isNullish(0)).toBe(false))
  it('returns false for empty string', () => expect(isNullish('')).toBe(false))
  it('returns false for false', () => expect(isNullish(false)).toBe(false))
  it('returns false for object', () => expect(isNullish({})).toBe(false))
  it('returns false for array', () => expect(isNullish([])).toBe(false))
})

// ─── getNestedValue ───────────────────────────────────────────────────────────

describe('getNestedValue', () => {
  const obj = {
    user: {
      name: 'Alice',
      address: {
        city: 'NYC',
        zip: '10001',
      },
    },
    score: 42,
  }

  it('gets a top-level value', () => expect(getNestedValue(obj, 'score')).toBe(42))
  it('gets a nested value', () => expect(getNestedValue(obj, 'user.name')).toBe('Alice'))
  it('gets a deeply nested value', () => expect(getNestedValue(obj, 'user.address.city')).toBe('NYC'))
  it('returns undefined for missing key', () => expect(getNestedValue(obj, 'user.phone')).toBeUndefined())
  it('returns undefined for path through non-object', () => {
    expect(getNestedValue(obj, 'score.nested')).toBeUndefined()
  })
})

// ─── setNestedValue ───────────────────────────────────────────────────────────

describe('setNestedValue', () => {
  it('sets a top-level value', () => {
    const result = setNestedValue({ a: 1 }, 'a', 99)
    expect(result.a).toBe(99)
  })

  it('sets a nested value without mutating original', () => {
    const original = { user: { name: 'Alice' } }
    const result = setNestedValue(original, 'user.name', 'Bob')
    expect(result.user).toEqual({ name: 'Bob' })
    expect((original.user as { name: string }).name).toBe('Alice')
  })

  it('creates intermediate objects for deep paths', () => {
    const result = setNestedValue({}, 'a.b.c', 'deep')
    expect((result as { a: { b: { c: string } } }).a.b.c).toBe('deep')
  })

  it('returns a new object (immutable update)', () => {
    const original = { x: 1 }
    const result = setNestedValue(original, 'x', 2)
    expect(result).not.toBe(original)
  })
})

// ─── omit ─────────────────────────────────────────────────────────────────────

describe('omit', () => {
  it('removes specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omit(obj, ['b', 'c'])
    expect(result).toEqual({ a: 1 })
  })

  it('leaves original object unchanged', () => {
    const obj = { x: 10, y: 20 }
    omit(obj, ['x'])
    expect(obj.x).toBe(10)
  })

  it('returns same-shape object when no keys to omit', () => {
    const obj = { a: 1 }
    expect(omit(obj, [])).toEqual({ a: 1 })
  })

  it('handles omitting non-existent key gracefully', () => {
    const obj = { a: 1 }
    expect(() => omit(obj as Record<string, unknown>, ['z' as 'a'])).not.toThrow()
  })
})

// ─── debounce ─────────────────────────────────────────────────────────────────

describe('debounce', () => {
  it('calls the function after the delay', async () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 50)
    debounced()
    expect(fn).not.toHaveBeenCalled()
    await new Promise(r => setTimeout(r, 60))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('cancels previous call when called again before delay', async () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 50)
    debounced()
    debounced()
    debounced()
    await new Promise(r => setTimeout(r, 60))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('passes arguments through to the function', async () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 20)
    debounced('hello', 42)
    await new Promise(r => setTimeout(r, 30))
    expect(fn).toHaveBeenCalledWith('hello', 42)
  })
})
