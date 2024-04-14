import {
  arrayControllers,
  booleanControllers,
  colorControllers,
  headingTextControllers,
} from '@/assets/composables'
import type { ContentType } from '@/components/mcl-tabs/lib'
import { MclTabsA } from '@/components/mcl-tabs/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const contentInfo: ContentType[] = [
  {
    title: 'First',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt blanditiis magni similique quidem nisi quae. Aspernatur ut tempora doloremque dicta ipsum temporibus eius delectus, quas nihil exercitationem, in impedit natus vitae, esse dolore quia totam consequuntur sequi sint odio ducimus explicabo aliquid omnis quam. Quasi porro eum distinctio perspiciatis fugit?',
  },
  {
    title: 'Second',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, accusantium. Optio molestias, quod inventore suscipit perferendis ex quaerat odit deleniti quidem laudantium ducimus recusandae illo possimus quam error tempora laborum sapiente magnam quas harum distinctio numquam saepe quasi! Officiis, ipsam!',
  },
  {
    title: 'Third',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores laboriosam totam, error reprehenderit quasi commodi, aspernatur a deserunt eligendi nobis sequi vero fuga in consequuntur ipsum. Quod nesciunt nulla corrupti voluptatibus? Natus, corporis quisquam! Corrupti eos, placeat, similique nostrum possimus officia aperiam cupiditate neque ducimus deserunt in quas earum, illo veritatis quos. Laudantium maxime voluptates facilis temporibus repellendus pariatur, quisquam, molestias quam, autem iste officia rerum hic rem. Minus, mollitia?',
  },
]

const meta: Meta<typeof MclTabsA> = {
  title: 'Components/Tabs/MclTabsA',
  argTypes: {
    content: arrayControllers({
      name: 'content',
      required: true,
      description: 'assigns tab contnet of the component',
      defaultValue: undefined,
      category: 'Content Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns background color of the component',
      defaultValue: 'light-1',
      category: 'Colors',
    }),
    tabColor: colorControllers({
      name: 'tab-color',
      required: false,
      description: 'assigns tab color of the component',
      defaultValue: 'primary',
      category: 'Colors',
    }),
    activeTitleColor: colorControllers({
      name: 'active-title-color',
      required: false,
      description: 'assigns text color active tab button',
      defaultValue: 'light-1',
      category: 'Title Block',
    }),
    inactiveTitleColor: colorControllers({
      name: 'inactive-title-color',
      required: false,
      description: 'assigns text color inactive tab button',
      defaultValue: 'light-1',
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      description: 'assigns text size for tab button',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    borderColor: colorControllers({
      name: 'border-color',
      required: false,
      description: 'assigns border color of the component',
      defaultValue: 'light-3',
      category: 'Borders',
    }),
    displayShadow: booleanControllers({
      name: 'display-shadow',
      required: false,
      description: 'whether or not to display drop shadow on the component',
      defaultValue: true,
      category: 'Borders',
    }),
    rounded: booleanControllers({
      name: 'rounded',
      required: false,
      description: 'whether or not to have rounded corner on the component',
      defaultValue: true,
      category: 'Borders',
    }),
  },
  args: {
    content: contentInfo,
    borderColor: 'light-3',
    bgColor: 'light-1',
    tabColor: 'primary',
    titleSize: 'md',
    activeTitleColor: 'dark-3',
    inactiveTitleColor: 'light-1',
    displayShadow: true,
    rounded: true,
  },
}

export default meta

type Story = StoryObj<typeof MclTabsA>
export const MclTabsAExample: Story = {
  render: (args) => ({
    components: { 'mcl-tabs-a': MclTabsA },
    setup() {
      return { args }
    },
    template: '<mcl-tabs-a v-bind="args"></mcl-tabs-a>',
  }),
}
