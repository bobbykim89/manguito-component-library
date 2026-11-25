import {
  booleanControllers,
  colorControllers,
  headingTextControllers,
  rangeControllers,
  textControllers,
} from '@/assets/composables'
import { MclCardC } from '@/components/mcl-cards/lib'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, fn, waitFor } from 'storybook/test'
import { hitAt } from '../story-helpers'

const meta: Meta<typeof MclCardC> = {
  title: 'Components/Cards/MclCardC',
  component: MclCardC,
  // #129: axe violations fail these stories
  parameters: { a11y: { test: 'error' } },
  argTypes: {
    title: textControllers({
      name: 'title',
      required: false,
      description: 'text in titleblock of component',
      category: 'Title Block',
    }),
    titleSize: headingTextControllers({
      name: 'title-size',
      required: false,
      description: 'title text font size',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    titleColor: colorControllers({
      name: 'title-color',
      required: false,
      description: 'color of title text',
      defaultValue: 'dark-3',
      category: 'Title Block',
    }),
    showTitle: booleanControllers({
      name: 'show-title',
      required: false,
      description: 'whether to display title block',
      defaultValue: false,
      category: 'Title Block',
    }),
    imageSource: textControllers({
      name: 'image-source',
      required: true,
      description: 'image source of the card',
      category: 'Image Block',
    }),
    imageAlt: textControllers({
      name: 'image-alt',
      required: false,
      description: 'alt text for card image',
      category: 'Image Block',
    }),
    cardColor: colorControllers({
      name: 'card-color',
      required: false,
      description: 'color of card component before flipping it',
      defaultValue: 'primary',
      category: 'Card Body',
    }),
    showHighlight: booleanControllers({
      name: 'show-highlight',
      required: false,
      description: 'displays highlight under the title block',
      defaultValue: false,
      category: 'Highlight',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'assigns the color of the highlight',
      defaultValue: 'light-3',
      category: 'Highlight',
    }),
    highlightOpacity: rangeControllers({
      name: 'highlight-opacity',
      required: false,
      description: 'controls opacity of highlight',
      defaultValue: 80,
      controlOption: {
        min: 10,
        max: 100,
        step: 10,
      },
      category: 'Highlight',
    }),
  },
  args: {
    imageSource:
      'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
    imageAlt: 'manguito perching',
    title: 'MCL Card C',
    titleSize: 'md',
    titleColor: 'dark-3',
    showHighlight: false,
    highlightColor: 'light-3',
    highlightOpacity: 80,
    showTitle: false,
    cardColor: 'primary',
  },
}

export default meta

type Story = StoryObj<typeof MclCardC>

export const MclCardCExample: Story = {
  render: (args) => ({
    components: { 'mcl-card-c': MclCardC },
    setup() {
      return { args }
    },
    template:
      '<section class="container"><mcl-card-c v-bind="args"><template #card-body><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est tenetur impedit hic iure, consectetur cupiditate nesciunt ullam voluptatum veniam ipsam?</div></template></mcl-card-c></section>',
  }),
}

// Keyboard and pointer contract (#129): Tab reaches the card, the hidden
// content can't be tabbed into, Enter flips, Space then emits card-click, a
// click on plain body text reaches the card and a click on a link doesn't.
export const MclCardCKeyboard: Story = {
  name: 'Keyboard',
  args: { title: 'Mango', showTitle: true, onCardClick: fn() },
  render: (args) => ({
    components: { 'mcl-card-c': MclCardC },
    setup() {
      return { args }
    },
    template:
      '<section class="container"><mcl-card-c v-bind="args"><template #card-body><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p><a href="#more" @click.prevent>More</a></template></mcl-card-c></section>',
  }),
  // The More link cancels its own navigation only because navigating the test
  // iframe would end the run; MclCardC.test.ts checks slot links navigate.
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Mango' })
    const more = canvas.getByText('More')
    const card = button.parentElement!

    await userEvent.tab()
    await expect(button).toHaveFocus()
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(getComputedStyle(card).outlineStyle).toBe('solid')

    // The More link is inert until the card flips: Tab skips it and the
    // browser refuses to focus it at all.
    await userEvent.tab()
    await expect(more).not.toHaveFocus()
    more.focus()
    await expect(more).not.toHaveFocus()
    button.focus()

    await userEvent.keyboard('{Enter}')
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await expect(button).toHaveFocus()
    await expect(args.onCardClick).not.toHaveBeenCalled()
    await waitFor(() => expect(canvas.getByRole('img')).toBeVisible(), {
      timeout: 3000,
    })

    await userEvent.keyboard(' ')
    await expect(args.onCardClick).toHaveBeenCalledTimes(1)

    const text = canvas.getByText(/^Lorem ipsum/)
    // waitFor: mid-flip the card's back face is hidden, so hit-testing falls
    // through it until the 1.6s rotation ends
    await waitFor(() => expect(hitAt(text)).toBe(button), { timeout: 3000 })
    await userEvent.click(hitAt(text))
    await expect(args.onCardClick).toHaveBeenCalledTimes(2)

    await expect(hitAt(more)).toBe(more)
    await userEvent.click(hitAt(more))
    await expect(args.onCardClick).toHaveBeenCalledTimes(2)
  },
}
