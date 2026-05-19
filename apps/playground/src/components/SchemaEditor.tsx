import { useState, useCallback } from 'react'

interface SchemaEditorProps {
  value: string
  onChange: (value: string, parsed: Record<string, unknown> | null) => void
}

export function SchemaEditor({ value, onChange }: SchemaEditorProps) {
  const [error, setError] = useState<string | null>(null)

  const handleChange = useCallback(
    (raw: string) => {
      try {
        const parsed = JSON.parse(raw) as Record<string, unknown>
        setError(null)
        onChange(raw, parsed)
      } catch {
        setError('Invalid JSON')
        onChange(raw, null)
      }
    },
    [onChange]
  )

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 rounded-t-lg">
        <span className="text-xs text-gray-400 font-mono">schema.json</span>
        {error && (
          <span className="text-xs text-red-400">{error}</span>
        )}
      </div>
      <textarea
        value={value}
        onChange={e => handleChange(e.target.value)}
        className="flex-1 bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-b-lg resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
        spellCheck={false}
      />
    </div>
  )
}
