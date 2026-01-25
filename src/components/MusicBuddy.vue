<template>
  <button
      class="fixed left-25 top-2 z-50 w-10 h-20 flex items-center justify-center transition-transform hover:-translate-y-1"
      :aria-pressed="playing"
      @click="toggle"
      title="Musik an/aus"
  >

    <!-- SVG Buddy -->
    <svg
        viewBox="0 0 256 256"
        class="h-20 w-20 pointer-events-none select-none text-black dark:text-white"
        style="fill: currentColor;"
        :class="playing ? 'svg-active' : ''"
        aria-hidden="true"
    >
    <path d="M65,240.4h-4.5c-14.5,0-26.4-11.9-26.4-26.4v-67.6c0-14.5,11.9-26.4,26.4-26.4H65c14.5,0,26.4,11.9,26.4,26.4V214C91.4,228.5,79.5,240.4,65,240.4z"/>
      <path d="M195.4,240.3h-4.5c-14.5,0-26.4-11.9-26.4-26.4v-67.6c0-14.5,11.9-26.4,26.4-26.4h4.5c14.5,0,26.4,11.9,26.4,26.4v67.6C221.8,228.4,209.9,240.3,195.4,240.3z"/>
      <path d="M24.2,183.2v-46.4C24.2,80,68.8,31.7,125.6,30.5c59-1.3,106.2,46.5,106.2,105.2v47.5c0,3.9,3.2,7.1,7.1,7.1l0,0c3.9,0,7.1-3.2,7.1-7.1v-46.9c0-66.2-54.1-121.9-120.3-120.6C61.6,16.9,10,69.2,10,133.6v49.6c0,3.9,3.2,7.1,7.1,7.1l0,0C21,190.3,24.2,187.1,24.2,183.2z"/>
    </svg>

  </button>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"

const DARK_SRC = "/music/calm-space-music-312291.mp3"
const LIGHT_SRC = "/music/ghibli-style-2-229070.mp3"

const audio = ref(null)
const playing = ref(false)

// ✅ Theme-Check direkt aus <html class="dark">
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

  // Achtung: audio.value.src ist eine absolute URL, daher includes OK
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


  const observer = new MutationObserver(() => switchTrack())
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

  // Cleanup
  onBeforeUnmount(() => observer.disconnect())
})

onBeforeUnmount(() => {
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
@keyframes svgFloat {
  0%   { transform: translateY(0) scale(1); }
  50%  { transform: translateY(-10px) scale(1.02); }
  100% { transform: translateY(0) scale(1); }
}

@keyframes svgGlow {
  0%   { filter: drop-shadow(0 0 0 rgba(180, 200, 255, 0)); }
  50%  { filter: drop-shadow(0 0 18px rgba(180, 200, 255, 0.6)); }
  100% { filter: drop-shadow(0 0 0 rgba(180, 200, 255, 0)); }
}

.svg-active {
  display: block;
  transform-origin: center;
  animation:
      svgFloat 4s ease-in-out infinite,
      svgGlow 4s ease-in-out infinite;
}


</style>


