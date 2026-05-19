import { describe, it, expect } from 'vitest'
import {
  modernTokens,
  minimalTokens,
  enterpriseTokens,
} from '../../packages/themes/src/tokens/index.js'
import { getTheme, themes } from '../../packages/themes/src/index.js'

// ─── token shapes ─────────────────────────────────────────────────────────────

const REQUIRED_COLOR_KEYS = [
  'primary', 'primaryHover', 'background', 'surface', 'border',
  'borderFocus', 'text', 'textMuted', 'textPlaceholder',
  'error', 'errorBackground', 'success',
]

function assertValidTokens(tokens: typeof modernTokens, name: string) {
  describe(`${name} token shape`, () => {
    it('has all required color keys', () => {
      for (const key of REQUIRED_COLOR_KEYS) {
        expect(tokens.colors).toHaveProperty(key)
        expect(typeof tokens.colors[key as keyof typeof tokens.colors]).toBe('string')
      }
    })

    it('has radii tokens', () => {
      expect(tokens.radii).toHaveProperty('sm')
      expect(tokens.radii).toHaveProperty('md')
      expect(tokens.radii).toHaveProperty('lg')
    })

    it('has spacing tokens', () => {
      expect(tokens.spacing).toHaveProperty('xs')
      expect(tokens.spacing).toHaveProperty('sm')
      expect(tokens.spacing).toHaveProperty('md')
      expect(tokens.spacing).toHaveProperty('lg')
      expect(tokens.spacing).toHaveProperty('xl')
    })

    it('has font tokens', () => {
      expect(tokens.font).toHaveProperty('family')
      expect(tokens.font).toHaveProperty('sizeBase')
      expect(tokens.font).toHaveProperty('sizeSm')
      expect(tokens.font).toHaveProperty('weightNormal')
      expect(tokens.font).toHaveProperty('weightMedium')
    })

    it('has shadow tokens', () => {
      expect(tokens.shadow).toHaveProperty('sm')
      expect(tokens.shadow).toHaveProperty('focus')
    })
  })
}

assertValidTokens(modernTokens, 'modern')
assertValidTokens(minimalTokens, 'minimal')
assertValidTokens(enterpriseTokens, 'enterprise')

// ─── theme differentiation ────────────────────────────────────────────────────

describe('theme differentiation', () => {
  it('modern and minimal have different primary colors', () => {
    expect(modernTokens.colors.primary).not.toBe(minimalTokens.colors.primary)
  })

  it('modern and enterprise have different primary colors', () => {
    expect(modernTokens.colors.primary).not.toBe(enterpriseTokens.colors.primary)
  })
})

// ─── getTheme ─────────────────────────────────────────────────────────────────

describe('getTheme', () => {
  it('returns modernTokens for "modern"', () => {
    expect(getTheme('modern')).toBe(modernTokens)
  })

  it('returns minimalTokens for "minimal"', () => {
    expect(getTheme('minimal')).toBe(minimalTokens)
  })

  it('returns enterpriseTokens for "enterprise"', () => {
    expect(getTheme('enterprise')).toBe(enterpriseTokens)
  })

  it('falls back to modern for unknown theme name', () => {
    expect(getTheme('nonexistent')).toBe(modernTokens)
  })
})

// ─── themes registry ──────────────────────────────────────────────────────────

describe('themes registry', () => {
  it('includes modern, minimal, enterprise', () => {
    expect(themes).toHaveProperty('modern')
    expect(themes).toHaveProperty('minimal')
    expect(themes).toHaveProperty('enterprise')
  })
})
