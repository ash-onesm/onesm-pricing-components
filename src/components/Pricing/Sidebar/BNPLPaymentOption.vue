<script setup lang="ts">
import RadioItem from '@/components/ui/forms/RadioItem.vue'
import { PaymentOption } from '@/lib/model/PaymentOption.ts'

const props = defineProps<{
  value: PaymentOption
  name: string
  price: number
}>()
const model = defineModel()
</script>

<template>
  <li
    class="p-2
    flex justify-between
    divide-solid border-neutral-200 border-1
    hover:bg-neutral-100
    cursor-pointer"
  >
    <div class="flex gap-2">
      <RadioItem v-model="model" name="bnpl-payment-option" :value="props.value" visible />
      {{ props.name }}
    </div>
    <div>
      <span>${{ props.price }}</span>
      <span v-if="props.value !== PaymentOption.OneTime">/mo</span>
    </div>
  </li>
</template>

<style scoped>

</style>
