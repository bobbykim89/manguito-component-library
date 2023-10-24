import { Directive, DirectiveBinding } from 'vue'

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
      let position = binding.arg || 'top'
      let tooltipText = binding.value || 'tooltip text'
      const elementHeight = el.scrollHeight + 'px'
      console.log(elementHeight)
      el.classList.add('relative', 'group')
      const tooltipBox = document.createElement('div')
      tooltipBox.setAttribute('tooltip', 'true')
      tooltipBox.classList.add(
        'absolute',
        'p-3xs',
        'bg-light-3',
        // 'invisible',
        'opacity-0',
        // 'group-hover:visible',
        'group-hover:opacity-100',
        'transition-opacity',
        'duration-200',
        'z-[100]',
        'rounded',
        'text-sm'
      )
      console.log(binding.arg, binding.modifiers)
      tooltipBox.style.width = '210px'
      if (typeof binding.value === 'string') {
        tooltipBox.innerHTML = binding.value
      }
      if (binding.modifiers.right === true) {
        tooltipBox.style.top = '-5px'
        tooltipBox.style.left = '105%'
        tooltipBox.classList.add('tooltip-right')
      }
      if (binding.modifiers.left === true) {
        tooltipBox.style.top = '-5px'
        tooltipBox.style.right = '105%'
        tooltipBox.classList.add('tooltip-left')
      }
      if (binding.modifiers.top === true) {
        tooltipBox.style.bottom = '100%'
        tooltipBox.style.left = '50%'
        tooltipBox.style.transform = 'translateX(-50%)'
        tooltipBox.classList.add('tooltip-top')
      }
      if (binding.modifiers.bottom === true) {
        tooltipBox.style.top = '100%'
        tooltipBox.style.left = '50%'
        tooltipBox.style.transform = 'translateX(-50%)'
        tooltipBox.classList.add('tooltip-bottom')
      }
      el.appendChild(tooltipBox)
      // const eTarget = e.target as HTMLElement
      // eTarget.classList.add('bg-dark-1')
      // console.log(eTarget.classList)
    }
    el.__UnmountTooltip = (el: Element) => {
      for (let i = 0; i < el.children.length; i++) {
        if (el.children[i].getAttribute('tooltip') === 'true') {
          el.removeChild(el.children[i])
        }
      }
    }
    // el.addEventListener('mouseover', el.__HandleTooltip)
    el.__HandleTooltip(el, binding)
  },
  // unmounted(el) {
  //   el.removeEventListener('mouseover', el.__HandleTooltip)
  // },
  updated(el, binding) {
    // add function to remove tooltip component and add it again
    el.__UnmountTooltip(el)
    el.__HandleTooltip(el, binding)
  },
  unmounted(el) {
    // add function to remove tooltip component
    el.__UnmountTooltip(el)
  },
}
