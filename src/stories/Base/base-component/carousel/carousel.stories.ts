import type { Meta, StoryObj } from '@storybook/vue3'
import CarouselExample from './CarouselExample.vue'

const meta: Meta<typeof CarouselExample> = {
  title: 'Base/Base Component/Carousel Component',
}
export default meta

type Story = StoryObj<typeof CarouselExample>
export const CarouselExample1: Story = {
  render: () => ({
    components: { 'carousel-example': CarouselExample },
    template:
      '<section class="relative"><carousel-example></carousel-example></section>',
  }),
}
