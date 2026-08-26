<script setup lang="ts">
import { MclFormGroup, MclInputText } from '@/components/mcl-forms/lib'
import { ref } from 'vue'

const value = ref<string>('')
</script>

<template>
  <!--
    The control takes no `id`: in single-label mode it inherits the group's,
    which is what binds this label to it.
  -->
  <mcl-form-group
    field-id="mcl-input-text-1"
    label="MCL Input Text"
    help-text="The label's `for` and the input's id are wired for you."
  >
    <mcl-input-text v-model="value"></mcl-input-text>
  </mcl-form-group>
</template>

<style scoped></style>
