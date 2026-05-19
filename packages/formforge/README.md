# formforges

**Schema-first form infrastructure for React.**  
Define your form in a plain config object. FormForge handles UI, validation, layout, accessibility, and themes — automatically.

[![npm](https://img.shields.io/npm/v/formforges)](https://www.npmjs.com/package/formforges)
[![license](https://img.shields.io/badge/license-MIT-blue)](#license)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

**[Website & Docs →](https://formforge-website.vercel.app)**

---

## Install

```bash
npm install formforges
# or
pnpm add formforges
# or
yarn add formforges
```

---

## Quick Start

```tsx
import { FormForge } from 'formforges'

const schema = {
  name:    { type: 'text',     label: 'Full Name', required: true },
  email:   { type: 'email',    label: 'Email',     required: true },
  role:    { type: 'select',   label: 'Role',
    options: [
      { value: 'dev',      label: 'Developer' },
      { value: 'designer', label: 'Designer'  },
    ],
  },
  bio:     { type: 'textarea', label: 'Bio' },
}

export function MyForm() {
  return (
    <FormForge
      schema={schema}
      theme="modern"
      onSubmit={async (values) => {
        await fetch('/api/submit', { method: 'POST', body: JSON.stringify(values) })
      }}
    />
  )
}
```

That's it — fully rendered, validated, accessible, responsive form.

---

## Features

| | Feature |
|---|---|
| ⚡ | **Zero config UI** — labels, inputs, errors, submit — all automatic |
| 📐 | **Smart layout** — 2-column grid, collapses to 1 column on mobile |
| ✅ | **Validation** — built-in rules, async validators, Zod adapter |
| 🎨 | **3 Themes** — `modern`, `minimal`, `enterprise` — fully token-based |
| ♿ | **Accessibility** — `aria-required`, `aria-invalid`, `role="alert"`, focus management |
| 🔌 | **Headless mode** — `useFormForge`, `useField`, `createForm()` |
| 📦 | **Tiny** — tree-shakeable ESM, field-level subscriptions |
| 🔷 | **TypeScript-first** — strict types, full schema inference |

---

## Field Types

```ts
const schema = {
  // Text
  name:     { type: 'text' },
  email:    { type: 'email' },
  password: { type: 'password' },
  age:      { type: 'number', min: 18, max: 99 },
  bio:      { type: 'textarea' },
  dob:      { type: 'date' },

  // Choice
  agree:   { type: 'checkbox', label: 'I agree' },
  role:    { type: 'radio',  options: [{ value: 'admin', label: 'Admin' }] },
  country: { type: 'select', options: [{ value: 'us',    label: 'USA'   }] },

  // Conditional
  state: { type: 'text', showIf: (values) => values.country === 'us' },

  // Complex
  links:   { type: 'array',  items:  { url: { type: 'text' } } },
  address: { type: 'object', fields: { street: { type: 'text' }, city: { type: 'text' } } },
}
```

---

## Themes

```tsx
<FormForge schema={schema} theme="modern"     />  {/* Indigo, rounded, subtle shadows */}
<FormForge schema={schema} theme="minimal"    />  {/* Black, sharp, no shadows        */}
<FormForge schema={schema} theme="enterprise" />  {/* Teal, professional, dense        */}
```

Custom theme:

```ts
import { modernTokens } from 'formforges'

const myTheme = {
  ...modernTokens,
  colors: { ...modernTokens.colors, primary: '#f59e0b' },
}
```

---

## Validation

```ts
import { rules } from 'formforges'

const schema = {
  email:    { type: 'email',    validate: rules.email() },
  username: { type: 'text',     validate: rules.minLength(3) },
  password: { type: 'password', validate: [
    rules.required(),
    rules.minLength(8),
    rules.pattern(/[A-Z]/, 'Must contain uppercase'),
  ]},
  // Async
  handle: {
    type: 'text',
    validate: async (value) => {
      const { taken } = await fetch(`/api/check?q=${value}`).then(r => r.json())
      return taken ? 'Already taken' : null
    },
  },
}
```

Zod adapter:

```ts
import { zodValidator } from 'formforges'
import { z } from 'zod'

validate: zodValidator(z.string().email())
```

---

## Headless Mode

```tsx
import { useFormForge, useField } from 'formforges'

// Full form control
function MyForm() {
  const { values, errors, isSubmitting, submit, reset } = useFormForge({
    schema,
    onSubmit: async (values) => { /* ... */ },
  })

  return (
    <form>
      {/* your own UI */}
      <button onClick={submit} disabled={isSubmitting}>Save</button>
      <button onClick={reset} type="button">Reset</button>
    </form>
  )
}

// Custom field
function StarRating({ fieldKey }: { fieldKey: string }) {
  const { value, error, touched, onChange } = useField(fieldKey)

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)}
                style={{ color: Number(value) >= star ? 'gold' : 'gray' }}>★</button>
      ))}
      {touched && error && <p>{error}</p>}
    </div>
  )
}
```

---

## Packages

`formforges` includes everything. Individual packages are also available:

| Package | Description |
|---|---|
| `formforges` | **All-in-one** (recommended) |
| `@formforges/react` | React renderer + hooks |
| `@formforges/core` | Framework-agnostic engine |
| `@formforges/validator` | Validation rules + Zod |
| `@formforges/themes` | Token-based themes |
| `@formforges/layout-engine` | Auto responsive grid |
| `@formforges/accessibility` | ARIA + focus + keyboard |

---

## Links

- **Website & Docs** — [formforge-website.vercel.app](https://formforge-website.vercel.app)
- **npm** — [npmjs.com/package/formforges](https://www.npmjs.com/package/formforges)
- **GitHub** — [github.com/nethajilabs-cloud/formforge](https://github.com/nethajilabs-cloud/formforge)

---

## License

MIT © 2025 FormForge
