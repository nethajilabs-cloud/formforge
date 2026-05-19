import { useFormContext } from '../context/FormContext.js'
import { analyzeSchema, computeGrid, getGridStyle } from '@formforges/layout-engine'
import { evaluateShowIf } from '@formforges/core'
import type { FormSchema } from '@formforges/core'
import { TextField } from '../fields/TextField.js'
import { SelectField } from '../fields/SelectField.js'
import { CheckboxField } from '../fields/CheckboxField.js'
import { ArrayField } from '../fields/ArrayField.js'

interface FormRendererProps {
  schema: FormSchema
  pathPrefix?: string
}

export function FormRenderer({ schema, pathPrefix = '' }: FormRendererProps) {
  const { form, autoLayout, responsive } = useFormContext()
  const values = form.getValues()
  const visibility = evaluateShowIf(schema, values)

  const hints = analyzeSchema(schema)
  const grid = computeGrid(hints, responsive ? 'desktop' : 'desktop')
  const gridStyle = autoLayout ? getGridStyle('desktop') : undefined

  return (
    <div style={gridStyle}>
      {Object.entries(schema).map(([key, fieldSchema]) => {
        if (!visibility[key]) return null

        const path = pathPrefix ? `${pathPrefix}.${key}` : key
        const placement = grid.find(g => g.key === key)
        const colStyle = placement && autoLayout
          ? { gridColumn: `span ${placement.colSpan}` }
          : undefined

        return (
          <div key={path} style={colStyle}>
            {renderField(key, fieldSchema)}
          </div>
        )
      })}
    </div>
  )
}

function renderField(key: string, schema: FormSchema[string]) {
  switch (schema.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'textarea':
      return <TextField key={key} fieldKey={key} schema={schema} />

    case 'select':
    case 'radio':
      return <SelectField key={key} fieldKey={key} schema={schema} />

    case 'checkbox':
      return <CheckboxField key={key} fieldKey={key} schema={schema} />

    case 'array':
      return <ArrayField key={key} fieldKey={key} schema={schema} />

    default:
      return <TextField key={key} fieldKey={key} schema={schema as unknown as Parameters<typeof TextField>[0]['schema']} />
  }
}
