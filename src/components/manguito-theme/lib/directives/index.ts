import {
  Directive,
  DirectiveBinding,
  h,
  render,
  createVNode,
  getCurrentInstance,
} from 'vue'
import generateClass from '../..'
import type { ColorPalette, Direction } from '../..'
import tooltip from '../tooltip'

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
      target.click()
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
      if (!target.hasAttribute('accordion')) {
        // run when it is not accordion component case
        target.click()
        return
      }
      const accordionName = target.getAttribute('accordion')
      const accordionList: NodeListOf<HTMLElement> = document.querySelectorAll(
        `button[accordion="${accordionName}"]`
      )
      // loop through each accordion items and handle reaction for each case
      for (let i = 0; i < accordionList.length; i++) {
        const isVisible = accordionList[i].getAttribute('visible')
        if (accordionList[i].id !== target.id && isVisible === 'true') {
          accordionList[i].click()
        }
        if (accordionList[i].id === target.id) {
          accordionList[i].click()
        }
      }
    }
    el.addEventListener('click', el.__HandleToggler)
  },
  unmounted(el) {
    el.removeEventListener('click', el.__HandleToggler)
  },
}

export const vTooltip: Directive = {
  mounted(el, binding) {
    el.__HandleTooltip = (el: Element, binding: DirectiveBinding) => {
      el.classList.add('relative', 'group', 'overflow-visible')
      const tooltipBox = document.createElement('div')
      tooltipBox.setAttribute('role', 'tooltip')
      tooltipBox.classList.add(
        'invisible',
        'opacity-0',
        'group-hover:visible',
        'group-hover:opacity-100',
        'z-[100]',
        'tooltip'
      )

      const tooltipText = el.getAttribute('text')
      // handle tooltip text
      if (typeof tooltipText === 'string') {
        tooltipBox.innerHTML = tooltipText
      }
      if (
        typeof binding.value !== 'undefined' &&
        typeof tooltipText !== 'string' &&
        typeof binding.value === 'string'
      ) {
        tooltipBox.innerHTML = binding.value
      }
      if (
        typeof binding.value !== 'undefined' &&
        typeof tooltipText !== 'string' &&
        typeof binding.value !== 'string' &&
        typeof binding.value.text === 'string'
      ) {
        tooltipBox.innerHTML = binding.value.text
      }
      // handle tooltip color
      const tooltipColor = el.getAttribute('color')
      if (
        typeof tooltipColor === 'object' &&
        (typeof binding.value === 'undefined' ||
          typeof binding.value === 'string' ||
          typeof binding.value.color === 'undefined')
      ) {
        tooltipBox.classList.add('bg-dark-3')
      }
      if (typeof tooltipColor === 'string') {
        tooltipBox.classList.add(
          generateClass('BGCOLOR', tooltipColor as ColorPalette)
        )
      }
      if (
        typeof binding.value !== 'undefined' &&
        typeof tooltipColor !== 'string' &&
        typeof binding.value !== 'string' &&
        typeof binding.value.color === 'string'
      ) {
        tooltipBox.classList.add(
          generateClass('BGCOLOR', binding.value.color as ColorPalette)
        )
      }
      // handle tooltip text color
      const tooltipTextColor = el.getAttribute('text-color')
      if (
        typeof tooltipTextColor === 'object' &&
        (typeof binding.value === 'undefined' ||
          typeof binding.value === 'string' ||
          typeof binding.value.textColor === 'undefined')
      ) {
        tooltipBox.classList.add('text-white')
      }
      if (typeof tooltipTextColor === 'string') {
        tooltipBox.classList.add(
          generateClass('TEXTCOLOR', tooltipTextColor as ColorPalette)
        )
      }
      if (
        typeof binding.value !== 'undefined' &&
        typeof tooltipTextColor !== 'string' &&
        typeof binding.value !== 'string' &&
        binding.value.textColor === 'string'
      ) {
        tooltipBox.classList.add(
          generateClass('TEXTCOLOR', binding.value.textColor as ColorPalette)
        )
      }
      // handle tooltip width
      const tooltipWidth = el.getAttribute('width')
      // default tooltip width range
      if (
        typeof tooltipWidth === 'object' &&
        (typeof binding.value === 'undefined' ||
          typeof binding.value === 'string' ||
          typeof binding.value.width === 'undefined')
      ) {
        tooltipBox.style.maxWidth = '210px'
        tooltipBox.style.minWidth = '80px'
      }
      if (typeof tooltipWidth === 'string') {
        tooltipBox.style.width = tooltipWidth + 'px'
      }
      if (
        typeof binding.value !== 'undefined' &&
        typeof tooltipWidth !== 'string' &&
        typeof binding.value !== 'string' &&
        (typeof binding.value.width === 'number' ||
          typeof binding.value.width === 'string')
      ) {
        tooltipBox.style.width = binding.value.width + 'px'
      }
      // handle custom class names
      if (
        typeof binding.value !== 'undefined' &&
        typeof binding.value !== 'string' &&
        typeof binding.value.className === 'string'
      ) {
        const formattedClassNames: string[] = binding.value.className.split(' ')
        tooltipBox.classList.add(...formattedClassNames)
      }
      // handle tooltip direction
      if (
        binding.modifiers.right ||
        Object.keys(binding.modifiers).length === 0
      ) {
        tooltipBox.style.top = '50%'
        tooltipBox.style.left = '110%'
        tooltipBox.style.transform = 'translateY(-50%)'
        tooltipBox.classList.add('tooltip-right')
      }
      if (binding.modifiers.left) {
        tooltipBox.style.top = '50%'
        tooltipBox.style.right = '110%'
        tooltipBox.style.transform = 'translateY(-50%)'
        tooltipBox.classList.add('tooltip-left')
      }
      if (binding.modifiers.top) {
        tooltipBox.style.bottom = '110%'
        tooltipBox.style.left = '50%'
        tooltipBox.style.transform = 'translateX(-50%)'
        tooltipBox.classList.add('tooltip-top')
      }
      if (binding.modifiers.bottom) {
        tooltipBox.style.top = '110%'
        tooltipBox.style.left = '50%'
        tooltipBox.style.transform = 'translateX(-50%)'
        tooltipBox.classList.add('tooltip-bottom')
      }

      el.appendChild(tooltipBox)
    }
    el.__UnmountTooltip = (el: Element) => {
      for (let i = 0; i < el.children.length; i++) {
        if (el.children[i].getAttribute('role') === 'tooltip') {
          el.removeChild(el.children[i])
        }
      }
    }
    el.__HandleTooltip(el, binding)
  },
  updated(el, binding) {
    // discard tooltip and rerender component on update
    el.__UnmountTooltip(el)
    el.__HandleTooltip(el, binding)
  },
  unmounted(el) {
    // discard tooltip
    el.__UnmountTooltip(el)
  },
}

