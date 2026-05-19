import { useMemo } from 'react'
import { FormContext } from '../context/FormContext.js'
import { getTheme } from '@formforges/themes'
import type { FormInstance } from '@formforges/core'
import type { ThemeName } from '@formforges/themes'

interface FormProviderProps {
  form: FormInstance
  formId?: string
  theme?: ThemeName
  autoLayout?: boolean
  responsive?: boolean
  children: React.ReactNode
}

let idCounter = 0

export function FormProvider({
  form,
  formId,
  theme: themeName = 'modern',
  autoLayout = true,
  responsive = true,
  children,
}: FormProviderProps) {
  const id = useMemo(() => formId ?? `formforge-${++idCounter}`, [formId])
  const themeTokens = useMemo(() => getTheme(themeName), [themeName])

  const value = useMemo(
    () => ({ form, formId: id, theme: themeTokens, themeName, autoLayout, responsive }),
    [form, id, themeTokens, themeName, autoLayout, responsive]
  )

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

import type React from 'react'
