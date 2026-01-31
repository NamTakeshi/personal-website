<template>
  <button
      class="fixed left-[9.5rem] top-2 z-50 w-10 h-20 flex items-center justify-center transition-all duration-300 ease-out hover:scale-[1.10] active:scale-[0.97]"
      :aria-pressed="playing"
      @click="toggle"
      title="Musik an/aus"
  >
    <!-- Spin-Wrapper -->
    <span :class="{ 'spin-active': playing }" class="inline-flex items-center justify-center rounded-full border border-black/10 bg-neutral-600 backdrop-blur dark:border-white/10 text-white">
        <!-- SVG mit echten Lucide disc-3 Pfaden -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.0625"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"/>
          <path d="M6 12c0-1.7.7-3.2 1.8-4.2"/>
          <circle cx="12" cy="12" r="2"/>
          <path d="M18 12c0 1.7-.7 3.2-1.8 4.2"/>
        </svg>
    </span>
  </button>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const DARK_SRC = "/music/calm-space-music-312291.mp3"
const LIGHT_SRC = "/music/ghibli-style-2-229070.mp3"

const audio = ref(null)
const playing = ref(false)
let observer = null

function isDarkMode() {
  return document.documentElement.classList.contains("dark")
}

function getSrcForTheme() {
  return isDarkMode() ? DARK_SRC : LIGHT_SRC
}

function switchTrack() {
  if (!audio.value) return

  const wasPlaying = playing.value
  const nextSrc = getSrcForTheme()

  if (audio.value.src && audio.value.src.includes(nextSrc)) return

  audio.value.pause()
  audio.value.src = nextSrc
  audio.value.load()

  if (wasPlaying) {
    audio.value.play().catch((err) => {
      console.warn("Audio konnte nach Trackwechsel nicht abgespielt werden:", err)
    })
  }
}

onMounted(() => {
  audio.value = new Audio(getSrcForTheme())
  audio.value.loop = true
  audio.value.volume = 0.2

  audio.value.addEventListener("play", () => (playing.value = true))
  audio.value.addEventListener("pause", () => (playing.value = false))

  observer = new MutationObserver(() => switchTrack())
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
})

// ✅ Sauberer Cleanup – alles in einem Hook
onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (!audio.value) return
  audio.value.pause()
  audio.value.src = ""
  audio.value = null
})

function toggle() {
  if (!audio.value) return

  if (playing.value) {
    audio.value.pause()
  } else {
    audio.value.play().catch((err) => {
      console.warn("Audio konnte nicht abgespielt werden:", err)
    })
  }
}
</script>


<style scoped>
@keyframes svgSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Spin wenn aktiv */
.spin-active {
  animation: svgSpin 2.0s linear infinite;
}
</style>