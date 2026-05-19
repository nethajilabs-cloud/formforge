import { describe, it, expect, vi } from 'vitest'
import { EventBus } from '../../packages/core/src/events/index.js'
import type { FormEventType } from '../../packages/core/src/events/index.js'

describe('EventBus', () => {
  it('calls handler when matching event is emitted', () => {
    const bus = new EventBus()
    const handler = vi.fn()
    bus.on('field:change', handler)
    bus.emit('field:change', { field: 'email', value: 'a@b.com' })
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('passes a well-formed event object', () => {
    const bus = new EventBus()
    let received: Parameters<typeof handler>[0] | null = null
    const handler = vi.fn((e: Parameters<Parameters<typeof bus.on>[1]>[0]) => {
      received = e
    })
    bus.on('field:change', handler)
    bus.emit('field:change', { field: 'name', value: 'Alice' })
    expect(received).not.toBeNull()
    expect((received as NonNullable<typeof received>).type).toBe('field:change')
    expect((received as NonNullable<typeof received>).field).toBe('name')
    expect(typeof (received as NonNullable<typeof received>).timestamp).toBe('number')
  })

  it('does not call handler for different event type', () => {
    const bus = new EventBus()
    const handler = vi.fn()
    bus.on('field:change', handler)
    bus.emit('form:submit')
    expect(handler).not.toHaveBeenCalled()
  })

  it('supports multiple handlers on the same event', () => {
    const bus = new EventBus()
    const h1 = vi.fn()
    const h2 = vi.fn()
    bus.on('form:reset', h1)
    bus.on('form:reset', h2)
    bus.emit('form:reset')
    expect(h1).toHaveBeenCalledTimes(1)
    expect(h2).toHaveBeenCalledTimes(1)
  })

  it('returns an unsubscribe function that stops future calls', () => {
    const bus = new EventBus()
    const handler = vi.fn()
    const off = bus.on('field:blur', handler)
    off()
    bus.emit('field:blur', { field: 'x' })
    expect(handler).not.toHaveBeenCalled()
  })

  it('off() removes a specific handler', () => {
    const bus = new EventBus()
    const h1 = vi.fn()
    const h2 = vi.fn()
    bus.on('field:focus', h1)
    bus.on('field:focus', h2)
    bus.off('field:focus', h1)
    bus.emit('field:focus', { field: 'x' })
    expect(h1).not.toHaveBeenCalled()
    expect(h2).toHaveBeenCalledTimes(1)
  })

  it('destroy() clears all handlers', () => {
    const bus = new EventBus()
    const handler = vi.fn()
    bus.on('form:submit', handler)
    bus.on('field:change', handler)
    bus.destroy()
    bus.emit('form:submit')
    bus.emit('field:change', { field: 'x', value: 1 })
    expect(handler).not.toHaveBeenCalled()
  })

  it('handles emit when no handlers are registered', () => {
    const bus = new EventBus()
    expect(() => bus.emit('form:validate')).not.toThrow()
  })

  it('covers all event types without throwing', () => {
    const bus = new EventBus()
    const types: FormEventType[] = [
      'field:change', 'field:blur', 'field:focus',
      'form:submit', 'form:reset', 'form:validate',
      'validation:start', 'validation:end',
    ]
    for (const type of types) {
      expect(() => bus.emit(type, { field: 'x' })).not.toThrow()
    }
  })
})
