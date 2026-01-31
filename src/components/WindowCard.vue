<script setup>
import { ref } from "vue"
import ModalWindow from "./ModalWindow.vue"
import AskNamChat from "./AskNamChat.vue";

// Test
// active hält den Schlüssel des aktuell offenen Modals:
// mögliche Werte: "about", "links", "work", webapp oder film (kein Modal offen)
const active = ref(null)

// Die Navigationselemente (label/key/icon). Einfach erweiterbar.
// Wir rendern das SVG per v-html im Template.
const items = [
  {
    label: "about",
    key: "about",
    icon: `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0625" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>    `,
  },
  {
    label: "links",
    key: "links",
    icon: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
  },
  {
    label: "work",
    key: "work",
    icon: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M4 7h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 12h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
  },
]

const workIcons = {
  app: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.1" d="M14 17.5C14 16.0955 14 15.3933 14.3371 14.8889C14.483 14.6705 14.6705 14.483 14.8889 14.3371C15.3933 14 16.0955 14 17.5 14V14V14C18.9045 14 19.6067 14 20.1111 14.3371C20.3295 14.483 20.517 14.6705 20.6629 14.8889C21 15.3933 21 16.0955 21 17.5V17.5V17.5C21 18.9045 21 19.6067 20.6629 20.1111C20.517 20.3295 20.3295 20.517 20.1111 20.6629C19.6067 21 18.9045 21 17.5 21V21V21C16.0955 21 15.3933 21 14.8889 20.6629C14.6705 20.517 14.483 20.3295 14.3371 20.1111C14 19.6067 14 18.9045 14 17.5V17.5V17.5Z" fill="#323232"/>
<path opacity="0.1" d="M3 17.5C3 16.0955 3 15.3933 3.33706 14.8889C3.48298 14.6705 3.67048 14.483 3.88886 14.3371C4.39331 14 5.09554 14 6.5 14V14V14C7.90446 14 8.60669 14 9.11114 14.3371C9.32952 14.483 9.51702 14.6705 9.66294 14.8889C10 15.3933 10 16.0955 10 17.5V17.5V17.5C10 18.9045 10 19.6067 9.66294 20.1111C9.51702 20.3295 9.32952 20.517 9.11114 20.6629C8.60669 21 7.90446 21 6.5 21V21V21C5.09554 21 4.39331 21 3.88886 20.6629C3.67048 20.517 3.48298 20.3295 3.33706 20.1111C3 19.6067 3 18.9045 3 17.5V17.5V17.5Z" fill="#323232"/>
<path opacity="0.1" d="M3 6.5C3 5.09554 3 4.39331 3.33706 3.88886C3.48298 3.67048 3.67048 3.48298 3.88886 3.33706C4.39331 3 5.09554 3 6.5 3V3V3C7.90446 3 8.60669 3 9.11114 3.33706C9.32952 3.48298 9.51702 3.67048 9.66294 3.88886C10 4.39331 10 5.09554 10 6.5V6.5V6.5C10 7.90446 10 8.60669 9.66294 9.11114C9.51702 9.32952 9.32952 9.51702 9.11114 9.66294C8.60669 10 7.90446 10 6.5 10V10V10C5.09554 10 4.39331 10 3.88886 9.66294C3.67048 9.51702 3.48298 9.32952 3.33706 9.11114C3 8.60669 3 7.90446 3 6.5V6.5V6.5Z" fill="#323232"/>
<path d="M14 17.5C14 16.0955 14 15.3933 14.3371 14.8889C14.483 14.6705 14.6705 14.483 14.8889 14.3371C15.3933 14 16.0955 14 17.5 14V14V14C18.9045 14 19.6067 14 20.1111 14.3371C20.3295 14.483 20.517 14.6705 20.6629 14.8889C21 15.3933 21 16.0955 21 17.5V17.5V17.5C21 18.9045 21 19.6067 20.6629 20.1111C20.517 20.3295 20.3295 20.517 20.1111 20.6629C19.6067 21 18.9045 21 17.5 21V21V21C16.0955 21 15.3933 21 14.8889 20.6629C14.6705 20.517 14.483 20.3295 14.3371 20.1111C14 19.6067 14 18.9045 14 17.5V17.5V17.5Z" stroke="#323232" stroke-width="2"/>
<path d="M3 17.5C3 16.0955 3 15.3933 3.33706 14.8889C3.48298 14.6705 3.67048 14.483 3.88886 14.3371C4.39331 14 5.09554 14 6.5 14V14V14C7.90446 14 8.60669 14 9.11114 14.3371C9.32952 14.483 9.51702 14.6705 9.66294 14.8889C10 15.3933 10 16.0955 10 17.5V17.5V17.5C10 18.9045 10 19.6067 9.66294 20.1111C9.51702 20.3295 9.32952 20.517 9.11114 20.6629C8.60669 21 7.90446 21 6.5 21V21V21C5.09554 21 4.39331 21 3.88886 20.6629C3.67048 20.517 3.48298 20.3295 3.33706 20.1111C3 19.6067 3 18.9045 3 17.5V17.5V17.5Z" stroke="#323232" stroke-width="2"/>
<path d="M3 6.5C3 5.09554 3 4.39331 3.33706 3.88886C3.48298 3.67048 3.67048 3.48298 3.88886 3.33706C4.39331 3 5.09554 3 6.5 3V3V3C7.90446 3 8.60669 3 9.11114 3.33706C9.32952 3.48298 9.51702 3.67048 9.66294 3.88886C10 4.39331 10 5.09554 10 6.5V6.5V6.5C10 7.90446 10 8.60669 9.66294 9.11114C9.51702 9.32952 9.32952 9.51702 9.11114 9.66294C8.60669 10 7.90446 10 6.5 10V10V10C5.09554 10 4.39331 10 3.88886 9.66294C3.67048 9.51702 3.48298 9.32952 3.33706 9.11114C3 8.60669 3 7.90446 3 6.5V6.5V6.5Z" stroke="#323232" stroke-width="2"/>
<path d="M14 6.5H21" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5 3V10" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `,
  camera: `
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
    </svg>
  `,
}

