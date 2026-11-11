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

let sunsetWarned = false
const warnSunset = (): void => {
  if (sunsetWarned) return
  sunsetWarned = true
  console.warn(
    '[v-collapse] v-collapse is sunsetted: no collapse component reacts to it, ' +
      'including the base Collapse. Call toggle() on a Collapse template ref or ' +
      'bind :visible, and wrap accordions in <AccordionGroup>. It will be ' +
      'removed in the next major release.',
  )
}

/**
 * Vue directive for collapsible elements with accordion support.
 *
 * @deprecated Sunsetted. No collapse component reacts to this directive,
 * including the base `Collapse`, `MclCollapseA`, and `MclCollapseB`: they manage
 * state internally via the `useCollapseState` composable. Mounting it logs a
 * warning once per page. It will be removed in the next major release.
 *
 * - `v-collapse:<id>` on a trigger → call `toggle()` on a `Collapse` template ref,
 *   or bind `:visible`.
 * - `accordion="<name>"` on a panel → wrap the panels in `<AccordionGroup>`.
 *
 * @example
 * // Standalone base Collapse
 * <button @click="collapseRef?.toggle()">Toggle</button>
 * <Collapse ref="collapseRef" id="panel-1">...</Collapse>
 *
 * @example
 * // Accordion
 * import { AccordionGroup } from '@bobbykim/manguito-theme'
 * import { MclCollapseA } from '@bobbykim/mcl-collapse'
 *
 * <AccordionGroup>
 *   <MclCollapseA collapse-id="item1" title="Item 1">...</MclCollapseA>
 *   <MclCollapseA collapse-id="item2" title="Item 2">...</MclCollapseA>
 * </AccordionGroup>
 */
export const vCollapse: Directive<CollapseElement> = {
  mounted(el, binding) {
    warnSunset()
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
