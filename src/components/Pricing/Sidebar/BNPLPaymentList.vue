<script setup lang="ts">
import { computed } from 'vue'
import BNPLPaymentOption from '@/components/Pricing/Sidebar/BNPLPaymentOption.vue'
import Card from '@/components/ui/card/Card.vue'
import { PaymentOption } from '@/lib/model/PaymentOption.ts'
import { round } from '@/lib/utils.ts'

const props = defineProps<{
  price: number
  length: number
}>()

const selectedPaymentOption = defineModel<PaymentOption>()

const options = computed(() => [
  {
    value: PaymentOption.OneTime,
    name: 'One time payment',
    price: props.price,
  },
  {
    value: PaymentOption.TwoMonths,
    name: '2 installments',
    price: round(props.price / 2, 0),
  },
  {
    value: PaymentOption.ThreeMonths,
    name: '3 installments',
    price: round(props.price / 3, 0),
  },
  {
    value: PaymentOption.FourMonths,
    name: '4 installments',
    price: round(props.price / 4, 0),
  },
  {
    value: PaymentOption.FiveMonths,
    name: '5 installments',
    price: round(props.price / 5, 0),
  },
  {
    value: PaymentOption.SixMonths,
    name: '6 installments',
    price: round(props.price / 6, 0),
  },
].slice(0, props.length))
</script>

<template>
  <Card class="text-sm text-neutral-700">
    <ul>
      <BNPLPaymentOption
        v-for="option in options"
        :key="option.value"
        v-model="selectedPaymentOption"
        :value="option.value"
        :name="option.name"
        :price="option.price"
        @click="selectedPaymentOption = option.value"
      />
    </ul>
  </Card>
</template>

<style scoped>

</style>
