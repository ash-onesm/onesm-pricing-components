<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import { round } from '@/lib/utils.ts'

defineProps<{
  originalPrice: number
  discountedPrice: number
}>()
</script>

<template>
  <Card
    class="p-6
    flex justify-between items-center gap-4
    border-primary bg-primary
    font-sans text-white"
  >
    <h2 class="text-lg">
      <slot />
    </h2>
    <div class="space-y-2">
      <div class="flex justify-center items-center gap-2">
        <h2 class="text-xl line-through decoration-2">
          ${{ round(originalPrice, 0) }}
        </h2>
        <h2 class="text-xl">
          ${{ round(discountedPrice, 0) }}
        </h2>
      </div>
      <div class="px-3 py-1 bg-black rounded-md text-white ">
        Black Friday Sale!
      </div>
    </div>
  </Card>
</template>

<style scoped>

</style>
