<script setup lang="ts">
import { observeVisibleAttr, vCollapse } from '@/components/manguito-theme/lib'
import { onMounted, ref } from 'vue'

interface FAQ {
  id: string
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    id: 'faq1',
    question: 'What is Vue?',
    answer:
      'Vue is a progressive JavaScript framework for building user interfaces.',
  },
  {
    id: 'faq2',
    question: 'What are directives?',
    answer:
      'Directives are special attributes with the v- prefix that apply reactive behavior to the DOM.',
  },
  {
    id: 'faq3',
    question: 'What is an accordion?',
    answer:
      'An accordion is a UI pattern where only one section can be expanded at a time.',
  },
]

const faqRefs = ref<Map<string, HTMLElement>>(new Map())
const activeIndex = ref(0)

const setFaqRef = (el: HTMLElement | null, id: string) => {
  if (el) {
    faqRefs.value.set(id, el)
  }
}

onMounted(() => {
  // Set up observers for each FAQ item
  faqs.forEach((faq, index) => {
    const el = faqRefs.value.get(faq.id)
    if (el) {
      const elementRef = ref(el)
      observeVisibleAttr(elementRef, (isVisible) => {
        if (isVisible) {
          activeIndex.value = index
          console.log(`FAQ ${index + 1} opened`)
        }
      })
    }
  })
})
</script>

<template>
  <div class="faq-accordion bg-light-1 p-sm rounded-md drop-shadow-2xl">
    <h2>Frequently Asked Questions</h2>

    <div
      v-for="(faq, index) in faqs"
      :key="faq.id"
      class="faq-item"
      :class="{ 'is-active': activeIndex === index }"
    >
      <button
        v-collapse:[faq.id]
        class="faq-question"
        :aria-expanded="activeIndex === index"
        :aria-controls="faq.id"
      >
        <span>{{ faq.question }}</span>
        <svg
          class="chevron"
          :class="{ 'rotate-180': activeIndex === index }"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
      </button>

      <div
        :ref="(el) => setFaqRef(el as HTMLElement, faq.id)"
        :id="faq.id"
        :visible="(index === 0).toString()"
        accordion="faq-group"
        class="faq-answer"
        role="region"
        :aria-labelledby="`${faq.id}-question`"
      >
        <p>{{ faq.answer }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-accordion {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #e5e7eb;
}

.faq-question {
  width: 100%;
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 500;
  text-align: left;
  transition: background-color 0.2s;
}

.faq-question:hover {
  background: #f9fafb;
}

.faq-question:focus {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

.chevron {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.faq-answer {
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-answer[visible='false'] {
  max-height: 0;
  opacity: 0;
}

.faq-answer[visible='true'] {
  max-height: 500px;
  opacity: 1;
  padding: 0 1.25rem 1.25rem;
}
</style>
