// @vitest-environment jsdom
import { hydrate } from '@mcl/test-utils/ssr'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import MclInputText from '../mcl-input-text/MclInputText.vue'
import MclFormGroup from './MclFormGroup.vue'

describe('MclFormGroup — server render and hydration', () => {
  it('server HTML labels an own-id input via aria-labelledby; hydration is clean; label for becomes the own id', async () => {
    const { container, warnings, unmount } = await hydrate(() =>
      h(MclFormGroup, { label: 'Email' }, () => h(MclInputText, { id: 'own' })),
    )
    expect(warnings).toEqual([])
    const input = container.querySelector('input')!
    const label = container.querySelector('label')!
    expect(input.id).toBe('own')
    expect(input.getAttribute('aria-labelledby')).toBe(label.id)
    expect(label.id).toBeTruthy()
    await nextTick()
    expect(label.htmlFor).toBe('own')
    unmount()
  })
})
