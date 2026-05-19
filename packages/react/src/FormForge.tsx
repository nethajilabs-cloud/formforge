import { useRef, useId } from 'react'
import { createForm } from '@formforges/core'
import { FormProvider } from './providers/FormProvider.js'
import { FormRenderer } from './renderer/FormRenderer.js'
import { buttonStyles } from '@formforges/themes'
import { useFormContext } from './context/FormContext.js'
import type { CreateFormOptions, FormSchema, FormValues } from '@formforges/core'
import type { ThemeName } from '@formforges/themes'

export interface FormForgeProps<TValues extends FormValues = FormValues>
  extends Omit<CreateFormOptions<TValues>, 'schema'> {
  schema: FormSchema
  theme?: ThemeName
  autoLayout?: boolean
  responsive?: boolean
  submitLabel?: string
  showSubmit?: boolean
  className?: string
}

export function FormForge<TValues extends FormValues = FormValues>({
  schema,
  theme = 'modern',
  autoLayout = true,
  responsive = true,
  submitLabel = 'Submit',
  showSubmit = true,
  className,
  defaultValues,
  onSubmit,
  onError,
}: FormForgeProps<TValues>) {
  const formRef = useRef<ReturnType<typeof createForm> | null>(null)
  if (!formRef.current) {
    formRef.current = createForm({ schema, defaultValues, onSubmit, onError })
  }

  const formId = useId()

  return (
    <FormProvider
      form={formRef.current}
      formId={formId}
      theme={theme}
      autoLayout={autoLayout}
      responsive={responsive}
    >
      <FormInner
        schema={schema}
        submitLabel={submitLabel}
        showSubmit={showSubmit}
        {...(className !== undefined ? { className } : {})}
      />
    </FormProvider>
  )
}

interface FormInnerProps {
  schema: FormSchema
  submitLabel: string
  showSubmit: boolean
  className?: string
}

function FormInner({ schema, submitLabel, showSubmit, className }: FormInnerProps) {
  const { form, theme } = useFormContext()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await form.submit()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={className}>
      <FormRenderer schema={schema} />
      {showSubmit && (
        <div className="mt-6">
          <button type="submit" className={buttonStyles(theme, 'primary')}>
            {submitLabel}
          </button>
        </div>
      )}
    </form>
  )
}

import type React from 'react'
