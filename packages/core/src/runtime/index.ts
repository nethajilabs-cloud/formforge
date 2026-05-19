import { FormStore } from '../state/store.js'
import { EventBus } from '../events/index.js'
import { validateForm, validateField } from '../validation/index.js'
import { extractDefaultValues, evaluateShowIf } from '../schema/parser.js'
import type { FormSchema, FormValues } from '../schema/types.js'

export interface CreateFormOptions<TValues extends FormValues = FormValues> {
  schema: FormSchema
  defaultValues?: Partial<TValues>
  onSubmit?: (values: TValues) => void | Promise<void>
  onError?: (errors: Record<string, string>) => void
}

export interface FormInstance<TValues extends FormValues = FormValues> {
  store: FormStore
  events: EventBus
  schema: FormSchema
  getValues: () => TValues
  getErrors: () => Record<string, string | null>
  getVisibility: () => Record<string, boolean>
  setValue: (path: string, value: unknown) => void
  setTouched: (path: string) => void
  validateField: (path: string) => Promise<string | null>
  validate: () => Promise<boolean>
  submit: () => Promise<void>
  reset: () => void
}

export function createForm<TValues extends FormValues = FormValues>(
  options: CreateFormOptions<TValues>
): FormInstance<TValues> {
  const { schema, defaultValues = {}, onSubmit, onError } = options

  const store = new FormStore()
  const events = new EventBus()
  const baseDefaults = extractDefaultValues(schema)
  const mergedDefaults = { ...baseDefaults, ...defaultValues }

  for (const [path, value] of Object.entries(mergedDefaults)) {
    store.getOrCreate(path, value)
  }

  const instance: FormInstance<TValues> = {
    store,
    events,
    schema,

    getValues(): TValues {
      return store.getValues() as TValues
    },

    getErrors() {
      return store.getErrors()
    },

    getVisibility() {
      return evaluateShowIf(schema, store.getValues())
    },

    setValue(path, value) {
      store.setFieldValue(path, value)
      events.emit('field:change', { field: path, value })
    },

    setTouched(path) {
      store.setFieldTouched(path)
      events.emit('field:blur', { field: path })
    },

    async validateField(path) {
      events.emit('validation:start', { field: path })
      const error = await validateField(path, schema, store.getValues(), store)
      events.emit('validation:end', { field: path })
      return error
    },

    async validate() {
      events.emit('form:validate')
      const result = await validateForm(schema, store)
      return result.valid
    },

    async submit() {
      events.emit('form:submit')
      store.submitting.set(true)

      const result = await validateForm(schema, store)

      if (!result.valid) {
        store.submitting.set(false)
        onError?.(result.errors)
        return
      }

      try {
        await onSubmit?.(store.getValues() as TValues)
        store.submitted.set(true)
      } finally {
        store.submitting.set(false)
      }
    },

    reset() {
      store.reset(mergedDefaults)
      events.emit('form:reset')
    },
  }

  return instance
}
