import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Sidebar } from './_components/Sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'FormForge Docs',
  description: 'Modern schema-first form infrastructure for React',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 min-w-0 px-8 py-10 max-w-3xl">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
