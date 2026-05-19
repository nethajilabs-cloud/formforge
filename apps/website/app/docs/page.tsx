import Link from 'next/link'

export default function DocsHome() {
  return (
    <div>
      <div className="mb-6">
        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          v0.1.1
        </span>
      </div>

      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>FormForge</h1>
      <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '2rem', lineHeight: 1.75 }}>
        Modern schema-first form infrastructure for React.
        Build beautiful forms with almost no setup.
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem 1.25rem', borderRadius: '8px', fontSize: '0.875rem', marginBottom: '2rem' }}>
        {`npm install formforges\n\n<FormForge schema={schema} />`}
      </pre>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2rem 0' }} />

      <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>Why FormForge?</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[
          ['Schema-driven', 'define your form once, get layout, validation, and accessibility for free'],
          ['Auto layout', 'smart 2-column grid, collapses to 1 column on mobile automatically'],
          ['Zero boilerplate', 'no field-by-field wiring, no manual state management'],
          ['TypeScript-first', 'strict types throughout, full inference'],
          ['Headless', 'use the hooks, bring your own UI'],
          ['Minimal rerenders', 'field-level subscriptions via useSyncExternalStore'],
        ].map(([bold, rest]) => (
          <li key={bold} style={{ lineHeight: 1.75, marginBottom: '0.25rem', color: '#374151' }}>
            <strong>{bold}</strong> — {rest}
          </li>
        ))}
      </ul>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2rem 0' }} />

      <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>Packages</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', borderBottom: '2px solid #e5e7eb', fontWeight: 600 }}>Package</th>
            <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', borderBottom: '2px solid #e5e7eb', fontWeight: 600 }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['formforges', 'All-in-one umbrella package'],
            ['@formforges/core', 'Framework-agnostic form engine'],
            ['@formforges/react', 'React renderer + hooks'],
            ['@formforges/validator', 'Validation rules + Zod adapter'],
            ['@formforges/layout-engine', 'Auto responsive grid'],
            ['@formforges/themes', 'Token-based theme system'],
            ['@formforges/accessibility', 'ARIA + focus + keyboard'],
          ].map(([pkg, desc]) => (
            <tr key={pkg}>
              <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                <code style={{ background: '#f1f5f9', color: '#6366f1', padding: '0.15em 0.4em', borderRadius: '4px', fontSize: '0.875em' }}>{pkg}</code>
              </td>
              <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #f3f4f6', color: '#374151' }}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <Link
          href="/docs/quick-start"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#6366f1', color: '#fff', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          Get Started →
        </Link>
        <a
          href="https://github.com/nethajilabs-cloud/formforge"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #d1d5db', color: '#374151', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
        >
          GitHub
        </a>
      </div>
    </div>
  )
}
