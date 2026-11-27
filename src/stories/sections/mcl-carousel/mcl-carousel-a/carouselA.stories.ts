import {
  arrayControllers,
  bodyTextControllers,
  booleanControllers,
  colorControllers,
  headingLevelControllers,
  headingTextControllers,
  spacingControllers,
  textControllers,
} from '@/assets/composables'
import { MclCardA } from '@/components/mcl-cards/lib'
import { MclCarouselA } from '@/components/mcl-carousel/lib'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor, within } from 'storybook/test'
import MclCarouselACardB from './MclCarouselACardB.vue'
import MclCarouselCardD from './MclCarouselCardD.vue'

const cardInfo: any[] = [
  {
    title: 'Card 1',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, voluptas.',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385584/ManguitoPage/tveqbper01iikyrfvgie.jpg',
    alt: 'Peach-faced lovebird perched on a kitchen shelf',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, sint?',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385555/ManguitoPage/hbezblnxgp6cocryveqp.jpg',
    alt: 'Lovebird nibbling a half-eaten apple held in a hand',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, veniam!',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg',
    alt: 'Lovebird perched on a forearm next to a wristwatch',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 4',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, illum!',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385507/ManguitoPage/iso3exu8vhgxrjtcoidn.jpg',
    alt: 'Lovebird eating berries and nuts from a white bowl',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, similique?',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1662351942/ManguitoPage/jmeckqlcpvlrsy0lwkve.jpg',
    alt: 'Lovebird standing on a pile of coins on a blanket',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, excepturi.',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1662351910/ManguitoPage/arvk0suxerpkepbenpbb.jpg',
    alt: 'Lovebird lying on its back on a blanket, being petted',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 7',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, numquam?',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1662351885/ManguitoPage/uxwaefimmhmks78ahxsl.jpg',
    alt: 'Lovebird lying on a blanket beside a tablet, being petted',
    url: 'https://manguitopage.herokuapp.com/',
  },
  {
    title: 'Card 8',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, ipsa.',
    img: 'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1659679135/ManguitoPage/ofumcnn0asbk2t8bwub7.jpg',
    alt: 'Lovebird perched on a backpack strap in a living room',
    url: 'https://manguitopage.herokuapp.com/',
  },
]

const meta: Meta<typeof MclCarouselA> = {
  title: 'Sections/Carousel/MclCarouselA',
  component: MclCarouselA,
  parameters: {
    a11y: { test: 'error' },
  },
  argTypes: {
    title: textControllers({
      name: 'title',
      required: true,
      description: 'assigns title text for the section',
      category: 'Title Block',
    }),
    titleLevel: headingLevelControllers({
      name: 'title-level',
      required: false,
      description:
        'heading element for the title (the look comes from title-size)',
      defaultValue: 'h2',
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
      defaultValue: 'dark-3',
      category: 'Title Block',
    }),
    tagLine: textControllers({
      name: 'tag-line',
      required: false,
      description: 'assigns tagline text above title block',
      category: 'Title Block',
    }),
    tagLineSize: bodyTextControllers({
      name: 'tag-line-size',
      required: false,
      description: 'font size of tagline above title block',
      defaultValue: 'md',
      category: 'Title Block',
    }),
    showTagLine: booleanControllers({
      name: 'show-tag-line',
      required: false,
      description: 'displays tagline text above title block',
      defaultValue: true,
      category: 'Title Block',
    }),
    tagLineColor: colorControllers({
      name: 'tag-line-color',
      required: false,
      description: 'color of tagline text',
      defaultValue: 'dark-1',
      category: 'Title Block',
    }),
    showHighlight: booleanControllers({
      name: 'show-highlight',
      required: false,
      description: 'displays highlight on the left side of title block',
      defaultValue: true,
      category: 'Title Block',
    }),
    highlightColor: colorControllers({
      name: 'highlight-color',
      required: false,
      description: 'color of highlight on the left side of title block',
      defaultValue: 'primary',
      category: 'Title Block',
    }),
    bgColor: colorControllers({
      name: 'bg-color',
      required: false,
      description: 'assigns the section background color',
      defaultValue: 'light-1',
      category: 'Colors',
    }),
    btnColor: colorControllers({
      name: 'btn-color',
      required: false,
      description: 'assigns the color of chevron icons in carousel buttons',
      defaultValue: 'dark-3',
      category: 'Colors',
    }),
    btnBgColor: colorControllers({
      name: 'btn-bg-color',
      required: false,
      description: 'assigns the color of title text',
      defaultValue: 'light-4',
      category: 'Colors',
    }),
    cardsGap: spacingControllers({
      name: 'cards-gap',
      required: false,
      description: 'set space between carousel items',
      defaultValue: 'xs',
      category: 'Content',
    }),
    content: arrayControllers({
      name: 'content',
      required: true,
      description: 'array of content that goes to carousel cards',
      category: 'Content',
    }),
  },
  args: {
    title: 'MCL Carousel A',
    titleLevel: 'h2',
    titleSize: 'md',
    titleColor: 'dark-3',
    bgColor: 'light-1',
    showTagLine: true,
    tagLineUpperCase: true,
    tagLine: 'Lorem ipsum',
    tagLineSize: 'md',
    tagLineColor: 'dark-1',
    showHighlight: true,
    highlightColor: 'primary',
    btnColor: 'dark-3',
    btnBgColor: 'light-4',
    content: cardInfo,
    cardsGap: 'xs',
  },
}

