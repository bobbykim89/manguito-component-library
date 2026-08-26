<script setup lang="ts">
import {
  MclCheckbox,
  MclFormGroup,
  MclInputRadio,
} from '@/components/mcl-forms/lib'
import { ref } from 'vue'

const plan = ref<string | number | null>('standard')
const addOns = ref<Record<string, boolean>>({
  backups: true,
  analytics: false,
})

const plans = [
  { value: 'free', text: 'Free' },
  { value: 'standard', text: 'Standard' },
  { value: 'pro', text: 'Pro' },
]
const addOnList = [
  { value: 'backups', text: 'Nightly backups' },
  { value: 'analytics', text: 'Usage analytics' },
]
</script>

<template>
  <section class="rounded-md bg-light-2 px-md py-md">
    <h3 class="h3-md mb-sm">Fieldset mode (<code>group-label</code>)</h3>

    <!--
      group-label renders <fieldset>/<legend> rather than <label for>. There is
      no single `for` to match, so each control generates its own id instead of
      sharing the group's — which is what makes a set of controls under one
      label legal.
    -->
    <div class="mb-md rounded-md bg-light-1 px-sm py-sm">
      <mcl-form-group
        group-label
        label="Plan"
        help-text="One shared v-model across the set; each radio carries its own value."
        text-bold
      >
        <!--
          The control sits inside the <label>, not beside it: fieldset mode
          gives each radio a generated id, so there is no id here to point a
          `for` at. Implicit labelling is the only correct association.
        -->
        <label
          v-for="item in plans"
          :key="item.value"
          class="mb-2xs flex items-center gap-2xs last:mb-0"
        >
          <mcl-input-radio
            v-model="plan"
            :value="item.value"
            name="plan"
          ></mcl-input-radio>
          <span>{{ item.text }}</span>
        </label>
      </mcl-form-group>
    </div>

    <div class="mb-md rounded-md bg-light-1 px-sm py-sm">
      <mcl-form-group
        group-label
        label="Add-ons"
        help-text="Each checkbox is its own boolean model."
        text-bold
      >
        <label
          v-for="item in addOnList"
          :key="item.value"
          class="mb-2xs flex items-center gap-2xs last:mb-0"
        >
          <mcl-checkbox v-model="addOns[item.value]"></mcl-checkbox>
          <span>{{ item.text }}</span>
        </label>
      </mcl-form-group>
    </div>

    <div class="rounded-md bg-warning px-sm py-xs text-sm">
      <p><span class="font-bold">plan:</span> {{ plan }}</p>
      <p>
        <span class="font-bold">add-ons:</span>
        {{ Object.keys(addOns).filter((key) => addOns[key]) }}
      </p>
    </div>
  </section>
</template>
