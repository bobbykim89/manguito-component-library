<script setup lang="ts">
import BarcelonaImage from '@/assets/images/barcelona-image.jpg'
import GrandCanyonImage from '@/assets/images/grandcanyon-image.jpg'
import { MclCardA } from '@/components/mcl-cards/lib'
import { computed } from 'vue'

const bgImage = computed(() => {
  return { 'background-image': `url('${GrandCanyonImage}')` }
})

const barcelonaBgImage = computed(() => {
  return { 'background-image': `url('${BarcelonaImage}')` }
})

const polloUrl: string =
  'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg'
const polloAlt: string = 'Manguito is perching'
</script>

<template>
  <div>
    <section
      :style="bgImage"
      class="px-md py-lg container bg-cover bg-center bg-no-repeat"
    >
      <div>
        <h2 class="h2-lg mb-sm">More MclCardA Examples</h2>
      </div>
      <div class="grid justify-items-center gap-4 lg:grid-cols-3">
        <MclCardA
          title="MCL Card A"
          :image-source="polloUrl"
          :image-alt="polloAlt"
          cta-text="Learn more"
          label-text="Plain"
        >
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam,
            sit!
          </div>
        </MclCardA>
        <MclCardA
          title="MCL Card A"
          :image-source="polloUrl"
          :image-alt="polloAlt"
          cta-text="Learn more"
          label-text="Glassmorphism"
          glass
          glass-blur="xs"
          :glass-opacity="10"
          bg-color="warning"
        >
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
            pariatur saepe incidunt a totam quibusdam ipsam veritatis. Magnam,
            aliquam dicta?
          </div>
        </MclCardA>
        <MclCardA
          title="MCL Card A"
          cta-text="Learn more"
          label-text="No Image"
          bg-color="success"
          :display-image="false"
        >
          <div>
            <p class="mb-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
              pariatur saepe incidunt a totam quibusdam ipsam veritatis. Magnam,
              aliquam dicta?
            </p>
            <div
              class="py-2xs px-xs bg-light-1/50 flex items-center gap-4 rounded-md drop-shadow-lg"
            >
              <img
                :src="polloUrl"
                :alt="polloAlt"
                class="h-lg aspect-square rounded-full object-cover object-center"
              />
              <p class="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Facilis, doloremque!
              </p>
            </div>
          </div>
        </MclCardA>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
