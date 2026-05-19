import { useSyncExternalStore, useCallback } from 'react'
import type { FieldState } from '@formforges/core'
import { useFormContext } from '../context/FormContext.js'

export interface UseFieldReturn {
  value: unknown
  error: string | null
  touched: boolean
  dirty: boolean
  validating: boolean
  onChange: (value: unknown) => void
  onBlur: () => void
}

const DEFAULT_FIELD_STATE: FieldState = {
  value: '',
  error: null,
  touched: false,
  dirty: false,
  validating: false,
}

export function useField(path: string): UseFieldReturn {
  const { form } = useFormContext()

  const subscribe = useCallback(
    (fn: () => void) => form.store.subscribeField(path, fn),
    [form, path]
  )

  const getSnapshot = useCallback(
    () => form.store.getFieldState(path) ?? DEFAULT_FIELD_STATE,
    [form, path]
  )

  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const onChange = useCallback(
    (value: unknown) => form.setValue(path, value),
    [form, path]
  )

  const onBlur = useCallback(
    () => {
      form.setTouched(path)
      void form.validateField(path)
    },
    [form, path]
  )

  return {
    value: state.value,
    error: state.error,
    touched: state.touched,
    dirty: state.dirty,
    validating: state.validating,
    onChange,
    onBlur,
  }
}
