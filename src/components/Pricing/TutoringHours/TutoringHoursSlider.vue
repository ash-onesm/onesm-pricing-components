<script setup lang="ts">
import type { CourseType } from '@/lib/model/CourseType.ts'
import type PriceData from '@/lib/model/PriceData.ts'
import { CircleCheck, DollarSign, Percent } from 'lucide-vue-next'
import { computed, watch } from 'vue'
import DiscountBadge from '@/components/Pricing/TutoringHours/DiscountBadge.vue'
import TutoringHoursPriceBar from '@/components/Pricing/TutoringHours/TutoringHoursPriceBar.vue'
import Card from '@/components/ui/card/Card.vue'
import SliderItem from '@/components/ui/forms/SliderItem.vue'
import SwitchItem from '@/components/ui/forms/SwitchItem.vue'
import priceMocks from '@/lib/prices.mock.ts'
import PriceService from '@/lib/service/PriceService.ts'
import { round } from '@/lib/utils.ts'

const props = defineProps<{
  tutoringHourPrices: PriceData['tutoringHourPrices']
  courseType: CourseType
  minHours: number
}>()
const max = computed(() => props.tutoringHourPrices.reduce(
  (max, current) => current.hours > max ? current.hours : max,
  props.minHours,
))

const checked = defineModel<boolean>('checked')
watch(() => props.courseType, (courseType) => {
  if (courseType === 'plain-hours' || courseType === 'admissions') {
    checked.value = true
  }
})

const hours = defineModel<number>('hours')
const isComboDiscount = computed(
  () => PriceService.doesCourseProvideComboDiscount(props.courseType),
)
const is15PercentDiscount = computed(
  () => PriceService.doesCourseProvide15PercentDiscount(props.courseType),
)

const pricePerHour = computed(() => PriceService.calculateHourlyRate(
  priceMocks.tutoringHourPrices,
  hours.value ?? props.minHours,
))
const totalCost = computed(() => round(PriceService.calculateHourlyRate(
  priceMocks.tutoringHourPrices,
  hours.value ?? props.minHours,
) * (hours.value ?? props.minHours), 0))
</script>

<template>
  <Card class="p-6" :class="{ 'bg-neutral-200': !checked }">
    <header class="flex items-center justify-between font-sans mb-10 gap-4">
      <hgroup v-if="courseType === 'plain-hours' || courseType === 'admissions'">
        <h2 class="text-lg mb-1">
          Start With the Hours You Need
        </h2>
        <p class="text-neutral-600">
          Choose the number of hours below.
        </p>
      </hgroup>
      <hgroup v-else>
        <h2 class="text-lg mb-1">
          Need more 1-on-1 support? Add extra tutoring hours below.
        </h2>
        <p class="text-neutral-600">
          Choose the number of extra hours below.
        </p>
      </hgroup>
      <SwitchItem
        v-if="props.courseType !== 'plain-hours'"
        v-model="checked"
        name="tutoring-hours"
      />
    </header>
    <section class="mb-8 flex flex-col items-center">
      <SliderItem
        v-model="hours"
        :max="max" :min="props.minHours" :step="1"
        name="tutoring-hours"
        :disabled="!checked"
      />
      <TutoringHoursPriceBar
        v-model="hours"
        :max="max" :min="props.minHours"
        :price-per-hour="pricePerHour"
        :total-cost="totalCost"
        :disabled="!checked"
      />
      <DiscountBadge v-if="checked && is15PercentDiscount">
        <Percent class="h-4 w-4" />
        15% discount applied
      </DiscountBadge>
      <DiscountBadge v-if="checked && isComboDiscount">
        <DollarSign class="h-4 w-4" />
        Combo discount applied
      </DiscountBadge>
    </section>
    <div class="flex justify-center">
      <section
        class="px-4 py-2
        flex gap-2
        border border-primary rounded-md
        font-sans"
      >
        <CircleCheck class="text-primary" />
        <span :class="{ 'text-black/50': !checked }">
          The more hours you add, the cheaper it gets!
        </span>
      </section>
    </div>
  </Card>
</template>

<style scoped>

</style>
