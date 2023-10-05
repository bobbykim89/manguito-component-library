import { Directive, nextTick } from 'vue'

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
  mounted(el, binding, vnode) {
    el.__HandleToggler = (event: Event) => {
      const eTarget = event.target as HTMLElement
      let target: HTMLInputElement
      if (eTarget.tagName === 'A') {
        const targetId = eTarget.getAttribute('href')
        const formattedTargetId =
          targetId?.charAt(0) === '#' ? targetId.substring(1) : targetId
        target = document.getElementById(
          formattedTargetId as string
        ) as HTMLInputElement
      } else {
        target = document.getElementById(
          binding.arg as string
        ) as HTMLInputElement
      }
      // nextTick(() => {
      // if (target.checked) {
      //   target.setAttribute('checked', 'false')
      // } else {
      //   target.setAttribute('checked', 'true')
      // }
      // console.log(target.checked)
      target.click()
      console.log(target.checked)
    }
    el.addEventListener('click', el.__HandleToggler)
  },
  unmounted(el) {
    el.removeEventListener('click', el.__HandleToggler)
  },
  // updated(el, binding) {
  //   el.__HandleToggler = (event: Event) => {
  //     const eTarget = event.target as HTMLElement
  //     let target
  //     if (eTarget.tagName === 'A') {
  //       const targetId = eTarget.getAttribute('href')
  //       const formattedTargetId =
  //         targetId?.charAt(0) === '#' ? targetId.substring(1) : targetId
  //       target = document.getElementById(formattedTargetId as string)
  //     } else {
  //       target = document.getElementById(binding.arg as string)
  //     }
  //     console.log(target)
  //     target?.focus()
  //   }
  // },
}
