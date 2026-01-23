<script setup>
import { ref } from "vue"
import ModalWindow from "./ModalWindow.vue"

// active hält den Schlüssel des aktuell offenen Modals:
// mögliche Werte: "about", "links", "work" oder null (kein Modal offen)
const active = ref(null)

// Die Navigationselemente (label/key/icon). Einfach erweiterbar.
// Wir rendern das SVG per v-html im Template.
const items = [
  {
    label: "about",
    key: "about",
    icon: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M12 7H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" stroke="currentColor" stroke-width="2"/>
      </svg>
    `,
  },
  {
    label: "links",
    key: "links",
    icon: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
  },
  {
    label: "work",
    key: "work",
    icon: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M4 7h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 12h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
  },
]

// Klick Sound
const clickSound = new Audio("/sounds/click.mp3")
clickSound.volume = 0.4

// Öffnet ein Modal anhand des Schlüssels (z.B. "about")
function openModal(key) {
  // Klick-Sound abspielen (immer von vorne)
  try {
    clickSound.currentTime = 0
    clickSound.play()
  } catch (err) {
    // Falls Audio blockiert wird, ignorieren wir es
    console.warn("Klick-Sound konnte nicht abgespielt werden:", err)
  }

  // Modal öffnen
  active.value = key
}


// Schließt das aktuell offene Modal
function closeModal() {

  try {
    clickSound.currentTime = 0
    clickSound.play()
  } catch (err) {
    // Falls Audio blockiert wird, ignorieren wir es
    console.warn("Klick-Sound konnte nicht abgespielt werden:", err)
  }

  active.value = null
}

</script>

<template>
  <div class="overflow-hidden w-[760px] max-w-[92vw] rounded-xl border-2 border-black/30 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
    <!-- Kopfzeile: leer gelassen (kein "home" mehr) -->
    <div class="flex items-center h-11 px-4 text-base tracking-wide text-white bg-neutral-800">home</div>

    <div class="px-6 py-14 text-center">
      <h1 class="text-[clamp(42px,6vw,64px)] leading-[1.05] font-normal text-neutral-500">
        hey! <span class="font-semibold text-orange-400">i'm Nam</span>
      </h1>

      <p class="mt-7 text-xl text-neutral-500/80">tech-enthusiast & filmmaker</p>

      <nav class="grid place-items-center mt-10 mx-auto max-w-[420px] grid-cols-3 gap-3">
        <button v-for="item in items" :key="item.key" type="button" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-transform hover:-translate-y-0.5 hover:bg-black/5" @click="openModal(item.key)">
          <span class="block w-8 h-8 text-neutral-700" v-html="item.icon"></span>
          <span class="text-sm text-neutral-700">{{ item.label }}</span>
        </button>
      </nav>
    </div>
  </div>

  <!-- ABOUT Modal -->
  <ModalWindow title="about" :open="active === 'about'" @close="closeModal">
    <!-- leer gelassen -->
  </ModalWindow>

  <!-- LINKS Modal -->
  <ModalWindow title="links" :open="active === 'links'" @close="closeModal">
    <!-- leer gelassen -->
  </ModalWindow>

  <!-- WORK Modal -->
  <ModalWindow title="work" :open="active === 'work'" @close="closeModal">
    <!-- leer gelassen -->
  </ModalWindow>
</template>

<style scoped>

</style>