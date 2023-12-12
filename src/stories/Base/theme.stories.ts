import ColorPalette from './ColorPalette.vue'
import Spacing from './Spacing.vue'
import Breakpoint from './Breakpoint.vue'
import HeadingSize from './HeadingSize.vue'
import BodyText from './BodyText.vue'

export default { title: 'Base/Theme' }

export const colorPalette = () => ({
  components: { 'color-palette': ColorPalette },
  template: '<color-palette></color-palette>',
})

export const spacing = () => ({
  components: { spacing: Spacing },
  template: '<spacing></spacing>',
})

export const breakpoint = () => ({
  components: { breakpoint: Breakpoint },
  template: '<breakpoint></breakpoint>',
})

export const headingSize = () => ({
  components: { 'heading-size': HeadingSize },
  template: '<heading-size></heading-size>',
})

export const bodyText = () => ({
  components: { 'body-text': BodyText },
  template: '<body-text></body-text>',
})
