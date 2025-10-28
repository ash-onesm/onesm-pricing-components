<script setup lang="ts">

</script>

<template>
  <button
    class="px-4 py-2
    bg-white active:bg-neutral-200
    border border-neutral-200 hover:border-neutral-400 focus:border-neutral-400
    rounded-md
    hover:shadow-lg focus:shadow-lg
    hover:translate-y-[-2px] focus:translate-y-[-2px]
    text-neutral-500 hover:text-neutral-900 focus:text-neutral-900
    transition-all
    cursor-pointer select-none
"
    @click="console.log('hello')"
  >
    <slot />
  </button>
</template>

<style scoped>

</style>
