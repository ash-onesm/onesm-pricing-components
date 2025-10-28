<script setup lang="ts">
import type { CourseType } from '@/lib/model/CourseType.ts'
import { ref } from 'vue'
import PricingFormAdmissions from '@/components/Pricing/PricingFormAdmissions.vue'
import PricingFormBootcamp from '@/components/Pricing/PricingFormBootcamp.vue'
import PricingFormBuildYourOwn from '@/components/Pricing/PricingFormBuildYourOwn.vue'
import PricingFormComprehensiveCourse from '@/components/Pricing/PricingFormComprehensiveCourse.vue'
import PricingFormPlainHours from '@/components/Pricing/PricingFormPlainHours.vue'

type TabType = CourseType | 'build-your-own'

const tab = ref<TabType>('build-your-own')

const tabs: { id: TabType, name: string }[] = [
  { id: 'build-your-own', name: 'Build Your Own' },
  { id: 'comprehensive-course', name: 'Comprehensive' },
  { id: 'bootcamp', name: 'Bootcamp' },
  { id: 'plain-hours', name: 'Plain Hours' },
  { id: 'admissions', name: 'Admissions' },
]
</script>

<template>
  <nav class="mb-8 flex border-b border-gray-200" aria-label="Tabs">
    <button
      v-for="item in tabs"
      :key="item.id"
      class="px-4 py-2
      border-b-2 transition-colors duration-200
      text-lg cursor-pointer"
      :class="[tab === item.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
      @click="tab = item.id"
    >
      {{ item.name }}
    </button>
  </nav>

  <PricingFormComprehensiveCourse v-if="tab === 'comprehensive-course'" />
  <PricingFormBootcamp v-else-if="tab === 'bootcamp'" />
  <PricingFormPlainHours v-else-if="tab === 'plain-hours'" />
  <PricingFormBuildYourOwn v-else-if="tab === 'build-your-own'" />
  <PricingFormAdmissions v-else-if="tab === 'admissions'" />
</template>

<style scoped>
</style>
