import { describe, it, expect, vi } from 'vitest'
import { createForm } from '../../packages/core/src/runtime/index.js'
import type { FormSchema } from '../../packages/core/src/schema/types.js'

const basicSchema: FormSchema = {
  name: { type: 'text', required: true, defaultValue: '' },
  email: { type: 'email', required: true, defaultValue: '' },
  age: { type: 'number', defaultValue: 0 },
}

// ─── createForm initialisation ───────────────────────────────────────────────

describe('createForm — initialisation', () => {
  it('extracts default values from schema', () => {
    const form = createForm({
      schema: { name: { type: 'text', defaultValue: 'Alice' } },
    })
    expect(form.getValues().name).toBe('Alice')
  })

  it('merges caller defaultValues over schema defaults', () => {
    const form = createForm({
      schema: { name: { type: 'text', defaultValue: 'Alice' } },
      defaultValues: { name: 'Bob' },
    })
    expect(form.getValues().name).toBe('Bob')
  })

  it('exposes store and events instances', () => {
    const form = createForm({ schema: basicSchema })
    expect(form.store).toBeDefined()
    expect(form.events).toBeDefined()
  })
})

// ─── getValues ───────────────────────────────────────────────────────────────

describe('createForm — getValues', () => {
  it('returns current field values', () => {
    const form = createForm({
      schema: basicSchema,
      defaultValues: { name: 'Alice', email: 'a@b.com', age: 25 },
    })
    const values = form.getValues()
    expect(values.name).toBe('Alice')
    expect(values.email).toBe('a@b.com')
    expect(values.age).toBe(25)
  })
})

// ─── setValue ────────────────────────────────────────────────────────────────

describe('createForm — setValue', () => {
  it('updates a field value', () => {
    const form = createForm({ schema: basicSchema })
    form.setValue('name', 'Carol')
    expect(form.getValues().name).toBe('Carol')
  })

  it('emits field:change event with path and value', () => {
    const form = createForm({ schema: basicSchema })
    const handler = vi.fn()
    form.events.on('field:change', handler)
    form.setValue('email', 'x@y.com')
    expect(handler).toHaveBeenCalledTimes(1)
    const evt = handler.mock.calls[0]![0]
    expect(evt.field).toBe('email')
    expect(evt.value).toBe('x@y.com')
  })
})

// ─── setTouched ──────────────────────────────────────────────────────────────

describe('createForm — setTouched', () => {
  it('marks a field as touched', () => {
    const form = createForm({ schema: basicSchema })
    form.setTouched('name')
    expect(form.store.getFieldState('name')?.touched).toBe(true)
  })

  it('emits field:blur event', () => {
    const form = createForm({ schema: basicSchema })
    const handler = vi.fn()
    form.events.on('field:blur', handler)
    form.setTouched('name')
    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler.mock.calls[0]![0].field).toBe('name')
  })
})

// ─── validateField ───────────────────────────────────────────────────────────

describe('createForm — validateField', () => {
  it('returns error string when validation fails', async () => {
    const form = createForm({ schema: basicSchema })
    const err = await form.validateField('name')
    expect(err).toBeTruthy()
  })

  it('returns null when validation passes', async () => {
    const form = createForm({ schema: basicSchema })
    form.setValue('name', 'Dave')
    const err = await form.validateField('name')
    expect(err).toBeNull()
  })

  it('emits validation:start and validation:end', async () => {
    const form = createForm({ schema: basicSchema })
    const start = vi.fn()
    const end = vi.fn()
    form.events.on('validation:start', start)
    form.events.on('validation:end', end)
    await form.validateField('email')
    expect(start).toHaveBeenCalledTimes(1)
    expect(end).toHaveBeenCalledTimes(1)
  })
})

// ─── validate ────────────────────────────────────────────────────────────────

describe('createForm — validate', () => {
  it('returns false when required fields are empty', async () => {
    const form = createForm({ schema: basicSchema })
    expect(await form.validate()).toBe(false)
  })

  it('returns true when all required fields are filled', async () => {
    const form = createForm({ schema: basicSchema })
    form.setValue('name', 'Eve')
    form.setValue('email', 'eve@test.com')
    expect(await form.validate()).toBe(true)
  })

  it('emits form:validate event', async () => {
    const form = createForm({ schema: basicSchema })
    const handler = vi.fn()
    form.events.on('form:validate', handler)
    await form.validate()
    expect(handler).toHaveBeenCalledTimes(1)
  })
})

