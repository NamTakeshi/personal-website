<script setup>
import { onMounted, onBeforeUnmount } from "vue"

const props = defineProps({
  // Titel oben in der Fensterleiste (z.B. "about")
  title: { type: String, required: true },

  // Steuert, ob das Modal sichtbar ist
  open: { type: Boolean, default: false },
})

const emit = defineEmits(["close"])

// Wird ausgelöst, wenn man irgendwo im dunklen Hintergrund klickt.
// Wir schließen NUR, wenn wirklich der Hintergrund angeklickt wurde,
// nicht wenn man ins Fenster klickt.
function onBackdropClick(e) {
  if (e.target === e.currentTarget) emit("close")
}

// ESC-Taste soll das Fenster schließen.
// Wir hängen dafür einen globalen Event Listener an "window".
function onKeyDown(e) {
  if (!props.open) return
  if (e.key === "Escape") emit("close")
}

onMounted(() => window.addEventListener("keydown", onKeyDown))
onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown))
</script>

<template>
  <!-- teleport rendert das Modal direkt in <body>,
       damit es immer "über allem" liegt und nicht abgeschnitten wird. -->
  <teleport to="body">
    <!-- v-if: Das Modal existiert nur, wenn open === true -->
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30" @click="onBackdropClick">
      <!-- Das Fenster selbst -->
      <div class="relative overflow-hidden w-[760px] max-w-[92vw] max-h-[80vh] rounded-xl border-2 border-black/30 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
        <!-- Titel-Leiste -->
        <div class="flex items-center justify-between h-11 px-4 text-base tracking-wide text-white bg-neutral-800">
          <span>{{ title }}</span>

          <!-- Schließen-Button -->
          <button type="button" class="flex items-center justify-center w-8 h-8 rounded-md transition-colors hover:bg-white/10" @click="$emit('close')">
            ✕
          </button>
        </div>

        <!-- Scrollbarer Inhalt (falls viel Text drin ist) -->
        <div class="overflow-auto p-6 text-left">
          <!-- slot = hier kommt später dein About/Links/Work Inhalt rein -->
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>