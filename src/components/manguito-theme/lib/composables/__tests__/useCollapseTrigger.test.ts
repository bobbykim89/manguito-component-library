import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { hydrate } from '@mcl/test-utils/ssr'
import AccordionGroup from '../../collapse/AccordionGroup.vue'
import Collapse from '../../collapse/Collapse.vue'
import { useCollapseTrigger } from '../useCollapseTrigger'
import CollapseTriggerFixture from './CollapseTriggerFixture.vue'

// #111 item 3: a hand-built trigger for the base Collapse gets aria-expanded
// and aria-controls without wiring them itself.

const settle = () => new Promise((r) => setTimeout(r, 50))

/** A button that toggles a base Collapse through useCollapseTrigger. */
const Panel = defineComponent({
  props: {
    id: { type: String, required: true },
    visible: { type: Boolean, default: false },
  },
  setup(props) {
    // Typed as consumers will type it, so typecheck proves the ref fits.
    const panel = ref<InstanceType<typeof Collapse>>()
    const trigger = useCollapseTrigger(panel, {
      id: props.id,
      visible: () => props.visible,
    })
    return () => [
      h(
        'button',
        { ...trigger.attrs.value, onClick: trigger.toggle },
        props.id,
      ),
      h(
        Collapse,
        { ref: panel, id: props.id, visible: props.visible },
        { default: () => `BODY ${props.id}` },
      ),
    ]
  },
})

const button = (id: string) =>
  [...document.body.querySelectorAll('button')].find(
    (b) => b.textContent === id,
  )!

describe('useCollapseTrigger', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('points aria-controls at the collapse', () => {
    const w = mount(Panel, { props: { id: 'faq' }, attachTo: document.body })
    expect(button('faq').getAttribute('aria-controls')).toBe('faq')
    expect(document.getElementById('faq')).not.toBeNull()
    w.unmount()
  })

  it('reflects the starting state', () => {
    const closed = mount(Panel, {
      props: { id: 'a' },
      attachTo: document.body,
    })
    const open = mount(Panel, {
      props: { id: 'b', visible: true },
      attachTo: document.body,
    })
    expect(button('a').getAttribute('aria-expanded')).toBe('false')
    expect(button('b').getAttribute('aria-expanded')).toBe('true')
    closed.unmount()
    open.unmount()
  })

  it('toggles the collapse and follows its state', async () => {
    const w = mount(Panel, { props: { id: 'faq' }, attachTo: document.body })
    button('faq').click()
    await nextTick()
    expect(button('faq').getAttribute('aria-expanded')).toBe('true')
    expect(w.findComponent(Collapse).vm.isOpen).toBe(true)
    button('faq').click()
    await nextTick()
    expect(button('faq').getAttribute('aria-expanded')).toBe('false')
    w.unmount()
  })

  it('follows a change made through the collapse itself', async () => {
    const w = mount(Panel, { props: { id: 'faq' }, attachTo: document.body })
    w.findComponent(Collapse).vm.open()
    await nextTick()
    expect(button('faq').getAttribute('aria-expanded')).toBe('true')
    w.unmount()
  })

  it('in an AccordionGroup, opening one panel marks the other collapsed', async () => {
    const w = mount(AccordionGroup, {
      slots: {
        default: () => [
          h(Panel, { id: 'one', visible: true }),
          h(Panel, { id: 'two' }),
        ],
      },
      attachTo: document.body,
    })
    await nextTick()
    expect(button('one').getAttribute('aria-expanded')).toBe('true')
    button('two').click()
    await nextTick()
    expect(button('one').getAttribute('aria-expanded')).toBe('false')
    expect(button('two').getAttribute('aria-expanded')).toBe('true')
    w.unmount()
  })

  it('hydrates server html with no warnings', async () => {
    const r = await hydrate(() => h(Panel, { id: 'faq', visible: true }))
    await settle()
    expect(r.warnings).toEqual([])
    expect(button('faq').getAttribute('aria-expanded')).toBe('true')
    r.unmount()
  })

  it('works from an SFC template as documented', async () => {
    const w = mount(CollapseTriggerFixture, { attachTo: document.body })
    const b = button('Toggle')
    expect(b.getAttribute('aria-controls')).toBe('fixture')
    expect(b.getAttribute('aria-expanded')).toBe('false')
    b.click()
    await nextTick()
    expect(b.getAttribute('aria-expanded')).toBe('true')
    w.unmount()
  })
})
