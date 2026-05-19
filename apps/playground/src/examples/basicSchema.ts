import type { FormSchema } from '@formforges/core'

export const contactSchema: FormSchema = {
  firstName: {
    type: 'text',
    label: 'First Name',
    placeholder: 'John',
    required: true,
    group: 'name',
  },
  lastName: {
    type: 'text',
    label: 'Last Name',
    placeholder: 'Doe',
    required: true,
    group: 'name',
  },
  email: {
    type: 'email',
    label: 'Email Address',
    placeholder: 'john@example.com',
    required: true,
  },
  phone: {
    type: 'text',
    label: 'Phone Number',
    placeholder: '+1 (555) 000-0000',
  },
  country: {
    type: 'select',
    label: 'Country',
    required: true,
    options: [
      { value: 'us', label: 'United States' },
      { value: 'gb', label: 'United Kingdom' },
      { value: 'in', label: 'India' },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia' },
    ],
  },
  message: {
    type: 'textarea',
    label: 'Message',
    placeholder: 'Tell us what you think...',
    required: true,
  },
  newsletter: {
    type: 'checkbox',
    label: 'Subscribe to newsletter',
    defaultValue: false,
  },
}

export const signupSchema: FormSchema = {
  username: {
    type: 'text',
    label: 'Username',
    placeholder: 'cooluser123',
    required: true,
  },
  email: {
    type: 'email',
    label: 'Email',
    placeholder: 'you@example.com',
    required: true,
  },
  password: {
    type: 'password',
    label: 'Password',
    placeholder: '••••••••',
    required: true,
  },
  role: {
    type: 'radio',
    label: 'Role',
    required: true,
    options: [
      { value: 'developer', label: 'Developer' },
      { value: 'designer', label: 'Designer' },
      { value: 'manager', label: 'Product Manager' },
    ],
  },
  agreeToTerms: {
    type: 'checkbox',
    label: 'I agree to the Terms of Service',
    required: true,
  },
}

export const SCHEMA_OPTIONS = {
  contact: { label: 'Contact Form', schema: contactSchema },
  signup: { label: 'Sign Up Form', schema: signupSchema },
}

export const DEFAULT_SCHEMA_TEXT = JSON.stringify(contactSchema, null, 2)
