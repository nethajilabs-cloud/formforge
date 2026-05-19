export interface ThemeTokens {
  colors: {
    primary: string
    primaryHover: string
    background: string
    surface: string
    border: string
    borderFocus: string
    text: string
    textMuted: string
    textPlaceholder: string
    error: string
    errorBackground: string
    success: string
  }
  radii: {
    sm: string
    md: string
    lg: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  font: {
    family: string
    sizeBase: string
    sizeSm: string
    weightNormal: string
    weightMedium: string
  }
  shadow: {
    sm: string
    focus: string
  }
}

export const modernTokens: ThemeTokens = {
  colors: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    background: '#ffffff',
    surface: '#f9fafb',
    border: '#e5e7eb',
    borderFocus: '#6366f1',
    text: '#111827',
    textMuted: '#6b7280',
    textPlaceholder: '#9ca3af',
    error: '#ef4444',
    errorBackground: '#fef2f2',
    success: '#22c55e',
  },
  radii: { sm: '4px', md: '8px', lg: '12px' },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  font: {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    sizeBase: '14px',
    sizeSm: '12px',
    weightNormal: '400',
    weightMedium: '500',
  },
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    focus: '0 0 0 3px rgb(99 102 241 / 0.2)',
  },
}

export const minimalTokens: ThemeTokens = {
  ...modernTokens,
  colors: {
    ...modernTokens.colors,
    primary: '#000000',
    primaryHover: '#1a1a1a',
    borderFocus: '#000000',
  },
  shadow: {
    sm: 'none',
    focus: '0 0 0 2px #000000',
  },
}

export const enterpriseTokens: ThemeTokens = {
  ...modernTokens,
  colors: {
    ...modernTokens.colors,
    primary: '#0f766e',
    primaryHover: '#0d6b63',
    borderFocus: '#0f766e',
  },
}
