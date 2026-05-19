import { describe, it, expect } from 'vitest'
import { computeGrid } from '../../packages/layout-engine/src/grid.js'
import { detectBreakpoint, getGridStyle } from '../../packages/layout-engine/src/responsive.js'
import type { FieldLayoutHint } from '../../packages/layout-engine/src/analyzer.js'

function makeHint(overrides: Partial<FieldLayoutHint> = {}): FieldLayoutHint {
  return {
    key: 'field',
    colSpan: 'half',
    group: undefined,
    priority: 0,
    ...overrides,
  }
}

// ─── computeGrid ─────────────────────────────────────────────────────────────

describe('computeGrid', () => {
  it('returns one placement per hint', () => {
    const hints = [makeHint({ key: 'a' }), makeHint({ key: 'b' })]
    expect(computeGrid(hints)).toHaveLength(2)
  })

  it('preserves field key', () => {
    const placements = computeGrid([makeHint({ key: 'email' })])
    expect(placements[0]?.key).toBe('email')
  })

  it('full-width field spans all columns on desktop', () => {
    const placements = computeGrid([makeHint({ colSpan: 'full' })], 'desktop')
    expect(placements[0]?.colSpan).toBe(placements[0]?.totalColumns)
  })

  it('half field spans 1 column on mobile (single column layout)', () => {
    const placements = computeGrid([makeHint({ colSpan: 'half' })], 'mobile')
    expect(placements[0]?.colSpan).toBe(1)
    expect(placements[0]?.totalColumns).toBe(1)
  })

  it('half field spans 1 of 2 columns on desktop', () => {
    const placements = computeGrid([makeHint({ colSpan: 'half' })], 'desktop')
    expect(placements[0]?.colSpan).toBe(1)
    expect(placements[0]?.totalColumns).toBe(2)
  })

  it('preserves group', () => {
    const placements = computeGrid([makeHint({ group: 'address' })])
    expect(placements[0]?.group).toBe('address')
  })

  it('returns empty array for empty hints', () => {
    expect(computeGrid([])).toEqual([])
  })
})

// ─── detectBreakpoint ────────────────────────────────────────────────────────

describe('detectBreakpoint', () => {
  it('returns mobile below 640px', () => {
    expect(detectBreakpoint(0)).toBe('mobile')
    expect(detectBreakpoint(320)).toBe('mobile')
    expect(detectBreakpoint(639)).toBe('mobile')
  })

  it('returns tablet between 640px and 1023px', () => {
    expect(detectBreakpoint(640)).toBe('tablet')
    expect(detectBreakpoint(768)).toBe('tablet')
    expect(detectBreakpoint(1023)).toBe('tablet')
  })

  it('returns desktop at 1024px and above', () => {
    expect(detectBreakpoint(1024)).toBe('desktop')
    expect(detectBreakpoint(1440)).toBe('desktop')
    expect(detectBreakpoint(1920)).toBe('desktop')
  })
})

// ─── getGridStyle ─────────────────────────────────────────────────────────────

describe('getGridStyle', () => {
  it('returns display:grid for all breakpoints', () => {
    expect(getGridStyle('mobile').display).toBe('grid')
    expect(getGridStyle('tablet').display).toBe('grid')
    expect(getGridStyle('desktop').display).toBe('grid')
  })

  it('uses 1 column on mobile', () => {
    const style = getGridStyle('mobile')
    expect(style.gridTemplateColumns).toContain('repeat(1')
  })

  it('uses 2 columns on tablet and desktop', () => {
    expect(getGridStyle('tablet').gridTemplateColumns).toContain('repeat(2')
    expect(getGridStyle('desktop').gridTemplateColumns).toContain('repeat(2')
  })

  it('uses smaller gap on mobile', () => {
    const mobileGap = getGridStyle('mobile').gap
    const desktopGap = getGridStyle('desktop').gap
    expect(mobileGap).not.toBe(desktopGap)
  })
})
