<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import NumericalInputItem from '@/components/ui/forms/NumericalInputItem.vue'
import { round } from '@/lib/utils.ts'

const props = defineProps<{
  max: number
  min: number
  pricePerHour: number
  totalCost: number
  disabled: boolean
}>()
const hours = defineModel<number>()
</script>

<template>
  <div
    class="p-4
      flex flex-wrap items-center justify-center gap-2
      font-sans text-neutral-700
      select-none"
  >
    <Card
      class="p-2 w-24 h-12
        border-2
        text-xl font-bold"
      :class="{
        'bg-neutral-200 text-black/50': props.disabled,
        'bg-white text-black': !props.disabled,
      }"
    >
      <NumericalInputItem
        v-model="hours"
        :max="props.max" :min="props.min"
        class="w-full h-full"
        :disabled="props.disabled"
      />
    </Card>

    <p class="px-2">
      {{ hours === 1 ? 'hour at' : 'hours at' }}
    </p>

    <div
      class="p-2 w-18 h-12
        flex justify-center items-center
        bg-neutral-200 rounded-md
        text-xl font-bold"
      :class="{ 'text-black/50': props.disabled }"
    >
      ${{ round(props.pricePerHour, 0) }}
    </div>

    <p class="px-2 text-xl">
      =
    </p>

    <div
      class="p-2 w-32 h-12 shrink-0
        flex justify-center items-center
        bg-neutral-200 rounded-md
        text-xl font-bold"
      :class="{ 'text-black/50': props.disabled }"
    >
      ${{ round(props.totalCost, 0) }}
    </div>
  </div>
</template>

<style scoped>

</style>
