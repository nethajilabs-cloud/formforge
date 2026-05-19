export default function Headless() {
  return (
    <div>
      <h1>Headless Mode</h1>
      <p>
        Use FormForge's hooks and engine without any built-in UI.
        Full control over rendering — bring your own components.
      </p>

      <h2>useFormForge</h2>
      <pre>{`import { useFormForge } from '@formforges/react'
import { FormProvider, FormRenderer } from '@formforges/react'

function MyForm() {
  const { form, values, errors, isSubmitting, submit, reset } = useFormForge({
    schema,
    defaultValues: { email: '' },
    onSubmit: async (values) => {
      await fetch('/api/submit', { method: 'POST', body: JSON.stringify(values) })
    },
  })

  return (
    <FormProvider form={form}>
      <FormRenderer schema={schema} />

      <div className="flex gap-3 mt-4">
        <button onClick={submit} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
        <button onClick={reset} type="button">
          Reset
        </button>
      </div>

      <pre>{JSON.stringify(values, null, 2)}</pre>
    </FormProvider>
  )
}`}</pre>

      <h2>useField — custom field component</h2>
      <pre>{`import { useField } from '@formforges/react'

function StarRating({ fieldKey }: { fieldKey: string }) {
  const { value, error, touched, onChange, onBlur } = useField(fieldKey)

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onBlur={onBlur}
          style={{ color: Number(value) >= star ? 'gold' : 'gray' }}
        >
          ★
        </button>
      ))}
      {touched && error && <p>{error}</p>}
    </div>
  )
}`}</pre>

      <h2>createForm — no React</h2>
      <pre>{`import { createForm } from '@formforges/core'

const form = createForm({
  schema,
  onSubmit: async (values) => console.log(values),
})

// Subscribe to a single field
const unsub = form.store.subscribeField('email', () => {
  console.log('email changed:', form.store.getFieldState('email')?.value)
})

form.setValue('email', 'test@example.com')
await form.validate()
await form.submit()
form.reset()
unsub()`}</pre>

      <h2>useFormForge return values</h2>
      <table>
        <thead>
          <tr><th>Property</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          {[
            ['form', 'FormInstance', 'Raw form instance'],
            ['values', 'TValues', 'Current field values (reactive)'],
            ['errors', 'Record<string, string | null>', 'Current errors'],
            ['isSubmitting', 'boolean', 'Submit in progress'],
            ['isSubmitted', 'boolean', 'Submitted successfully'],
            ['submit', '() => Promise<void>', 'Trigger validation + submit'],
            ['reset', '() => void', 'Reset to default values'],
          ].map(([prop, type, desc]) => (
            <tr key={prop}>
              <td><code>{prop}</code></td>
              <td><code>{type}</code></td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
