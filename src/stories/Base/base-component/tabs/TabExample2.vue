<script setup lang="ts">
import { ref } from 'vue'
import {
  TabContainer,
  TabContent,
  vCollapse,
  Collapse,
} from '@/components/manguito-theme/lib'
import {
  MclFormGroup,
  MclInputText,
  MclSelect,
} from '@/components/mcl-forms/lib'

const collapseContent = [
  {
    id: '1',
    title: 'Accordion 1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
  {
    id: '2',
    title: 'Accordion 2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
  {
    id: '3',
    title: 'Accordion 3',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
  {
    id: '4',
    title: 'Accordion 4',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?',
  },
]

const customButtonColor = (idx: number): string => {
  switch (idx) {
    case 0:
      return 'btn-primary'
    case 1:
      return 'btn-secondary'
    case 2:
      return 'btn-success'
    case 3:
      return 'btn-danger'
    default:
      return ' '
  }
}

const textRef = ref<string>('')
const options = [
  'Lovebird',
  'Budgie',
  'Cockatoo',
  'Cockatiel',
  'Greencheek Conure',
  'Monk Parakeet',
  'Scarlet Macaw',
]
const selectedVal = ref<string>('')

const handleFormSubmit = () => {
  console.log({
    name: textRef.value,
    bird: selectedVal.value,
  })
  textRef.value = ''
  selectedVal.value = ''
}
</script>

<template>
  <div class="container bg-light-1 px-xs">
    <TabContainer
      :body-class="['grid md:grid-cols-5 gap-sm py-lg md:py-2xl']"
      :btn-container-class="['border-b-2 md:border-b-0 border-b-warning']"
      :content-container-class="[
        'md:col-span-4',
        'bg-light-4',
        'px-xs',
        'py-sm',
        'rounded-md',
        'overflow-hidden',
      ]"
    >
      <template #tab-button="{ update, activeTab }">
        <div class="flex md:flex-col justify-start gap-[2px]">
          <button
            role="tab"
            :tabindex="activeTab === 0 ? -1 : 0"
            aria-controls="tab-0"
            :aria-selected="activeTab === 0"
            class="px-xs py-2xs bg-light-4 hover:bg-opacity-70 transition-all duration-300 font-bold rounded-tl-md md:rounded-t-md"
            @click="update(0)"
          >
            Tab 0
          </button>
          <button
            role="tab"
            :tabindex="activeTab === 1 ? -1 : 0"
            aria-controls="tab-1"
            :aria-selected="activeTab === 1"
            class="px-xs py-2xs bg-light-4 hover:bg-opacity-70 transition-all duration-300 font-bold"
            @click="update(1)"
          >
            Tab 1
          </button>
          <button
            role="tab"
            :tabindex="activeTab === 2 ? -1 : 0"
            aria-controls="tab-2"
            :aria-selected="activeTab === 2"
            class="px-xs py-2xs bg-light-4 hover:bg-opacity-70 transition-all duration-300 font-bold"
            @click="update(2)"
          >
            Tab 2
          </button>
          <button
            role="tab"
            :tabindex="activeTab === 3 ? -1 : 0"
            aria-controls="tab-3"
            :aria-selected="activeTab === 3"
            class="px-xs py-2xs bg-light-4 hover:bg-opacity-70 transition-all duration-300 font-bold rounded-tr-md md:rounded-tr-none md:rounded-b-md"
            @click="update(3)"
          >
            Tab 3
          </button>
        </div>
      </template>
      <template #tab-content>
        <TabContent :tab-number="0" id="tab-0">
          <div>
            <img
              src="https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1666385529/ManguitoPage/jvbzjwf6vprjcm1mqjpd.jpg"
              alt="picture of manguito"
              class="w-3xl mx-auto rounded-md mb-sm"
            />
            <p class="px-xs md:px-md">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Corrupti, asperiores neque. Neque consectetur delectus ut in
              molestias, distinctio praesentium similique voluptas quasi numquam
              excepturi hic omnis necessitatibus debitis, a porro repellendus
              cumque eos voluptatum maiores nostrum eveniet! Deleniti nam non
              ipsam voluptatibus quo rerum incidunt unde ullam doloremque
              perspiciatis. Commodi!
            </p>
          </div>
        </TabContent>
        <TabContent :tab-number="1" id="tab-1">
          <div>
            <div class="p-2xs border-2 border-warning rounded-md bg-white">
              <div
                v-for="(item, idx) in collapseContent"
                class="mb-sm last:mb-0"
              >
                <a
                  :href="`#${item.id}`"
                  v-collapse
                  class="btn btn-full btn-no-ring"
                  :class="customButtonColor(idx)"
                  >{{ item.title }} Header</a
                >
                <collapse
                  :id="item.id"
                  class-name="bg-light-3 p-xs"
                  :visible="idx === 0 ? true : false"
                  accordion="my-accordion"
                >
                  <div>
                    {{ item.content }}
                  </div>
                </collapse>
              </div>
            </div>
          </div>
        </TabContent>
        <TabContent :tab-number="2" id="tab-2">
          <div>
            <div class="p-xs md:p-sm rounded-md bg-light-3">
              <h3 class="h3-md mb-sm text-center">Submit Form</h3>
              <form @submit.prevent="handleFormSubmit" class="mx-auto">
                <MclFormGroup label-for="bird" label="Favorite Bird">
                  <MclSelect
                    id="bird"
                    :options="options"
                    v-model="selectedVal"
                    highlight-color="warning"
                    required
                    rounded
                  ></MclSelect>
                </MclFormGroup>
                <MclFormGroup label-for="name" label="Name" class="mb-md">
                  <MclInputText
                    id="name"
                    v-model="textRef"
                    highlight-color="warning"
                    required
                    rounded
                  ></MclInputText>
                </MclFormGroup>
                <div class="text-end">
                  <button class="btn btn-warning" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </TabContent>
        <TabContent :tab-number="3" id="tab-3">
          <div class="bg-info text-light-3 rounded-md p-xs">
            <h3 class="h3-md mb-xs">Title text</h3>
            <p
              class="mb-xs"
              :class="[
                ['bg-secondary', 'px-md'],
                ['py-sm', 'rounded-md'],
                'text-dark-3',
              ]"
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Corrupti, asperiores neque. Neque consectetur delectus ut in
              molestias, distinctio praesentium similique voluptas quasi numquam
              excepturi hic omnis necessitatibus debitis, a porro repellendus
              cumque eos voluptatum maiores nostrum eveniet! Deleniti nam non
              ipsam voluptatibus quo rerum incidunt unde ullam doloremque
              perspiciatis. Commodi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              ratione voluptate, vero blanditiis aut dolorum nobis aliquam enim
              cum ut assumenda incidunt veritatis id reiciendis doloremque ipsa,
              numquam sed praesentium, saepe excepturi reprehenderit?
              Voluptatibus provident, cumque vel inventore explicabo molestias
              ex, necessitatibus atque unde alias in? Voluptatem quasi alias,
              doloremque cumque distinctio nostrum nihil nobis totam, ullam
              sapiente, ipsum deserunt aut corporis omnis eum minus reiciendis
              ab neque enim sed? Quis necessitatibus aliquid odit totam eum
              eligendi pariatur provident similique, impedit architecto velit
              minima quod laboriosam magnam nemo maxime optio ipsam blanditiis
              ducimus alias. Ea eligendi neque soluta eius ab.
            </p>
          </div>
        </TabContent>
      </template>
    </TabContainer>
  </div>
</template>

<style scoped></style>
