import type { Directive, DirectiveBinding, VNode } from 'vue'
import { createVNode, render } from 'vue'
import type { Direction } from '../theme/static/theme.types'
import tooltip from '../tooltip'
import type {
  TooltipElementType,
  TooltipValueObjectType,
  TooltipValueType,
} from './index.types'

/**
 * Extracts a value from either element attributes or binding value object
 */
const extractVal = <T>(
  el: HTMLElement,
  binding: DirectiveBinding<TooltipValueType>,
  attrName: string,
  objectKey: keyof TooltipValueObjectType,
): T | undefined => {
  // Check element attribute first
  if (el.hasAttribute(attrName)) {
    return el.getAttribute(attrName) as T
  }
  // check binding value obj
  if (
    typeof binding.value === 'object' &&
    binding.value !== null &&
    objectKey in binding.value
  ) {
    return binding.value[objectKey] as T
  }
  return undefined
}

/**
 * Extracts tooltip text from various sources
 */
const getTooltipText = (
  el: HTMLElement,
  binding: DirectiveBinding<TooltipValueType>,
): string | undefined => {
  // priority 1: title attr
  if (el.hasAttribute('title')) {
    return el.getAttribute('title') || undefined
  }
  // priority 2: string val
  if (typeof binding.value === 'string') {
    return binding.value
  }
  // priority 3: obj val with title
  if (typeof binding.value === 'object' && binding.value?.title) {
    return binding.value.title
  }
  return undefined
}

/**
 * Gets the tooltip direction from directive modifiers
 */
const getDirection = (
  binding: DirectiveBinding<TooltipValueType>,
): Direction | undefined => {
  const modifiers = Object.keys(binding.modifiers)
  return modifiers.length > 0 ? (modifiers[0] as Direction) : undefined
}

/**
 * Mounts the tooltip component to the element
 */
const mountTooltip = (
  el: HTMLElement,
  binding: DirectiveBinding<TooltipValueType>,
): void => {
  // add required classes to parent elem
  el.classList.add('relative', 'group', 'overflow-visible')
  const tooltipText = getTooltipText(el, binding)
  const tooltipColor = extractVal<string>(el, binding, 'color', 'color')
  const tooltipTextColor = extractVal<string>(
    el,
    binding,
    'text-color',
    'textColor',
  )
  const tooltipWidth = extractVal<string | undefined>(
    el,
    binding,
    'tooltip-width',
    'width',
  )
  const tooltipClassName =
    typeof binding.value === 'object' ? binding.value.className : undefined
  const tooltipDirection = getDirection(binding)

  console.log(
    `color: ${tooltipColor}, txt color: ${tooltipTextColor}, width: ${tooltipWidth}`,
  )

  const vnode = createVNode(tooltip, {
    direction: tooltipDirection,
    title: tooltipText,
    color: tooltipColor,
    textColor: tooltipTextColor,
    width: tooltipWidth,
    customClass: tooltipClassName,
  })

  render(vnode, el)
}

const unmountTooltip = (el: HTMLElement): void => {
  render(null, el)
}

/**
 * Helper to get property value from either element attributes or directive binding value.
 * Attribute names are converted from camelCase (in binding) to kebab-case (in HTML).
 */

export const vTooltip: Directive<TooltipElementType, TooltipValueType> = {
  mounted(el, binding) {
    // attach the handler to the element for reuse
    el.__HandleTooltip = (updatedBinding) => mountTooltip(el, updatedBinding)
    el.__UnmountTooltip = () => unmountTooltip(el)
    // initial mount
    el.__HandleTooltip(binding)
  },
  updated(
    el: TooltipElementType,
    binding: DirectiveBinding<TooltipValueType>,
    _: VNode,
    prevNode: VNode,
  ) {
    // Only update if the binding value has changed (deep comparison is hard, so we just check the object reference)
    // Vue handles prop updates on the VNode, so we only need to re-render if the binding or modifiers change.
    // If the binding is complex, we always call the handler.
    const valueChanged = binding.value !== binding.oldValue
    let argChanged = false
    const prevDirective = prevNode.dirs?.find((d) => d.dir === vTooltip)
    if (prevDirective) {
      // Compare the current argument with the argument from the previous render cycle
      const prevArg = prevDirective.arg
      if (binding.arg !== prevArg) {
        argChanged = true
      }
    }

    // Fallback: If no argument is used (v-tooltip instead of v-tooltip:arg),
    // we can check if the modifier keys changed, although this is less common.
    // If the modifier keys change, it usually means the binding.arg changed or the directive was swapped.

    // 3. Re-render if the value OR the argument/direction has changed
    if (valueChanged || argChanged) {
      el.__HandleTooltip(binding)
    }
  },
  unmounted(el) {
    el.__UnmountTooltip()
  },
}
