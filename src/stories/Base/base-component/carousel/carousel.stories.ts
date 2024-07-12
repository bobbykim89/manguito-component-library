import type { Meta, StoryObj } from '@storybook/vue3'
import CarouselExample from './CarouselExample.vue'
import CarouselExampleIndicator from './CarouselExampleIndicator.vue'
import CarouselExampleIndicatorTop from './CarouselExampleIndicatorTop.vue'

const meta: Meta<typeof CarouselExample> = {
  title: 'Base/Base Component/Carousel Component',
}
export default meta

type Story = StoryObj<typeof CarouselExample>
export const CarouselExample1: Story = {
  render: () => ({
    components: { 'carousel-example': CarouselExample },
    template: '<carousel-example></carousel-example>',
  }),
}

export const CarouselExample2: StoryObj<typeof CarouselExampleIndicator> = {
  render: () => ({
    components: { 'carousel-example-2': CarouselExampleIndicator },
    template: '<carousel-example-2></carousel-example-2>',
  }),
}

export const CarouselExample3: StoryObj<typeof CarouselExampleIndicatorTop> = {
  render: () => ({
    components: { 'carousel-example-3': CarouselExampleIndicatorTop },
    template: '<carousel-example-3></carousel-example-3>',
  }),
}
