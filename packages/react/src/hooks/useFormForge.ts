import { useSyncExternalStore, useCallback, useRef } from 'react'
import { createForm } from '@formforges/core'
import type { CreateFormOptions, FormInstance, FormValues } from '@formforges/core'

export interface UseFormForgeReturn<TValues extends FormValues = FormValues> {
  form: FormInstance<TValues>
  values: TValues
  errors: Record<string, string | null>
  isSubmitting: boolean
  isSubmitted: boolean
  submit: () => Promise<void>
  reset: () => void
}

export function useFormForge<TValues extends FormValues = FormValues>(
  options: CreateFormOptions<TValues>
): UseFormForgeReturn<TValues> {
  const formRef = useRef<FormInstance<TValues> | null>(null)
  if (!formRef.current) {
    formRef.current = createForm(options)
  }
  const form = formRef.current

  const values = useSyncExternalStore(
    useCallback(fn => form.store.subscribeForm(fn), [form]),
    useCallback(() => form.getValues(), [form]),
    useCallback(() => form.getValues(), [form])
  )

  const isSubmitting = useSyncExternalStore(
    useCallback(fn => form.store.submitting.subscribe(fn), [form]),
    useCallback(() => form.store.submitting.getSnapshot(), [form]),
    useCallback(() => false, [])
  )

  const isSubmitted = useSyncExternalStore(
    useCallback(fn => form.store.submitted.subscribe(fn), [form]),
    useCallback(() => form.store.submitted.getSnapshot(), [form]),
    useCallback(() => false, [])
  )

  return {
    form,
    values,
    errors: form.getErrors(),
    isSubmitting,
    isSubmitted,
    submit: form.submit,
    reset: form.reset,
  }
}
