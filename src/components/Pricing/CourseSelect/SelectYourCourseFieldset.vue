<script setup lang="ts">
import type { CourseType } from '@/lib/model/CourseType.ts'
import type PriceData from '@/lib/model/PriceData.ts'
import { computed } from 'vue'
import CourseRadioButton from '@/components/Pricing/CourseSelect/CourseRadioButton.vue'
import Card from '@/components/ui/card/Card.vue'
import { round } from '@/lib/utils.ts'

const props = defineProps<{
  coursePrices: PriceData['coursePrices']
}>()
const model = defineModel<CourseType>()
const comprehensiveCoursePrice = computed(() => `$${round(props.coursePrices.comprehensiveCoursePrice, 0)}`)
const bootcampPrice = computed(() => `$${round(props.coursePrices.bootcampPrice, 0)}`)
</script>

<template>
  <Card class="p-6">
    <fieldset>
      <legend class="text-lg font-sans mb-4">
        Select Your Plan
      </legend>
      <ul class="space-y-4">
        <CourseRadioButton
          id="select-your-course"
          v-model="model"
          value="comprehensive-course"
          title="Comprehensive Course"
          :price="comprehensiveCoursePrice"
        />
        <CourseRadioButton
          id="select-your-course"
          v-model="model"
          value="bootcamp"
          title="Winter Break MCAT Bootcamp"
          :price="bootcampPrice"
        />
        <CourseRadioButton
          id="select-your-course"
          v-model="model"
          value="plain-hours"
          title="Plain 1-on-1 Hours"
          price="Pay as you go"
        />
      </ul>
    </fieldset>
  </Card>
</template>

<style scoped>

</style>