export default meta

type Story = StoryObj<typeof MclCarouselA>

export const MclCarouselExampleA: Story = {
  render: (args) => ({
    components: { 'mcl-carousel-a': MclCarouselA, 'mcl-card-a': MclCardA },
    setup() {
      return { args }
    },
    template:
      '<mcl-carousel-a v-bind="args"><template #description><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quas tempora consequatur totam voluptas error doloribus inventore aliquam repudiandae quaerat.</div></template><template #carousel="{ slideAttrs, cards }"><mcl-card-a v-for="(card, i) in cards" :key="i" v-bind="slideAttrs(i)" :title="card.title" label-text="card-alpha" :image-source="card.img" :image-alt="card.alt" :enlarge-on-hover="true" cta-text="Read more" :cta-link="card.url" cta-target="_blank" class="h-full"><div v-html="card.description"></div></mcl-card-a></template></mcl-carousel-a>',
  }),
}

export const MclCarouselCardBExample: Story = {
  render: () => ({
    components: { 'mcl-carousel-card-b': MclCarouselACardB },
    template: '<mcl-carousel-card-b></mcl-carousel-card-b>',
  }),
}

export const MclCarouselCardDExample: Story = {
  render: () => ({
    components: { 'mcl-carousel-card-d': MclCarouselCardD },
    template: '<mcl-carousel-card-d></mcl-carousel-card-d>',
  }),
}

// --- Keyboard and pointer behaviour (#133). Desktop width, where 8 cards
// overflow the section. ---

const carouselParts = (canvasElement: HTMLElement) => {
  const section = canvasElement.querySelector<HTMLElement>(
    'section[aria-roledescription="carousel"]',
  )!
  const next = within(section).getByRole('button', { name: 'Next cards' })
  const row = document.getElementById(next.getAttribute('aria-controls')!)!
  const cards = Array.from(row.children) as HTMLElement[]
  const status = section.querySelector<HTMLElement>('[aria-live="polite"]')!
  return { section, next, row, cards, status }
}

const expectOverflow = async (row: HTMLElement, section: HTMLElement) =>
  waitFor(() => expect(row.scrollWidth).toBeGreaterThan(section.clientWidth))

/** The card is wholly inside the clipping section (1px tolerance). */
const expectFullyInView = async (card: HTMLElement, section: HTMLElement) =>
  waitFor(() => {
    const c = card.getBoundingClientRect()
    const s = section.getBoundingClientRect()
    expect(c.left).toBeGreaterThanOrEqual(s.left - 1)
    expect(c.right).toBeLessThanOrEqual(s.right + 1)
  })

/** Resolves when the row's slide finishes. */
const slideEnd = (row: HTMLElement) =>
  new Promise<void>((resolve) => {
    const done = (e: TransitionEvent) => {
      if (e.target !== row) return
      row.removeEventListener('transitionend', done)
      resolve()
    }
    row.addEventListener('transitionend', done)
  })

// Tab through every card and back: whichever card holds focus slides fully
// into view, and the clipping section is never left scrolled.
export const MclCarouselKeyboard: Story = {
  ...MclCarouselExampleA,
  name: 'Mcl Carousel Keyboard',
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvasElement, userEvent }) => {
    const { section, next, row, cards } = carouselParts(canvasElement)
    await expectOverflow(row, section)
    const focusedCard = () =>
      cards.findIndex((card) => card.contains(document.activeElement))

    next.focus()
    let guard = 0
    while (focusedCard() !== cards.length - 1 && guard++ < 60) {
      await userEvent.tab()
      const i = focusedCard()
      if (i === -1) continue
      await expectFullyInView(cards[i], section)
      await expect(section.scrollLeft).toBe(0)
    }
    await expect(focusedCard()).toBe(cards.length - 1)
    await waitFor(() => expect(next).toHaveAttribute('aria-disabled', 'true'))

    guard = 0
    while (focusedCard() !== 0 && guard++ < 60) {
      await userEvent.tab({ shift: true })
      const i = focusedCard()
      if (i === -1) continue
      await expectFullyInView(cards[i], section)
      await expect(section.scrollLeft).toBe(0)
    }
    await expect(focusedCard()).toBe(0)
  },
}

// Enter on Next until the end: focus stays on the button, which is then
// aria-disabled and ignores further presses; the status names the cards in view.
export const MclCarouselNextToEnd: Story = {
  ...MclCarouselExampleA,
  name: 'Mcl Carousel Next To End',
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvasElement, userEvent }) => {
    const { section, next, row, status } = carouselParts(canvasElement)
    await expectOverflow(row, section)
    await expect(status).toHaveTextContent('')
    next.focus()
    let guard = 0
    while (next.getAttribute('aria-disabled') !== 'true' && guard++ < 10) {
      const settled = slideEnd(row)
      await userEvent.keyboard('{Enter}')
      await settled
    }
    await expect(next).toHaveAttribute('aria-disabled', 'true')
    await expect(next).toHaveFocus()
    await expect(status.textContent?.trim()).toMatch(
      /^Cards? \d+( to \d+)? of 8$/,
    )
    const transform = row.style.transform
    await userEvent.keyboard('{Enter}')
    await expect(row.style.transform).toBe(transform)
    await expect(next).toHaveFocus()
  },
}