// Klick Sound
const clickSound = new Audio("/sounds/click.mp3")
clickSound.volume = 0.4

const icons = {
  linkedin: `
    <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

<defs>

<style>.cls-1{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}</style>

</defs>

<g id="ic-social-linkedin">

<rect class="cls-1" x="3" y="3" width="18" height="18" rx="6"/>

<line class="cls-1" x1="7.63" y1="10.89" x2="7.63" y2="16.89"/>

<path class="cls-1" d="M10.38,16.89v-3a3,3,0,0,1,3-3h0a3,3,0,0,1,3,3v3"/>

<line class="cls-1" x1="7.63" y1="7.89" x2="7.63" y2="7.78"/>

</g>

</svg>
  `,
  github: `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
  `,
  mail: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" stroke="currentColor" stroke-width="2"/>
      <path d="M5.5 7l6.5 5 6.5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
}

// Öffnet ein Modal anhand des Schlüssels (z.B. "about")
function openModal(key) {
  // Klick-Sound abspielen (immer von vorne)
  try {
    clickSound.currentTime = 0
    clickSound.play()
  } catch (err) {
    // Falls Audio blockiert wird, ignorieren wir es
    console.warn("Klick-Sound konnte nicht abgespielt werden:", err)
  }

  // Modal öffnen
  active.value = key
}

// merkt sich, welche FAQ offen ist (Index oder null)
const openFaq = ref(null)

function toggleFaq(index) {
  // Wenn dieselbe Frage nochmal geklickt wird → schließen
  openFaq.value = openFaq.value === index ? null : index
}


// Schließt das aktuell offene Modal
function closeModal() {

  try {
    clickSound.currentTime = 0
    clickSound.play()
  } catch (err) {
    // Falls Audio blockiert wird, ignorieren wir es
    console.warn("Klick-Sound konnte nicht abgespielt werden:", err)
  }

  active.value = null
}

</script>

