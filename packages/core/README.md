# FormForge

Modern schema-first form infrastructure for React applications.

> Build beautiful forms with almost no setup.

```tsx
<FormForge schema={schema} />
```

---

## Packages

| Package | Version | Description |
|---|---|---|
| [`@formforges/core`](./packages/core) | 0.1.0 | Framework-agnostic form engine |
| [`@formforges/react`](./packages/react) | 0.1.0 | React renderer + hooks |
| [`@formforges/validator`](./packages/validator) | 0.1.0 | Validation rules + Zod adapter |
| [`@formforges/layout-engine`](./packages/layout-engine) | 0.1.0 | Auto responsive grid layout |
| [`@formforges/accessibility`](./packages/accessibility) | 0.1.0 | ARIA + focus + keyboard |
| [`@formforges/themes`](./packages/themes) | 0.1.0 | Token-based theme system |
| [`@formforges/shared`](./packages/shared) | 0.1.0 | Shared utilities |
| [`@formforges/devtools`](./packages/devtools) | 0.1.0 | Developer tools |

---

## Quick Start

```bash
npm install @formforges/react @formforges/core
```

```tsx
import { FormForge } from '@formforges/react'

const schema = {
  firstName: { type: 'text',  label: 'First Name', required: true },
  lastName:  { type: 'text',  label: 'Last Name',  required: true },
  email:     { type: 'email', label: 'Email',       required: true },
  message:   { type: 'textarea', label: 'Message' },
}

export function App() {
  return (
    <FormForge
      schema={schema}
      theme="modern"
      autoLayout
      onSubmit={async (values) => {
        console.log(values)
      }}
    />
  )
}
```

---

## Features

- **Schema-driven** — define your form once, render anywhere
- **Auto layout** — smart 2-column grid, collapses to 1 on mobile
- **Validation** — built-in rules, Zod adapter, async support
- **Accessibility** — ARIA, focus management, keyboard nav — automatic
- **Themes** — `modern`, `minimal`, `enterprise` out of the box
- **Headless** — use hooks only, bring your own UI
- **TypeScript-first** — strict types throughout
- **SSR ready** — works with Next.js and React Server Components
- **Minimal rerenders** — field-level subscriptions via `useSyncExternalStore`

---

## Schema

```ts
const schema = {
  // Text inputs
  name:     { type: 'text',     label: 'Name',     required: true },
  email:    { type: 'email',    label: 'Email',     required: true },
  password: { type: 'password', label: 'Password'                  },
  bio:      { type: 'textarea', label: 'Bio'                       },

  // Number
  age: { type: 'number', label: 'Age', min: 18, max: 99 },

  // Date
  dob: { type: 'date', label: 'Date of Birth' },

  // Select & Radio
  country: {
    type: 'select',
    label: 'Country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'in', label: 'India' },
    ],
  },

  // Checkbox
  agree: { type: 'checkbox', label: 'I agree to the terms', required: true },

  // Conditional field
  state: {
    type: 'text',
    label: 'State',
    showIf: (values) => values.country === 'us',
  },

  // Array / repeater
  links: {
    type: 'array',
    label: 'Links',
    items: {
      url: { type: 'url', label: 'URL' },
    },
  },
}
```

---

## Validation

```ts
import { rules } from '@formforges/validator'
import { zodValidator } from '@formforges/validator'
import { z } from 'zod'

const schema = {
  email: {
    type: 'email',
    validate: rules.email(),
  },
  password: {
    type: 'password',
    validate: [
      rules.required(),
      rules.minLength(8),
    ],
  },
  username: {
    type: 'text',
    // async validation
    validate: async (value) => {
      const taken = await checkUsernameTaken(value)
      return taken ? 'Username already taken' : null
    },
  },
  // Zod schema adapter
  phone: {
    type: 'text',
    validate: zodValidator(z.string().regex(/^\+?[\d\s]{7,}$/, 'Invalid phone')),
  },
}
```

### Built-in rules

| Rule | Usage |
|---|---|
| `required` | `rules.required()` |
| `email` | `rules.email()` |
| `minLength` | `rules.minLength(8)` |
| `maxLength` | `rules.maxLength(100)` |
| `min` | `rules.min(0)` |
| `max` | `rules.max(999)` |
| `pattern` | `rules.pattern(/regex/)` |
| `url` | `rules.url()` |
| `oneOf` | `rules.oneOf(['a', 'b'])` |

---

## Themes

```tsx
<FormForge schema={schema} theme="modern" />
<FormForge schema={schema} theme="minimal" />
<FormForge schema={schema} theme="enterprise" />
```

---

## Headless Mode

Full control over rendering — use hooks only:

```tsx
import { FormProvider, FormRenderer, useFormForge } from '@formforges/react'

function MyForm() {
  const { form, values, errors, isSubmitting, submit } = useFormForge({
    schema,
    onSubmit: async (values) => console.log(values),
  })

  return (
    <FormProvider form={form}>
      <FormRenderer schema={schema} />
      <button onClick={submit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </FormProvider>
  )
}
```

### `useField` — per-field access

```tsx
import { useField } from '@formforges/react'

function CustomEmailField() {
  const { value, error, touched, onChange, onBlur } = useField('email')

  return (
    <div>
      <input
        type="email"
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {touched && error && <p>{error}</p>}
    </div>
  )
}
```

---

## Layout Engine

FormForge automatically detects field density and builds a responsive grid:

| Field type | Default width |
|---|---|
| `text`, `email`, `password`, `select`, `date` | half (2-column grid) |
| `textarea`, `array`, `object`, `checkbox`, `radio` | full width |

Address fields (`street`, `city`, `zip`, etc.) are auto-grouped. Name fields (`firstName`, `lastName`) are placed side-by-side.

Disable auto layout:
```tsx
<FormForge schema={schema} autoLayout={false} />
```

---

## `createForm` — framework-agnostic

```ts
import { createForm } from '@formforges/core'

const form = createForm({
  schema,
  defaultValues: { email: '' },
  onSubmit: async (values) => console.log(values),
  onError: (errors) => console.error(errors),
})

form.setValue('email', 'user@example.com')
form.validate()
form.submit()
form.reset()
```

---

## Development

```bash
# Clone
git clone https://github.com/nethajilabs-cloud/formforge.git
cd formforge

# Install
pnpm install

# Build all packages
pnpm build

# Run tests (246 tests)
pnpm test

# Start playground
pnpm playground
```

### Project structure

```
formforge/
├── apps/
│   ├── playground/     # Vite + React live demo
│   └── docs/           # Next.js documentation
├── packages/
│   ├── core/           # Framework-agnostic engine
│   ├── react/          # React renderer + hooks
│   ├── validator/      # Validation rules + Zod
│   ├── themes/         # Token-based themes
│   ├── layout-engine/  # Auto responsive grid
│   ├── accessibility/  # ARIA + focus management
│   ├── shared/         # Shared utilities
│   └── devtools/       # Developer tools
└── tests/              # 246 tests across 12 files
```

---

## License

MIT
