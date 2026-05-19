export default function Validation() {
  return (
    <div>
      <h1>Validation</h1>
      <p>FormForge validates on blur and on submit. Errors appear below each field after the user has touched it.</p>

      <h2>Built-in rules</h2>
      <pre>{`import { rules } from '@formforges/validator'

const schema = {
  email:    { type: 'email',    validate: rules.email() },
  username: { type: 'text',     validate: rules.minLength(3) },
  age:      { type: 'number',   validate: rules.min(18) },
  site:     { type: 'text',     validate: rules.url() },
  code:     { type: 'text',     validate: rules.pattern(/^[A-Z]{3}$/) },
}`}</pre>

      <h2>Rule reference</h2>
      <table>
        <thead>
          <tr><th>Rule</th><th>Usage</th><th>Description</th></tr>
        </thead>
        <tbody>
          {[
            ['required', 'rules.required()', 'Field must have a value'],
            ['email', 'rules.email()', 'Must be a valid email'],
            ['minLength', 'rules.minLength(8)', 'Minimum character count'],
            ['maxLength', 'rules.maxLength(100)', 'Maximum character count'],
            ['min', 'rules.min(0)', 'Minimum numeric value'],
            ['max', 'rules.max(999)', 'Maximum numeric value'],
            ['pattern', 'rules.pattern(/regex/)', 'Must match regex'],
            ['url', 'rules.url()', 'Must be a valid URL'],
            ['oneOf', "rules.oneOf(['a','b'])", 'Must be one of the values'],
          ].map(([rule, usage, desc]) => (
            <tr key={rule}>
              <td><code>{rule}</code></td>
              <td><code>{usage}</code></td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Custom message</h2>
      <pre>{`validate: rules.minLength(8, 'Password must be at least 8 characters')`}</pre>

      <h2>Multiple validators</h2>
      <pre>{`password: {
  type: 'password',
  validate: [
    rules.required(),
    rules.minLength(8),
    rules.pattern(/[A-Z]/, 'Must contain uppercase letter'),
    rules.pattern(/[0-9]/, 'Must contain a number'),
  ],
}`}</pre>

      <h2>Custom validator</h2>
      <pre>{`// Return error string or null
validate: (value, allValues) => {
  if (value !== allValues.password) {
    return 'Passwords do not match'
  }
  return null
}`}</pre>

      <h2>Async validation</h2>
      <pre>{`username: {
  type: 'text',
  validate: async (value) => {
    const res = await fetch(\`/api/check-username?q=\${value}\`)
    const { taken } = await res.json()
    return taken ? 'Username already taken' : null
  },
}`}</pre>

      <h2>Zod adapter</h2>
      <pre>{`import { zodValidator } from '@formforges/validator'
import { z } from 'zod'

const schema = {
  phone: {
    type: 'text',
    validate: zodValidator(
      z.string().regex(/^\+?[\d\s]{7,}$/, 'Invalid phone number')
    ),
  },
}`}</pre>
    </div>
  )
}
