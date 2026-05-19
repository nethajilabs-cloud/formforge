export interface FieldState {
  value: unknown
  error: string | null
  touched: boolean
  dirty: boolean
  validating: boolean
}

type Listener = () => void

class Observable<T> {
  #value: T
  #listeners = new Set<Listener>()

  constructor(initial: T) {
    this.#value = initial
  }

  get(): T {
    return this.#value
  }

  set(next: T): void {
    this.#value = next
    for (const fn of this.#listeners) fn()
  }

  update(updater: (prev: T) => T): void {
    this.set(updater(this.#value))
  }

  subscribe(fn: Listener): () => void {
    this.#listeners.add(fn)
    return () => this.#listeners.delete(fn)
  }

  getSnapshot(): T {
    return this.#value
  }
}

function makeDefaultFieldState(defaultValue: unknown): FieldState {
  return {
    value: defaultValue,
    error: null,
    touched: false,
    dirty: false,
    validating: false,
  }
}

export class FormStore {
  #fields = new Map<string, Observable<FieldState>>()
  #formListeners = new Set<Listener>()
  #submitting = new Observable(false)
  #submitted = new Observable(false)

  getOrCreate(path: string, defaultValue: unknown = ''): Observable<FieldState> {
    let field = this.#fields.get(path)
    if (!field) {
      field = new Observable(makeDefaultFieldState(defaultValue))
      this.#fields.set(path, field)
    }
    return field
  }

  getFieldObservable(path: string): Observable<FieldState> | undefined {
    return this.#fields.get(path)
  }

  getFieldState(path: string): FieldState | undefined {
    return this.#fields.get(path)?.get()
  }

  setFieldValue(path: string, value: unknown): void {
    const field = this.#fields.get(path)
    if (field) {
      field.update(s => ({ ...s, value, dirty: true }))
      this.#notifyFormListeners()
    }
  }

  setFieldTouched(path: string): void {
    const field = this.#fields.get(path)
    if (field) {
      field.update(s => ({ ...s, touched: true }))
    }
  }

  setFieldError(path: string, error: string | null): void {
    const field = this.#fields.get(path)
    if (field) {
      field.update(s => ({ ...s, error, validating: false }))
    }
  }

  setFieldValidating(path: string, validating: boolean): void {
    const field = this.#fields.get(path)
    if (field) {
      field.update(s => ({ ...s, validating }))
    }
  }

  getValues(): Record<string, unknown> {
    const values: Record<string, unknown> = {}
    for (const [path, field] of this.#fields) {
      values[path] = field.get().value
    }
    return values
  }

  getErrors(): Record<string, string | null> {
    const errors: Record<string, string | null> = {}
    for (const [path, field] of this.#fields) {
      const error = field.get().error
      if (error) errors[path] = error
    }
    return errors
  }

  hasErrors(): boolean {
    for (const field of this.#fields.values()) {
      if (field.get().error) return true
    }
    return false
  }

  subscribeField(path: string, fn: Listener): () => void {
    const field = this.#fields.get(path)
    if (!field) return () => undefined
    return field.subscribe(fn)
  }

  getFieldSnapshot(path: string): () => FieldState | undefined {
    return () => this.#fields.get(path)?.getSnapshot()
  }

  subscribeForm(fn: Listener): () => void {
    this.#formListeners.add(fn)
    return () => this.#formListeners.delete(fn)
  }

  get submitting(): Observable<boolean> {
    return this.#submitting
  }

  get submitted(): Observable<boolean> {
    return this.#submitted
  }

  reset(defaultValues: Record<string, unknown>): void {
    for (const [path, field] of this.#fields) {
      field.set(makeDefaultFieldState(defaultValues[path] ?? ''))
    }
    this.#submitting.set(false)
    this.#submitted.set(false)
    this.#notifyFormListeners()
  }

  #notifyFormListeners(): void {
    for (const fn of this.#formListeners) fn()
  }
}
