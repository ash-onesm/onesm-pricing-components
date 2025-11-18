<script setup lang="ts">
import type { CourseType } from '@/lib/model/CourseType.ts'
import { ref } from 'vue'
import AddOnFieldset from '@/components/Pricing/AddOn/AddOnFieldset.vue'
import WeeklyCheckInCard from '@/components/Pricing/AddOn/WeeklyCheckInCard.vue'
import DiscountedCourseFieldset from '@/components/Pricing/CourseSelect/DiscountedCourseFieldset.vue'
import TotalCourseCost from '@/components/Pricing/Sidebar/TotalCourseCost.vue'
import priceMocks from '@/lib/prices.mock.ts'

const courseType = ref<CourseType>('bootcamp')
const tutoringEnabled = ref(false)
const tutoringHours = ref(10)
const aamcContent = ref(false)
const uworldContent = ref(false)
const weeklyCheckIn = ref(true)
</script>

<template>
  <form
    class="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-3 gap-8
    font-secondary"
    @submit.prevent
  >
    <section class="md:col-span-4 lg:col-span-2 space-y-8">
      <DiscountedCourseFieldset
        :original-price="3750"
        :discounted-price="priceMocks.coursePrices.bootcampPrice"
      >
        Winter Break MCAT Bootcamp
      </DiscountedCourseFieldset>

      <WeeklyCheckInCard
        v-model:weekly-check-in="weeklyCheckIn"
      />

      <AddOnFieldset
        v-model:aamc-content="aamcContent"
        v-model:uworld-content="uworldContent"
        :addon-prices="priceMocks.addonPrices"
      />
    </section>
    <TotalCourseCost
      class="md:col-span-3 lg:col-span-1 mb-auto
      sticky
      bg-white"
      :payment-option-length="3"
      :pricing-configuration="{
        courseType,
        tutoringHours: tutoringEnabled ? tutoringHours : 0,
        aamcContent,
        uworldContent,
        weeklyCheckIn,
      }"
    />
  </form>
</template>

<style scoped>

</style>
