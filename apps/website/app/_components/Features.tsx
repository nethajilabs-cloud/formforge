const features = [
  {
    icon: '⚡',
    color: '#f59e0b',
    bg: '#fffbeb',
    title: 'Zero Config UI',
    desc: 'Drop in a schema and get a fully-rendered form with labels, inputs, error states, and submit handling — no code required.',
  },
  {
    icon: '✅',
    color: '#10b981',
    bg: '#f0fdf4',
    title: 'Smart Validation',
    desc: 'Built-in rules for email, URL, regex, min/max, and more. Async validators and Zod adapter included out of the box.',
  },
  {
    icon: '🎨',
    color: '#6366f1',
    bg: '#eef2ff',
    title: '3 Built-in Themes',
    desc: 'Choose from Modern, Minimal, or Enterprise themes — or build your own with a clean token system.',
  },
  {
    icon: '♿',
    color: '#8b5cf6',
    bg: '#f5f3ff',
    title: 'Accessibility First',
    desc: 'aria-required, aria-invalid, aria-describedby, role="alert", focus management — all automatic.',
  },
  {
    icon: '🔌',
    color: '#06b6d4',
    bg: '#ecfeff',
    title: 'Headless Mode',
    desc: "Use useFormForge, useField, or createForm() to build completely custom UI with FormForge's engine.",
  },
  {
    icon: '📦',
    color: '#ec4899',
    bg: '#fdf2f8',
    title: 'Tiny Bundle',
    desc: 'Tree-shakeable ESM packages. Import only what you use. Core runtime is under 4kb gzipped.',
  },
]

export function Features() {
  return (
    <section style={{ background: '#fafafa', padding: '100px 0' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything you need</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            FormForge ships with a complete set of primitives for building production-grade forms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card-hover bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: f.bg }}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
