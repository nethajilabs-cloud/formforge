import { describe, it, expect, vi } from 'vitest'
import { FormStore } from '../../packages/core/src/state/store.js'

function makeStore() {
  const store = new FormStore()
  store.getOrCreate('name', '')
  store.getOrCreate('email', '')
  store.getOrCreate('age', 0)
  return store
}

// ─── getOrCreate ────────────────────────────────────────────────────────────

describe('FormStore.getOrCreate', () => {
  it('creates a field with the given default value', () => {
    const store = new FormStore()
    store.getOrCreate('name', 'Alice')
    expect(store.getFieldState('name')?.value).toBe('Alice')
  })

  it('returns the same observable on subsequent calls (idempotent)', () => {
    const store = new FormStore()
    const a = store.getOrCreate('x', 1)
    const b = store.getOrCreate('x', 99)
    expect(a).toBe(b)
    expect(store.getFieldState('x')?.value).toBe(1)
  })
})

// ─── getFieldState ──────────────────────────────────────────────────────────

describe('FormStore.getFieldState', () => {
  it('returns undefined for unknown path', () => {
    expect(new FormStore().getFieldState('ghost')).toBeUndefined()
  })

  it('returns the initial state shape', () => {
    const store = makeStore()
    const state = store.getFieldState('name')!
    expect(state).toMatchObject({
      value: '',
      error: null,
      touched: false,
      dirty: false,
      validating: false,
    })
  })
})

// ─── setFieldValue ──────────────────────────────────────────────────────────

describe('FormStore.setFieldValue', () => {
  it('updates the value', () => {
    const store = makeStore()
    store.setFieldValue('name', 'Bob')
    expect(store.getFieldState('name')?.value).toBe('Bob')
  })

  it('marks the field as dirty', () => {
    const store = makeStore()
    store.setFieldValue('email', 'x@y.com')
    expect(store.getFieldState('email')?.dirty).toBe(true)
  })

  it('does not affect other fields', () => {
    const store = makeStore()
    store.setFieldValue('name', 'Bob')
    expect(store.getFieldState('email')?.value).toBe('')
  })

  it('notifies form listeners', () => {
    const store = makeStore()
    const listener = vi.fn()
    store.subscribeForm(listener)
    store.setFieldValue('name', 'Carol')
    expect(listener).toHaveBeenCalledTimes(1)
  })
})

// ─── setFieldTouched ────────────────────────────────────────────────────────

describe('FormStore.setFieldTouched', () => {
  it('marks field as touched', () => {
    const store = makeStore()
    store.setFieldTouched('name')
    expect(store.getFieldState('name')?.touched).toBe(true)
  })

  it('does not change value', () => {
    const store = makeStore()
    store.setFieldValue('name', 'Dave')
    store.setFieldTouched('name')
    expect(store.getFieldState('name')?.value).toBe('Dave')
  })
})

// ─── setFieldError ──────────────────────────────────────────────────────────

describe('FormStore.setFieldError', () => {
  it('sets an error string', () => {
    const store = makeStore()
    store.setFieldError('email', 'Invalid email')
    expect(store.getFieldState('email')?.error).toBe('Invalid email')
  })

  it('clears error with null', () => {
    const store = makeStore()
    store.setFieldError('email', 'oops')
    store.setFieldError('email', null)
    expect(store.getFieldState('email')?.error).toBeNull()
  })

  it('sets validating to false when error is set', () => {
    const store = makeStore()
    store.setFieldValidating('email', true)
    store.setFieldError('email', 'bad')
    expect(store.getFieldState('email')?.validating).toBe(false)
  })
})

// ─── setFieldValidating ─────────────────────────────────────────────────────

describe('FormStore.setFieldValidating', () => {
  it('sets validating flag', () => {
    const store = makeStore()
    store.setFieldValidating('name', true)
    expect(store.getFieldState('name')?.validating).toBe(true)
  })
})

// ─── getValues ──────────────────────────────────────────────────────────────

describe('FormStore.getValues', () => {
  it('returns a map of all current values', () => {
    const store = makeStore()
    store.setFieldValue('name', 'Eve')
    store.setFieldValue('email', 'eve@example.com')
    const values = store.getValues()
    expect(values.name).toBe('Eve')
    expect(values.email).toBe('eve@example.com')
    expect(values.age).toBe(0)
  })
})

