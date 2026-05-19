import type { ReactNode } from 'react'
import { DocsSidebar } from '../_components/DocsSidebar'

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ paddingTop: '64px' }}>
      <DocsSidebar />
      <main className="flex-1 min-w-0 px-8 py-10 max-w-3xl docs-content">
        {children}
      </main>
    </div>
  )
}
