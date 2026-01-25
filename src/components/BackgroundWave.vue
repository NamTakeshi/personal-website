<script setup>
</script>

<template>
  <div class="fixed inset-0 -z-10 overflow-hidden wave-sky">
    <div class="wave">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style scoped>
.wave-sky {
  min-height: 100vh;
}

/* Dein Wave-Background – angepasst auf "div statt section" */
.wave {
  position: absolute;
  inset: 0;
  background: #4973ff;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}

.wave span {
  position: absolute;
  width: 325vh;
  height: 325vh;
  top: 0;
  left: 50%;
  transform: translate(-50%, -75%);
  background: #000;
}

.wave span:nth-child(1) {
  border-radius: 45%;
  background: rgba(20, 20, 20, 1);
  animation: animate 5s linear infinite;
}

.wave span:nth-child(2) {
  border-radius: 40%;
  background: rgba(20, 20, 20, 0.5);
  animation: animate 10s linear infinite;
}

.wave span:nth-child(3) {
  border-radius: 42.5%;
  background: rgba(20, 20, 20, 0.5);
  animation: animate 15s linear infinite;
}

@keyframes animate {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}


.wave {
  background: rgb(90, 171, 241);
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.08);
}

.wave span:nth-child(1) { background: rgba(255,255,255,0.9); }
.wave span:nth-child(2) { background: rgba(255,255,255,0.6); }
.wave span:nth-child(3) { background: rgba(255,255,255,0.4); }

</style>
