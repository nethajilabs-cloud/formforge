export default function QuickStart() {
  return (
    <div>
      <h1>Quick Start</h1>
      <p>Get a form running in under 2 minutes.</p>

      <h2>Install</h2>
      <pre>{`npm install @formforges/react @formforges/core`}</pre>

      <h2>Define a schema</h2>
      <pre>{`const schema = {
  name:    { type: 'text',  label: 'Full Name', required: true },
  email:   { type: 'email', label: 'Email',     required: true },
  message: { type: 'textarea', label: 'Message' },
}`}</pre>

      <h2>Render the form</h2>
      <pre>{`import { FormForge } from '@formforges/react'

export function ContactForm() {
  return (
    <FormForge
      schema={schema}
      onSubmit={async (values) => {
        console.log(values)
      }}
    />
  )
}`}</pre>

      <p>That's it. FormForge handles layout, validation, accessibility, and state automatically.</p>

      <h2>Options</h2>
      <table>
        <thead>
          <tr><th>Prop</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
          {[
            ['schema', '—', 'Form schema (required)'],
            ['theme', '"modern"', 'modern | minimal | enterprise'],
            ['autoLayout', 'true', 'Auto responsive 2-column grid'],
            ['responsive', 'true', 'Collapse to 1 column on mobile'],
            ['submitLabel', '"Submit"', 'Submit button text'],
            ['showSubmit', 'true', 'Show/hide submit button'],
            ['defaultValues', '{}', 'Initial field values'],
            ['onSubmit', '—', 'Called with values when valid'],
            ['onError', '—', 'Called with errors when invalid'],
          ].map(([prop, def, desc]) => (
            <tr key={prop}>
              <td><code>{prop}</code></td>
              <td><code>{def}</code></td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>With default values</h2>
      <pre>{`<FormForge
  schema={schema}
  defaultValues={{ name: 'Alice', email: 'alice@example.com' }}
  onSubmit={async (values) => console.log(values)}
/>`}</pre>

      <h2>Theme variants</h2>
      <pre>{`<FormForge schema={schema} theme="modern" />
<FormForge schema={schema} theme="minimal" />
<FormForge schema={schema} theme="enterprise" />`}</pre>
    </div>
  )
}
