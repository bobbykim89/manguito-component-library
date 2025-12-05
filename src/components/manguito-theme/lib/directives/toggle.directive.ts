import type { Directive } from 'vue'
import type { ToggleElement } from './index.types'

/**
 * Extracts target ID from either href attribute or directive argument
 */
const getTargetId = (
  elem: HTMLElement,
  directiveArg?: string,
): string | null => {
  // if clicked element is an anchor tag, use href
  if (elem.tagName === 'A') {
    const href = elem.getAttribute('href')
    if (!href) return null
    // remove leading # if present
    return href.charAt(0) === '#' ? href.substring(1) : href
  }
  // otherwisse use directive argument
  return directiveArg || null
}

/**
 * Gets the target element to toggle
 */
const getTargetElem = (targetId: string | null): HTMLElement | null => {
  if (!targetId) return null
  return document.getElementById(targetId)
}

/**
 * Checks if element can be toggled (has visible attribute)
 */
const canToggle = (elem: HTMLElement): boolean => {
  return elem.hasAttribute('visible')
}

/**
 * Toggles the visible attribute between "true" and "false"
 */
const toggleVisibility = (elem: HTMLElement): void => {
  const currentVal = elem.getAttribute('visible')
  const newVal = currentVal === 'true' ? 'false' : 'true'
  elem.setAttribute('visible', newVal)
}

/**
 * Creates the click handler for the toggle directive
 */
const createToggleHandler = (
  directiveArg?: string,
): ((event: Event) => void) => {
  return (event: Event): void => {
    event.preventDefault()
    const clickedEvent = event.target as HTMLElement
    const targetId = getTargetId(clickedEvent, directiveArg)
    const targetElem = getTargetElem(targetId)

    // early return for invalid states
    if (!targetElem) {
      console.warn(`[v-toggle] Target element not found: ${targetId}`)
      return
    }
    if (!canToggle(targetElem)) {
      console.warn(
        `[v-toggle] Target element mission visible 'visible' attribute: ${targetId}`,
      )
      return
    }
    toggleVisibility(targetElem)
  }
}

/**
 * Vue directive for toggling visibility of elements via the 'visible' attribute
 *
 * Used internally by Modal and Sidebar components to control their visibility state.
 *
 * @example
 * // With directive argument
 * <button v-toggle:myModal>Open Modal</button>
 * <div id="myModal" visible="false">Modal content</div>
 *
 * @example
 * // With anchor tag href
 * <a href="#mySidebar" v-toggle>Toggle Sidebar</a>
 * <aside id="mySidebar" visible="false">Sidebar content</aside>
 *
 * @internal
 */
export const vToggle: Directive<ToggleElement> = {
  mounted(el, binding) {
    el.__ClickToggleHandler = createToggleHandler(binding.arg)
    el.addEventListener('click', el.__ClickToggleHandler)
  },
  unmounted(el) {
    if (el.__ClickToggleHandler) {
      el.removeEventListener('click', el.__ClickToggleHandler)
      delete el.__ClickToggleHandler
    }
  },
}
