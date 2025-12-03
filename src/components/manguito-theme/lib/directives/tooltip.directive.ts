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
 * Helper to get property value from either element attributes or directive binding value.
 * Attribute names are converted from camelCase (in binding) to kebab-case (in HTML).
 */

const getPropValue = <T extends keyof Omit<TooltipValueObjectType, 'title'>>(
  el: TooltipElementType,
  bindingVal: TooltipValueType | undefined,
  attrName: string, // Kebab-case attribute name
  key: T, // CamelCase key in the binding object
): TooltipValueObjectType[T] | null | undefined => {
  // 1. Check the binding value object first, as this is the primary way for complex types
  // and object values usually represent dynamic settings.
  if (
    typeof bindingVal === 'object' &&
    bindingVal !== null &&
    key in bindingVal
  ) {
    return bindingVal[key]
  }

  // 2. Check if the element has the attribute (HTML attributes take precedence, based on your initial code structure)
  const attrVal = el.getAttribute(attrName)
  if (attrVal !== null) {
    // special handling for width which might be expected as number
    if (key === 'width') {
      const numberVal = Number(attrVal)
      // If it's a valid number, return it as a number, otherwise return the string (e.g. "10rem")
      if (!isNaN(numberVal)) {
        return numberVal as TooltipValueObjectType[T]
      }
    }
    // For color/textColor/className, the string attribute value is fine
    return attrVal as unknown as TooltipValueObjectType[T]
  }
  return undefined
}

const PROP_MAP = {
  color: 'color',
  textColor: 'text-color',
  width: 'tooltip-width',
  className: 'class-name',
}

const handleTooltip = (
  el: TooltipElementType,
  binding: DirectiveBinding<TooltipValueType>,
) => {
  // 1. Set base classes for the parent element
  el.classList.add('relative', 'group', 'overflow-visible')
  el.removeAttribute('title')

  // 2. Determine direction
  const modifierArray: string[] = Object.keys(binding.modifiers)
  const tooltipDirection: Direction | undefined = modifierArray[0]
    ? (modifierArray[0] as Direction)
    : undefined

  // 3. Determine tooltip text (title logic remains the same)
  let tooltipText: string | undefined | null
  if (el.hasAttribute('title')) {
    tooltipText = el.getAttribute('title')
  }
  if (
    !el.hasAttribute('title') &&
    typeof binding.value !== 'undefined' &&
    typeof binding.value === 'string'
  ) {
    tooltipText = binding.value
  }
  if (
    !el.hasAttribute('title') &&
    typeof binding.value !== 'undefined' &&
    typeof binding.value !== 'string' &&
    typeof binding.value.title === 'string'
  ) {
    tooltipText = binding.value.title
  }

  // Crucially, remove the native title attribute if we found a tooltip text,
  // to prevent the browser's default tooltip from showing.
  // if (tooltipText) {
  //   el.removeAttribute('title')
  // }

  if (!tooltipText) {
    render(null, el)
    return
  }

  // 4. Gather other props using helperfunction and the constant
  const props: Record<string, any> = {
    title: tooltipText,
    direction: tooltipDirection,
  }
  console.log(props)
  // Iterate over external PROP_MAP constant
  for (const [key, attrName] of Object.entries(PROP_MAP)) {
    const val = getPropValue(
      el,
      binding.value as TooltipValueObjectType,
      attrName,
      key as keyof Omit<TooltipValueObjectType, 'title'>,
    )
    console.log(val)
    if (val !== undefined) {
      props[key === 'className' ? 'customClass' : key] = val
    }
  }
  console.log(tooltipText)
  console.log(props)
  const vnode = createVNode(tooltip, props)
  render(vnode, el)
}

export const vTooltip: Directive<TooltipElementType, TooltipValueType> = {
  mounted(el, binding) {
    // attach the handler to the element for reuse
    el.__HandleTooltip = (b) => handleTooltip(el, b)
    el.__UnmountTooltip = () => render(null, el)
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
