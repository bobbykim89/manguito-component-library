import { useMutationObserver } from '@vueuse/core'
import type { Ref } from 'vue'
import { ObserverControl, VisibilityCallback } from './index.types'

/**
 * Parses the visible attribute value to boolean
 */
const parseVisibleAttribute = (elem: HTMLElement): boolean => {
  return elem.getAttribute('visible') === 'true'
}

/**
 * Checks if mutation is a change to the visible attribute
 */
const isVisibleAttributeChange = (mutation: MutationRecord): boolean => {
  return mutation.type === 'attributes' && mutation.attributeName === 'visible'
}

/**
 * Observes changes to the 'visible' attribute on an element and executes a callback
 *
 * Uses MutationObserver to watch for attribute changes and converts the string
 * value ('true'/'false') to a boolean for the callback.
 *
 * @param el - Template ref to the element to observe
 * @param callback - Function called when visible attribute changes, receives boolean
 * @returns Observer control object with stop() method, or undefined if el is invalid
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
 * import { observeVisibleAttr } from '@bobbykim/manguito-theme'
 *
 * const elementRef = ref<HTMLElement>()
 * const isVisible = ref(false)
 *
 * observeVisibleAttr(elementRef, (visible) => {
 *   isVisible.value = visible
 * })
 * </script>
 *
 * <template>
 *   <div ref="elementRef" :visible="isVisible">
 *     Content
 *   </div>
 * </template>
 * ```
 *
 * @internal
 */

export const observeVisibleAttr = (
  el: Ref<HTMLElement | undefined>,
  callback: VisibilityCallback,
): ObserverControl | undefined => {
  return useMutationObserver(
    el,
    (mutations) => {
      // find the first mutation that affects the visible attribute
      const visibleMutation = mutations.find(isVisibleAttributeChange)
      if (!visibleMutation) {
        return
      }
      // parse and exec callback w/ boolean value
      const target = visibleMutation.target as HTMLElement
      const isVisible = parseVisibleAttribute(target)
      callback(isVisible)
    },
    {
      attributes: true,
      attributeFilter: ['visible'], // only watch the visible attribute
    },
  )
}

// export const observeVisibleAttr = (el: Ref, fn: (...args: any[]) => void) => {
//   return useMutationObserver(
//     el,
//     (mutations) => {
//       let changed: boolean = false
//       for (let i = 0; i < mutations.length && !changed; i++) {
//         const mutation = mutations[i]
//         const mutationType = mutation.type
//         const mutationAttr = mutation.attributeName
//         const mutationTarget = mutation.target
//         if (mutationType === 'attributes') {
//           changed = true
//         } else if (mutationAttr === 'visible') {
//           changed = true
//         }
//         if (changed) {
//           const visibleAttr =
//             (mutationTarget as HTMLElement).getAttribute('visible') === 'true'
//               ? true
//               : false
//           fn(visibleAttr)
//         }
//       }
//     },
//     { attributes: true },
//   )
// }
