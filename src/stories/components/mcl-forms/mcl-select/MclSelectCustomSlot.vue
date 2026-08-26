<script setup lang="ts">
import {
  MclFormGroup,
  MclSelect,
  type SelectOptionType,
} from '@/components/mcl-forms/lib'
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
const selectedVal = ref<string | number | null>(null)
const imageUrl =
  'https://res.cloudinary.com/dwgni1x3t/image/upload/f_auto,q_auto/c_scale,w_120/q_auto/v1700694621/ManguitoPage/q2nh4ytkyoghevzyodbo'

/**
 * The slot hands back the raw option, which is `string | SelectOptionType`
 * because either shape is allowed. The package does not export a label
 * helper, so a consumer rendering its own options narrows it here.
 */
const optionLabel = (option: string | SelectOptionType): string =>
  typeof option === 'string' ? option : option.text
</script>

<template>
  <div class="min-h-[40vh] rounded-md bg-light-2 px-sm py-md">
    <mcl-form-group
      field-id="mcl-select-custom-slot"
      label="MCL Select with Custom Slot"
      help-text="Custom option rendering still has to carry the listbox semantics."
    >
      <mcl-select v-model="selectedVal" :options="options" show-border rounded>
        <!--
          Taking over option rendering means taking over the combobox
          semantics with it: `role="option"` and the `optionId(index)` id are
          what `aria-activedescendant` points at, so omitting them leaves
          keyboard users with an unannounced list. `optionClick` takes the
          option alone — it is not an event handler.
        -->
        <template
          #dropdown="{
            options,
            activeIndex,
            optionClick,
            setRef,
            hover,
            optionId,
          }"
        >
          <li
            v-for="(item, idx) in options"
            :id="optionId(idx)"
            :key="idx"
            :ref="(el) => setRef(el, idx)"
            role="option"
            :aria-selected="optionLabel(item) === selectedVal"
            class="flex cursor-pointer items-center gap-4 px-2xs py-3xs transition-colors duration-300 ease-linear"
            :class="[activeIndex === idx && 'bg-warning']"
            @click="optionClick(item)"
            @mouseenter="hover(idx)"
          >
            <img
              :src="imageUrl"
              alt=""
              class="aspect-square w-lg rounded-full object-cover"
            />
            <span class="font-bold tracking-wider">
              {{ optionLabel(item) }}
            </span>
          </li>
        </template>
        <!--
          The no-match region is a role="status" div, not part of the listbox,
          so this content is plain markup rather than an <li>.
        -->
        <template #no-match>
          <div class="flex items-center gap-4 px-2xs py-3xs">
            <img
              :src="imageUrl"
              alt=""
              class="aspect-square w-lg rounded-full object-cover"
            />
            <span class="font-bold tracking-wider">No results!</span>
          </div>
        </template>
      </mcl-select>
    </mcl-form-group>
    <div class="mt-sm text-center">
      <p>Selected Value is: {{ selectedVal ?? '(none)' }}</p>
    </div>
  </div>
</template>
