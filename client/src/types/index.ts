import type { App } from 'vue'

export * from './portal'
export * from './vocab'
export type CustomModule = (ctx: App) => void
