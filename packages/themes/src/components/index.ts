import type { ThemeTokens } from '../tokens/index.js'

export function inputStyles(_tokens: ThemeTokens, hasError: boolean): string {
  return [
    'block w-full px-3 py-2',
    'border rounded-md',
    'text-sm transition-colors duration-150',
    'focus:outline-none',
    hasError
      ? 'border-red-400 bg-red-50 focus:border-red-400'
      : 'border-gray-300 bg-white focus:border-indigo-500',
    'placeholder:text-gray-400',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' ')
}

export function labelStyles(_tokens: ThemeTokens): string {
  return 'block text-sm font-medium text-gray-700 mb-1'
}

export function errorStyles(_tokens: ThemeTokens): string {
  return 'mt-1 text-xs text-red-500'
}

export function buttonStyles(_tokens: ThemeTokens, variant: 'primary' | 'secondary' = 'primary'): string {
  const base = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2'
  if (variant === 'primary') {
    return `${base} bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500`
  }
  return `${base} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500`
}
