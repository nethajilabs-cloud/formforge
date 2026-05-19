import { useField } from '../hooks/useField.js'
import { useFormContext } from '../context/FormContext.js'
import { labelStyles, errorStyles, buttonStyles } from '@formforges/themes'
import type { ArrayFieldSchema, FormSchema } from '@formforges/core'
import { FormRenderer } from '../renderer/FormRenderer.js'

interface ArrayFieldProps {
  fieldKey: string
  schema: ArrayFieldSchema
}

export function ArrayField({ fieldKey, schema }: ArrayFieldProps) {
  const { theme } = useFormContext()
  const { value, error, touched, onChange } = useField(fieldKey)

  const items = Array.isArray(value) ? value as FormSchema[] : []
  const showError = touched && !!error
  const canAdd = !schema.maxItems || items.length < schema.maxItems
  const canRemove = !schema.minItems || items.length > schema.minItems

  function addItem() {
    onChange([...items, {}])
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className="formforge-array-field col-span-full">
      {schema.label && (
        <div className="flex items-center justify-between mb-3">
          <span className={labelStyles(theme)}>
            {schema.label}
            {schema.required && <span aria-hidden="true"> *</span>}
          </span>
          {canAdd && (
            <button
              type="button"
              className={buttonStyles(theme, 'secondary')}
              onClick={addItem}
            >
              + Add
            </button>
          )}
        </div>
      )}

      <div className="space-y-4">
        {items.map((_item, index) => (
          <div key={index} className="relative border border-gray-200 rounded-lg p-4">
            <FormRenderer
              schema={schema.items}
              pathPrefix={`${fieldKey}[${index}]`}
            />
            {canRemove && (
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => removeItem(index)}
                aria-label={`Remove item ${index + 1}`}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-6 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
          No items yet.{' '}
          {canAdd && (
            <button type="button" className="text-indigo-500 hover:underline" onClick={addItem}>
              Add one
            </button>
          )}
        </div>
      )}

      {showError && (
        <p className={errorStyles(theme)} role="alert">{error}</p>
      )}
    </div>
  )
}
