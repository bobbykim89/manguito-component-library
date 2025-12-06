import type { Directive } from 'vue'
import type { CollapseElement } from './index.types'
import {
  getTargetElem,
  getTargetId,
  hasVisibleAttr,
  toggleVisibility,
} from './shared.fn'

/**
 * Gets all accordion items with the same accordion name
 */
const getAccordionItems = (accordionName: string): HTMLElement[] => {
  const selector = `div[accordion="${accordionName}"]`
  return Array.from(document.querySelectorAll<HTMLElement>(selector))
}

/**
 * Handles accordion behavior - closes other items and toggles current
 */
const handleAccordionToggle = (
  targetElem: HTMLElement,
  accordionName: string,
): void => {
  const accordionItems = getAccordionItems(accordionName)

  accordionItems.forEach((item) => {
    if (item.id === targetElem.id) {
      // toggle clicked item
      toggleVisibility(item)
    } else if (item.getAttribute('visible') === 'true') {
      // close other open item
      item.setAttribute('visible', 'false')
    }
  })
}

/**
 * Handles simple collapse behavior (non-accordion)
 */
const handleSimpleCollapse = (targetElem: HTMLElement): void => {
  toggleVisibility(targetElem)
}

/**
 * Creates the click handler for the collapse directive
 */
const createCollapseHandler = (
  directiveArg?: string,
): ((evnet: Event) => void) => {
  return (event: Event): void => {
    event.preventDefault()
    const clickedElem = event.target as HTMLElement
    const targetId = getTargetId(clickedElem, directiveArg)
    const targetElem = getTargetElem(targetId)

    // validate target element
    if (!targetElem) {
      console.warn(`[v-collapse] Target element not found: ${targetId}`)
      return
    }
    if (!hasVisibleAttr(targetElem)) {
      console.warn(
        `[v-collapse] Target element missing 'visible' attribute: ${targetId}`,
      )
      return
    }
    // check if this is part of an accordion group
    const accordionName = targetElem.getAttribute('accordion')
    if (accordionName) {
      // accordion mode: close others, toggle current
      handleAccordionToggle(targetElem, accordionName)
    } else {
      handleSimpleCollapse(targetElem)
    }
  }
}

/**
 * Vue directive for collapsible elements with accordion support
 *
 * Handles both simple collapse/expand behavior and accordion groups where
 * only one item can be open at a time.
 *
 * Works with the `observeVisibleAttr` composable for reactive state management.
 *
 * @example
 * // Simple collapsible
 * <button v-collapse:content1>Toggle</button>
 * <div id="content1" visible="false">Collapsible content</div>
 *
 * @example
 * // Accordion group
 * <button v-collapse:item1>Item 1</button>
 * <div id="item1" visible="false" accordion="myAccordion">Content 1</div>
 *
 * <button v-collapse:item2>Item 2</button>
 * <div id="item2" visible="false" accordion="myAccordion">Content 2</div>
 *
 * @internal
 */
export const vCollapse: Directive<CollapseElement> = {
  mounted(el, binding) {
    el.__HandleToggler = createCollapseHandler(binding.arg)
    el.addEventListener('click', el.__HandleToggler)
  },
  unmounted(el) {
    if (el.__HandleToggler) {
      el.removeEventListener('click', el.__HandleToggler)
      delete el.__HandleToggler
    }
  },
}
