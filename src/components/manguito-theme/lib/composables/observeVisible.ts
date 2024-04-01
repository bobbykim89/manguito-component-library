import { useMutationObserver } from '@vueuse/core'
import type { Ref } from 'vue'

export const observeVisibleAttr = (el: Ref, fn: (...args: any[]) => void) => {
  return useMutationObserver(
    el,
    (mutations) => {
      let changed: boolean = false
      for (let i = 0; i < mutations.length && !changed; i++) {
        const mutation = mutations[i]
        const mutationType = mutation.type
        const mutationAttr = mutation.attributeName
        const mutationTarget = mutation.target
        if (mutationType === 'attributes') {
          changed = true
        } else if (mutationAttr === 'visible') {
          changed = true
        }
        if (changed) {
          const visibleAttr =
            (mutationTarget as HTMLElement).getAttribute('visible') === 'true'
              ? true
              : false
          fn(visibleAttr)
        }
      }
    },
    { attributes: true }
  )
}
