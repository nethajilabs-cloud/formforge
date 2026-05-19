export type KeyHandler = (e: KeyboardEvent) => void

export function onKey(key: string, handler: KeyHandler): KeyHandler {
  return (e: KeyboardEvent) => {
    if (e.key === key) handler(e)
  }
}

export function onEnterOrSpace(handler: KeyHandler): KeyHandler {
  return (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handler(e)
    }
  }
}
