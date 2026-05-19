export interface AriaFieldProps {
  id: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-required'?: boolean
  'aria-invalid'?: boolean
  'aria-errormessage'?: string
}

export function buildAriaProps(
  fieldId: string,
  options: {
    label?: string
    required?: boolean
    error?: string | null
    description?: string
  }
): AriaFieldProps {
  const props: AriaFieldProps = { id: fieldId }

  if (options.required) props['aria-required'] = true
  if (options.error) {
    props['aria-invalid'] = true
    props['aria-errormessage'] = `${fieldId}-error`
  }
  if (options.description) {
    props['aria-describedby'] = `${fieldId}-description`
  }

  return props
}

export function fieldId(formId: string, fieldPath: string): string {
  return `${formId}-${fieldPath.replace(/\./g, '-')}`
}
