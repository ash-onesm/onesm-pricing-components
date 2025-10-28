<script setup lang="ts">
import { BookOpenText, X } from 'lucide-vue-next'

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'

import Facebook from '@/assets/facebook.png'
import Google from '@/assets/google.png'
import InputItem from '@/components/ui/forms/InputItem.vue'

const socialButtons = [
  {
    name: 'Google',
    icon: Google,
  },
  {
    name: 'Facebook',
    icon: Facebook,
  },
]
</script>

<template>
  <DialogRoot>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/30" />
      <DialogContent
        class="fixed left-1/2 top-[10%] z-50 -translate-x-1/2
        w-full max-w-lg p-6 bg-white shadow-lg rounded-lg"
      >
        <div class="mt-8 mb-12 flex items-center justify-center gap-2">
          <div class="p-2 bg-orange-500 rounded-xl">
            <BookOpenText class="w-7 h-7 text-white" />
          </div>
          <h1 class="text-2xl font-bold">
            MCAT AI
          </h1>
        </div>

        <hgroup class="text-center mb-8">
          <DialogTitle class="text-2xl">
            Sign up for 1SM
          </DialogTitle>
          <DialogDescription class="text-neutral-500">
            Welcome back! Please sign up to continue
          </DialogDescription>
        </hgroup>

        <form class="mx-8 space-y-4 text-center" @submit.prevent>
          <InputItem type="email" placeholder="Email" />
          <!--          <InputItem type="password" placeholder="Password" /> -->

          <button class="mt-2 px-8 py-2 bg-[#AB0C2D] active:bg-red-900 rounded-md text-white cursor-pointer">
            Let's go!
          </button>
        </form>

        <div class="my-8 flex items-center gap-2">
          <hr class="border border-neutral-300 grow">
          <span class="text-neutral-500">or</span>
          <hr class="border border-neutral-300 grow">
        </div>

        <div class="flex justify-center gap-4">
          <button
            v-for="(item, idx) in socialButtons" :key="idx"
            class="px-8 py-2 flex gap-4
            border border-neutral-300 hover:bg-neutral-100 active:bg-neutral-200 rounded-xl
            text-neutral-500 hover:text-black cursor-pointer"
          >
            <img width="20" class="object-contain" :src="item.icon.src">
            {{ item.name }}
          </button>
        </div>
        <DialogClose class="absolute right-4 top-4 p-3 hover:bg-neutral-200 rounded-md cursor-pointer">
          <X class="w-4 h-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>

</style>
