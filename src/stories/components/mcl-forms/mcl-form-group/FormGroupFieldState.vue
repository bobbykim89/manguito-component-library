<script setup lang="ts">
import {
  MclFormGroup,
  MclInputText,
  MclSelect,
  MclTextArea,
} from '@/components/mcl-forms/lib'
import { ref } from 'vue'

// The three flags MclFormGroup cascades to every descendant control.
const groupInvalid = ref<boolean>(true)
const groupRequired = ref<boolean>(true)
const groupDisabled = ref<boolean>(false)

const name = ref<string>('')
const role = ref<string | number | null>(null)
const notes = ref<string>('')

const roles = [
  { text: 'Owner', value: 'owner' },
  { text: 'Editor', value: 'editor' },
  { text: 'Viewer', value: 'viewer' },
]
</script>

<template>
  <section class="min-h-[60vh] rounded-md bg-light-2 px-md py-md">
    <h3 class="h3-md mb-sm">Group state cascade</h3>

    <div class="mb-md flex flex-wrap gap-md text-sm">
      <label class="flex items-center gap-2xs">
        <input v-model="groupInvalid" type="checkbox" />
        <span><code>invalid</code></span>
      </label>
      <label class="flex items-center gap-2xs">
        <input v-model="groupRequired" type="checkbox" />
        <span><code>required</code></span>
      </label>
      <label class="flex items-center gap-2xs">
        <input v-model="groupDisabled" type="checkbox" />
        <span><code>disabled</code></span>
      </label>
    </div>

    <!--
      One group, three controls. None of them declares invalid/required/
      disabled, so all three resolve those from the group. The group also owns
      the single error region: each control skips rendering its own and points
      aria-describedby here instead.
    -->
    <div class="mb-md rounded-md bg-light-1 px-sm py-sm">
      <mcl-form-group
        field-id="cascade-name"
        label="Full name"
        help-text="Cascaded from the group: no flag is set on the control itself."
        invalid-feedback="This field needs a value."
        :invalid="groupInvalid"
        :required="groupRequired"
        :disabled="groupDisabled"
      >
        <mcl-input-text v-model="name" placeholder="Manguito"></mcl-input-text>
      </mcl-form-group>
    </div>

    <div class="mb-md rounded-md bg-light-1 px-sm py-sm">
      <mcl-form-group
        field-id="cascade-role"
        label="Role"
        invalid-feedback="Pick a role."
        :invalid="groupInvalid"
        :required="groupRequired"
        :disabled="groupDisabled"
      >
        <mcl-select v-model="role" :options="roles"></mcl-select>
      </mcl-form-group>
    </div>

    <!--
      A control's own prop always wins over the group's. `:invalid="false"`
      here stays valid no matter what the group says.
    -->
    <div class="mb-md rounded-md bg-light-1 px-sm py-sm">
      <mcl-form-group
        field-id="cascade-notes"
        label="Notes"
        help-text='This control overrides the group with :invalid="false".'
        invalid-feedback="You should not see this."
        :invalid="groupInvalid"
        :required="groupRequired"
        :disabled="groupDisabled"
      >
        <mcl-text-area
          v-model="notes"
          :invalid="false"
          :rows="3"
        ></mcl-text-area>
      </mcl-form-group>
    </div>

    <div class="rounded-md bg-warning px-sm py-xs text-sm">
      <p>
        <span class="font-bold">name:</span> {{ name || '(empty)' }} &middot;
        <span class="font-bold">role:</span> {{ role ?? '(none)' }} &middot;
        <span class="font-bold">notes:</span> {{ notes || '(empty)' }}
      </p>
    </div>
  </section>
</template>
