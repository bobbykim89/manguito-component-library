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
 * Whether two bindings resolve to the same handler, events, and exclusions.
 * An object binding is a new object on every render, so compare its parts.
 */
const sameOptions = (
  a: ReturnType<typeof getOptions>,
  b: ReturnType<typeof getOptions>,
): boolean => {
  const sameList = <T>(x: T[] = [], y: T[] = []) =>
    x.length === y.length && x.every((item, i) => item === y[i])
  return (
    a.handler === b.handler &&
    sameList(a.events, b.events) &&
    sameList(a.excludeElements, b.excludeElements)
  )
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
      const oldOptions = getOptions({
        ...binding,
        value: binding.oldValue,
      } as DirectiveBinding<ClickOutsideValue>)
      // Re-adding moves our capture listener behind any registered since
      // mount (e.g. a focus trap's), which can then swallow the click (#104).
      if (
        el.__ClickOutsideHandler &&
        sameOptions(oldOptions, getOptions(binding))
      ) {
        return
      }
      // remove old listeners
      if (el.__ClickOutsideHandler) {
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