// const hFunction = {
//   props: {
//     text: String,
//   },
//   setup(props: typeof this.props) {
//     return () =>
//       h('div', { class: 'bg-primary p-md', innerHTML: 'Manguito is pollito' })
//   },
// }

export const vTest: Directive = {
  mounted(el, binding) {
    el.__Test = (el: Element, binding: DirectiveBinding) => {
      // parent element class
      el.classList.add('relative', 'group', 'overflow-visible')
      // default classes
      const defaultClassList =
        'invisible opacity-0 group-hover:visible group-hover:opacity-100 z-[100] tooltip'
      let tooltipDirection: Direction | undefined
      const modifierArray: string[] = Object.keys(binding.modifiers)
      // handle direction
      if (modifierArray.length > 0) {
        tooltipDirection = modifierArray[0] as Direction
      }
      const vnode = createVNode(tooltip, {
        direction: tooltipDirection,
        text: 'pio pip',
      })
      // vnode.$props = {
      //   direction: 'left',
      //   text: 'Manguito is pollito',
      // }
      console.log(vnode)
      render(vnode, el)
    }
    el.__UnmountTest = (el: Element) => {
      render(null, el)
    }
    el.__Test(el, binding)
  },
  updated(el, binding) {
    el.__Test(el, binding)
  },
  unmounted(el) {
    el.__UnmountTest(el)
  },
}
