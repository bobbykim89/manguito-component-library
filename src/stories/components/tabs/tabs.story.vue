<script lang="ts" setup>
import { reactive } from 'vue'
import TabsAlpha from '@/components/tabs-alpha'
import type { ContentType } from '@/components/tabs-alpha/TabsAlpha.vue'
import type {
  ColorPalette,
  HeadingSize,
} from '@/components/manguito-theme/theme/theme.types'
import { colors, bodyTextSize, headingTextSize } from '@/assets/options'

type ContentArray = ContentType[]

const contentInfo: ContentArray = [
  {
    title: 'First',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt blanditiis magni similique quidem nisi quae. Aspernatur ut tempora doloremque dicta ipsum temporibus eius delectus, quas nihil exercitationem, in impedit natus vitae, esse dolore quia totam consequuntur sequi sint odio ducimus explicabo aliquid omnis quam. Quasi porro eum distinctio perspiciatis fugit?',
  },
  {
    title: 'Second',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, accusantium. Optio molestias, quod inventore suscipit perferendis ex quaerat odit deleniti quidem laudantium ducimus recusandae illo possimus quam error tempora laborum sapiente magnam quas harum distinctio numquam saepe quasi! Officiis, ipsam!',
  },
  {
    title: 'Third',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores laboriosam totam, error reprehenderit quasi commodi, aspernatur a deserunt eligendi nobis sequi vero fuga in consequuntur ipsum. Quod nesciunt nulla corrupti voluptatibus? Natus, corporis quisquam! Corrupti eos, placeat, similique nostrum possimus officia aperiam cupiditate neque ducimus deserunt in quas earum, illo veritatis quos. Laudantium maxime voluptates facilis temporibus repellendus pariatur, quisquam, molestias quam, autem iste officia rerum hic rem. Minus, mollitia?',
  },
]

const stateAlpha = reactive<{
  content: ContentArray
  borderColor?: ColorPalette
  bgColor?: ColorPalette
  tabColor?: ColorPalette
  titleSize?: HeadingSize
  activeTitleColor?: ColorPalette
  inactiveTitleColor?: ColorPalette
  displayShadow?: boolean
  rounded?: boolean
}>({
  content: contentInfo,
  borderColor: 'light-3',
  bgColor: 'light-1',
  tabColor: 'primary',
  titleSize: 'md',
  activeTitleColor: 'dark-3',
  inactiveTitleColor: 'light-1',
  displayShadow: true,
  rounded: true,
})
</script>

<template>
  <Story title="Tabs" group="base-comp">
    <Variant title="tabs-alpha">
      <tabs-alpha
        :content="stateAlpha.content"
        :border-color="stateAlpha.borderColor"
        :bg-color="stateAlpha.bgColor"
        :tab-color="stateAlpha.tabColor"
        :title-size="stateAlpha.titleSize"
        :active-title-color="stateAlpha.activeTitleColor"
        :inactive-title-color="stateAlpha.inactiveTitleColor"
        :display-shadow="stateAlpha.displayShadow"
        :rounded="stateAlpha.rounded"
      ></tabs-alpha>
      <template #controls>
        <HstSelect
          title="border-color"
          v-model="stateAlpha.borderColor"
          :options="colors"
        />
        <HstSelect
          title="bg-color"
          v-model="stateAlpha.bgColor"
          :options="colors"
        />
        <HstSelect
          title="tab-color"
          v-model="stateAlpha.tabColor"
          :options="colors"
        />
        <HstSelect
          title="title-size"
          v-model="stateAlpha.titleSize"
          :options="headingTextSize"
        />
        <HstSelect
          title="active-title-color"
          v-model="stateAlpha.activeTitleColor"
          :options="colors"
        />
        <HstSelect
          title="inactive-title-color"
          v-model="stateAlpha.inactiveTitleColor"
          :options="colors"
        />
        <HstCheckbox
          title="display-shadow"
          v-model="stateAlpha.displayShadow"
        />
        <HstCheckbox title="rounded" v-model="stateAlpha.rounded" />
      </template>
    </Variant>
  </Story>
</template>

<style lang="scss" scoped></style>
