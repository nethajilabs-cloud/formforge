export * from './tokens/index.js'
export * from './components/index.js'

export type ThemeName = 'modern' | 'minimal' | 'glass' | 'enterprise'

import { modernTokens, minimalTokens, enterpriseTokens } from './tokens/index.js'
import type { ThemeTokens } from './tokens/index.js'

export const themes: Record<string, ThemeTokens> = {
  modern: modernTokens,
  minimal: minimalTokens,
  enterprise: enterpriseTokens,
}

export function getTheme(name: string): ThemeTokens {
  return themes[name] ?? modernTokens
}
