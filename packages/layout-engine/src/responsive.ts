import type { Breakpoint } from './grid.js'

export interface ResponsiveConfig {
  breakpoint: Breakpoint
  columns: number
  gap: string
}

const BREAKPOINTS = {
  mobile: 0,
  tablet: 640,
  desktop: 1024,
} as const

export function detectBreakpoint(width: number): Breakpoint {
  if (width < BREAKPOINTS.tablet) return 'mobile'
  if (width < BREAKPOINTS.desktop) return 'tablet'
  return 'desktop'
}

export function getGridStyle(breakpoint: Breakpoint): React.CSSProperties {
  const columns = breakpoint === 'mobile' ? 1 : 2
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: breakpoint === 'mobile' ? '12px' : '16px',
    width: '100%',
  }
}

import type React from 'react'
