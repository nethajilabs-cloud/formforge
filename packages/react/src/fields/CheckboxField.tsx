import { useField } from '../hooks/useField.js'
import { useFormContext } from '../context/FormContext.js'
import { fieldId } from '@formforges/accessibility'
import { errorStyles } from '@formforges/themes'
import type { CheckboxFieldSchema } from '@formforges/core'

interface CheckboxFieldProps {
  fieldKey: string
  schema: CheckboxFieldSchema
}

export function CheckboxField({ fieldKey, schema }: CheckboxFieldProps) {
  const { formId, theme } = useFormContext()
  const { value, error, touched, onChange, onBlur } = useField(fieldKey)

  const id = fieldId(formId, fieldKey)
  const showError = touched && !!error

  return (
    <div className="formforge-field">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={Boolean(value)}
          disabled={schema.disabled}
          aria-required={schema.required}
          aria-invalid={showError}
          className="rounded text-indigo-600 focus:ring-indigo-500"
          onChange={e => onChange(e.target.checked)}
          onBlur={onBlur}
        />
        {schema.label}
        {schema.required && <span aria-hidden="true"> *</span>}
      </label>
      {showError && (
        <p className={errorStyles(theme)} role="alert">{error}</p>
      )}
    </div>
  )
}
