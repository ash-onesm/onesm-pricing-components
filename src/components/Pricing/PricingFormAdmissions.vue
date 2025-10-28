<script setup lang="ts">
import type { CourseType } from '@/lib/model/CourseType.ts'
import { CircleCheck } from 'lucide-vue-next'
import { ref } from 'vue'
import TotalCourseCost from '@/components/Pricing/Sidebar/TotalCourseCost.vue'
import TutoringHoursSlider from '@/components/Pricing/TutoringHours/TutoringHoursSlider.vue'
import Card from '@/components/ui/card/Card.vue'
import priceMocks from '@/lib/prices.mock.ts'

const courseType = ref<CourseType>('admissions')
const tutoringEnabled = ref(true)
const tutoringHours = ref(15)
// const aamcContent = ref(true)
// const uworldContent = ref(true)
</script>

<template>
  <form
    class="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-3 gap-8
    font-secondary"
    @submit.prevent
  >
    <section class="md:col-span-4 lg:col-span-2 space-y-8">
      <TutoringHoursSlider
        v-model:hours="tutoringHours"
        v-model:checked="tutoringEnabled"
        :min-hours="10"
        :tutoring-hour-prices="priceMocks.tutoringHourPrices"
        :course-type="courseType"
      />
      <Card class="p-6">
        <header class="font-sans mb-4">
          <h2 class="text-lg">
            Pay Only for What You Need
          </h2>
        </header>

        <ul class="space-y-2.5">
          <li class="flex items-center gap-2">
            <CircleCheck class="text-primary size-5" />
            Hourly billing (no per-edit markup)
          </li>
          <li class="flex items-center gap-2">
            <CircleCheck class="text-primary size-5" />
            Meetings + essay editing count toward your hours
          </li>
          <li class="flex items-center gap-2">
            <CircleCheck class="text-primary size-5" />
            Efficient students save more
          </li>
        </ul>
      </Card>
    </section>
    <TotalCourseCost
      class="md:col-span-3 lg:col-span-1 mb-auto
      sticky
      bg-white"
      :payment-option-length="3"
      :pricing-configuration="{
        courseType,
        tutoringHours: tutoringEnabled ? tutoringHours : 0,
        aamcContent: false,
        uworldContent: false,
      }"
    />
  </form>
</template>

<style scoped>

</style>
