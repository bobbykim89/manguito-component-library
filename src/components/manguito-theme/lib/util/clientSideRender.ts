import { defineComponent, onMounted, ref } from 'vue'

export const ClientSideRender = defineComponent({
  setup(_, { slots }) {
    const visible = ref<boolean>(false)
    onMounted(() => {
      visible.value = true
    })
    return () => (visible.value && slots.default ? slots.default() : null)
  },
})
