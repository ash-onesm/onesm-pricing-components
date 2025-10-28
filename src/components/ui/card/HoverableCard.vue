<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
</script>

<template>
  <Card
    class="border-2
    hover:border-primary hover:bg-primary/5
    hover:shadow-md
    transition-all duration-300
    cursor-pointer"
  >
    <slot />
  </Card>
</template>

<style scoped>

</style>
