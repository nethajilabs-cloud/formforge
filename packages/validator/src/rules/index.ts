import type { FieldValidator } from '@formforges/core'

export const rules = {
  required(message = 'This field is required'): FieldValidator {
    return value => {
      if (!value && value !== 0 && value !== false) return message
      if (typeof value === 'string' && !value.trim()) return message
      return null
    }
  },

  email(message = 'Invalid email address'): FieldValidator {
    return value => {
      if (!value) return null
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(String(value)) ? null : message
    }
  },

  minLength(min: number, message?: string): FieldValidator {
    return value => {
      if (!value) return null
      const len = String(value).length
      return len >= min ? null : (message ?? `Minimum ${min} characters`)
    }
  },

  maxLength(max: number, message?: string): FieldValidator {
    return value => {
      if (!value) return null
      const len = String(value).length
      return len <= max ? null : (message ?? `Maximum ${max} characters`)
    }
  },

  min(min: number, message?: string): FieldValidator {
    return value => {
      if (value === '' || value === null || value === undefined) return null
      return Number(value) >= min ? null : (message ?? `Minimum value is ${min}`)
    }
  },

  max(max: number, message?: string): FieldValidator {
    return value => {
      if (value === '' || value === null || value === undefined) return null
      return Number(value) <= max ? null : (message ?? `Maximum value is ${max}`)
    }
  },

  pattern(regex: RegExp, message = 'Invalid format'): FieldValidator {
    return value => {
      if (!value) return null
      return regex.test(String(value)) ? null : message
    }
  },

  url(message = 'Invalid URL'): FieldValidator {
    return value => {
      if (!value) return null
      try {
        new URL(String(value))
        return null
      } catch {
        return message
      }
    }
  },

  oneOf(allowed: unknown[], message?: string): FieldValidator {
    return value => {
      return allowed.includes(value)
        ? null
        : (message ?? `Must be one of: ${allowed.join(', ')}`)
    }
  },
}