// ─── submit ──────────────────────────────────────────────────────────────────

describe('createForm — submit', () => {
  it('calls onSubmit with current values when valid', async () => {
    const onSubmit = vi.fn()
    const form = createForm({ schema: basicSchema, onSubmit })
    form.setValue('name', 'Frank')
    form.setValue('email', 'frank@x.com')
    await form.submit()
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Frank', email: 'frank@x.com' })
    )
  })

  it('does NOT call onSubmit when validation fails', async () => {
    const onSubmit = vi.fn()
    const form = createForm({ schema: basicSchema, onSubmit })
    await form.submit()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('calls onError with errors when validation fails', async () => {
    const onError = vi.fn()
    const form = createForm({ schema: basicSchema, onError })
    await form.submit()
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ name: expect.any(String), email: expect.any(String) })
    )
  })

  it('sets submitted: true after successful submit', async () => {
    const form = createForm({ schema: basicSchema, onSubmit: async () => {} })
    form.setValue('name', 'Grace')
    form.setValue('email', 'g@x.com')
    await form.submit()
    expect(form.store.submitted.get()).toBe(true)
  })

  it('sets submitting: false after submit completes', async () => {
    const form = createForm({ schema: basicSchema, onSubmit: async () => {} })
    form.setValue('name', 'Henry')
    form.setValue('email', 'h@x.com')
    await form.submit()
    expect(form.store.submitting.get()).toBe(false)
  })

  it('sets submitting: false even when onSubmit throws', async () => {
    const form = createForm({
      schema: basicSchema,
      onSubmit: async () => { throw new Error('network error') },
    })
    form.setValue('name', 'Iris')
    form.setValue('email', 'i@x.com')
    await expect(form.submit()).rejects.toThrow('network error')
    expect(form.store.submitting.get()).toBe(false)
  })

  it('emits form:submit event', async () => {
    const form = createForm({ schema: basicSchema })
    const handler = vi.fn()
    form.events.on('form:submit', handler)
    await form.submit()
    expect(handler).toHaveBeenCalledTimes(1)
  })
})

// ─── reset ───────────────────────────────────────────────────────────────────

describe('createForm — reset', () => {
  it('resets values to merged defaults', () => {
    const form = createForm({
      schema: basicSchema,
      defaultValues: { name: 'Initial' },
    })
    form.setValue('name', 'Changed')
    form.reset()
    expect(form.getValues().name).toBe('Initial')
  })

  it('clears errors after reset', async () => {
    const form = createForm({ schema: basicSchema })
    await form.validate()
    form.reset()
    expect(form.getErrors().name).toBeUndefined()
  })

  it('emits form:reset event', () => {
    const form = createForm({ schema: basicSchema })
    const handler = vi.fn()
    form.events.on('form:reset', handler)
    form.reset()
    expect(handler).toHaveBeenCalledTimes(1)
  })
})

// ─── getVisibility ───────────────────────────────────────────────────────────

describe('createForm — getVisibility', () => {
  it('returns true for all fields with no showIf', () => {
    const form = createForm({ schema: basicSchema })
    const vis = form.getVisibility()
    expect(vis.name).toBe(true)
    expect(vis.email).toBe(true)
  })

  it('evaluates showIf against current values', () => {
    const schema: FormSchema = {
      role: { type: 'text' },
      adminPanel: {
        type: 'text',
        showIf: values => values.role === 'admin',
      },
    }
    const form = createForm({ schema })
    expect(form.getVisibility().adminPanel).toBe(false)
    form.setValue('role', 'admin')
    expect(form.getVisibility().adminPanel).toBe(true)
  })
})

// ─── getErrors ───────────────────────────────────────────────────────────────

describe('createForm — getErrors', () => {
  it('returns empty object before any validation', () => {
    const form = createForm({ schema: basicSchema })
    expect(form.getErrors()).toEqual({})
  })

  it('returns errors keyed by field path after validation', async () => {
    const form = createForm({ schema: basicSchema })
    await form.validate()
    const errors = form.getErrors()
    expect(errors.name).toBeTruthy()
    expect(errors.email).toBeTruthy()
  })
})
