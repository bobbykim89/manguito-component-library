<script setup lang="ts">
import { vTooltip } from '@/components/manguito-theme/lib'
</script>

<template>
  <section class="container">
    <div
      class="grid grid-cols-3 gap-6 justify-items-center content-center mb-2xs bg-white py-sm px-xs md:py-md md:px-sm"
    >
      <div class="col-span-3">
        <h3>Tooltips directions</h3>
      </div>
      <div class="place-self-center">
        <button v-tooltip title="Default tooltip" class="btn">Default</button>
      </div>
      <div class="place-self-center">
        <button v-tooltip.right title="Tooltip text" class="btn btn-secondary">
          Right
        </button>
      </div>
      <div class="place-self-center">
        <button v-tooltip.left title="Tooltip text" class="btn btn-success">
          Left
        </button>
      </div>
      <div class="place-self-center">
        <button v-tooltip.top title="Tooltip text" class="btn btn-info">
          Top
        </button>
      </div>
      <div class="place-self-center">
        <button v-tooltip.bottom title="Tooltip text" class="btn btn-warning">
          Bottom
        </button>
      </div>
      <div class="col-span-3">
        <h3>Tooltips colors</h3>
      </div>
      <div class="place-self-center">
        <button v-tooltip title="Tooltip text" color="primary" class="btn">
          Primary
        </button>
      </div>
      <div class="place-self-center">
        <button
          v-tooltip
          title="Tooltip text"
          color="secondary"
          class="btn btn-secondary"
        >
          Secondary
        </button>
      </div>
      <div class="place-self-center">
        <button
          v-tooltip.top
          title="Tooltip text"
          color="warning"
          class="btn btn-warning"
        >
          Warning
        </button>
      </div>
      <div class="place-self-center">
        <button
          v-tooltip
          title="Tooltip text"
          text-color="primary"
          class="btn btn-invert"
        >
          Text Primary
        </button>
      </div>
      <div class="place-self-center">
        <button
          v-tooltip
          title="Tooltip text"
          text-color="secondary"
          class="btn btn-invert btn-secondary"
        >
          Text Secondary
        </button>
      </div>
      <div class="place-self-center">
        <button
          v-tooltip.bottom
          title="Tooltip text"
          text-color="warning"
          class="btn btn-invert btn-warning"
        >
          Text Warning
        </button>
      </div>
      <div class="col-span-3">
        <h3>Tooltips width</h3>
      </div>
      <div class="place-self-center">
        <button v-tooltip title="Tooltip text" class="btn">Default</button>
      </div>
      <div class="place-self-center col-span-2">
        <button
          v-tooltip.top
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          class="btn btn-danger btn-fullwidth"
          tooltip-width="400"
        >
          Width 400px
        </button>
      </div>
      <div class="col-span-3">
        <h3>Tooltips with custom classes</h3>
      </div>
      <div class="place-self-center col-span-3">
        <button
          v-tooltip.top="{
            title:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            width: 400,
            className: 'border-primary border-2 font-bold text-xl rounded-lg',
            color: 'light-3',
            textColor: 'dark-3',
          }"
          class="btn btn-danger btn-fullwidth"
        >
          Adding custom classes
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
