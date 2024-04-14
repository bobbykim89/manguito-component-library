import {
  booleanControllers,
  colorControllers,
  headingTextControllers,
  textControllers,
} from '@/assets/composables'
import { MclCollapseB } from '@/components/mcl-collapse/lib'
import type { Meta, StoryObj } from '@storybook/vue3'
import CollapseBAccordion from './CollapseBAccordion.vue'

const meta: Meta<typeof MclCollapseB> = {
  title: 'Components/Collapse/MclCollapseB',
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
      defaultValue: 'md',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      description: 'assigns the color of title text',
      defaultValue: 'light-1',
      category: 'Title Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description: 'assigns border color',
      defaultValue: 'light-3',
      category: 'Border',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'adds rounded corner',
      defaultValue: true,
      category: 'Border',
    }),
    displayShadow: booleanControllers({
      name: 'display-shadow',
      required: false,
      description: 'adds drop shadow on border of component',
      defaultValue: true,
      category: 'Border',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns background color of component',
      defaultValue: 'light-1',
      category: 'Colors',
    }),
    btnColor: colorControllers({
      name: 'btn-color',
      required: false,
      description: 'assigns background color of tab button',
      defaultValue: 'primary',
      category: 'Colors',
    }),
    iconColor: colorControllers({
      name: 'icon-color',
      required: false,
      description: 'assigns color of chevron icon at the footer',
      defaultValue: 'light-1',
      category: 'Colors',
    }),
  },
  args: {
    collapseId: 'my-collapse-b',
    accordion: 'my-accordion-group-b',
    title: 'Collapse B',
    titleColor: 'light-1',
    titleSize: 'md',
    borderColor: 'light-3',
    bgColor: 'light-1',
    btnColor: 'primary',
    iconColor: 'light-1',
    rounded: true,
    displayShadow: true,
    visible: false,
  },
}

export default meta

type Story = StoryObj<typeof MclCollapseB>

export const MclCollapseBExample: Story = {
  render: (args) => ({
    components: { 'mcl-collapse-b': MclCollapseB },
    setup() {
      return { args }
    },
    template:
      '<mcl-collapse-b v-bind="args"><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?</div></mcl-collapse-b>',
  }),
}

export const AccordionExample: Story = {
  render: () => ({
    components: { 'collapse-b-accordion': CollapseBAccordion },
    template: '<collapse-b-accordion></collapse-b-accordion>',
  }),
}
