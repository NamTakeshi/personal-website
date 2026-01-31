<script setup>
import BackgroundShootingStars from "./components/BackgroundShootingStars.vue";
import BackgroundWave from "./components/BackgroundWave.vue"
import { ref } from "vue";

import WindowCard from "./components/WindowCard.vue";
import MusicBuddy from "./components/MusicBuddy.vue";
import {onMounted} from "vue";
import { useTheme } from "./composables/useTheme"
import AskNamChat from "./components/AskNamChat.vue";
import ModalWindow from "./components/ModalWindow.vue";

const { initTheme, toggleTheme } = useTheme()

const chatOpen = ref(false);

const chatIcon = `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 18h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M9.5 9.5a2.5 2.5 0 1 1 4.1 2c-.6.5-1.1 1-1.1 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" stroke="currentColor" stroke-width="2"/>
  </svg>
`;

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

  <!-- Floating Buttons oben links -->
  <div class="fixed left-6 top-6 z-50 flex gap-3">
    <!-- Theme Toggle -->
    <button
        class="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 bg-gray-950 backdrop-blur dark:border-white/10 dark:bg-black/40"
        @click="toggleTheme"
        aria-label="Toggle theme"
        title="Toggle theme"
    >
      <span class="dark:hidden">🌙</span>
      <span class="hidden dark:inline">☀️</span>
    </button>

    <!-- Chat Button -->
    <button
        class="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur hover:bg-white dark:border-white/10 dark:bg-black/40 dark:hover:bg-black/60"
        @click="chatOpen = true"
        aria-label="Open chat"
        title="Chat"
    >
      <span class="w-6 h-6 text-neutral-900 dark:text-white" v-html="chatIcon"></span>
    </button>
  </div>

  <div class="relative z-10 min-h-screen flex items-center justify-center px-4">
    <WindowCard />
  </div>

  <MusicBuddy />

  <!-- Global Chat Modal -->
  <ModalWindow
      title="chat"
      :open="chatOpen"
      width="min(780px, 92vw)"
      height="min(520px, 80vh)"
      @close="chatOpen = false"
  >
    <AskNamChat />
  </ModalWindow>
</template>

<style scoped>
</style>
