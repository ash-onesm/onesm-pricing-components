<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import Card from '@/components/ui/card/Card.vue'
import { round } from '@/lib/utils.ts'

const props = defineProps<{
  price: number
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
    <div class="flex items-center gap-6">
      <h2 class="text-xl">
        ${{ round(props.price, 0) }}
      </h2>
      <Check class="w-7 h-7 p-1 text-primary bg-white rounded-full" />
    </div>
  </Card>
</template>

<style scoped>

</style>
