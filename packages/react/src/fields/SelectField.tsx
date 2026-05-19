import { useField } from '../hooks/useField.js'
import { useFormContext } from '../context/FormContext.js'
import { buildAriaProps, fieldId } from '@formforges/accessibility'
import { inputStyles, labelStyles, errorStyles } from '@formforges/themes'
import type { SelectFieldSchema } from '@formforges/core'

interface SelectFieldProps {
  fieldKey: string
  schema: SelectFieldSchema
}

export function SelectField({ fieldKey, schema }: SelectFieldProps) {
  const { formId, theme } = useFormContext()
  const { value, error, touched, onChange, onBlur } = useField(fieldKey)

  const id = fieldId(formId, fieldKey)
  const showError = touched && !!error
  const ariaProps = buildAriaProps(id, {
    label: schema.label,
    required: schema.required,
    error: showError ? error : null,
  })

  if (schema.type === 'radio') {
    return (
      <fieldset className="formforge-field">
        <legend className={labelStyles(theme)}>
          {schema.label}
          {schema.required && <span aria-hidden="true"> *</span>}
        </legend>
        <div className="space-y-2">
          {schema.options.map(opt => (
            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name={id}
                value={opt.value}
                checked={value === opt.value}
                disabled={schema.disabled}
                onChange={() => onChange(opt.value)}
                onBlur={onBlur}
                className="text-indigo-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {showError && (
          <p className={errorStyles(theme)} role="alert">{error}</p>
        )}
      </fieldset>
    )
  }

  return (
    <div className="formforge-field">
      {schema.label && (
        <label htmlFor={id} className={labelStyles(theme)}>
          {schema.label}
          {schema.required && <span aria-hidden="true"> *</span>}
        </label>
      )}
      <select
        {...ariaProps}
        value={String(value ?? '')}
        disabled={schema.disabled}
        multiple={schema.multiple}
        className={inputStyles(theme, showError)}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
      >
        <option value="">
          {schema.placeholder ?? 'Select an option'}
        </option>
        {schema.options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {showError && (
        <p id={`${id}-error`} className={errorStyles(theme)} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
