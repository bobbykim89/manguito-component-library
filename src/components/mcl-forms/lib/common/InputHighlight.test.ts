import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import InputHighlight from './InputHighlight.vue'

describe('InputHighlight', () => {
  it('the highlight bar has motion-reduce:before:transition-none', () => {
    expect(mount(InputHighlight).classes()).toContain(
      'motion-reduce:before:transition-none',
    )
  })
})
