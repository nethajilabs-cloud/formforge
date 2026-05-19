export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  return Array.from(container.querySelectorAll<HTMLElement>(selector))
}

export function focusFirstError(formEl: HTMLElement): void {
  const invalid = formEl.querySelector<HTMLElement>('[aria-invalid="true"]')
  invalid?.focus()
}

export function trapFocus(container: HTMLElement): () => void {
  const focusable = getFocusableElements(container)
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown)
  return () => container.removeEventListener('keydown', handleKeyDown)
}
