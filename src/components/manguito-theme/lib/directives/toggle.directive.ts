import type { Directive } from 'vue'
import type { ToggleElement } from './index.types'
import {
  getTargetElem,
  getTargetId,
  hasVisibleAttr,
  toggleVisibility,
} from './shared.fn'

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
    if (!hasVisibleAttr(targetElem)) {
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
