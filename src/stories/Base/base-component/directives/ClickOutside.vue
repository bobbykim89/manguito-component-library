<script setup lang="ts">
import { vClickOutside } from '@/components/manguito-theme/lib/directives'
import { nextTick, ref } from 'vue'

// A non-modal panel: it doesn't trap focus or hide the page, so it is a
// labelled region, not a dialog. Opening moves focus into it; Escape and the
// Close button return focus to the opener. A click outside closes it and
// leaves focus where the click put it.
const showPanel = ref<boolean>(false)
const panelRef = ref<HTMLElement>()
const openerRef = ref<HTMLButtonElement>()

const openPanel = async () => {
  showPanel.value = true
  await nextTick()
  panelRef.value?.focus()
}

const closePanel = () => {
  showPanel.value = false
}

const closeAndReturnFocus = () => {
  closePanel()
  openerRef.value?.focus()
}
</script>

<template>
  <div>
    <button
      ref="openerRef"
      type="button"
      :aria-expanded="showPanel"
      @click="openPanel"
      class="btn btn-secondary"
    >
      Open Panel
    </button>

    <Teleport to="body">
      <div v-if="showPanel" class="flex justify-center">
        <div
          ref="panelRef"
          v-click-outside="closePanel"
          role="region"
          aria-labelledby="click-outside-panel-title"
          tabindex="-1"
          class="mx-auto max-w-[28rem] rounded-md border-dark-1 bg-light-4 p-sm drop-shadow-md md:max-w-[36rem]"
          @keydown.esc="closeAndReturnFocus"
        >
          <h2 id="click-outside-panel-title">Simple Panel</h2>
          <p class="mb-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi omnis
            ratione voluptates recusandae quas labore eaque quo est nihil unde
            quisquam doloribus, veniam tenetur molestias earum quis enim, quasi
            commodi corrupti totam? Velit facilis eligendi ullam ex nihil
            incidunt nulla impedit magni ad, explicabo temporibus sequi
            voluptates deleniti, harum sit!
          </p>
          <button
            type="button"
            class="btn btn-warning"
            @click="closeAndReturnFocus"
          >
            Close
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
