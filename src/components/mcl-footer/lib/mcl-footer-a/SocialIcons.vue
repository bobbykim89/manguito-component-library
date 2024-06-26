<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { markRaw, onMounted, ref } from 'vue'
import type { SocialUrl } from './index.types'
// Import Icon files
import GithubIcon from '../common//icons/GithubIcon.vue'
import InstagramIcon from '../common/icons/InstagramIcon.vue'
import LinkedinIcon from '../common/icons/LinkedinIcon.vue'
import TwitterIcon from '../common/icons/TwitterIcon.vue'

const props = withDefaults(
  defineProps<{
    iconColor: ColorPalette
    socialLinks?: SocialUrl
  }>(),
  {
    iconColor: 'light-1',
  }
)

interface IconList {
  url: string
  icon: any
  label: string
}
const iconsRef = ref<IconList[]>([])

const handleIconsList = (): void => {
  const { linkedin, instagram, github, twitter } = props.socialLinks!

  const iconsList: IconList[] = []
  if (linkedin) {
    iconsList.push({
      url: linkedin,
      icon: markRaw(LinkedinIcon),
      label: 'linkedin social icon',
    })
  }
  if (github) {
    iconsList.push({
      url: github,
      icon: markRaw(GithubIcon),
      label: 'github social icon',
    })
  }
  if (instagram) {
    iconsList.push({
      url: instagram,
      icon: markRaw(InstagramIcon),
      label: 'instagram social icon',
    })
  }
  if (twitter) {
    iconsList.push({
      url: twitter,
      icon: markRaw(TwitterIcon),
      label: 'twitter social icon',
    })
  }
  iconsRef.value = iconsList
}

const getIconColor = (color: ColorPalette): string => {
  /**
   * @color - iconColor
   */
  const classArray: string[] = [
    generateClass('TEXTCOLOR', color),
    generateClass('RINGCOLOR', color),
  ]
  return classArray.join(' ')
}

onMounted(() => {
  handleIconsList()
})
</script>

<template>
  <ul class="flex flex-wrap">
    <li v-for="(item, index) in iconsRef" :key="index" class="mr-xs last:mr-0">
      <a
        :href="item.url"
        target="_blank"
        class="inline-block outline-none focus:ring-2 hover:ring-2 hover:opacity-70 ring-offset-2 ring-offset-transparent rounded-md transition-all duration-300 ease-linear"
        :class="getIconColor(iconColor)"
        :aria-label="item.label"
      >
        <component :is="item.icon"></component>
      </a>
    </li>
  </ul>
</template>
