<script setup lang="ts">
import { MclFormGroup, MclSelect } from '@/components/mcl-forms/lib'
import { ref } from 'vue'

const options = [
  'Manguito',
  'Pollito',
  'Lovebird',
  'Saguaro cactus',
  'Parrot',
  'Cockatoo',
  'Cockatiel',
  'Greencheek Conure',
  'Monk Parakeet',
]

// With `string[]` options the label and the value are the same string, so the
// model is just the chosen string. It starts as null, not '' — that is what
// "nothing selected" is.
const selectedVal = ref<string | number | null>(null)
</script>

<template>
  <div class="min-h-[40vh] rounded py-md">
    <!--
      No `id` on the select: single-label mode hands it the group's, which is
      what binds this label to the combobox.
    -->
    <mcl-form-group
      field-id="mcl-select-example"
      label="MCL Select with String Options"
      help-text="Options given as a plain string array."
    >
      <mcl-select
        v-model="selectedVal"
        :options="options"
        show-border
        rounded
      ></mcl-select>
    </mcl-form-group>
    <div class="mt-sm text-center">
      <p>Selected Value is: {{ selectedVal ?? '(none)' }}</p>
    </div>
  </div>
</template>

<style scoped></style>
