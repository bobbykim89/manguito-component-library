<script setup lang="ts">
import GrandCanyonImage from '@/assets/images/grandcanyon-image.jpg'
import { Card } from '@/components/manguito-theme/lib'
import { computed } from 'vue'

const bgImage = computed(() => {
  return { 'background-image': `url('${GrandCanyonImage}')` }
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
      <div class="grid gap-4 lg:grid-cols-3">
        <Card title="Base Card" :image-src="polloUrl" :image-alt="polloAlt"
          ><template #body
            ><div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              tenetur impedit hic iure, consectetur cupiditate nesciunt ullam
              voluptatum veniam ipsam?
            </div></template
          ></Card
        >
        <Card
          title="Glassmorphism Enabled"
          :image-src="polloUrl"
          :image-alt="polloAlt"
          glass
          ><template #body
            ><div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga
              labore dolorem veniam blanditiis amet vero tempora doloremque
              ipsum dicta commodi, similique officia ad quis cumque vitae ut
              voluptates saepe nesciunt.
            </div></template
          ></Card
        >
        <Card
          title="Default Header & Footer"
          :image-src="polloUrl"
          :image-alt="polloAlt"
          variant="warning"
          border
          rounded
          border-variant="dark-1"
          header="Hello!"
          footer="Footer text"
        ></Card>
      </div>
    </section>
    <section class="px-md py-lg bg-light-4 container">
      <div class="grid grid-cols-3 gap-4">
        <Card :image-src="polloUrl" :image-alt="polloAlt" no-body>
          <div class="py-2xs">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat,
              illum.
            </p>
            <h2 class="h2-md">No body</h2>
          </div>
        </Card>
        <Card title="No Image" no-image header="Card with no image">
          <template #body>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              magnam. Quod voluptatum atque asperiores quas nostrum dolores quis
              ipsa aperiam?
            </div>
          </template>
        </Card>
        <Card title="Custom Header & Footer" no-image>
          <template #header>
            <div
              class="py-2xs px-xs border-success flex items-center justify-between gap-2 border-b"
            >
              <img
                :src="polloUrl"
                :alt="polloAlt"
                class="h-lg aspect-square rounded-full object-cover object-center"
              />
              <p class="font-bold">Custom header text</p>
            </div>
          </template>
          <template #body>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              magnam. Quod voluptatum atque asperiores quas nostrum dolores quis
              ipsa aperiam?
            </div>
          </template>
          <template #footer>
            <div class="px-xs py-2xs border-primary border-t">
              <div class="flex items-center justify-between gap-2">
                <p class="font-bold">Custom Footer text</p>
                <img
                  :src="polloUrl"
                  :alt="polloAlt"
                  class="h-lg aspect-square rounded-full object-cover object-center"
                />
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam, saepe?
              </p>
            </div>
          </template>
        </Card>
        <div class="col-span-2">
          <Card
            no-body
            glass
            border
            rounded
            variant="dark-1"
            border-variant="danger"
            footer="Footer Text here.."
          >
            <div class="grid grid-cols-3">
              <img
                :src="polloUrl"
                :alt="polloAlt"
                class="aspect-square h-full object-cover object-top"
              />
              <div class="px-sm py-xs col-span-2">
                <h3 class="h3-md mb-sm">Custom Horizontal Card</h3>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos, eum, inventore aliquam at molestias ducimus ad
                  dolore voluptates explicabo, placeat laudantium labore illo
                  reiciendis aut voluptatem culpa mollitia numquam! Beatae?
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
