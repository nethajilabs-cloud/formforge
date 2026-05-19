import Link from 'next/link'

const nav = [
  {
    section: 'Getting Started',
    links: [
      { href: '/docs', label: 'Introduction' },
      { href: '/docs/quick-start', label: 'Quick Start' },
    ],
  },
  {
    section: 'Core Concepts',
    links: [
      { href: '/docs/schema', label: 'Schema' },
      { href: '/docs/validation', label: 'Validation' },
      { href: '/docs/themes', label: 'Themes' },
      { href: '/docs/accessibility', label: 'Accessibility' },
      { href: '/docs/headless', label: 'Headless Mode' },
    ],
  },
]

export function DocsSidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 px-5 py-10 sticky top-0 overflow-y-auto" style={{ top: '64px', height: 'calc(100vh - 64px)' }}>
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-sm">F</span>
        </div>
        <span className="font-semibold text-gray-900">FormForge</span>
      </Link>

      {nav.map(({ section, links }) => (
        <div key={section} className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {section}
          </p>
          <ul className="space-y-1 list-none p-0 m-0">
            {links.map(({ href, label }) => (
              <li key={href} className="list-none m-0">
                <Link
                  href={href}
                  className="block text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 px-2 py-1.5 rounded-md transition-colors no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}
