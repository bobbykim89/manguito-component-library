import GrandCanyonImage from '@/assets/images/grandcanyon-image.jpg'
import { Card } from '@/components/manguito-theme/lib'
import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

const meta: Meta<typeof Card> = {
  title: 'Base/Base Component/Card Component',
  component: Card,
  args: {
    variant: 'light-1',
    rounded: false,
    shadow: false,
    glass: false,
    glassBlur: 'sm',
    glassOpacity: 10,
    imageSrc:
      'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
    imageAlt: 'Manguito is perching',
    noImage: false,
    noBody: false,
    noHeader: false,
    noFooter: false,
    title: 'Base Card',
    titleVariant: 'dark-4',
    titleSize: 'md',
    cardClass: '',
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const BaseCardExample: Story = {
  render: (args) => ({
    components: { card: Card },
    setup() {
      const bgImage = computed(() => {
        return { 'background-image': `url('${GrandCanyonImage}')` }
      })
      return { args, bgImage }
    },
    template:
      '<section :style="bgImage" class="container bg-cover bg-no-repeat bg-center px-md py-lg"><div class="grid lg:grid-cols-3 gap-4"><card v-bind="args"><template #body><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est tenetur impedit hic iure, consectetur cupiditate nesciunt ullam voluptatum veniam ipsam?</div></template><template #footer><div>Pio!</div></template></card></div></section>',
  }),
}
