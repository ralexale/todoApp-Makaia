/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        backgroundImage: {
            "hero-light": "url(./assets/bg-desktop-light.jpg)",
            "hero-dark": "url(./assets/bg-desktop-dark.jpg)",
            "hero-mobile-dark": "url(./assets/bg-mobile-dark.jpg)",
            "hero-mobile-light": "url(./assets/bg-mobile-light.jpg)",
        },
        extend: {},
    },
    plugins: [],
};
