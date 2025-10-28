<script setup lang="ts">
import { ref } from 'vue'
import BaseTextarea from '@/components/McatAi/BaseTextarea.vue'
import AttachMediaButton from '@/components/McatAi/Quickbar/AttachMediaButton.vue'
import ModeDropdown from '@/components/McatAi/Quickbar/ModeDropdown.vue'
import QuickbarButtonBar from '@/components/McatAi/Quickbar/QuickbarButtonBar.vue'
import SubmitButton from '@/components/McatAi/Quickbar/SubmitButton.vue'
import SignUpModal from '@/components/McatAi/SignUpModal.vue'
import Suggestion from '@/components/McatAi/Suggestion.vue'

const suggestions = [
  {
    prompt: 'Teach me about electrochemistry',
  },
  {
    prompt: 'Give me a list all the physics equations',
  },
]

const textContent = ref('')
</script>

<template>
  <BaseTextarea v-model="textContent">
    <QuickbarButtonBar class="flex justify-between">
      <div class="flex items-center gap-2">
        <ModeDropdown />
        <AttachMediaButton />
      </div>
      <div class="flex items-center">
        <SignUpModal>
          <SubmitButton :disabled="textContent.trim() === ''" />
        </SignUpModal>
      </div>
    </QuickbarButtonBar>
  </BaseTextarea>
  <section class="mt-4 flex justify-center gap-4">
    <Suggestion
      v-for="(item, idx) in suggestions"
      :key="idx"
      @click="textContent = item.prompt"
    >
      {{ item.prompt }}
    </Suggestion>
  </section>
</template>

<style scoped>

</style>
