// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { renderOnServer } from '../../__tests__/ssr'
import { useModalScrollLock } from '../useModalScrollLock'

describe('useModalScrollLock (server)', () => {
  it('does not touch document during setup', async () => {
    expect(typeof document).toBe('undefined')
    const Comp = defineComponent({
      setup() {
        useModalScrollLock(ref(true))
        return () => h('p', 'ok')
      },
    })
    const { html } = await renderOnServer(() => h(Comp))
    expect(html).toContain('ok')
  })
})
