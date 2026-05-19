import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'FormForge — Schema-first forms for React',
  description: 'Define your form in a config object. FormForge handles UI, validation, layout, accessibility, and themes automatically.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
