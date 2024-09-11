<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { computed } from 'vue'
import type { SocialUrl } from './index.types'
// Import Icon files
import GithubIcon from '../common/icons/GithubIcon.svg?raw'
import InstagramIcon from '../common/icons/InstagramIcon.svg?raw'
import LinkedinIcon from '../common/icons/LinkedinIcon.svg?raw'
import XIcon from '../common/icons/XIcon.svg?raw'

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

const iconList = computed<IconList[]>(() => {
  const iconsList: IconList[] = []
  if (props.socialLinks?.linkedin) {
    iconsList.push({
      url: props.socialLinks.linkedin,
      icon: LinkedinIcon,
      label: 'linkedin social icon',
    })
  }
  if (props.socialLinks?.github) {
    iconsList.push({
      url: props.socialLinks.github,
      icon: GithubIcon,
      label: 'github social icon',
    })
  }
  if (props.socialLinks?.instagram) {
    iconsList.push({
      url: props.socialLinks.instagram,
      icon: InstagramIcon,
      label: 'instagram social icon',
    })
  }
  if (props.socialLinks?.twitter) {
    iconsList.push({
      url: props.socialLinks.twitter,
      icon: XIcon,
      label: 'x/twitter social icon',
    })
  }
  return iconsList
})

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
</script>

<template>
  <ul class="flex flex-wrap">
    <li v-for="(item, index) in iconList" :key="index" class="mr-xs last:mr-0">
      <a
        :href="item.url"
        target="_blank"
        class="inline-block outline-none focus:ring-2 hover:ring-2 hover:opacity-70 ring-offset-2 ring-offset-transparent rounded-md transition-all duration-300 ease-linear"
        :class="getIconColor(iconColor)"
        :aria-label="item.label"
        role="button"
      >
        <div v-html="item.icon"></div>
      </a>
    </li>
  </ul>
</template>
