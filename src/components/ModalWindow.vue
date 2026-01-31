<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from "vue"

const props = defineProps({
  title: { type: String, required: true },
  open: { type: Boolean, default: false },

  // neue Props:
  initialX: { type: Number, default: 0 },
  initialY: { type: Number, default: 0 },

  width: { type: String, default: "760px" },
  height: { type: String, default: "520px" },
})

const emit = defineEmits(["close"])

// Backdrop-Klick
// Schließen nur, wenn wirklich der halbtransparente Hintergrund (backdrop) angeklickt wurde.
function onBackdropClick(e) {
  if (e.target === e.currentTarget) emit("close")
}

// Escape-Taste: nur aktiv wenn das Modal offen ist
// Statt permanenten globalen Listener zu nutzen, registrieren wir ihn nur, wenn das Modal geöffnet wird.
// Das macht das Verhalten vorhersehbarer und ist leichter zu verstehen.
function handleKeyDown(e) {
  if (e.key === "Escape") emit("close")
}

// watch öffnet / schließt: Listener hinzufügen/entfernen und Modal optional zentrieren
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      // bei Öffnen zurück in die Mitte setzen (optional)
      nextTick(() => {
        offset.value = { x: props.initialX, y: props.initialY }
      })
    } else {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }
)

// Aufräumen beim Unmount (Sicherheit)
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown)
})

// -------------------- Drag-Logik --------------------
// Idee: das Fenster ist standardmäßig zentriert. Wir speichern einen offset {x,y} in px,
// der beim Ziehen verändert wird. Der Header ist das "Handle" zum Ziehen.

const headerRef = ref(null) // DOM-Element der Titel-Leiste (Drag-Handle)
const modalRef = ref(null) // DOM-Element des Fensters

const offset = ref({ x: 0, y: 0 }) // aktueller Pixel-Offset vom zentrierten Ursprung
const dragging = ref(false) // einfacher bool, für Cursorstil & Verständnis

// temporäre Werte während Drag
let startPoint = { x: 0, y: 0 }
let startOffset = { x: 0, y: 0 }

// einfache Begrenzung, damit das Fenster nicht komplett aus dem Sichtbereich verschwindet.
// Wir erlauben Verschiebungen innerhalb eines groben Rahmens vom Viewport-Mittelpunkt.
function clampOffset(x, y) {
  const vw = window.innerWidth
  const vh = window.innerHeight

  // erlaubte maximale Verschiebung vom Mittelpunkt (px)
  const maxX = Math.max(vw / 2 - 100, 0)
  const maxY = Math.max(vh / 2 - 100, 0)

  return {
    x: Math.max(-maxX, Math.min(maxX, x)),
    y: Math.max(-maxY, Math.min(maxY, y)),
  }
}

// Startet das Ziehen (pointerdown auf der Header-Leiste)
function onPointerDown(e) {
  // nur der primäre Button/finger
  if (e.button && e.button !== 0) return

  dragging.value = true
  startPoint = { x: e.clientX, y: e.clientY }
  startOffset = { x: offset.value.x, y: offset.value.y }

  // Pointer-Capture hilft, auch dann Move/Up zu erhalten, wenn der Zeiger schnell ist.
  try {
    headerRef.value?.setPointerCapture?.(e.pointerId)
  } catch (err) {
    /* ignore */
  }

  // Verhindern, dass beim Ziehen Text ausgewählt wird (besseres UX)
  document.body.style.userSelect = "none"
  document.body.style.touchAction = "none"

  window.addEventListener("pointermove", onPointerMove)
  window.addEventListener("pointerup", onPointerUp)
}

// Update während Drag (pointermove)
function onPointerMove(e) {
  if (!dragging.value) return
  const dx = e.clientX - startPoint.x
  const dy = e.clientY - startPoint.y
  const candidate = { x: startOffset.x + dx, y: startOffset.y + dy }
  offset.value = clampOffset(candidate.x, candidate.y)
}

// Ende des Ziehens (pointerup)
function onPointerUp(e) {
  if (!dragging.value) return
  dragging.value = false

  try {
    headerRef.value?.releasePointerCapture?.(e.pointerId)
  } catch (err) {
    /* ignore */
  }

  // Zurücksetzen der temporären Stil-Änderungen
  document.body.style.userSelect = ""
  document.body.style.touchAction = ""

  window.removeEventListener("pointermove", onPointerMove)
  window.removeEventListener("pointerup", onPointerUp)
}
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30" @click="onBackdropClick">
      <div
          ref="modalRef"
          class="relative overflow-hidden w-[760px] max-w-[92vw] h-[520px] rounded-xl border-2 border-black/30 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)] max-sm:h-[560px]"
          :style="{
    width: props.width,
    height: props.height,
    transform: `translate(-50%,-50%) translate(${offset.x}px, ${offset.y}px)`,
    left: '50%',
    top: '50%',
    position: 'fixed'
  }"
      >

      <!-- Header ist das Drag-Handle. -->
        <div
          ref="headerRef"
          class="flex items-center justify-between h-11 px-4 text-base tracking-wide
       bg-neutral-600 text-white
       border-b border-white/10"
          @pointerdown.stop.prevent="onPointerDown"
          :style="{ cursor: dragging ? 'grabbing' : 'grab' }"
        >
          <span>{{ title }}</span>

          <!-- Schließen-Button: pointerdown stoppen (kein Drag starten) und click stoppen,
               dann emit('close') aufrufen -->
          <button
            type="button"
            class="flex items-center justify-center w-8 h-8 rounded-md transition-colors hover:bg-white/10"
            @pointerdown.stop
            @click.stop="emit('close')"
          >
            ✕
          </button>
        </div>

        <!-- Inhalt (Slot) -->
        <div
            class="overflow-y-auto text-left"
            :style="{ height: `calc(${props.height} - 44px)` }"
        >
          <div class="h-full min-h-0 p-6 flex flex-col">
            <slot />
          </div>
        </div>


      </div>
    </div>
  </teleport>
</template>

<style>

</style>

