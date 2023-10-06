import { Directive } from 'vue'

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
    el.__HandleToggler = (event: Event): void => {
      const eTarget = event.target as HTMLElement
      let target: HTMLElement
      if (eTarget.tagName === 'A') {
        const targetId = eTarget.getAttribute('href')
        const formattedTargetId =
          targetId?.charAt(0) === '#' ? targetId.substring(1) : targetId
        target = document.getElementById(
          formattedTargetId as string
        ) as HTMLElement
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
        const isOpen = accordionList[i].getAttribute('open')
        if (accordionList[i].id !== target.id && isOpen === 'true') {
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
