import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className="mb-6">
        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          v0.1.1
        </span>
      </div>

      <h1>FormForge</h1>
      <p className="text-xl text-gray-500 mb-8">
        Modern schema-first form infrastructure for React.
        Build beautiful forms with almost no setup.
      </p>

      <pre>{`<FormForge schema={schema} />`}</pre>

      <hr />

      <h2>Why FormForge?</h2>
      <ul>
        <li><strong>Schema-driven</strong> — define your form once, get layout, validation, and accessibility for free</li>
        <li><strong>Auto layout</strong> — smart 2-column grid, collapses to 1 column on mobile automatically</li>
        <li><strong>Zero boilerplate</strong> — no field-by-field wiring, no manual state management</li>
        <li><strong>TypeScript-first</strong> — strict types throughout, full inference</li>
        <li><strong>Headless</strong> — use the hooks, bring your own UI</li>
        <li><strong>Minimal rerenders</strong> — field-level subscriptions via <code>useSyncExternalStore</code></li>
      </ul>

      <hr />

      <h2>Packages</h2>
      <table>
        <thead>
          <tr><th>Package</th><th>Description</th></tr>
        </thead>
        <tbody>
          {[
            ['@formforges/core', 'Framework-agnostic form engine'],
            ['@formforges/react', 'React renderer + hooks'],
            ['@formforges/validator', 'Validation rules + Zod adapter'],
            ['@formforges/layout-engine', 'Auto responsive grid'],
            ['@formforges/themes', 'Token-based theme system'],
            ['@formforges/accessibility', 'ARIA + focus + keyboard'],
          ].map(([pkg, desc]) => (
            <tr key={pkg}>
              <td><code>{pkg}</code></td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <div className="flex gap-4 mt-8">
        <Link
          href="/docs/quick-start"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors no-underline"
        >
          Get Started →
        </Link>
        <a
          href="https://github.com/nethajilabs-cloud/formforge"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors no-underline"
        >
          GitHub
        </a>
      </div>
    </div>
  )
}
