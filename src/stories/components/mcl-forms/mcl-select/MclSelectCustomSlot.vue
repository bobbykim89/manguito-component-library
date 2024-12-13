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
const imageUrl =
  'https://res.cloudinary.com/dwgni1x3t/image/upload/f_auto,q_auto/c_scale,w_120/q_auto/v1700694621/ManguitoPage/q2nh4ytkyoghevzyodbo'
</script>

<template>
  <div class="bg-light-2 rounded-md py-md px-sm min-h-[40vh]">
    <mcl-form-group
      label-for="mcl-select-example"
      label="MCL Select with Custom Slot"
    >
      <mcl-select
        id="mcl-select-example"
        :options="options"
        display-border
        rounded
        v-model="selectedVal"
      >
        <template
          #dropdown="{ optionClick, options, activeIndex, setRef, hover }"
        >
          <li
            v-for="(item, idx) in options"
            @click="optionClick($event, item)"
            class="cursor-pointer flex gap-4 py-3xs px-2xs items-center transition-colors duration-300 ease-linear"
            :class="[activeIndex === idx && 'bg-warning']"
            :ref="(el) => setRef(el, idx)"
            @mouseover="hover(idx)"
          >
            <img
              :src="imageUrl"
              alt="picture of manguito"
              class="aspect-square rounded-full object-cover w-lg"
            />
            <span class="font-bold tracking-wider">
              {{ item }}
            </span>
          </li>
        </template>
        <template #no-match>
          <li
            class="cursor-pointer flex gap-4 py-3xs px-2xs items-center hover:bg-warning transition-colors duration-300 ease-linear"
          >
            <img
              :src="imageUrl"
              alt="picture of manguito"
              class="aspect-square rounded-full object-cover w-lg"
            />
            <span class="font-bold tracking-wider"> No results! </span>
          </li>
        </template>
      </mcl-select>
    </mcl-form-group>
    <div class="text-center mt-sm">
      <p>Selected Value is: {{ selectedVal }}</p>
    </div>
  </div>
</template>
