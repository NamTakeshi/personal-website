<script setup>
import { ref, nextTick, watch, onMounted } from "vue";

const input = ref("");
const loading = ref(false);
const greeting = `
Hey! I'm Takeshi, a digital friend and helper on Nam's website.

You can ask me everything ^^
`.trim();

const messages = ref([
  { role: "assistant", content: greeting },
]);

const bottomRef = ref(null);

async function scrollToBottom() {
  await nextTick();
  bottomRef.value?.scrollIntoView({ behavior: "smooth", block: "end" });
}

onMounted(() => {
  scrollToBottom();
});

watch(
    () => messages.value.length,
    () => {
      scrollToBottom();
    }
);

async function send() {
  const text = input.value.trim();
  if (!text || loading.value) return;

  messages.value.push({ role: "user", content: text });
  input.value = "";
  loading.value = true;

  try {
    const payload = {
      messages: messages.value.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    };

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);

    messages.value.push({ role: "assistant", content: data?.text || "No answer returned." });
  } catch (e) {
    console.warn(e);
    messages.value.push({
      role: "assistant",
      content: "Sorry — something went wrong on the server.",
    });
  } finally {
    loading.value = false;
  }
}

</script>



<template>
  <div class="flex h-full min-h-0 flex-col">
    <!-- scrollbarer Bereich -->
    <div class="flex-1 min-h-0 overflow-y-auto rounded-xl border border-black/10 bg-white dark:bg-transparent p-4 pb-4 text-left">
      <div v-for="(m, idx) in messages" :key="idx" class="mb-3">
        <div class="text-xs text-neutral-500 mb-1">
          {{ m.role === "user" ? "You" : "Assistant" }}
        </div>

        <div
            class="inline-block rounded-xl px-3 py-2"
            :class="m.role === 'user'
  ? 'bg-black/5 text-neutral-900 dark:bg-white/10 dark:text-neutral-100'
  : 'bg-white/70 text-neutral-800 border border-black/10 dark:bg-white/5 dark:text-neutral-100 dark:border-white/10'"
        >
          <div class="whitespace-pre-line">
            {{ m.content }}
          </div>

        </div>
      </div>

      <div v-if="loading" class="text-sm text-neutral-500">Thinking…</div>

      <!-- ✅ Anchor: hierhin wird gescrollt -->
      <div ref="bottomRef" class="h-8"></div>
    </div>

    <!-- input bleibt immer unten -->
    <form class="pt-3 flex gap-2 shrink-0" @submit.prevent="send">
      <input
          v-model="input"
          class="flex-1 rounded-xl text-neutral-900 dark:text-neutral-100 border border-black/10 bg-white dark:bg-transparent dark:border-neutral-700 px-3 py-2"
          placeholder="Ask me anything…"
      />
      <button
          type="submit"
          class="rounded-xl border border-black/10 bg-neutral-700 px-4 py-2 text-white hover:bg-neutral-800 disabled:opacity-60"
          :disabled="loading"
      >
        Send
      </button>
    </form>
  </div>
</template>


