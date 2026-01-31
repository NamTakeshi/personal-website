<script setup>
import { ref, nextTick } from "vue";

const messages = ref([
  { role: "assistant", content: "Hey! What do you want to know?" },
]);

const input = ref("");
const loading = ref(false);

async function send() {
  const text = input.value.trim()
  if (!text || loading.value) return

  messages.value.push({ role: "user", content: text })
  input.value = ""
  loading.value = true

  try {
    // ✅ nur Plain-Objekte senden (kein Vue-Ref)
    const payload = {
      messages: messages.value.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    }

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const raw = await res.text()
    let data = null
    try {
      data = raw ? JSON.parse(raw) : null
    } catch {}

    if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`)

    const answer =
        data?.choices?.[0]?.message?.content ??
        "No answer returned."
    messages.value.push({ role: "assistant", content: answer })

    console.log("API RESPONSE:", data)

  } catch (e) {
    console.warn(e)
    messages.value.push({
      role: "assistant",
      content: "Sorry — something went wrong on the server.",
    })
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="grid gap-4">
    <div class="h-80 overflow-y-auto rounded-xl border border-black/10 bg-white p-4 text-left">
      <div v-for="(m, idx) in messages" :key="idx" class="mb-3">
        <div class="text-xs text-neutral-500 mb-1">
          {{ m.role === "user" ? "You" : "Ask Nam" }}
        </div>
        <div
            class="inline-block rounded-xl px-3 py-2"
            :class="m.role === 'user'
            ? 'bg-black/5 text-neutral-900'
            : 'bg-white text-neutral-800 border border-black/10'"
        >
          {{ m.content }}
        </div>
      </div>

      <div v-if="loading" class="text-sm text-neutral-500">Thinking…</div>
    </div>

    <form class="flex gap-2" @submit.prevent="send">
      <input
          v-model="input"
          class="flex-1 rounded-xl border border-black/10 bg-white px-3 py-2"
          placeholder="Ask me anything…"
      />
      <button
          type="submit"
          class="rounded-xl border border-black/10 bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800"
      >
        Send
      </button>
    </form>
  </div>
</template>