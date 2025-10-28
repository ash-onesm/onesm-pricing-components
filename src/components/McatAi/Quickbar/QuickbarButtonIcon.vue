<script setup lang="ts">
const props = defineProps<{
  icon: any
}>()
</script>

<template>
  <Component :is="props.icon" class="w-4.5 h-4.5 text-neutral-500" />
</template>

<style scoped>

</style>
