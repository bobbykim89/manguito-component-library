import { render, createVNode } from 'vue'
import type { Directive, DirectiveBinding } from 'vue'
import type { Direction } from '../../index.js'
import tooltip from '../tooltip/index.js'
import type { TooltipElementType, TooltipValueType } from './index.types.js'

export const vClickOutside: Directive = {
  mounted(el, binding) {
    el.__ClickOutsideHandler = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.body.addEventListener('click', el.__ClickOutsideHandler)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.__ClickOutsideHandler)
  },
}

export const vToggle: Directive = {
  mounted(el, binding) {
    el.__ClickToggleHandler = (e: Event): void => {
      e.preventDefault()
      const eTarget = e.target as HTMLElement
      let target: HTMLElement
      if (eTarget.tagName === 'A') {
        const targetId = eTarget.getAttribute('href')
        const formattedTargetId =
          targetId?.charAt(0) === '#' ? targetId.substring(1) : targetId
        target = document.getElementById(formattedTargetId as string)!
      } else {
        target = document.getElementById(binding.arg as string)!
      }
      if (!target) {
        return
      }
      if (target.hasAttribute('visible') === false) {
        return
      }
      const targetAttr = target.getAttribute('visible')
      const attrAfterToggle = targetAttr === 'true' ? 'false' : 'true'
      target.setAttribute('visible', attrAfterToggle)
      return
    }
    el.addEventListener('click', el.__ClickToggleHandler)
  },
  unmounted(el) {
    el.removeEventListener('click', el.__ClickToggleHandler)
  },
}

export const vCollapse: Directive = {
  mounted(el, binding) {
    el.__HandleToggler = (event: Event): void => {
      event.preventDefault()
      const eTarget = event.target as HTMLElement
      let target: HTMLElement
      if (eTarget.tagName === 'A') {
        const targetId = eTarget.getAttribute('href')
        const formattedTargetId =
          targetId?.charAt(0) === '#' ? targetId.substring(1) : targetId
        target = document.getElementById(formattedTargetId as string)!
      } else {
        target = document.getElementById(binding.arg as string) as HTMLElement
      }
      if (!target) {
        return
      }
      if (target.hasAttribute('visible') === false) {
        return
      }
      if (!target.hasAttribute('accordion')) {
        // run when it is not accordion component case
        const targetAttr = target.getAttribute('visible')
        const attrAfterToggle = targetAttr === 'true' ? 'false' : 'true'
        target.setAttribute('visible', attrAfterToggle)
        // target.click()
        return
      }
      const accordionName = target.getAttribute('accordion')
      const accordionList: NodeListOf<HTMLElement> = document.querySelectorAll(
        `div[accordion="${accordionName}"]`
      )
      // loop through each accordion items and handle reaction for each case
      for (let i = 0; i < accordionList.length; i++) {
        const isVisible = accordionList[i].getAttribute('visible')
        if (accordionList[i].id !== target.id && isVisible === 'true') {
          accordionList[i].setAttribute('visible', 'false')
          // accordionList[i].click()
        }
        if (accordionList[i].id === target.id) {
          const targetAttr = target.getAttribute('visible')
          const attrAfterToggle = targetAttr === 'true' ? 'false' : 'true'
          target.setAttribute('visible', attrAfterToggle)
          // accordionList[i].click()
        }
      }
    }
    el.addEventListener('click', el.__HandleToggler)
  },
  unmounted(el) {
    el.removeEventListener('click', el.__HandleToggler)
  },
}

export const vTooltip: Directive<TooltipElementType, TooltipValueType> = {
  mounted(el, binding) {
    el.__HandleTooltip = (
      el: HTMLElement,
      binding: DirectiveBinding<TooltipValueType>
    ) => {
      // parent element class
      el.classList.add('relative', 'group', 'overflow-visible')

      // handle tooltip text
      let tooltipText: string | null | undefined
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
      // handle tooltip color
      let tooltipColor: string | null | undefined
      if (el.hasAttribute('color')) {
        tooltipColor = el.getAttribute('color')
      }
      if (
        !el.hasAttribute('color') &&
        typeof binding.value !== 'undefined' &&
        typeof binding.value !== 'string' &&
        typeof binding.value.color === 'string'
      ) {
        tooltipColor = binding.value.color
      }
      // handle tooltip text color
      let tooltipTextColor: string | null | undefined
      if (el.hasAttribute('text-color')) {
        tooltipTextColor = el.getAttribute('text-color')
      }
      if (
        !el.hasAttribute('text-color') &&
        typeof binding.value !== 'undefined' &&
        typeof binding.value !== 'string' &&
        typeof binding.value.textColor === 'string'
      ) {
        tooltipTextColor = binding.value.textColor
      }
      // handle tooltip width
      let tooltipWidth: string | number | null | undefined
      if (el.hasAttribute('width')) {
        tooltipWidth = el.getAttribute('width')
      }
      if (
        !el.hasAttribute('width') &&
        typeof binding.value !== 'undefined' &&
        typeof binding.value !== 'string' &&
        typeof binding.value.width === ('number' || 'string')
      ) {
        tooltipWidth = binding.value.width
      }
      // handle custom class names
      let tooltipClassName: string | undefined
      if (
        typeof binding.value !== 'undefined' &&
        typeof binding.value !== 'string' &&
        typeof binding.value.className === 'string'
      ) {
        tooltipClassName = binding.value.className
      }
      let tooltipDirection: Direction | undefined
      const modifierArray: string[] = Object.keys(binding.modifiers)
      // handle direction
      if (modifierArray.length > 0) {
        tooltipDirection = modifierArray[0] as Direction
      }
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
    el.__UnmountTooltip = (el: Element) => {
      render(null, el)
    }
    el.__HandleTooltip(el, binding)
  },
  updated(el, binding) {
    el.__HandleTooltip(el, binding)
  },
  unmounted(el) {
    el.__UnmountTooltip(el)
  },
}
