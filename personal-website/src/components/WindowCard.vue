<script setup>
const items = [
  {
    label: "home",
    href: "#home",
    icon: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.0167 7.1419C19.6261 7.50161 20 8.15658 20 8.86423V18.0001C20 19.1047 19.1046 20.0001 18 20.0001H16C14.8954 20.0001 14 19.1047 14 18.0001V14C14 12.8955 13.1046 12 12 12V12C10.8954 12 10 12.8955 10 14V18.0001C10 19.1047 9.10457 20.0001 8 20.0001H6C4.89543 20.0001 4 19.1047 4 18.0001V8.86423C4 8.15658 4.37395 7.50161 4.98335 7.1419L10.9833 3.60023C11.6106 3.23 12.3894 3.23 13.0167 3.60023L19.0167 7.1419Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
  },
  {
    label: "about",
    href: "#about",
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
    href: "#links",
    icon: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
  },
  {
    label: "work",
    href: "#work",
    icon: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M4 7h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 12h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
  },
]
</script>


<template>
  <!-- Card Container -->
  <div class="overflow-hidden w-[760px] max-w-[92vw] rounded-xl border-2 border-black/30 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
  <!-- Top-Bar -->
    <div class="flex items-center h-11 px-4 text-base tracking-wide text-white bg-neutral-800">
      home
    </div>
    <!-- Content -->
    <div class="px-6 py-14 text-center">
      <!-- Headline -->
      <h1 class="text-[clamp(42px,6vw,64px)] leading-[1.05] font-normal text-neutral-500">
        hey! <span class="font-semibold text-orange-400">i'm Nam</span>
      </h1>
      <!-- Subline -->
      <p class="mt-7 text-xl text-neutral-500/80">
        tech-enthusiast & filmmaker
      </p>

      <!-- Nav -->
      <nav class="grid place-items-center mt-10 mx-auto max-w-[560px] grid-cols-4 gap-3">
        <a
            v-for="item in items"
            :key="item.label"
            :href="item.href"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-transform hover:-translate-y-0.5 hover:bg-black/5"
        >
          <span class="block w-8 h-8 text-neutral-700" v-html="item.icon"></span>

          <div class="text-sm text-neutral-700">
            {{ item.label }}
          </div>
        </a>
      </nav>
    </div>-
  </div>

</template>

<style scoped>

</style>