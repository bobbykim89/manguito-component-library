// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { renderOnServer } from '@mcl/test-utils/ssr'
import Collapse from '../../collapse/Collapse.vue'
import { useCollapseTrigger } from '../useCollapseTrigger'

// The template ref is empty during SSR, so the trigger's attributes come from
// the id and starting state passed in; server html must already carry them.
const Panel = defineComponent({
  props: { visible: { type: Boolean, default: false } },
  setup(props) {
    const panel = ref()
    const trigger = useCollapseTrigger(panel, {
      id: 'faq',
      visible: () => props.visible,
    })
    return () => [
      h('button', trigger.attrs.value, 'Shipping'),
      h(
        Collapse,
        { ref: panel, id: 'faq', visible: props.visible },
        () => 'BODY',
      ),
    ]
  },
})

describe('useCollapseTrigger (server)', () => {
  it('closed: aria-expanded="false" and aria-controls in server html', async () => {
    const { html } = await renderOnServer(() => h(Panel))
    expect(html).toContain('aria-expanded="false"')
    expect(html).toContain('aria-controls="faq"')
  })

  it('open: aria-expanded="true" in server html', async () => {
    const { html } = await renderOnServer(() => h(Panel, { visible: true }))
    expect(html).toContain('aria-expanded="true"')
  })
})
