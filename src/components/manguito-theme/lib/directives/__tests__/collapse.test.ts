import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, withDirectives } from 'vue'

// vCollapse is sunsetted (#103): it still exports, but no collapse component
// reacts to it, so mounting it must tell the consumer.
describe('vCollapse', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.resetModules()
  })

  it('warns once per page that it no longer works, however many triggers mount', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { vCollapse } = await import('../collapse.directive')
    const Host = defineComponent({
      setup: () => () =>
        h('div', [
          withDirectives(h('button'), [[vCollapse, undefined, 'panel-1']]),
          withDirectives(h('button'), [[vCollapse, undefined, 'panel-2']]),
        ]),
    })
    const w = mount(Host)
    mount(Host).unmount()

    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn.mock.calls[0][0]).toMatch(/v-collapse/)
    expect(warn.mock.calls[0][0]).toMatch(/AccordionGroup/)
    w.unmount()
  })
})
