import { useField } from '../hooks/useField.js'
import { buildAriaProps, fieldId } from '@formforges/accessibility'
import { inputStyles, labelStyles, errorStyles } from '@formforges/themes'
import { useFormContext } from '../context/FormContext.js'
import type { TextFieldSchema } from '@formforges/core'

interface TextFieldProps {
  fieldKey: string
  schema: TextFieldSchema
}

export function TextField({ fieldKey, schema }: TextFieldProps) {
  const { formId, theme } = useFormContext()
  const { value, error, touched, onChange, onBlur } = useField(fieldKey)

  const id = fieldId(formId, fieldKey)
  const showError = touched && !!error
  const ariaProps = buildAriaProps(id, {
    label: schema.label,
    required: schema.required,
    error: showError ? error : null,
  })

  return (
    <div className="formforge-field">
      {schema.label && (
        <label htmlFor={id} className={labelStyles(theme)}>
          {schema.label}
          {schema.required && <span aria-hidden="true"> *</span>}
        </label>
      )}

      {schema.type === 'textarea' ? (
        <textarea
          {...ariaProps}
          value={String(value ?? '')}
          placeholder={schema.placeholder}
          disabled={schema.disabled}
          className={inputStyles(theme, showError)}
          rows={4}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
        />
      ) : (
        <input
          {...ariaProps}
          type={schema.type}
          value={String(value ?? '')}
          placeholder={schema.placeholder}
          disabled={schema.disabled}
          maxLength={schema.maxLength}
          minLength={schema.minLength}
          pattern={schema.pattern}
          className={inputStyles(theme, showError)}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
        />
      )}

      {showError && (
        <p id={`${id}-error`} className={errorStyles(theme)} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

