export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: { extend: {} },
    plugins: [],
    safelist: [
        'bg-white',
        'bg-neutral-900/70',
        'backdrop-blur-xl',
        'border-black/30',
        'border-white/10',
        'text-white',
        'text-neutral-700',
    ],
}
