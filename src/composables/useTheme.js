import { ref } from "vue"

const THEME_KEY = "theme" // "light" | "dark"
const isDark = ref(false)

function applyTheme(dark) {
    isDark.value = dark
    document.documentElement.classList.toggle("dark", dark)
}

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === "dark") return applyTheme(true)
    if (saved === "light") return applyTheme(false)

    // erstes Mal: System-Preference
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    applyTheme(!!prefersDark)
}

function toggleTheme() {
    applyTheme(!isDark.value)
    localStorage.setItem(THEME_KEY, isDark.value ? "dark" : "light")
}

function setTheme(mode) {
    const dark = mode === "dark"
    applyTheme(dark)
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light")
}

export function useTheme() {
    return { isDark, initTheme, toggleTheme, setTheme }
}
