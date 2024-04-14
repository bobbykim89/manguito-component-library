import { defineComponent, onMounted, ref } from 'vue'

export const ClientSideRender = defineComponent({
  setup(_, { slots }) {
    const show = ref<boolean>(false)
    onMounted(() => {
      show.value = true
    })
    return () => (show.value && slots.default ? slots.default() : null)
  },
})
