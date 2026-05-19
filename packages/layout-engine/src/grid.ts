import type { FieldLayoutHint, FieldDensity } from './analyzer.js'

export type Breakpoint = 'mobile' | 'tablet' | 'desktop'

export interface GridConfig {
  columns: number
  gap: string
}

export interface FieldGridPlacement {
  key: string
  colSpan: number
  totalColumns: number
  group: string | undefined
}

const BREAKPOINT_COLUMNS: Record<Breakpoint, number> = {
  mobile: 1,
  tablet: 2,
  desktop: 2,
}

function resolveColSpan(density: FieldDensity, totalColumns: number): number {
  if (totalColumns === 1) return 1
  switch (density) {
    case 'full': return totalColumns
    case 'half': return Math.ceil(totalColumns / 2)
    case 'third': return Math.ceil(totalColumns / 3)
    case 'auto': return Math.ceil(totalColumns / 2)
  }
}

export function computeGrid(
  hints: FieldLayoutHint[],
  breakpoint: Breakpoint = 'desktop'
): FieldGridPlacement[] {
  const totalColumns = BREAKPOINT_COLUMNS[breakpoint]

  return hints.map(hint => ({
    key: hint.key,
    colSpan: resolveColSpan(hint.colSpan, totalColumns),
    totalColumns,
    group: hint.group,
  }))
}

export function gridPlacementToStyle(placement: FieldGridPlacement): React.CSSProperties {
  return {
    gridColumn: `span ${placement.colSpan}`,
  }
}

import type React from 'react'
