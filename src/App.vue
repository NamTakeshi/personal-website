<script setup>
import BackgroundShootingStars from "./components/BackgroundShootingStars.vue";
import WindowCard from "./components/WindowCard.vue";
import MusicBuddy from "./components/MusicBuddy.vue";
</script>

<template>
  <BackgroundShootingStars />

  <div class="relative z-10 min-h-screen flex items-center justify-center px-4">
    <WindowCard />
  </div>

  <MusicBuddy />
</template>

<style scoped>
</style>
