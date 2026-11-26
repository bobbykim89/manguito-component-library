import type { Directive, DirectiveBinding, VNode } from 'vue'
import { createVNode, render } from 'vue'
import type { Direction } from '../theme/static/theme.types'
import tooltip from '../tooltip'
import type {
  TooltipElementType,
  TooltipValueObjectType,
  TooltipValueType,
} from './index.types'

let _tooltipCount = 0

const DISMISSED = 'data-mcl-tooltip-dismissed'

/** The host's `aria-describedby` ids, as a list. */
const describedByIds = (el: HTMLElement): string[] =>
  (el.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean)

// The host may already be described by something else (a field's hint or
// error): add the tooltip's id to the list instead of replacing it (#128).
const addDescribedBy = (el: HTMLElement, id: string): void => {
  const ids = describedByIds(el)
  if (!ids.includes(id))
    el.setAttribute('aria-describedby', [...ids, id].join(' '))
}

// Remove only the tooltip's id; drop the attribute only when nothing is left.
const removeDescribedBy = (el: HTMLElement, id: string): void => {
  const ids = describedByIds(el).filter((x) => x !== id)
  if (ids.length) el.setAttribute('aria-describedby', ids.join(' '))
  else el.removeAttribute('aria-describedby')
}

/**
 * Escape hides a showing tooltip without moving the pointer or focus (WCAG
 * 1.4.13, #128). The tooltip shows while its host is hovered or focused; the
 * document listener exists only then. It runs in the capture phase, so it
 * sees Escape first even inside a Modal, and marks it handled
 * (`preventDefault`) so the Modal stays open.
 */
const attachEscape = (el: TooltipElementType): void => {
  let hovered = false
  let focused = false
  const onKeydown = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape' || e.defaultPrevented) return
    if (el.hasAttribute(DISMISSED)) return
    el.setAttribute(DISMISSED, '')
    e.preventDefault()
  }
  const sync = (): void => {
    if (hovered || focused) {
      document.addEventListener('keydown', onKeydown, true)
    } else {
      document.removeEventListener('keydown', onKeydown, true)
    }
  }
  const show = (): void => {
    el.removeAttribute(DISMISSED)
  }
  const onEnter = () => {
    if (!hovered && !focused) show()
    hovered = true
    sync()
  }
  const onLeave = () => {
    hovered = false
    sync()
  }
  const onFocusIn = () => {
    if (!hovered && !focused) show()
    focused = true
    sync()
  }
  const onFocusOut = () => {
    focused = false
    sync()
  }
  el.addEventListener('mouseenter', onEnter)
  el.addEventListener('mouseleave', onLeave)
  el.addEventListener('focusin', onFocusIn)
  el.addEventListener('focusout', onFocusOut)
  el.__DetachTooltipEscape = () => {
    el.removeEventListener('mouseenter', onEnter)
    el.removeEventListener('mouseleave', onLeave)
    el.removeEventListener('focusin', onFocusIn)
    el.removeEventListener('focusout', onFocusOut)
    document.removeEventListener('keydown', onKeydown, true)
    el.removeAttribute(DISMISSED)
  }
}

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
  el: TooltipElementType,
  binding: DirectiveBinding<TooltipValueType>,
): void => {
  // add required classes to parent elem
  el.classList.add('relative', 'group', 'overflow-visible')

  if (!el.__TooltipId) {
    el.__TooltipId = `mcl-tooltip-${++_tooltipCount}`
  }
  const tooltipId = el.__TooltipId

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
    typeof binding.value === 'object' ? binding.value.customClass : undefined
  const tooltipDirection = getDirection(binding)

  const vnode = createVNode(tooltip, {
    id: tooltipId,
    direction: tooltipDirection,
    content: tooltipText,
    color: tooltipColor,
    textColor: tooltipTextColor,
    width: tooltipWidth,
    customClass: tooltipClassName,
  })

  render(vnode, el)
  addDescribedBy(el, tooltipId)
}

const unmountTooltip = (el: TooltipElementType): void => {
  render(null, el)
  if (el.__TooltipId) removeDescribedBy(el, el.__TooltipId)
  el.__DetachTooltipEscape?.()
  delete el.__TooltipId
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
    attachEscape(el)
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
    } else if (el.__TooltipId) {
      // The host's own re-render may have rewritten `aria-describedby`
      // (a reactive binding); put the tooltip's id back (#128).
      addDescribedBy(el, el.__TooltipId)
    }
  },
  unmounted(el) {
    el.__UnmountTooltip()
  },
}
