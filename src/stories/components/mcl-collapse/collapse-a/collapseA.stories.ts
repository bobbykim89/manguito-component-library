import {
  booleanControllers,
  colorControllers,
  headingTextControllers,
  textControllers,
} from '@/assets/composables'
import { MclCollapseA } from '@/components/mcl-collapse/lib'
import type { Meta, StoryObj } from '@storybook/vue3'
import CollapseAAccordion from './CollapseAAccordion.vue'
import CollapseATabSlotExample from './CollapseATabSlotExample.vue'

const meta: Meta<typeof MclCollapseA> = {
  title: 'Components/Collapse/MclCollapseA',
  component: MclCollapseA,
  argTypes: {
    collapseId: textControllers({
      name: 'collapse-id',
      required: true,
      description: 'assigns id of collapse component',
      defaultValue: undefined,
      category: 'ID',
    }),
    accordion: textControllers({
      name: 'accordion',
      required: false,
      description:
        'assigns accordion group id in case of using accordion feature',
      defaultValue: undefined,
      category: 'ID',
    }),
    visible: booleanControllers({
      name: 'visible',
      required: false,
      description: 'opens collapse component at the default',
      defaultValue: false,
      category: 'Controls',
    }),
    title: textControllers({
      name: 'title',
      required: true,
      description: 'assigns title text on the tab',
      defaultValue: undefined,
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      description: 'assigns the size of title text',
      defaultValue: 'sm',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      description: 'assigns the color of title text',
      defaultValue: 'dark-3',
      category: 'Title Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description: 'assigns border color',
      defaultValue: 'light-4',
      category: 'Border',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'adds rounded corner',
      defaultValue: false,
      category: 'Border',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns background color of tab and footer',
      defaultValue: 'white',
      category: 'Colors',
    }),
    slotBgColor: colorControllers({
      name: 'slot-bg-color',
      required: false,
      description: 'assigns background color of content block',
      defaultValue: 'light-2',
      category: 'Colors',
    }),
    iconColor: colorControllers({
      name: 'icon-color',
      required: false,
      description: 'assigns color of chevron icon at the footer',
      defaultValue: 'dark-3',
      category: 'Colors',
    }),
    displayHighlight: booleanControllers({
      name: 'display-highlight',
      required: false,
      description: 'displays highlight on the left side of component',
      defaultValue: true,
      category: 'Highlight',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'assigns highlight color',
      defaultValue: 'secondary',
      category: 'Highlight',
    }),
  },
  args: {
    collapseId: 'my-collapse-component',
    accordion: 'my-accordion',
    borderColor: 'light-4',
    rounded: false,
    displayHighlight: true,
    highlightColor: 'secondary',
    title: 'MCL Collapse A',
    titleSize: 'sm',
    titleColor: 'dark-3',
    visible: false,
    iconColor: 'dark-3',
    bgColor: 'white',
    slotBgColor: 'light-2',
  },
}

export default meta

type Story = StoryObj<typeof MclCollapseA>

export const MclCollapseAExample: Story = {
  render: (args) => ({
    components: { 'mcl-collapse-a': MclCollapseA },
    setup() {
      return { args }
    },
    template:
      '<mcl-collapse-a v-bind="args"><template #content><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?</div></template></mcl-collapse-a>',
  }),
}

export const MclCollapseAExample2: Story = {
  render: () => ({
    components: {
      'collapse-a-tab-slot-example': CollapseATabSlotExample,
    },
    template: '<collapse-a-tab-slot-example></collapse-a-tab-slot-example>',
  }),
}

export const AccordionExample: Story = {
  render: () => ({
    components: {
      'collapse-a-accordion': CollapseAAccordion,
    },
    template: '<collapse-a-accordion></collapse-a-accordion>',
  }),
}
