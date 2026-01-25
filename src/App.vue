<script setup>
import BackgroundShootingStars from "./components/BackgroundShootingStars.vue";
import BackgroundWave from "./components/BackgroundWave.vue"

import WindowCard from "./components/WindowCard.vue";
import MusicBuddy from "./components/MusicBuddy.vue";
import {onMounted} from "vue";
import { useTheme } from "./composables/useTheme"

const { initTheme, toggleTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>

  <!-- Light -->
  <div class="block dark:hidden">
    <BackgroundWave />
  </div>

  <!-- Dark -->
  <div class="hidden dark:block">
    <BackgroundShootingStars />
  </div>

  <button
      class="fixed left-6 top-6 z-50 w-12 h-12 flex items-center justify-center rounded-full border border-black/10 bg-gray-950 backdrop-blur dark:border-white/10 dark:bg-black/40"
      @click="toggleTheme"
  >
    <span class="dark:hidden">🌙</span>
    <span class="hidden dark:inline">☀️</span>
  </button>

  <div class="relative z-10 min-h-screen flex items-center justify-center px-4">
    <WindowCard />
  </div>

  <MusicBuddy />
</template>

<style scoped>
</style>
