<script setup lang="ts">
import { AccordionGroup, Collapse } from '@/components/manguito-theme/lib'
import { ref } from 'vue'

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

const panelRefs = ref<InstanceType<typeof Collapse>[]>([])
const openIndex = ref<number | null>(null)

const handleOpen = (index: number) => {
  openIndex.value = index
}
const handleClose = (index: number) => {
  if (openIndex.value === index) openIndex.value = null
}
</script>

<template>
  <div class="faq-accordion bg-light-1 p-sm rounded-md drop-shadow-2xl">
    <h2>Frequently Asked Questions</h2>

    <AccordionGroup>
      <div
        v-for="(faq, index) in faqs"
        :key="faq.id"
        class="faq-item"
        :class="{ 'is-active': openIndex === index }"
      >
        <button
          @click="panelRefs[index]?.toggle()"
          class="faq-question"
          :aria-expanded="openIndex === index"
          :aria-controls="faq.id"
        >
          <span>{{ faq.question }}</span>
          <svg
            class="chevron"
            :class="{ 'rotate-180': openIndex === index }"
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

        <Collapse
          :ref="(el) => { if (el) panelRefs[index] = el as InstanceType<typeof Collapse> }"
          :id="faq.id"
          role="region"
          :aria-labelledby="`${faq.id}-question`"
          @open="handleOpen(index)"
          @close="handleClose(index)"
        >
          <p class="faq-answer-content">{{ faq.answer }}</p>
        </Collapse>
      </div>
    </AccordionGroup>
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

.faq-answer-content {
  padding: 0 1.25rem 1.25rem;
}
</style>
