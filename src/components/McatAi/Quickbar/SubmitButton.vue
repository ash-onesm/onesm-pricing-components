<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <button
    class="p-2
        bg-[#AB0C2D] active:bg-red-900
        disabled:bg-red-800/40
        border border-neutral-300
        rounded-md
        cursor-pointer
        transition-colors"
  >
    <ArrowRight class="text-white w-4 h-4" stroke-width="4" />
  </button>
</template>

<style scoped>

</style>
