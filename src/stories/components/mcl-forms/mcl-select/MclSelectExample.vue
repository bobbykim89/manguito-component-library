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
  'Cockatiel',
]
const selectedVal = ref<string>('')
</script>

<template>
  <div class="py-md min-h-[40vh] rounded">
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
