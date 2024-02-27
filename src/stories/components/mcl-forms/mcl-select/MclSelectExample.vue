<script setup lang="ts">
import { ref } from 'vue'
import { MclSelect, MclFormGroup } from '@/components/mcl-forms'

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
  'Cockatiel',
]
const selectedVal = ref<string>('')
</script>

<template>
  <div class="py-md">
    <mcl-form-group
      label-for="mcl-select-example"
      label="MCL Select with String Options"
    >
      <mcl-select
        id="mcl-select-example"
        :options="options"
        display-border
        rounded
        v-model="selectedVal"
      ></mcl-select>
    </mcl-form-group>
    <div class="text-center mt-sm">
      <p>Selected Value is: {{ selectedVal }}</p>
    </div>
  </div>
</template>

<style scoped></style>
