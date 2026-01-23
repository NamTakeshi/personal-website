<template>
  <button
      class="fixed right-6 bottom-6 z-50 w-32 h-32 flex items-center justify-center transition-transform hover:-translate-y-1"
      :aria-pressed="playing"
      @click="toggle"
      title="Musik an/aus"
  >

    <!-- Dein Buddy -->
    <img
        :src="BUDDY_SRC"
        alt="Music Buddy"
        class="h-20 pointer-events-none select-none"
        :class="playing ? 'moon-active' : ''"
    />
  </button>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Pfad zur Audiodatei
const AUDIO_SRC = '/music/calm-space-music-312291.mp3'
const BUDDY_SRC = '/images/img_2.png'

const audio = ref(null)
const playing = ref(false)

onMounted(() => {
  audio.value = new Audio(AUDIO_SRC)
  audio.value.loop = true

  // Sync state, falls user das Audio extern startet/stoppt
  audio.value.addEventListener('play', () => (playing.value = true))
  audio.value.addEventListener('pause', () => (playing.value = false))
})

onBeforeUnmount(() => {
  if (audio.value) {
    audio.value.pause()
    audio.value.src = ''
    audio.value = null
  }
})

function toggle() {
  if (!audio.value) return
  if (playing.value) {
    audio.value.pause()
    // playing wird per 'pause' Event aktualisiert
  } else {
    audio.value.play().catch((err) => {
      // Autoplay-Policy: wenn play() fehlschlägt, informiere Konsole
      console.warn('Audio konnte nicht abgespielt werden:', err)
    })
    // playing wird per 'play' Event aktualisiert
  }
}
</script>

<style scoped>
@keyframes moonFloat {
  0%   { transform: translateY(0) scale(1); }
  50%  { transform: translateY(-10px) scale(1.02); }
  100% { transform: translateY(0) scale(1); }
}

@keyframes moonGlow {
  0%   { filter: drop-shadow(0 0 0 rgba(180, 200, 255, 0)); }
  50%  { filter: drop-shadow(0 0 18px rgba(180, 200, 255, 0.6)); }
  100% { filter: drop-shadow(0 0 0 rgba(180, 200, 255, 0)); }
}

.moon-active {
  animation:
      moonFloat 4s ease-in-out infinite,
      moonGlow 4s ease-in-out infinite;
}


</style>
