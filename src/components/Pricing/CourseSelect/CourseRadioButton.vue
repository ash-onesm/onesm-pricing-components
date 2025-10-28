<script setup lang="ts">
import type { CourseType } from '@/lib/model/CourseType.ts'
import Card from '@/components/ui/card/Card.vue'
import RadioItem from '@/components/ui/forms/RadioItem.vue'

const props = defineProps<{
  id: string
  value: CourseType
  title: string
  price: string
}>()
const model = defineModel()
</script>

<template>
  <Card
    class="p-6
    flex justify-between items-center gap-4
    border-2 transition-all
    font-sans cursor-pointer"
    :class="{
      'bg-primary border-primary text-white': model === props.value,
      'hover:border-primary hover:bg-primary/5': model !== props.value,
    }"
    @click="model = props.value"
  >
    <RadioItem v-model="model" :name="props.id" :value="props.value" />
    <label
      :for="`${props.id}-${props.value}`"
      class="text-lg cursor-pointer"
    >
      {{ props.title }}
    </label>
    <div class="flex items-center gap-6">
      <h3 class="text-xl text-right">
        {{ props.price }}
      </h3>
    </div>
  </Card>
</template>

<style scoped>

</style>
