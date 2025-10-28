<script setup lang="ts"></script>

<template>
  <button
    class="p-2 flex items-center gap-2
        border border-neutral-300
        rounded-md
        text-neutral-500
        not-disabled:hover:bg-neutral-100
        cursor-pointer
        transition-colors"
  >
    <slot />
  </button>
</template>

<style scoped>

</style>
