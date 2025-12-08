/**
 * Callback function type for visibility changes
 */
export type VisibilityCallback = (visible: boolean) => void

/**
 * Return type with stop function
 */
export interface ObserverControl {
  stop: () => void
}
