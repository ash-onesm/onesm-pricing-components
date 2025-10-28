<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <div
    class="group
    shadow-sm focus-within:shadow-lg
    rounded-xl
    transition-shadow"
  >
    <textarea
      v-model="model"
      class="flex min-h-[100px] w-full px-5 py-4
      bg-white
      border border-b-0 border-neutral-300 group-hover:border-neutral-400 group-focus-within:border-neutral-400
      rounded-xl rounded-b-none
      resize-none placeholder:text-neutral-500
      focus:outline-none disabled:cursor-not-allowed
      transition-colors
      peer"
      placeholder="How can I help you today?"
    />
    <slot />
  </div>
</template>
