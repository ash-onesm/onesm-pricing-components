<script setup lang="ts">
import type PricingConfiguration from '@/lib/model/PricingConfiguration.ts'
import { CircleCheck, DollarSign, Percent } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import BNPLPaymentList from '@/components/Pricing/Sidebar/BNPLPaymentList.vue'
import DiscountBadge from '@/components/Pricing/TutoringHours/DiscountBadge.vue'
import Card from '@/components/ui/card/Card.vue'
import StripeApi from '@/lib/api/StripeApi.ts'
import { PaymentOption } from '@/lib/model/PaymentOption.ts'
import priceMocks from '@/lib/prices.mock.ts'
import PriceService from '@/lib/service/PriceService.ts'
import { round } from '@/lib/utils.ts'

const props = defineProps<{
  pricingConfiguration: PricingConfiguration
  paymentOptionLength: number
}>()

const courseName = computed(() => {
  if (props.pricingConfiguration.courseType === 'comprehensive-course') {
    return 'Comprehensive Course'
  }
  else if (props.pricingConfiguration.courseType === 'bootcamp') {
    return 'Bootcamp'
  }
  return 'unreleased course'
})
const coursePrice = computed(() => round(PriceService.calculateCourseBasePrice(
  priceMocks.coursePrices,
  props.pricingConfiguration.courseType,
), 0))
const addonPrice = computed(() => round(PriceService.calculateAddonPrice(
  priceMocks.addonPrices,
  props.pricingConfiguration,
), 0))
const tutoringHourPrice = computed(() => round(PriceService.calculateHourlyRate(
  priceMocks.tutoringHourPrices,
  props.pricingConfiguration.tutoringHours,
) * props.pricingConfiguration.tutoringHours, 0))

const discountedTutoringHourPrice = computed(() => round(PriceService.calculateDiscountedTutoringPrice(
  priceMocks.tutoringHourPrices,
  props.pricingConfiguration.tutoringHours,
  props.pricingConfiguration.courseType,
), 0))

const isComboDiscount = computed(
  () => PriceService.doesCourseProvideComboDiscount(props.pricingConfiguration.courseType),
)
const is15PercentDiscount = computed(
  () => PriceService.doesCourseProvide15PercentDiscount(props.pricingConfiguration.courseType),
)
const discountValue = computed(() => round(tutoringHourPrice.value - discountedTutoringHourPrice.value, 0))

const totalPrice = computed(() => PriceService.priceCalculator(priceMocks, props.pricingConfiguration))

const summary = computed(() => {
  const list: string[] = []

  if (props.pricingConfiguration.courseType === 'comprehensive-course' || props.pricingConfiguration.courseType === 'bootcamp') {
    list.push(`Access to the ${courseName.value}`)
  }
  else if (props.pricingConfiguration.courseType === 'plain-hours') {
    list.push('Premium 1-on-1 Tutoring')
  }
  else if (props.pricingConfiguration.courseType === 'admissions') {
    list.push('Personal narrative & essays')
    list.push('School list & timeline strategy')
    list.push('Extracurricular & Interview support')
  }

  if (props.pricingConfiguration.tutoringHours > 0 && props.pricingConfiguration.courseType !== 'admissions') {
    list.push(`${props.pricingConfiguration.tutoringHours} Tutoring Hours`)
  }

  if (props.pricingConfiguration.aamcContent) {
    list.push('AAMC Content')
  }
  if (props.pricingConfiguration.uworldContent) {
    list.push('UWorld Content')
  }
  return list
})

const selectedInstallment = ref<PaymentOption>(PaymentOption.OneTime)

const loading = ref(false)
async function checkout() {
  try {
    loading.value = true
    const response = await StripeApi.getPaymentLink(props.pricingConfiguration, selectedInstallment.value)
    loading.value = false
    if (response.body.paymentLinkUrl) {
      window.open(response.body.paymentLinkUrl, '_self')
    }
  }
  catch (e) {
    console.warn('Error occured during checkout', e)
  }
}
</script>

<template>
  <Card class="px-6 py-4 border-2 border-neutral-900 space-y-4">
    <header class="px-2 pt-2 font-sans">
      <h2 class="font-bold text-lg">
        Total Program Cost
      </h2>
      <hr class="my-2 text-neutral-300">
      <p>
        No interest. No hidden fees. Choose the plan that works best for you
      </p>
    </header>

    <ul class="pl-2 space-y-2.5">
      <li
        v-for="(item, index) in summary"
        :key="index"
        class="flex items-center gap-2"
      >
        <CircleCheck class="text-primary size-5 shrink-0" />
        {{ item }}
      </li>
    </ul>

    <hr class="text-neutral-300">

    <template v-if="props.pricingConfiguration.courseType !== 'admissions'">
      <ul class="space-y-2">
        <li v-if="props.pricingConfiguration.courseType !== 'plain-hours'" class="flex justify-between">
          <span>{{ courseName }}</span>
          <span>${{ coursePrice }}</span>
        </li>

        <template v-if="props.pricingConfiguration.tutoringHours > 0">
          <li class="flex justify-between">
            <span>Tutoring Hours</span>
            <div v-if="is15PercentDiscount || isComboDiscount">
              <span class="line-through decoration-2">
                ${{ tutoringHourPrice }}
              </span>
              ${{ discountedTutoringHourPrice }}
            </div>
            <span v-else>${{ tutoringHourPrice }}</span>
          </li>

          <li v-if="is15PercentDiscount || isComboDiscount" class="flex justify-between">
            <div>
              <DiscountBadge v-if="is15PercentDiscount">
                <Percent class="h-4 w-4" />
                15% discount applied
              </DiscountBadge>
              <DiscountBadge v-if="isComboDiscount">
                <DollarSign class="h-4 w-4" />
                Combo discount applied
              </DiscountBadge>
            </div>
            -${{ discountValue }}
          </li>
        </template>

        <li v-if="addonPrice > 0" class="flex justify-between">
          <span>Add-Ons</span>
          <span>${{ addonPrice }}</span>
        </li>
      </ul>

      <hr class="text-neutral-300">
    </template>

    <footer class="flex flex-col font-sans space-y-2">
      <h3 class="text-sm text-neutral-700">
        Payment Options
      </h3>
      <BNPLPaymentList v-model="selectedInstallment" :price="totalPrice" :length="props.paymentOptionLength" />
      <div class="mt-4 flex justify-between text-lg text-bold">
        <span>Total:</span>
        <span>${{ totalPrice }}</span>
      </div>
      <button
        class="px-12 py-4 flex gap-2 items-center justify-center
        bg-neutral-900 hover:bg-neutral-950 rounded-md
        text-white font-bold
        cursor-pointer
        disabled:opacity-75"
        :disabled="loading"
        @click="checkout"
      >
        <svg v-if="loading" class="mr-3 size-5 animate-spin shrink-0" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span class="shrink-0">

          Proceed to Checkout
        </span>
      </button>
    </footer>
  </Card>
</template>

<style scoped>

</style>
