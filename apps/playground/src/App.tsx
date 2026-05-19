import { useState, useCallback, useMemo } from 'react'
import { FormForge } from '@formforges/react'
import type { FormSchema } from '@formforges/core'
import type { ThemeName } from '@formforges/themes'
import { SchemaEditor } from './components/SchemaEditor.js'
import { SCHEMA_OPTIONS, DEFAULT_SCHEMA_TEXT } from './examples/basicSchema.js'

export function App() {
  const [schemaText, setSchemaText] = useState(DEFAULT_SCHEMA_TEXT)
  const [schema, setSchema] = useState<FormSchema>(
    JSON.parse(DEFAULT_SCHEMA_TEXT) as FormSchema
  )
  const [theme, setTheme] = useState<ThemeName>('modern')
  const [autoLayout, setAutoLayout] = useState(true)
  const [submittedValues, setSubmittedValues] = useState<unknown>(null)
  const [selectedExample, setSelectedExample] = useState('contact')

  const handleSchemaChange = useCallback(
    (raw: string, parsed: Record<string, unknown> | null) => {
      setSchemaText(raw)
      if (parsed) setSchema(parsed as FormSchema)
    },
    []
  )

  const handleExampleChange = useCallback((key: string) => {
    const option = SCHEMA_OPTIONS[key as keyof typeof SCHEMA_OPTIONS]
    if (!option) return
    setSelectedExample(key)
    const text = JSON.stringify(option.schema, null, 2)
    setSchemaText(text)
    setSchema(option.schema)
    setSubmittedValues(null)
  }, [])

  const formKey = useMemo(() => JSON.stringify(schema) + theme, [schema, theme])

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="font-semibold text-gray-900">FormForge</span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">playground</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Example picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Example:</span>
            <div className="flex gap-1">
              {Object.entries(SCHEMA_OPTIONS).map(([key, opt]) => (
                <button
                  key={key}
                  onClick={() => handleExampleChange(key)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    selectedExample === key
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-5 bg-gray-200" />

          {/* Theme picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Theme:</span>
            {(['modern', 'minimal', 'enterprise'] as ThemeName[]).map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-1 text-xs rounded-md capitalize transition-colors ${
                  theme === t
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-gray-200" />

          {/* Auto layout toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-gray-500">Auto Layout</span>
            <button
              role="switch"
              aria-checked={autoLayout}
              onClick={() => setAutoLayout(v => !v)}
              className={`relative w-8 h-4 rounded-full transition-colors ${autoLayout ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <span
                className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${autoLayout ? 'translate-x-4' : 'translate-x-0.5'}`}
              />
            </button>
          </label>
        </div>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Schema editor */}
        <div className="w-2/5 p-4 bg-gray-950">
          <SchemaEditor value={schemaText} onChange={handleSchemaChange} />
        </div>

        {/* Form preview */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-2xl mx-auto p-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <FormForge
                key={formKey}
                schema={schema}
                theme={theme}
                autoLayout={autoLayout}
                responsive
                submitLabel="Submit Form"
                onSubmit={async (values) => {
                  await new Promise(r => setTimeout(r, 600))
                  setSubmittedValues(values)
                }}
              />
            </div>

            {submittedValues && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-gray-700">Submitted values</span>
                </div>
                <pre className="bg-gray-900 text-green-400 text-xs font-mono p-4 rounded-lg overflow-auto">
                  {JSON.stringify(submittedValues, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
