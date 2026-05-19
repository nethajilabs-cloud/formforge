export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'textarea'
  | 'date'
  | 'array'
  | 'object'

export type FieldValidator = (
  value: unknown,
  values: FormValues
) => string | null | Promise<string | null>

export interface BaseFieldSchema {
  type: FieldType
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  defaultValue?: unknown
  showIf?: (values: FormValues) => boolean
  validate?: FieldValidator | FieldValidator[]
  group?: string
}

export interface TextFieldSchema extends BaseFieldSchema {
  type: 'text' | 'email' | 'password' | 'textarea'
  minLength?: number
  maxLength?: number
  pattern?: string
}

export interface NumberFieldSchema extends BaseFieldSchema {
  type: 'number'
  min?: number
  max?: number
  step?: number
}

export interface CheckboxFieldSchema extends BaseFieldSchema {
  type: 'checkbox'
}

export interface SelectFieldSchema extends BaseFieldSchema {
  type: 'select' | 'radio'
  options: ReadonlyArray<{ readonly value: string; readonly label: string }>
  multiple?: boolean
}

export interface DateFieldSchema extends BaseFieldSchema {
  type: 'date'
  min?: string
  max?: string
}

export interface ArrayFieldSchema extends BaseFieldSchema {
  type: 'array'
  items: FormSchema
  minItems?: number
  maxItems?: number
}

export interface ObjectFieldSchema extends BaseFieldSchema {
  type: 'object'
  fields: FormSchema
}

export type FieldSchema =
  | TextFieldSchema
  | NumberFieldSchema
  | CheckboxFieldSchema
  | SelectFieldSchema
  | DateFieldSchema
  | ArrayFieldSchema
  | ObjectFieldSchema

export type FormSchema = Record<string, FieldSchema>

export type FormValues = Record<string, unknown>

export type FormErrors = Record<string, string | null>