// ─── getErrors ──────────────────────────────────────────────────────────────

describe('FormStore.getErrors', () => {
  it('returns only fields with errors', () => {
    const store = makeStore()
    store.setFieldError('email', 'required')
    const errors = store.getErrors()
    expect(errors.email).toBe('required')
    expect('name' in errors).toBe(false)
  })

  it('returns empty object when no errors', () => {
    expect(Object.keys(makeStore().getErrors())).toHaveLength(0)
  })
})

// ─── hasErrors ──────────────────────────────────────────────────────────────

describe('FormStore.hasErrors', () => {
  it('returns false with no errors', () => {
    expect(makeStore().hasErrors()).toBe(false)
  })

  it('returns true when any field has an error', () => {
    const store = makeStore()
    store.setFieldError('age', 'too low')
    expect(store.hasErrors()).toBe(true)
  })
})

// ─── subscribeField ─────────────────────────────────────────────────────────

describe('FormStore.subscribeField', () => {
  it('calls listener when the subscribed field changes', () => {
    const store = makeStore()
    const listener = vi.fn()
    store.subscribeField('name', listener)
    store.setFieldValue('name', 'Frank')
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('does NOT call listener when a different field changes', () => {
    const store = makeStore()
    const listener = vi.fn()
    store.subscribeField('name', listener)
    store.setFieldValue('email', 'x@y.com')
    expect(listener).not.toHaveBeenCalled()
  })

  it('unsubscribes correctly', () => {
    const store = makeStore()
    const listener = vi.fn()
    const unsub = store.subscribeField('name', listener)
    unsub()
    store.setFieldValue('name', 'Grace')
    expect(listener).not.toHaveBeenCalled()
  })

  it('returns noop for unknown path', () => {
    const store = new FormStore()
    const unsub = store.subscribeField('ghost', vi.fn())
    expect(() => unsub()).not.toThrow()
  })
})

// ─── subscribeForm ──────────────────────────────────────────────────────────

describe('FormStore.subscribeForm', () => {
  it('notifies on any field value change', () => {
    const store = makeStore()
    const listener = vi.fn()
    store.subscribeForm(listener)
    store.setFieldValue('name', 'H')
    store.setFieldValue('email', 'i@j.com')
    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('unsubscribes correctly', () => {
    const store = makeStore()
    const listener = vi.fn()
    const unsub = store.subscribeForm(listener)
    unsub()
    store.setFieldValue('name', 'X')
    expect(listener).not.toHaveBeenCalled()
  })
})

// ─── submitting / submitted ──────────────────────────────────────────────────

describe('FormStore submitting / submitted flags', () => {
  it('starts as false', () => {
    const store = new FormStore()
    expect(store.submitting.get()).toBe(false)
    expect(store.submitted.get()).toBe(false)
  })

  it('can be set to true', () => {
    const store = new FormStore()
    store.submitting.set(true)
    expect(store.submitting.get()).toBe(true)
  })

  it('notifies subscribers', () => {
    const store = new FormStore()
    const listener = vi.fn()
    store.submitting.subscribe(listener)
    store.submitting.set(true)
    expect(listener).toHaveBeenCalledTimes(1)
  })
})

// ─── reset ──────────────────────────────────────────────────────────────────

describe('FormStore.reset', () => {
  it('restores values to defaults', () => {
    const store = makeStore()
    store.setFieldValue('name', 'Zara')
    store.reset({ name: 'Alice', email: '', age: 0 })
    expect(store.getFieldState('name')?.value).toBe('Alice')
  })

  it('clears errors on reset', () => {
    const store = makeStore()
    store.setFieldError('email', 'bad email')
    store.reset({ name: '', email: '', age: 0 })
    expect(store.getFieldState('email')?.error).toBeNull()
  })

  it('clears dirty and touched flags', () => {
    const store = makeStore()
    store.setFieldValue('name', 'dirty')
    store.setFieldTouched('name')
    store.reset({ name: '', email: '', age: 0 })
    const state = store.getFieldState('name')!
    expect(state.dirty).toBe(false)
    expect(state.touched).toBe(false)
  })

  it('resets submitting and submitted flags', () => {
    const store = makeStore()
    store.submitting.set(true)
    store.submitted.set(true)
    store.reset({})
    expect(store.submitting.get()).toBe(false)
    expect(store.submitted.get()).toBe(false)
  })
})
