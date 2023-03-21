/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        backgroundImage: {
            "hero-light": "url(src/assets/bg-desktop-light.jpg)",
            "hero-dark": "url(src/assets/bg-desktop-dark.jpg)",
            "hero-mobile-dark": "url(src/assets/bg-mobile-dark.jpg)",
            "hero-mobile-light": "url(src/assets/bg-mobile-light.jpg)",
        },
        extend: {},
    },
    plugins: [],
};
