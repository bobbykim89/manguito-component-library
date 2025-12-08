import type { Directive, DirectiveBinding } from 'vue'
import type {
  ClickOutsideElement,
  ClickOutsideHandler,
  ClickOutsideValue,
} from './index.types'

/**
 * Checks if the click target is outside the element
 */
const isClickOutside = (
  el: HTMLElement,
  target: EventTarget | null,
  excludeElements?: HTMLElement[],
): boolean => {
  if (!target || !(target instanceof Node)) {
    return false
  }
  // check if click is on the element itself or its children
  if (el === target || el.contains(target)) {
    return false
  }
  // check if click is on any excluded elements
  if (excludeElements?.length) {
    return !excludeElements.some(
      (excludedEl) => excludedEl === target || excludedEl.contains(target),
    )
  }
  return true
}

/**
 * Extracts handler and options from directive binding
 */
const getOptions = (
  binding: DirectiveBinding<ClickOutsideValue>,
): {
  handler: ClickOutsideHandler
  events: ('click' | 'mousedown' | 'touchstart')[]
  excludeElements?: HTMLElement[]
} => {
  if (typeof binding.value === 'function') {
    return {
      handler: binding.value,
      events: ['click'],
    }
  }
  return {
    handler: binding.value.handler,
    events: binding.value.events || ['click'],
    excludeElements: binding.value.excludeElements,
  }
}

/**
 * creates the event handler function
 */
const createHandler = (
  el: HTMLElement,
  handler: ClickOutsideHandler,
  excludeElements?: HTMLElement[],
): ((event: MouseEvent | TouchEvent) => void) => {
  return (event: MouseEvent | TouchEvent) => {
    if (isClickOutside(el, event.target, excludeElements)) {
      handler(event)
    }
  }
}

/**
 * Vue directive that triggers a callback when clicking outside an element
 *
 * @example
 * // Simple usage
 * <div v-click-outside="handleClickOutside">Content</div>
 *
 * @example
 * // With options
 * <div v-click-outside="{ handler: handleClickOutside, events: ['mousedown'] }">
 *   Content
 * </div>
 */

export const vClickOutside: Directive<ClickOutsideElement, ClickOutsideValue> =
  {
    mounted(el, binding) {
      const { handler, events, excludeElements } = getOptions(binding)
      // create and store the event handler
      el.__ClickOutsideHandler = createHandler(el, handler, excludeElements)
      // add listeners for all specivied events
      events.forEach((evtType) => {
        document.addEventListener(evtType, el.__ClickOutsideHandler!, true)
      })
    },
    updated(el, binding) {
      // remove old listeners
      if (el.__ClickOutsideHandler) {
        const oldOptions = getOptions({
          ...binding,
          value: binding.oldValue,
        } as DirectiveBinding<ClickOutsideValue>)
        oldOptions.events.forEach((evtType) => {
          document.removeEventListener(evtType, el.__ClickOutsideHandler!, true)
        })
      }
      // add new listeners
      const { handler, events, excludeElements } = getOptions(binding)
      el.__ClickOutsideHandler = createHandler(el, handler, excludeElements)

      events.forEach((evtType) => {
        document.addEventListener(evtType, el.__ClickOutsideHandler!, true)
      })
    },
    unmounted(el, binding) {
      if (el.__ClickOutsideHandler) {
        const { events } = getOptions(binding)
        events.forEach((evtType) => {
          document.removeEventListener(evtType, el.__ClickOutsideHandler!, true)
        })
        delete el.__ClickOutsideHandler
      }
    },
  }