// A mouse click on a partly visible card lands on that card and doesn't slide
// the carousel (no focus follow for pointer focus).
export const MclCarouselPointerClick: Story = {
  ...MclCarouselExampleA,
  name: 'Mcl Carousel Pointer Click',
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvasElement, userEvent }) => {
    const { section, row, cards } = carouselParts(canvasElement)
    await expectOverflow(row, section)
    const s = section.getBoundingClientRect()
    const partly = cards.find((card) => {
      const c = card.getBoundingClientRect()
      return c.left < s.right - 40 && c.right > s.right + 1
    })
    await expect(partly).toBeDefined()
    const target = partly!.querySelector<HTMLElement>('[data-mcl-card-target]')!
    let clicked: EventTarget | null = null
    canvasElement.addEventListener('click', (e) => (clicked = e.target), {
      capture: true,
      once: true,
    })
    const transform = row.style.transform
    const visibleWidth = s.right - target.getBoundingClientRect().left
    await userEvent.click(target, {
      position: { x: Math.max(5, visibleWidth / 2), y: 20 },
    })
    await expect(clicked).toBe(target)
    await expect(target).toHaveFocus()
    await new Promise((r) => setTimeout(r, 100))
    await expect(row.style.transform).toBe(transform)
  },
}

// A focusable element after the carousel, for entering it backwards.
const withButtonAfter: Story['render'] = (args) => ({
  components: { 'mcl-carousel-a': MclCarouselA, 'mcl-card-a': MclCardA },
  setup() {
    return { args }
  },
  template: `<div>${(MclCarouselExampleA.render as any)(args).template}<button type="button">After the carousel</button></div>`,
})

/** The card holding focus, once it has settled fully in view. */
const expectFocusedCardInView = async (
  cards: HTMLElement[],
  section: HTMLElement,
) => {
  const i = cards.findIndex((card) => card.contains(document.activeElement))
  await expect(i).not.toBe(-1)
  await expectFullyInView(cards[i], section)
}

// Shift+Tab into the carousel from below lands on the last card, far out of
// view; Chromium scrolls the clipping section before focusin fires.
export const MclCarouselShiftTabIn: Story = {
  ...MclCarouselExampleA,
  name: 'Mcl Carousel Shift Tab In',
  render: withButtonAfter,
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const { section, row, cards } = carouselParts(canvasElement)
    await expectOverflow(row, section)
    canvas.getByRole('button', { name: 'After the carousel' }).focus()
    for (let i = 0; i < 3; i++) {
      await userEvent.tab({ shift: true })
      await expectFocusedCardInView(cards, section)
      await waitFor(() => expect(section.scrollLeft).toBe(0))
    }
  },
}

// A script focusing a card far out of view (spec: any focus but a pointer's).
export const MclCarouselFocusFromScript: Story = {
  ...MclCarouselExampleA,
  name: 'Mcl Carousel Focus From Script',
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvasElement }) => {
    const { section, row, cards } = carouselParts(canvasElement)
    await expectOverflow(row, section)
    cards[cards.length - 1]
      .querySelector<HTMLElement>('[data-mcl-card-target]')!
      .focus()
    await expectFocusedCardInView(cards, section)
    await waitFor(() => expect(section.scrollLeft).toBe(0))
  },
}

// Holding Tab: presses arrive faster than the slide.
export const MclCarouselRapidTab: Story = {
  ...MclCarouselExampleA,
  name: 'Mcl Carousel Rapid Tab',
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvasElement, userEvent }) => {
    const { section, next, row, cards } = carouselParts(canvasElement)
    await expectOverflow(row, section)
    next.focus()
    await userEvent.keyboard('{Tab}{Tab}{Tab}{Tab}{Tab}{Tab}{Tab}{Tab}{Tab}')
    await expectFocusedCardInView(cards, section)
    await waitFor(() => expect(section.scrollLeft).toBe(0))
  },
}

// motion-reduce:transition-none leaves transition-property: none with the
// 0.5s duration still set. Applied inline here, as the media query would.
export const MclCarouselReducedMotion: Story = {
  ...MclCarouselExampleA,
  name: 'Mcl Carousel Reduced Motion',
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvasElement, userEvent }) => {
    const { section, next, row } = carouselParts(canvasElement)
    await expectOverflow(row, section)
    row.style.transitionProperty = 'none'
    await expect(getComputedStyle(row).transitionDuration).toBe('0.5s')
    next.focus()
    const seen = new Set<string>()
    for (let i = 0; i < 3; i++) {
      await userEvent.keyboard('{Enter}')
      seen.add(row.style.transform)
    }
    await expect(seen.size).toBe(3)
  },
}
