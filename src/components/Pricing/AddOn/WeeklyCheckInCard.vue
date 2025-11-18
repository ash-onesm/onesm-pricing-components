<script setup lang="ts">
import { Calendar, Gift } from 'lucide-vue-next'
import Card from '@/components/ui/card/Card.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import HoverableCard from '@/components/ui/card/HoverableCard.vue'
import SwitchItem from '@/components/ui/forms/SwitchItem.vue'
import priceMocks from '@/lib/prices.mock.ts'

const model = defineModel<boolean>('weeklyCheckIn')
</script>

<template>
  <Card class="p-6">
    <h2 class="text-lg font-sans mb-4">
      1-on-1 Support
    </h2>
    <HoverableCard
      class="flex flex-col"
      @click="model = !model"
    >
      <li class="flex-grow p-6 flex items-center gap-4">
        <div class="hidden sm:block bg-neutral-200 p-3 rounded-full">
          <Calendar class="h-6 w-6 text-neutral-500" />
        </div>
        <div class="flex-grow">
          <label
            for="weekly-checkin-card"
            class="font-bold cursor-pointer"
            @click.prevent
          >
            Weekly Check-Ins
          </label>
          <p class="text-sm text-neutral-500">
            Personalized strategy sessions with an MCAT expert to assess your progress
          </p>
        </div>
        <div class="min-w-16 shrink-0 flex flex-col items-end sm:flex-row sm:items-center gap-4">
          <p class="font-bold shrink-0">
            ${{ priceMocks.addonPrices.weeklyCheckInPrice }}
          </p>
          <SwitchItem v-model="model" name="weekly-checkin-card" />
        </div>
      </li>
      <CardFooter class="flex gap-2 text-sm text-neutral-500">
        <div class="px-2 py-1 rounded-bl-md flex items-center bg-primary text-white">
          <Gift class="h-4 w-4" />
          <span class="mx-1">Early Bird Special</span>
        </div>
        <p class="px-2 py-1 text-stone-800">
          Free for the first 10 sign-ups
        </p>
      </CardFooter>
    </HoverableCard>
  </card>
</template>

<style scoped>

</style>
