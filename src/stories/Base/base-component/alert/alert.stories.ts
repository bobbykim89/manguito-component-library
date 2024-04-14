import { booleanControllers, colorControllers } from '@/assets/composables'
import { Alert } from '@/components/manguito-theme/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof Alert> = {
  title: 'Base/Base Component/Alert Component',
  component: Alert,
}

export default meta

type Story = StoryObj<typeof Alert>

export const AlertExample: Story = {
  render: (args) => ({
    components: { alert: Alert },
    setup() {
      return { args }
    },
    template:
      '<section class="container"><alert v-bind="args"><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est tenetur impedit hic iure, consectetur cupiditate nesciunt ullam voluptatum veniam ipsam?</div></alert></section>',
  }),
  argTypes: {
    color: colorControllers({
      name: 'color',
      required: false,
      defaultValue: 'danger',
      description: 'assigns background color of the component',
      category: 'Style Block',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      defaultValue: true,
      description: 'whether or not to have component with rounded corner',
      category: 'Style Block',
    }),
    shadow: booleanControllers({
      name: 'shadow',
      required: false,
      defaultValue: false,
      description: 'whether or not to add drop shadow to the component.',
      category: 'Style Block',
    }),
    show: booleanControllers({
      name: 'show',
      required: false,
      defaultValue: false,
      description: 'whether or not to have component visible',
      category: 'Component Block',
    }),
    dismissible: booleanControllers({
      name: 'dismissible',
      required: false,
      defaultValue: false,
      description:
        'whether or not to display dismiss button at the right end of component',
      category: 'Component Block',
    }),
  },
  args: {
    color: 'danger',
    rounded: true,
    shadow: true,
    show: false,
    dismissible: false,
  },
}
