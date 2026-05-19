import type { FieldType } from '../schema/types.js'

export interface FieldRendererMeta {
  type: FieldType
  component: unknown
}

export class FieldRegistry {
  #renderers = new Map<FieldType, unknown>()

  register(type: FieldType, component: unknown): void {
    this.#renderers.set(type, component)
  }

  get(type: FieldType): unknown | undefined {
    return this.#renderers.get(type)
  }

  has(type: FieldType): boolean {
    return this.#renderers.has(type)
  }

  getAll(): Map<FieldType, unknown> {
    return new Map(this.#renderers)
  }
}

export const defaultRegistry = new FieldRegistry()
