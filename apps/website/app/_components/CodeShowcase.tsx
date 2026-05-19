export function CodeShowcase() {
  return (
    <section style={{ background: '#ffffff', padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            A schema. A complete form.
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            No JSX. No event handlers. No state management. Just a config object.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Code side */}
          <div className="animate-slide-left">
            <div className="code-block shadow-xl">
              <div
                className="flex items-center gap-1.5 px-4 py-3 border-b"
                style={{ borderColor: '#21262d' }}
              >
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-slate-500">ContactForm.tsx</span>
              </div>
              <pre className="text-sm">
                <code className="text-slate-300">
                  {'import { '}
                  <span className="token-type">FormForge</span>
                  {' } from '}
                  <span className="token-string">&apos;@formforges/react&apos;</span>
                  {'\n\nconst schema = {\n  firstName: { type: '}
                  <span className="token-string">&apos;text&apos;</span>
                  {',  label: '}
                  <span className="token-string">&apos;First Name&apos;</span>
                  {', required: '}
                  <span className="token-value">true</span>
                  {' },\n  lastName:  { type: '}
                  <span className="token-string">&apos;text&apos;</span>
                  {',  label: '}
                  <span className="token-string">&apos;Last Name&apos;</span>
                  {',  required: '}
                  <span className="token-value">true</span>
                  {' },\n  email:     { type: '}
                  <span className="token-string">&apos;email&apos;</span>
                  {', label: '}
                  <span className="token-string">&apos;Email&apos;</span>
                  {',      required: '}
                  <span className="token-value">true</span>
                  {' },\n  message:   { type: '}
                  <span className="token-string">&apos;textarea&apos;</span>
                  {', label: '}
                  <span className="token-string">&apos;Message&apos;</span>
                  {' },\n}\n\nexport function ContactForm() {\n  return (\n    <'}
                  <span className="token-type">FormForge</span>
                  {'\n      schema={schema}\n      theme='}
                  <span className="token-string">&quot;modern&quot;</span>
                  {'\n      onSubmit={async (values) => {\n        await sendContact(values)\n      }}\n    />\n  )\n}'}
                </code>
              </pre>
            </div>
          </div>

          {/* Form mockup side */}
          <div className="animate-fade-up">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
              <div className="flex gap-4 mb-5">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    readOnly
                    value="Jane"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-50 outline-none focus:border-indigo-400"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    readOnly
                    value="Doe"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-50 outline-none"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  readOnly
                  value="jane@example.com"
                  className="w-full px-3 py-2 border border-indigo-400 rounded-lg text-sm text-slate-700 bg-slate-50 outline-none"
                  style={{ boxShadow: '0 0 0 3px rgba(99,102,241,0.1)' }}
                />
              </div>
              <div className="mb-6">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Message</label>
                <textarea
                  readOnly
                  value="Hello! I love this library."
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-50 outline-none resize-none"
                />
              </div>
              <button
                className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
              >
                Submit
              </button>
              <div className="flex items-center gap-2 mt-4 text-xs text-slate-400 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Auto-layout · ARIA labels · Error handling included
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