<template>
  <div class="overflow-hidden w-[760px] max-w-[92vw] rounded-xl border-2 border-black/30 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
    <!-- Kopfzeile: leer gelassen (kein "home" mehr) -->
    <div class="flex items-center h-11 px-4 text-base tracking-wide text-white bg-neutral-600">home</div>

    <div class="px-6 py-14 text-center">
      <h1 class="text-[clamp(42px,6vw,64px)] leading-[1.05] font-normal text-neutral-500">
        hey! <span class="font-semibold text-orange-400">i'm Nam</span>
      </h1>

      <p class="mt-7 text-xl text-neutral-500/80">tech-enthusiast & filmmaker</p>

      <nav class="grid place-items-center mt-10 mx-auto max-w-[420px] grid-cols-3 gap-3">
        <button v-for="item in items" :key="item.key" type="button" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-transform hover:-translate-y-0.5 hover:bg-black/5" @click="openModal(item.key)">
          <span class="block w-8 h-8 text-neutral-700" v-html="item.icon"></span>
          <span class="text-xl text-neutral-700">{{ item.label }}</span>
        </button>
      </nav>
    </div>
  </div>

  <!-- ABOUT Modal: Inhalt ergänzt -->
  <ModalWindow title="about" :open="active === 'about'" @close="closeModal">

    <div class="flex items-start gap-4">
      <!-- Profilbild links -->
      <img
          src="/images/profil6 2.JPG"
          alt="Nam"
          class="w-24 h-24 rounded-full object-cover border border-black/10 shrink-0
                transition-transform duration-400 ease-in-out hover:scale-130"
      />

      <!-- Text rechts daneben -->
      <div class="grid gap-2 mb-10">
        <p class="text-neutral-700 mt-10">
          Heyy! I’m Nam, a 23-year-old guy based in Berlin
          who’s into tech, filmmaking, and photography.
          It's nice to see you here! ^^
        </p>
      </div>
    </div>

    <div class="grid gap-1 mb-5">
      <p class="font-semibold">EDUCATION:</p>
      <p>Bachelor of Science in Business Informatics</p>
      <p class="text-sm text-neutral-600">2024–2027, HTW Berlin</p>
    </div>

    <div class="grid gap-1 mb-5">
      <p class="font-semibold">TECH STACK:</p>
      <ul class="list-disc pl-5 text-neutral-700">
        <li>java, javascript, html/css & vue.js</li>
        <li>sql & r</li>
      </ul>
    </div>

    <div class="grid gap-1 mb-5">
      <p class="font-semibold">MY CAMERAS:</p>
      <ul class="list-disc pl-5 text-neutral-700">
        <li>sony a7 iv</li>
        <li>soon iphone 17 pro :)</li>
      </ul>
    </div>

    <div class="grid gap-4">
      <h3 class="text-lg font-semibold">FAQ:</h3>

      <!-- FAQ Item 1 -->
      <div class="rounded-lg border border-black/10 text-neutral-700">
        <button
            class="flex items-center justify-between w-full px-4 py-3 text-left font-medium"
            @click="toggleFaq(0)"
        >
          <span>Why did you come to the tech industry?</span>
          <span class="text-neutral-400">{{ openFaq === 0 ? "–" : "+" }}</span>
        </button>

        <div v-if="openFaq === 0" class="px-4 pb-4 text-neutral-700">
          → I was looking for a field of study and chose business and tech because it lets
          me build cool apps and websites like this one, while staying relevant in a world
          shaped by new technologies.
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div class="rounded-lg border border-black/10 text-neutral-700">
        <button
            class="flex items-center justify-between w-full px-4 py-3 text-left font-medium"
            @click="toggleFaq(1)"
        >
          <span>How did you start filmmaking and photography?</span>
          <span class="text-neutral-400">{{ openFaq === 1 ? "–" : "+" }}</span>
        </button>

        <div v-if="openFaq === 1" class="px-4 pb-4 text-neutral-700">
          → I once rented a digital camera to take photos for friends and to record my
          self-development journey. Since then, I’ve loved creating visuals and eventually
          bought a professional camera.
        </div>
      </div>

      <!-- FAQ Item 3 -->
      <div class="rounded-lg border border-black/10 text-neutral-700">
        <button
            class="flex items-center justify-between w-full px-4 py-3 text-left font-medium"
            @click="toggleFaq(2)"
        >
          <span>What else do you enjoy doing in your free time?</span>
          <span class="text-neutral-400">{{ openFaq === 2 ? "–" : "+" }}</span>
        </button>

        <div v-if="openFaq === 2" class="px-4 pb-4 text-neutral-700">
          <p>→ In my free time, I like to:</p>
          <ul class="list-disc pl-5 mt-1">
            <li>go swimming or running</li>
            <li>work out (mostly calisthenics)</li>
            <li>chill and watch series</li>
            <li>spend quality time with family and friends</li>
            <li>hike in nature and explore new places!</li>
          </ul>
        </div>
      </div>
    </div>

  </ModalWindow>

  <!-- LINKS Modal -->
  <ModalWindow title="links" :open="active === 'links'" width="520px" height="300px" @close="closeModal">
    <ul class="flex justify-center gap-15 mt-10">
      <!-- GitHub -->
      <li>
        <a
            href="https://github.com/NamTakeshi"
            target="_blank"
            rel="noreferrer"
            class="social-btn github"
        >
          <i class="fa-brands fa-github"></i>
          <span class="icon" v-html="icons.github"></span>
        </a>
      </li>

      <!-- LinkedIn -->
      <li>
        <a
            href="https://www.linkedin.com/in/nam-phan-a0870a270"
            target="_blank"
            rel="noreferrer"
            class="social-btn linkedin"
        >
          <span class="icon" v-html="icons.linkedin"></span>
        </a>
      </li>

      <!-- Email -->
      <li>
        <a
            href="mailto:nam.phan.dev@gmail.com"
            class="social-btn email"
        >
          <span class="icon" v-html="icons.mail"></span>
        </a>
      </li>
    </ul>
    <p class="mt-10 text-center text-gray-500">clicking any of the links will open a new tab!</p>
  </ModalWindow>

  <!-- WORK Modal (Hub/Übersicht) -->
  <ModalWindow
      title="work"
      :open="active === 'work'"
      width="520px" height="300px"
      @close="closeModal"
  >

    <!-- 2 Karten: Webapp & Filmmaking -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <!-- Webapp Card -->
      <button
          type="button"
          class="group rounded-xl mt-6 p-6 text-center transition"
          @click="openModal('webapp')"
      >
        <!-- großes Icon -->
        <span
            class="mx-auto block w-20 h-20 text-neutral-700 transition-transform duration-200 group-hover:scale-110 dark:text-white"
            v-html="workIcons.app"
        ></span>

        <!-- Text unter dem Icon -->
        <p class="mt-3 font-semibold text-lg">developement</p>
      </button>

      <!-- Filmmaking Card -->
      <button
          type="button"
          class="group rounded-xl mt-6 p-6 text-center"
          @click="openModal('film')"
      >
        <!-- großes Icon -->
        <span
            class="mx-auto block w-20 h-20 text-neutral-700 transition-transform duration-200 group-hover:scale-110 dark:text-white"
            v-html="workIcons.camera"
        ></span>

        <!-- Text unter dem Icon -->
        <p class="mt-3 font-semibold text-lg">filmmaking</p>
      </button>
    </div>


  </ModalWindow>

  <!-- WEBAPP Modal -->
  <ModalWindow
      title="developement"
      :open="active === 'webapp'"
      width="860px"
      height="520px"
      @close="closeModal"
  >
    <!-- 2 Spalten: links Preview, rechts Infos -->
    <div class="grid gap-6 md:grid-cols-[360px_1fr] text-neutral-700">

      <!-- LEFT: Preview -->
      <div class="rounded-xl overflow-hidden bg-white">
        <!-- Screenshot in public/images/habittracker.png ablegen -->
        <img
            src="/images/bear.ico"
            alt="HabitTrackerApp preview"
            class="w-full h-70 mt-10 object-contain"
        />

      </div>

      <!-- RIGHT: Text -->
      <div class="grid gap-4">
        <!-- Titel + 1 Satz -->
        <div>
          <h3 class="text-4xl font-semibold">My Habit Tracker</h3>
          <p class="text-l text-neutral-700 mt-1">
            university project for “Webtechnologien” @ HTW Berlin
          </p>
        </div>

        <!-- Kurzbeschreibung -->
        <p class="mt-2 text-md text-neutral-700">
          a simple habit tracker my friend and i built with vue.
          the goal was to build our first webapp and use habits-tracking to reach our goals.
          (still evolving)
        </p>

        <!-- Mini-Infos als “Chips” -->
        <div class="mt-2 flex flex-wrap gap-2 text-md">
          <span class="px-3 py-1 rounded-full border border-black/10 text-md">java</span>
          <span class="px-3 py-1 rounded-full border border-black/10 text-md">vue</span>
          <span class="px-3 py-1 rounded-full border border-black/10 text-md">javascript</span>
          <span class="px-3 py-1 rounded-full border border-black/10 text-md">tailwind</span>
        </div>

        <!-- Buttons -->
        <div class="mt-32 flex flex-wrap gap-3">
          <!-- GitHub -->
          <a
              href="https://github.com/NamTakeshi/MyHabitTracker"
              target="_blank"
              rel="noreferrer"
              class="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5
           border border-black/10 bg-white
           shadow-sm
           transition-all duration-200
           hover:-translate-y-0.5 hover:shadow-md hover:bg-black/5"
          >
            <span class="font-medium">GitHub</span>
            <span class="transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
          </a>

          <!-- Live Demo -->
          <span
              class="inline-flex items-center gap-2 rounded-xl px-5 py-2.5
           border border-black/10 bg-neutral-100 text-neutral-500
           cursor-not-allowed"
          >
    Live demo (incoming)
  </span>
        </div>
      </div>
    </div>
  </ModalWindow>

  <!-- FILMMAKING Modal (schlicht & scrollbar) -->
  <ModalWindow
      title="filmmaking"
      :open="active === 'film'"
      width="min(1100px, 94vw)"
      height="min(680px, 86vh)"
      @close="closeModal"
  >
    <!-- Alles untereinander, scrollbar durch das Modal selbst -->
    <div class="grid gap-10 text-neutral-700">

      <!-- New York -->
      <section class="grid gap-3">
        <h3 class="mt-10 text-6xl font-bold text-center text-black">New York</h3>
        <div class="mx-auto mt-4 h-px w-100 bg-gradient-to-r from-transparent via-black/100 to-transparent mb-4"></div>


        <div class="grid grid-cols-1 gap-3">
          <video src="/videos/nyvid.MP4" controls class="rounded-lg w-full aspect-video object-contain bg-black/5"></video>
          <img src="/images/ny1.jpg" class="rounded-lg w-full aspect-video object-contain bg-black/5"/>
          <img src="/images/ny2.jpg" class="rounded-lg w-full aspect-video object-contain bg-black/5"/>
          <img src="/images/ny3.jpg" class="rounded-lg w-full aspect-video object-contain bg-black/5"/>
        </div>


        <br><br>

      </section>

      <!-- Vietnam -->
      <section class="grid gap-3">
        <h3 class="text-6xl font-bold text-center text-black">Vietnam</h3>
        <div class="mx-auto mt-4 h-px w-100 bg-gradient-to-r from-transparent via-black/100 to-transparent mb-4"></div>

        <div class="grid grid-cols-1 gap-3">
          <video src="/videos/Vietnam2.mp4" controls class="rounded-lg w-full aspect-video object-contain bg-black/5"></video>
          <img src="/images/vn1.jpg" class="rounded-lg w-full aspect-video object-contain bg-black/5"/>
          <img src="/images/vn2.jpg" class="rounded-lg w-full aspect-video object-contain bg-black/5"/>
        </div>

        <br><br>
      </section>


      <!-- Ocean -->
      <section class="grid gap-3">
        <h3 class="text-6xl font-bold text-center text-black">Ocean</h3>
        <div class="mx-auto mt-4 h-px w-100 bg-gradient-to-r from-transparent via-black/100 to-transparent mb-4"></div>

        <div class="grid grid-cols-1 gap-3">
          <video src="/videos/oceanvid.MOV" controls class="rounded-lg w-full aspect-video object-contain bg-black/5"></video>
          <img src="/images/ocean1.jpg" class="rounded-lg w-full aspect-video object-contain bg-black/5"/>
          <img src="/images/ocean2.jpg" class="rounded-lg w-full aspect-video object-contain bg-black/5"/>
        </div>
      </section>

    </div>
  </ModalWindow>





</template>

<style scoped>
.social-btn {
  width: 100px;
  height:100px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  border: 2px solid #fff;
  text-decoration: none;
}

.social-btn .icon {
  width: 60px;
  height: 60px;
  color: #262626;
  transition: 0.5s;
  z-index: 3;
}

.social-btn::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.5s;
  z-index: 2;
}

.social-btn:hover::before {
  top: 0;
}

.social-btn:hover .icon {
  color: #fff;
  transform: rotateY(360deg);
}

/* Farben pro Plattform */
.social-btn.github::before {
  background: grey;
}

.social-btn.linkedin::before {
  background: #0077b5;
}

.social-btn.email::before {
  background: #dd4b39;
}

</style>
