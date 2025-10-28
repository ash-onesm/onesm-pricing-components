<script setup lang="ts">
import { Captions, Check, ChevronDown, MessagesSquare, NotebookTabs } from 'lucide-vue-next'
import {
  DropdownMenuContent,
  DropdownMenuItemIndicator,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui'

import { computed } from 'vue'
import BaseQuickbarButton from '@/components/McatAi/Quickbar/BaseQuickbarButton.vue'
import QuickbarButtonIcon from '@/components/McatAi/Quickbar/QuickbarButtonIcon.vue'

const model = defineModel<string>({
  default: 'question',
})

const items = [
  {
    value: 'question',
    label: 'Chat',
    description: 'Perfect for simple questions about the MCAT',
    icon: MessagesSquare,
  },
  {
    value: 'study-guide',
    label: 'Study Guide',
    description: 'Generate full study guides with a deep-dive into a specific topic',
    icon: NotebookTabs,
  },
  {
    value: 'flashcards',
    label: 'Flashcards',
    description: 'Review your knowledge in bite-sized chunks',
    icon: Captions,
  },
]
const selectedItem = computed(() => items.find(x => x.value === model.value))
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <BaseQuickbarButton>
        <QuickbarButtonIcon v-if="selectedItem" :icon="selectedItem.icon" />
        <span v-if="selectedItem" class="mt-[-1px]">{{ selectedItem.label }}</span>
        <QuickbarButtonIcon :icon="ChevronDown" />
      </BaseQuickbarButton>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        class="p-1 min-w-48
        bg-linear-to-b from-white to-neutral-100
        border border-neutral-300
        rounded-md
        shadow-md"
        side="bottom" align="start" :side-offset="8"
      >
        <DropdownMenuRadioGroup v-model="model">
          <DropdownMenuRadioItem
            v-for="item in items"
            :key="item.value"
            :value="item.value"
            class="px-4 py-2 flex items-center justify-between gap-12
            rounded-md
            hover:bg-orange-100/40 focus:bg-orange-100/40 focus:outline-none
            transition-colors
            cursor-pointer"
          >
            <div class="flex items-center gap-4">
              <Component :is="item.icon" class="w-5 h-5 text-neutral-500" />
              <div>
                <p class="text-sm">
                  {{ item.label }}
                </p>
                <p class="text-xs text-neutral-500">
                  {{ item.description }}
                </p>
              </div>
            </div>
            <DropdownMenuItemIndicator>
              <Check class="h-4 w-4 text-blue-400" :stroke-width="3" />
            </DropdownMenuItemIndicator>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
