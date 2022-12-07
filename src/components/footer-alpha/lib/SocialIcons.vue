<script setup lang="ts">
import { withDefaults, ref, markRaw, onMounted, computed } from 'vue'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
} from '@mcl/manguito-theme/theme/theme.types'
import generateClass from '@mcl/manguito-theme'
import type { SocialUrl } from '../FooterAlpha.vue'
// Import Icon files
import GithubIcon from './icons/GithubIcon.vue'
import InstagramIcon from './icons/InstagramIcon.vue'
import LinkedinIcon from './icons/LinkedinIcon.vue'
import TwitterIcon from './icons/TwitterIcon.vue'

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
}
const iconsRef = ref([])

const handleIconsList = (): void => {
  const { linkedin, instagram, github, twitter } = props.socialLinks

  const iconsList: IconList[] = []
  if (linkedin) {
    iconsList.push({
      url: linkedin,
      icon: markRaw(LinkedinIcon),
    })
  }
  if (github) {
    iconsList.push({
      url: github,
      icon: markRaw(GithubIcon),
    })
  }
  if (instagram) {
    iconsList.push({
      url: instagram,
      icon: markRaw(InstagramIcon),
    })
  }
  if (twitter) {
    iconsList.push({
      url: twitter,
      icon: markRaw(TwitterIcon),
    })
  }
  iconsRef.value = iconsList
}

const getIconList = computed(() => {
  return iconsRef.value
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

onMounted(() => {
  handleIconsList()
  console.log(iconsRef.value)
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
      >
        <!-- <linkedin-icon></linkedin-icon> -->
        <component :is="item.icon"></component>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
