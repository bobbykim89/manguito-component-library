import { defineComponent, onMounted, ref } from 'vue'

/**
 * Renders its default slot only after the component has mounted in the browser.
 *
 * Last-resort escape hatch for consumers' own browser-only content. It is not
 * used inside this library: content that is visible on first paint must be in
 * the server HTML, so never wrap it in this component.
 */
export const ClientSideRender = defineComponent({
  setup(_, { slots }) {
    const visible = ref<boolean>(false)
    onMounted(() => {
      visible.value = true
    })
    return () => (visible.value && slots.default ? slots.default() : null)
  },
})
