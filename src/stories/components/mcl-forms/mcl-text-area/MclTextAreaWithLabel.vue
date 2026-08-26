<script setup lang="ts">
import { MclFormGroup, MclTextArea } from '@/components/mcl-forms/lib'
import { ref } from 'vue'

const value = ref<string>('')
</script>

<template>
  <mcl-form-group field-id="mcl-text-area-1" label="MCL Text Area">
    <mcl-text-area v-model="value"></mcl-text-area>
  </mcl-form-group>
</template>
