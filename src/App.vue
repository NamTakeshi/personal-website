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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0625" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-icon lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
`;

const sunIcon =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0625" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;

const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2.0625" stroke-linecap="round" stroke-linejoin="round"
                      className="lucide lucide-moon-icon lucide-moon">
  <path
      d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
</svg>`;

const clickSound = new Audio("/sounds/pop.mp3")
clickSound.volume = 0.4

function playClick() {
  try {
    clickSound.currentTime = 0
    clickSound.play()
  } catch (err) {
    console.warn("Sound konnte nicht abgespielt werden:", err)
  }
}


onMounted(() => {
  initTheme()
})
</script>

<template>
  <!-- Light -->
  <div class="block dark:hidden">
    <BackgroundWave/>
  </div>

  <!-- Dark -->
  <div class="hidden dark:block">
    <BackgroundShootingStars/>
  </div>

  <!-- Floating Buttons oben links -->
  <div class="fixed left-6 top-6 z-50 flex gap-3">
    <!-- Theme Toggle -->
    <button
        class="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 bg-neutral-600 backdrop-blur dark:border-white/10 dark:bg-neutral-600 transition-all duration-300 ease-out hover:scale-[1.10] active:scale-[0.97]
"
        @click="() => { playClick(); toggleTheme() }"
        aria-label="Toggle theme"
        title="Toggle theme"
    >
      <!-- Light Mode sichtbar: Moon (wechseln zu dark) -->
      <span class="w-6 h-6 text-white dark:hidden" v-html="moonIcon"></span>

      <!-- Dark Mode sichtbar: Sun (wechseln zu light) -->
      <span class="w-6 h-6 text-white hidden dark:inline" v-html="sunIcon"></span>
    </button>

    <!-- Chat Button -->
    <button
        class="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 bg-neutral-600 backdrop-blur dark:border-white/10 dark:bg-neutral-600 transition-all duration-300 ease-out hover:scale-[1.10] active:scale-[0.97]"
        @click="() => { playClick(); chatOpen = true }"
        aria-label="Open chat"
        title="Chat"
    >
      <span class="w-6 h-6 text-neutral-900 dark:text-white text-white" v-html="chatIcon"></span>
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
      modal-bg="bg-white dark:bg-transparent backdrop-blur-xl"
      @close="() => { playClick();chatOpen = false}"
  >
    <AskNamChat />
  </ModalWindow>
</template>

<style scoped>
</style>
