export default function Schema() {
  return (
    <div>
      <h1>Schema</h1>
      <p>
        A FormForge schema is a plain JavaScript object where each key is a field name
        and each value describes that field.
      </p>

      <h2>Field types</h2>
      <table>
        <thead>
          <tr><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          {[
            ['text', 'Single-line text input'],
            ['email', 'Email input with format validation'],
            ['password', 'Password input (masked)'],
            ['number', 'Numeric input with min/max'],
            ['textarea', 'Multi-line text input (full width)'],
            ['date', 'Date picker'],
            ['checkbox', 'Boolean toggle (full width)'],
            ['radio', 'Option group (full width)'],
            ['select', 'Dropdown selection'],
            ['array', 'Repeatable list of fields'],
            ['object', 'Nested group of fields'],
          ].map(([type, desc]) => (
            <tr key={type}><td><code>{type}</code></td><td>{desc}</td></tr>
          ))}
        </tbody>
      </table>

      <h2>Common field options</h2>
      <pre>{`{
  type: 'text',          // field type (required)
  label: 'Full Name',   // displayed label
  placeholder: 'John',  // input placeholder
  required: true,        // marks field required
  disabled: false,       // disables the field
  defaultValue: '',      // initial value
  group: 'personal',    // manual group hint for layout
  showIf: (values) =>   // conditional visibility
    values.role === 'admin',
  validate: rules.minLength(3),  // custom validation
}`}</pre>

      <h2>Text fields</h2>
      <pre>{`email:    { type: 'email',    label: 'Email' },
password: { type: 'password', label: 'Password', minLength: 8 },
bio:      { type: 'textarea', label: 'Bio' },`}</pre>

      <h2>Number</h2>
      <pre>{`age: {
  type: 'number',
  label: 'Age',
  min: 18,
  max: 99,
  step: 1,
}`}</pre>

      <h2>Select & Radio</h2>
      <pre>{`country: {
  type: 'select',
  label: 'Country',
  options: [
    { value: 'us', label: 'United States' },
    { value: 'in', label: 'India' },
    { value: 'gb', label: 'United Kingdom' },
  ],
},

role: {
  type: 'radio',
  label: 'Role',
  options: [
    { value: 'admin', label: 'Admin' },
    { value: 'user',  label: 'User' },
  ],
},`}</pre>

      <h2>Conditional fields</h2>
      <pre>{`state: {
  type: 'text',
  label: 'State',
  showIf: (values) => values.country === 'us',
},`}</pre>

      <h2>Array (repeater)</h2>
      <pre>{`links: {
  type: 'array',
  label: 'Social Links',
  minItems: 1,
  maxItems: 5,
  items: {
    platform: {
      type: 'select',
      label: 'Platform',
      options: [
        { value: 'twitter', label: 'Twitter' },
        { value: 'linkedin', label: 'LinkedIn' },
      ],
    },
    url: { type: 'text', label: 'URL' },
  },
},`}</pre>

      <h2>Nested object</h2>
      <pre>{`address: {
  type: 'object',
  label: 'Address',
  fields: {
    street:  { type: 'text', label: 'Street' },
    city:    { type: 'text', label: 'City' },
    country: { type: 'text', label: 'Country' },
  },
},`}</pre>
    </div>
  )
}
