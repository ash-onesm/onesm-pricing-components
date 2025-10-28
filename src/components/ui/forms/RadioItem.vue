<script setup lang="ts">
const props = defineProps<{
  name: string
  value: string
  visible?: boolean
}>()
const model = defineModel()
</script>

<template>
  <input
    :id="`${props.name}-${props.value}`" v-model="model"
    type="radio" :name="props.name"
    :value="props.value"
    class="sr-only"
  >
  <span
    v-if="visible"
    class="w-2 h-2 m-2
    ring-2 ring-offset-4
    rounded-full
    cursor-pointer"
    :class="{
      'bg-primary ring-primary': model === props.value,
      'ring-neutral-400': model !== props.value,
    }"
  />
</template>

<style scoped>

</style>
