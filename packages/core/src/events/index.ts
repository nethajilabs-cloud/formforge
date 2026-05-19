export type FormEventType =
  | 'field:change'
  | 'field:blur'
  | 'field:focus'
  | 'form:submit'
  | 'form:reset'
  | 'form:validate'
  | 'validation:start'
  | 'validation:end'

export interface FormEvent {
  type: FormEventType
  field?: string
  value?: unknown
  timestamp: number
}

type EventHandler = (event: FormEvent) => void

export class EventBus {
  #handlers = new Map<FormEventType, Set<EventHandler>>()

  on(type: FormEventType, handler: EventHandler): () => void {
    let handlers = this.#handlers.get(type)
    if (!handlers) {
      handlers = new Set()
      this.#handlers.set(type, handlers)
    }
    handlers.add(handler)
    return () => handlers!.delete(handler)
  }

  emit(type: FormEventType, payload?: Omit<FormEvent, 'type' | 'timestamp'>): void {
    const event: FormEvent = { type, timestamp: Date.now(), ...payload }
    const handlers = this.#handlers.get(type)
    if (handlers) {
      for (const handler of handlers) handler(event)
    }
  }

  off(type: FormEventType, handler: EventHandler): void {
    this.#handlers.get(type)?.delete(handler)
  }

  destroy(): void {
    this.#handlers.clear()
  }
}
