<script setup lang="ts">
import { Paperclip } from 'lucide-vue-next'
import { useTemplateRef } from 'vue'
import BaseQuickbarButton from '@/components/McatAi/Quickbar/BaseQuickbarButton.vue'
import QuickbarButtonIcon from '@/components/McatAi/Quickbar/QuickbarButtonIcon.vue'

const fileInput = useTemplateRef('fileInput')
</script>

<template>
  <BaseQuickbarButton @click="fileInput?.click()">
    <QuickbarButtonIcon :icon="Paperclip" />
    <span class="mt-[-1px]">Add File/Screenshot</span>
  </BaseQuickbarButton>

  <input ref="fileInput" class="hidden" type="file" multiple>
</template>

<style scoped>

</style>
