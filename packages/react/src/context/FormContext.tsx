import { createContext, useContext } from 'react'
import type { FormInstance } from '@formforges/core'
import type { ThemeTokens } from '@formforges/themes'
import type { ThemeName } from '@formforges/themes'

export interface FormContextValue {
  form: FormInstance
  formId: string
  theme: ThemeTokens
  themeName: ThemeName
  autoLayout: boolean
  responsive: boolean
}

export const FormContext = createContext<FormContextValue | null>(null)

export function useFormContext(): FormContextValue {
  const ctx = useContext(FormContext)
  if (!ctx) {
    throw new Error('useFormContext must be used inside <FormForge />')
  }
  return ctx
}
